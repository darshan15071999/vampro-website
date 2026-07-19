import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import * as THREE from 'three';

// A wireframe DSLR modeled after a real exploded-view diagram:
// multi-ring zoom lens with glass groups, lens mount, body + grip,
// pentaprism, viewfinder, mode dial, LCD, mirror box, CMOS sensor,
// heat sink, main PCB, shutter unit, battery, IO ports, mic.
//
// It IS the hero visual (bright, assembled, slowly turning), then
// disassembles along the scroll — each checkpoint pulls the part that
// matters for that section forward — and reassembles at the finale
// where the real footage takes over.

export type CameraRigHandle = { setProgress: (p: number) => void };

// Biconvex lens element (lathe profile), axis along Z
const lensElement = (r: number, halfT: number) => {
  const pts: THREE.Vector2[] = [];
  const N = 8;
  for (let i = 0; i <= N; i++) {
    const a = -Math.PI / 2 + (i / N) * Math.PI;
    pts.push(new THREE.Vector2(Math.max(Math.cos(a) * r, 0.001), Math.sin(a) * halfT));
  }
  const g = new THREE.LatheGeometry(pts, 22);
  g.rotateX(Math.PI / 2);
  return g;
};

const cyl = (rTop: number, rBot: number, h: number, seg = 24) => new THREE.CylinderGeometry(rTop, rBot, h, seg);
const zCyl = (rTop: number, rBot: number, h: number, seg = 24) => {
  const g = cyl(rTop, rBot, h, seg);
  g.rotateX(Math.PI / 2);
  return g;
};

type Key = { p: [number, number, number]; o: number; s: number };
type Part = { geoms: THREE.BufferGeometry[]; keys: Key[]; edgeAngle?: number };

const T = (g: THREE.BufferGeometry, x: number, y: number, z: number) => { g.translate(x, y, z); return g; };

// Checkpoints: 0 hero · 0.2 story · 0.4 services (full explosion) · 0.6 voice (mic) · 0.8 blog (PCB) · 1 reassembled
const buildParts = (): Part[] => [
  { // Camera body + grip + front throat
    geoms: [
      T(new THREE.BoxGeometry(2.1, 1.4, 0.75), 0, 0, 0),
      T(new THREE.BoxGeometry(0.5, 1.36, 0.95), 1.0, -0.02, 0.06),
      T(zCyl(0.5, 0.5, 0.1), -0.25, 0.05, 0.44)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, -0.1, 0], o: 0.9, s: 1 },
      { p: [-0.2, -0.9, 0], o: 1, s: 1 }, { p: [-1.2, -1.3, -1.2], o: 0.3, s: 0.95 },
      { p: [-1.2, -1.3, -1.2], o: 0.3, s: 0.95 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Zoom lens barrel with knurled rings
    geoms: [
      T(zCyl(0.52, 0.55, 1.0, 26), -0.25, 0.05, 1.05),
      T(new THREE.TorusGeometry(0.57, 0.035, 6, 30), -0.25, 0.05, 0.8),
      T(new THREE.TorusGeometry(0.58, 0.04, 6, 30), -0.25, 0.05, 1.12),
      T(new THREE.TorusGeometry(0.55, 0.03, 6, 30), -0.25, 0.05, 1.4),
      T(zCyl(0.46, 0.52, 0.22, 26), -0.25, 0.05, 1.65)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, 0.35], o: 1, s: 1 },
      { p: [-0.7, 0.5, 1.5], o: 1, s: 1 }, { p: [-1.6, 0.9, 0.6], o: 0.3, s: 0.9 },
      { p: [-1.6, 0.9, 0.6], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Front glass element + hood rim
    geoms: [
      T(lensElement(0.42, 0.09), -0.25, 0.05, 1.82),
      T(zCyl(0.5, 0.47, 0.12, 26), -0.25, 0.05, 1.88)
    ],
    edgeAngle: 10,
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, 0.7], o: 1, s: 1 },
      { p: [-1.1, 0.9, 2.9], o: 1, s: 1 }, { p: [-2.0, 1.3, 1.6], o: 0.3, s: 0.9 },
      { p: [-2.0, 1.3, 1.6], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Inner lens group A (two elements)
    geoms: [
      T(lensElement(0.3, 0.07), -0.25, 0.05, 1.25),
      T(lensElement(0.34, 0.06), -0.25, 0.05, 0.95)
    ],
    edgeAngle: 10,
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, 0.5], o: 1, s: 1 },
      { p: [-0.9, 0.7, 2.2], o: 1, s: 1 }, { p: [-1.8, 1.1, 1.1], o: 0.3, s: 0.9 },
      { p: [-1.8, 1.1, 1.1], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Lens mount ring
    geoms: [
      T(new THREE.TorusGeometry(0.42, 0.045, 8, 26), -0.25, 0.05, 0.52),
      T(zCyl(0.38, 0.38, 0.08, 26), -0.25, 0.05, 0.52)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, 0.2], o: 1, s: 1 },
      { p: [-0.5, 0.3, 0.9], o: 1, s: 1 }, { p: [-1.4, 0.6, 0.2], o: 0.3, s: 0.9 },
      { p: [-1.4, 0.6, 0.2], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Pentaprism hump + hot shoe
    geoms: [
      T(cyl(0.28, 0.55, 0.5, 4), -0.1, 0.95, 0),
      T(new THREE.BoxGeometry(0.3, 0.06, 0.35), -0.1, 1.22, 0)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0.35, 0], o: 1, s: 1 },
      { p: [0.2, 1.5, 0], o: 1, s: 1 }, { p: [0.8, 1.9, -0.8], o: 0.3, s: 0.9 },
      { p: [0.8, 1.9, -0.8], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Viewfinder eyepiece — "framing the story" (story checkpoint)
    geoms: [
      T(new THREE.BoxGeometry(0.44, 0.32, 0.12), -0.1, 0.78, -0.44),
      T(zCyl(0.13, 0.13, 0.14, 16), -0.1, 0.78, -0.54)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0.6, 0.5, -1.2], o: 1, s: 1.7 },
      { p: [-1.1, 1.5, -0.6], o: 1, s: 1 }, { p: [-1.7, 1.9, -1.3], o: 0.3, s: 0.9 },
      { p: [-1.7, 1.9, -1.3], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Mode dial + shutter button
    geoms: [
      T(cyl(0.2, 0.2, 0.1, 14), -0.85, 0.78, 0),
      T(cyl(0.09, 0.09, 0.07, 10), 1.0, 0.74, 0.25)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0.3, 0], o: 1, s: 1 },
      { p: [-0.6, 1.8, 0.3], o: 1, s: 1 }, { p: [-1.0, 2.2, -0.5], o: 0.3, s: 0.9 },
      { p: [-1.0, 2.2, -0.5], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // LCD back panel
    geoms: [
      T(new THREE.BoxGeometry(1.15, 0.8, 0.07), -0.1, -0.1, -0.44),
      T(new THREE.PlaneGeometry(0.95, 0.62), -0.1, -0.1, -0.49)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, -0.3], o: 1, s: 1 },
      { p: [1.3, -0.3, -1.5], o: 1, s: 1 }, { p: [2.0, -0.6, -2.0], o: 0.3, s: 0.9 },
      { p: [2.0, -0.6, -2.0], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Mirror box with 45° sub-mirror
    geoms: [
      T(new THREE.BoxGeometry(0.62, 0.6, 0.55), -0.25, 0.05, 0.05),
      (() => { const p = new THREE.PlaneGeometry(0.5, 0.5); p.rotateX(-Math.PI / 4); p.translate(-0.25, 0.05, 0.05); return p; })()
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0.15, 0.1], o: 1, s: 1 },
      { p: [0.7, 1.2, 0.6], o: 1, s: 1 }, { p: [1.4, 1.7, 0], o: 0.3, s: 0.9 },
      { p: [1.4, 1.7, 0], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // CMOS sensor
    geoms: [
      T(new THREE.BoxGeometry(0.5, 0.38, 0.05), -0.25, 0.05, -0.24),
      T(new THREE.PlaneGeometry(0.4, 0.28), -0.25, 0.05, -0.28)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, -0.15], o: 1, s: 1 },
      { p: [0.9, 0.6, -0.9], o: 1, s: 1 }, { p: [1.6, 1.0, -1.4], o: 0.3, s: 0.9 },
      { p: [0.55, -0.5, 1.4], o: 1, s: 1.4 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Heat sink fins
    geoms: Array.from({ length: 4 }, (_, i) => T(new THREE.BoxGeometry(0.04, 0.32, 0.3), -0.62 + i * 0.09, 0.05, -0.2)),
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, -0.1], o: 1, s: 1 },
      { p: [-1.3, 0.5, -0.7], o: 1, s: 1 }, { p: [-2.0, 0.9, -1.2], o: 0.3, s: 0.9 },
      { p: [-0.9, -0.7, 1.1], o: 0.8, s: 1.2 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Main PCB with chips — "the brain" (blog checkpoint)
    geoms: [
      T(new THREE.BoxGeometry(0.85, 0.62, 0.04), -0.1, 0, -0.34),
      T(new THREE.BoxGeometry(0.2, 0.2, 0.05), -0.3, 0.12, -0.37),
      T(new THREE.BoxGeometry(0.14, 0.14, 0.05), 0.08, -0.14, -0.37),
      T(new THREE.BoxGeometry(0.1, 0.16, 0.05), 0.22, 0.14, -0.37)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, -0.2], o: 1, s: 1 },
      { p: [0.4, -1.2, -1.1], o: 1, s: 1 }, { p: [1.1, -1.7, -1.6], o: 0.3, s: 0.9 },
      { p: [0.1, -0.05, 1.9], o: 1, s: 1.6 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Shutter unit
    geoms: [
      T(new THREE.BoxGeometry(0.52, 0.44, 0.07), -0.25, 0.05, -0.12),
      T(new THREE.PlaneGeometry(0.36, 0.28), -0.25, 0.05, -0.16)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0, -0.05], o: 1, s: 1 },
      { p: [1.5, 0.2, -0.3], o: 1, s: 1 }, { p: [2.2, 0.5, -0.9], o: 0.3, s: 0.9 },
      { p: [2.2, 0.5, -0.9], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Battery + compartment
    geoms: [
      T(new THREE.BoxGeometry(0.3, 0.55, 0.3), 1.0, -0.35, 0.05),
      T(new THREE.BoxGeometry(0.38, 0.1, 0.38), 1.0, -0.72, 0.05)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, -0.25, 0], o: 1, s: 1 },
      { p: [0.3, -1.5, 0.4], o: 1, s: 1 }, { p: [0.8, -2.0, -0.3], o: 0.3, s: 0.9 },
      { p: [0.8, -2.0, -0.3], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // IO port strip
    geoms: [
      T(new THREE.BoxGeometry(0.08, 0.7, 0.3), -1.1, 0, 0),
      T(new THREE.PlaneGeometry(0.14, 0.1), -1.145, 0.18, 0),
      T(new THREE.PlaneGeometry(0.14, 0.1), -1.145, -0.02, 0)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [-0.15, 0, 0], o: 1, s: 1 },
      { p: [-1.7, -0.5, 0.3], o: 1, s: 1 }, { p: [-2.4, -0.9, -0.4], o: 0.3, s: 0.9 },
      { p: [-2.4, -0.9, -0.4], o: 0.3, s: 0.9 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  },
  { // Microphone — the voice (plugin checkpoint)
    geoms: [
      (() => { const g = new THREE.CapsuleGeometry(0.16, 0.5, 4, 12); g.translate(0, 0, 0); g.rotateZ(Math.PI / 2); g.translate(0.45, 1.02, 0.1); return g; })(),
      T(cyl(0.025, 0.025, 0.4, 6), 0.45, 0.78, 0.1)
    ],
    keys: [
      { p: [0, 0, 0], o: 1, s: 1 }, { p: [0, 0.4, 0.2], o: 1, s: 1 },
      { p: [1.0, 1.9, 0.7], o: 1, s: 1 }, { p: [-0.5, -0.95, 1.7], o: 1, s: 2.1 },
      { p: [1.6, 1.6, -0.7], o: 0.3, s: 1 }, { p: [0, 0, 0], o: 1, s: 1 }
    ]
  }
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CameraRig = forwardRef<CameraRigHandle>((_, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      progressRef.current = Math.min(Math.max(p, 0), 1);
    }
  }), []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 60);
    cam.position.set(0, -0.5, 12.5);

    const rig = new THREE.Group();
    scene.add(rig);

    const parts = buildParts().map(def => {
      const group = new THREE.Group();
      // Cyan tinted lines to match reference image, lower base opacity
      const mat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.3 });
      def.geoms.forEach(geom => {
        group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geom, def.edgeAngle ?? 4), mat));
      });
      rig.add(group);
      return { group, mat, keys: def.keys };
    });

    let smooth = 0;
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();

    // Follow the site theme: cyan lines on the dark sheet, deep blue ink on paper
    let lastLight: boolean | null = null;

    const render = () => {
      raf = requestAnimationFrame(render);
      const t = clock.getElapsedTime();
      smooth += (progressRef.current - smooth) * 0.07;

      const isLightTheme = document.documentElement.classList.contains('light');
      if (isLightTheme !== lastLight) {
        lastLight = isLightTheme;
        parts.forEach(p => p.mat.color.set(isLightTheme ? 0x0a2a66 : 0x00e5ff));
      }

      const seg = Math.min(Math.floor(smooth * 5), 4);
      const st = smooth * 5 - seg;

      // Hero: bright and large. Sections: recede to a subtle backdrop.
      // Finale: lift slightly as the camera reassembles behind the film.
      const heroFade = smooth < 0.05 ? 1 : Math.max(0, 1 - (smooth - 0.05) / 0.15);
      const endLift = smooth > 0.9 ? ((smooth - 0.9) / 0.1) * 0.08 : 0;
      // Minimal opacity so it doesn't clash with text
      const baseOpacity = 0.35 * heroFade + 0.08 * (1 - heroFade) + endLift;

      // Expand the explosion dynamically at the Services checkpoint (smooth ≈ 2)
      // This pushes all pieces much further outward from the center
      const explosionFactor = 1.0 + Math.max(0, 1 - Math.abs(smooth - 2.0)) * 1.2;

      parts.forEach(part => {
        const a = part.keys[seg];
        const b = part.keys[seg + 1];
        
        const pX = lerp(a.p[0], b.p[0], st);
        const pY = lerp(a.p[1], b.p[1], st);
        const pZ = lerp(a.p[2], b.p[2], st);
        
        part.group.position.set(pX * explosionFactor, pY * explosionFactor, pZ * explosionFactor);
        part.group.scale.setScalar(lerp(a.s, b.s, st));
        part.mat.opacity = baseOpacity * lerp(a.o, b.o, st);
      });

      // Shrink and move to the right empty space when the final Youtube section is reached
      const endProgress = smooth > 0.8 ? (smooth - 0.8) / 0.2 : 0;
      const endShiftX = endProgress * 5.0;
      const endShiftY = endProgress * -1.5;
      const endScaleShift = endProgress * -0.75;
      
      rig.scale.setScalar(1.35 * heroFade + 1.25 * (1 - heroFade) + endScaleShift);
      rig.position.x = endShiftX;
      rig.position.y = 0.6 * heroFade - 0.2 * (1 - heroFade) + endShiftY;
      
      // Scrub-driven turn + idle drift + mouse interaction
      const targetRotY = 0.55 + smooth * Math.PI * 1.25 + Math.sin(t * 0.25) * 0.07 + mouseX * 0.5;
      const targetRotX = 0.1 + Math.sin(smooth * Math.PI) * 0.08 + Math.sin(t * 0.18) * 0.03 - mouseY * 0.5;
      
      rig.rotation.y += (targetRotY - rig.rotation.y) * 0.1;
      rig.rotation.x += (targetRotX - rig.rotation.x) * 0.1;

      renderer.render(scene, cam);
    };
    raf = requestAnimationFrame(render);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      renderer.dispose();
      scene.traverse(obj => {
        if (obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
});

CameraRig.displayName = 'CameraRig';
export default CameraRig;
