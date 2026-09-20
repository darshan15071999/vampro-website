import * as THREE from 'three';
import { stations, stationProgress } from './journeyData';

export type JourneyScene = ReturnType<typeof createForestScene>;
const smooth = (n: number) => { const t = THREE.MathUtils.clamp(n, 0, 1); return t * t * (3 - 2 * t); };

/** The camera follows a physical route. Nothing intercepts the browser's scroll. */
export function createForestScene(host: HTMLElement, onFrame: (progress: number) => void, onFailure: () => void) {
  const mobile = host.clientWidth < 700;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#243e35');
  scene.fog = new THREE.FogExp2('#243e35', .013);
  const camera = new THREE.PerspectiveCamera(52, 1, .12, 220);
  const renderer = new THREE.WebGLRenderer({ antialias: !mobile, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const panelLayer = document.createElement('div');
  panelLayer.className = 'fpv-spatial-panels';
  panelLayer.style.overflow = 'clip';
  host.appendChild(panelLayer);
  const cssScene = new THREE.Scene();
  const textures: THREE.Texture[] = [];
  let disposed = false;
  let dirty = true;
  let seed = 570;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const mat = (color: string, roughness = .7, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const steel = mat('#182925', .3, .65), timber = mat('#665342'), charcoal = mat('#18201e'), floor = mat('#24392e', .24, .28);
  const lightMaterial = new THREE.MeshBasicMaterial({ color: '#bdffde' });
  const warmMaterial = new THREE.MeshBasicMaterial({ color: '#e5c08a' });
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  function box(x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material) {
    const mesh = new THREE.Mesh(boxGeometry, material); mesh.position.set(x, y, z); mesh.scale.set(w, h, d); scene.add(mesh); return mesh;
  }
  scene.add(new THREE.HemisphereLight('#d2f5e5', '#132919', 2.1));
  const sun = new THREE.DirectionalLight('#e2ffdb', 2.6); sun.position.set(-25, 60, 30); scene.add(sun);
  const roomLight = new THREE.PointLight('#bdffdf', 180, 28, 1.8); roomLight.position.set(0, 5, -8); scene.add(roomLight);
  const deskLight = new THREE.PointLight('#ffce91', 55, 14, 1.7); deskLight.position.set(0, 4, -15); scene.add(deskLight);

  // A deterministic botanical texture: individual leaves preserve canopy detail at every altitude.
  const leafCanvas = document.createElement('canvas'); leafCanvas.width = leafCanvas.height = 256;
  const leafCtx = leafCanvas.getContext('2d')!;
  for (let i = 0; i < 470; i++) {
    const a = random() * Math.PI * 2, r = Math.sqrt(random()) * 111;
    const x = 128 + Math.cos(a) * r, y = 128 + Math.sin(a) * r;
    leafCtx.save(); leafCtx.translate(x, y); leafCtx.rotate(random() * 6.28);
    leafCtx.fillStyle = `hsl(${125 + random() * 30}, ${26 + random() * 25}%, ${19 + random() * 27}%)`;
    leafCtx.beginPath(); leafCtx.ellipse(0, 0, 3 + random() * 5, 1.5 + random() * 2.5, 0, 0, Math.PI * 2); leafCtx.fill();
    leafCtx.restore();
  }
  const leafTexture = new THREE.CanvasTexture(leafCanvas); leafTexture.colorSpace = THREE.SRGBColorSpace; textures.push(leafTexture);
  const foliageMaterial = new THREE.MeshLambertMaterial({ map: leafTexture, alphaTest: .4, side: THREE.DoubleSide, color: '#a9c697' });
  const treeCount = mobile ? 230 : 370;
  const barkCanvas = document.createElement('canvas'); barkCanvas.width = 128; barkCanvas.height = 512;
  const barkCtx = barkCanvas.getContext('2d')!; barkCtx.fillStyle = '#464c38'; barkCtx.fillRect(0, 0, 128, 512);
  for (let i = 0; i < 850; i++) { barkCtx.strokeStyle = `rgba(${random() > .5 ? '12,22,11' : '114,122,80'},${.15 + random() * .35})`; barkCtx.lineWidth = .5 + random() * 2; const x = random() * 128, y = random() * 512; barkCtx.beginPath(); barkCtx.moveTo(x, y); barkCtx.lineTo(x + random() * 4, y + 5 + random() * 110); barkCtx.stroke(); }
  const barkTexture = new THREE.CanvasTexture(barkCanvas); barkTexture.colorSpace = THREE.SRGBColorSpace; textures.push(barkTexture);
  const bark = new THREE.MeshStandardMaterial({ map: barkTexture, roughness: .96, color: '#849a75' });
  const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(.22, .48, 1, 7), bark, treeCount);
  const branches = new THREE.InstancedMesh(new THREE.CylinderGeometry(.04, .15, 1, 5), bark, treeCount * 5);
  const foliage = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), foliageMaterial, treeCount * 16);
  const transform = new THREE.Object3D();
  for (let i = 0; i < treeCount; i++) {
    let x: number, z: number;
    do { x = (random() - .5) * 126; z = random() * 143 - 48; }
    while ((Math.abs(x) < 16 && z > -27 && z < 9) || (Math.abs(x) < 5.5 && z >= 9 && z < 49));
    const h = 12 + random() * 13;
    transform.position.set(x, h / 2 - .3, z); transform.rotation.set(0, random() * 6, (random() - .5) * .1); transform.scale.set(1, h, 1); transform.updateMatrix(); trunks.setMatrixAt(i, transform.matrix);
    for (let j = 0; j < 5; j++) {
      const angle = random() * Math.PI * 2;
      transform.position.set(x + Math.cos(angle) * 1.1, h * (.56 + j * .075), z + Math.sin(angle) * 1.1);
      transform.rotation.set(Math.cos(angle) * .7, 0, Math.sin(angle) * .7); transform.scale.set(1, 4.8, 1); transform.updateMatrix(); branches.setMatrixAt(i * 5 + j, transform.matrix);
    }
    for (let j = 0; j < 16; j++) {
      const a = random() * Math.PI * 2, r = random() * 3.5;
      transform.position.set(x + Math.cos(a) * r, h - 1 + random() * 5 - (r * .4), z + Math.sin(a) * r);
      transform.rotation.set(j % 3 === 0 ? -Math.PI / 2 : random() * 2, random() * 6.28, random());
      const s = 5 + random() * 4; transform.scale.set(s, s, s); transform.updateMatrix(); foliage.setMatrixAt(i * 16 + j, transform.matrix);
    }
  }
  scene.add(trunks, branches, foliage);
  box(0, -.7, 25, 170, 1, 180, mat('#213423'));
  // Moss and understory frame the clear flight corridor.
  const rocks = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), mat('#3c503b'), 200);
  const undergrowth = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), foliageMaterial, 700);
  for (let i = 0; i < 700; i++) {
    let x: number, z: number;
    do { x = (random() > .5 ? 1 : -1) * (5 + random() * 42); z = random() * 100 - 25; }
    while (Math.abs(x) < 14 && z < 3);
    transform.position.set(x, .4 + random(), z); transform.rotation.set(0, random() * 6, .3); transform.scale.setScalar(2 + random() * 3); transform.updateMatrix(); undergrowth.setMatrixAt(i, transform.matrix);
    if (i < 200) { transform.position.y = -.1; transform.scale.set(1 + random() * 2, .4 + random(), 1 + random() * 2); transform.updateMatrix(); rocks.setMatrixAt(i, transform.matrix); }
  }
  scene.add(rocks, undergrowth);
  for (let i = 0; i < 17; i++) {
    box(0, -.08, 3 + i * 2.25, 4.6, .16, 1.8, floor);
    if (i < 10) for (const x of [-3, 3]) { box(x, .35, 3 + i * 2.8, .13, .7, .13, steel); box(x, .74, 3 + i * 2.8, .19, .08, .19, lightMaterial); }
  }

  // Glass-fronted recording room with an open central entrance and acoustic walls.
  box(0, 0, -9, 23, .5, 20, steel); box(0, .29, -9, 21.5, .08, 18.5, floor);
  for (let i = 0; i < 34; i++) box(-10.4 + i * .63, .335, -9, .018, .01, 18.5, steel);
  box(0, .35, -14.1, 10, .015, 5.8, mat('#182e25'));
  box(0, 7.1, -9, 23, .4, 20, charcoal); box(0, 7.34, -9, 22.6, .08, 19.5, mat('#294135'));
  box(0, 7.04, .94, 23, .08, .12, lightMaterial);
  box(-11.4, 7.04, -9, .1, .08, 20, lightMaterial); box(11.4, 7.04, -9, .1, .08, 20, lightMaterial);
  box(0, 3.7, -18.6, 22, 7, .4, charcoal);
  box(-11, 3.7, -9, .35, 7, 19, charcoal); box(11, 3.7, -9, .35, 7, 19, charcoal);
  for (let i = 0; i < 55; i++) box(-10.7 + i * .397, 3.7, -18.28, .12, 6.7, .17, timber);
  const glass = new THREE.MeshPhysicalMaterial({ color: '#9fcfb8', transparent: true, opacity: .14, roughness: .08, metalness: .25, side: THREE.DoubleSide, depthWrite: false });
  for (const x of [-7.5, 7.5]) box(x, 3.6, .12, 6.6, 6.8, .04, glass);
  for (const x of [-11, -4, 4, 11]) box(x, 3.6, .15, .14, 7, .2, steel);
  // Doors part as the camera approaches; all motion is reversible with scroll.
  const doors = [-1, 1].map(sign => box(sign * 2, 3.6, .15, 3.95, 6.8, .06, glass));
  for (const x of [-10.5, 10.5]) { box(x, .65, -9, .1, .07, 18, lightMaterial); box(x, 6.55, -9, .1, .06, 18, warmMaterial); }
  for (const z of [-3, -8, -13]) { box(0, 6.85, z, 14, .06, .13, warmMaterial); box(0, 6.8, z + .25, 14, .15, .2, steel); }
  for (let i = 0; i < 6; i++) for (const side of [-1, 1]) box(side * 10.72, 3.7, -2 - i * 2.7, .12, 5.5, .14, timber);

  const loader = new THREE.TextureLoader();
  const roomLogo = loader.load('/voice-studio-logo.png', () => { dirty = true; }); roomLogo.colorSpace = THREE.SRGBColorSpace; textures.push(roomLogo);
  const roomLogoMaterial = new THREE.MeshBasicMaterial({ map: roomLogo });
  box(0, 5.4, -18.02, 7, 2.65, .04, roomLogoMaterial);
  const splitCanvases = [document.createElement('canvas'), document.createElement('canvas')];
  splitCanvases.forEach(canvas => { canvas.width = 512; canvas.height = 256; });
  const splitLogoTextures = splitCanvases.map(canvas => { const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture; });
  const splitLogoImage = new Image();
  splitLogoImage.onload = () => {
    splitCanvases.forEach((canvas, i) => {
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(splitLogoImage, i * splitLogoImage.width / 2, 0, splitLogoImage.width / 2, splitLogoImage.height, 0, 0, canvas.width, canvas.height);
      splitLogoTextures[i].needsUpdate = true;
    });
    dirty = true;
  };
  splitLogoImage.src = '/voice-studio-logo-transparent.png';
  textures.push(...splitLogoTextures);
  const splitLogoMaterials = splitLogoTextures.map(texture => new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: .78, side: THREE.DoubleSide, depthWrite: false }));
  const doorLogoGeometry = new THREE.PlaneGeometry(1, 1);
  const doorLogos = [-1, 1].map((sign, i) => {
    const mesh = new THREE.Mesh(doorLogoGeometry, splitLogoMaterials[i]);
    mesh.position.set(sign * .87, 5.6, .24); mesh.scale.set(1.74, 1.35, 1);
    scene.add(mesh); return mesh;
  });
  // Console, monitor speakers, faders, microphone and cabling give the room a working identity.
  box(0, 1.45, -15.8, 8.8, .28, 2.5, timber);
  // The engineer's chair sits behind the camera's station route.
  box(0, 1.03, -13.35, 1.25, .22, 1.05, charcoal);
  const chairBack = box(0, 1.82, -12.85, 1.25, 1.55, .2, charcoal); chairBack.rotation.x = -.12;
  box(0, .58, -13.35, .11, .8, .11, steel);
  for (let i = 0; i < 5; i++) { const leg = box(0, .4, -13.35, .08, .06, 1.45, steel); leg.rotation.y = i * Math.PI / 5; }
  for (const x of [-.75, .75]) { box(x, 1.55, -13.3, .13, .13, .8, charcoal); box(x, 1.3, -13.3, .08, .5, .08, steel); }
  for (const x of [-3.8, 3.8]) box(x, .85, -15.8, .2, 1.3, 1.8, steel);
  box(0, 1.68, -15.3, 5.5, .2, 1.45, charcoal);
  for (let i = 0; i < 24; i++) {
    const x = -2.55 + i * .22;
    box(x, 1.8, -15.2, .015, .025, .75, steel); box(x, 1.84, -15.5 + random() * .6, .1, .07, .13, lightMaterial);
    for (let j = 0; j < 3; j++) box(x, 1.82, -15.68 - j * .13, .075, .06, .07, j === 0 ? warmMaterial : steel);
  }
  for (const x of [-3.4, 3.4]) {
    box(x, 2.32, -16.4, .85, 1.35, .68, charcoal);
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(.27, .3, .06, 32), mat('#405c4e', .3)); cone.rotation.x = Math.PI / 2; cone.position.set(x, 2.2, -16.03); scene.add(cone);
    const tweeter = new THREE.Mesh(new THREE.SphereGeometry(.105, 12, 8), steel); tweeter.position.set(x, 2.7, -16.03); scene.add(tweeter);
  }
  const displayCanvas = document.createElement('canvas'); displayCanvas.width = 1024; displayCanvas.height = 400;
  const dc = displayCanvas.getContext('2d')!; dc.fillStyle = '#091c16'; dc.fillRect(0, 0, 1024, 400);
  dc.fillStyle = '#c4edce'; dc.font = '22px monospace'; dc.fillText('VAMPRO / VOICE STUDIO', 36, 47);
  for (let j = 0; j < 3; j++) { dc.fillStyle = ['#91d8b4', '#588d70', '#c6b58c'][j]; for (let i = 0; i < 130; i++) { const h = 8 + random() * 43; dc.fillRect(35 + i * 7.3, 116 + j * 92 - h / 2, 3, h); } }
  const displayTexture = new THREE.CanvasTexture(displayCanvas); displayTexture.colorSpace = THREE.SRGBColorSpace; textures.push(displayTexture);
  box(0, 2.8, -16.65, 4.1, 1.65, .13, steel); box(0, 2.8, -16.57, 3.95, 1.52, .015, new THREE.MeshBasicMaterial({ map: displayTexture }));
  box(6.5, 1.75, -16, .035, 2.9, .035, steel);
  const mic = new THREE.Mesh(new THREE.CapsuleGeometry(.13, .4, 4, 12), mat('#718478', .35, .7)); mic.position.set(6.5, 3.2, -16); scene.add(mic);
  const pop = new THREE.Mesh(new THREE.CircleGeometry(.28, 24), mat('#101e18')); pop.position.set(6.5, 3.15, -15.65); scene.add(pop);

  // Real HTML is placed on six physical screens, keeping text sharp and controls accessible.
  const panels = stations.map((_, i) => {
    const side = i < 3 ? -1 : 1, z = i < 3 ? -3.5 - i * 5.2 : -13.9 + (i - 3) * 5.2;
    const frameMesh = box(side * 10.65, 3.6, z, .2, 3.7, 5.55, steel);
    const screenMesh = box(side * 10.52, 3.6, z, .03, 3.47, 5.28, mat('#0a2a20'));
    box(side * 10.4, 1.68, z, .035, .045, 5.5, lightMaterial);
    const element = document.createElement('div'); element.className = 'fpv-world-panel';
    element.style.width = '560px'; element.style.height = '360px';
    element.style.position = 'absolute'; element.style.transformOrigin = '0 0'; panelLayer.appendChild(element);
    const object = new THREE.Object3D(); object.position.set(side * 10.38, 3.6, z); object.rotation.y = side < 0 ? Math.PI / 2 : -Math.PI / 2; object.scale.setScalar(.0095); cssScene.add(object);
    return { element, object, side, z, frameMesh, screenMesh };
  });

  const rainCount = mobile ? 700 : 1600;
  const rainPositions = new Float32Array(rainCount * 6);
  const rainSeeds = Array.from({ length: rainCount }, () => [random() * 110 - 55, random() * 65, random() * 130 - 30, .6 + random() * .8]);
  const rainGeometry = new THREE.BufferGeometry(); rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMaterial = new THREE.LineBasicMaterial({ color: '#cbeadf', transparent: true, opacity: .25, depthWrite: false });
  scene.add(new THREE.LineSegments(rainGeometry, rainMaterial));

  type Key = { p: number; pos: THREE.Vector3; rotation: THREE.Quaternion };
  const key = (p: number, pos: number[], look: number[]): Key => {
    const position = new THREE.Vector3(...pos);
    const matrix = new THREE.Matrix4().lookAt(position, new THREE.Vector3(...look), new THREE.Vector3(0, 1, 0));
    return { p, pos: position, rotation: new THREE.Quaternion().setFromRotationMatrix(matrix) };
  };
  const route: Key[] = [
    key(0, [7, 66, 43], [0, 0, 15]), key(.12, [12, 29, 42], [0, 6, 4]),
    key(.24, [-1.5, 6.4, 31], [0, 4, 0]), key(.36, [0, 3.1, 10], [0, 3.4, -13]),
    key(.44, [0, 3.5, -3], [0, 3.6, -17]),
  ];
  panels.forEach((panel, i) => {
    const p = stationProgress(i), distance = mobile ? 9.5 : 5.7;
    const pos = [panel.side * (10.38 - distance), 3.6, panel.z];
    const look = [panel.side * 10.38, 3.6, panel.z];
    route.push(key(p - .018, pos, look), key(p + .035, pos, look));
  });
  route.push(key(1, [0, 3.5, -6], [0, 3.6, -17]));
  let target = 0, progress = 0, rainEnabled = true, reduced = false, active = true, frame = 0, previous = 0, elapsed = 0;
  let lastRendered = -1;
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight, narrow = w < 700;
    dirty = true;
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    const distance = Math.max(5.7, 5.32 / (2 * Math.tan(THREE.MathUtils.degToRad(26)) * camera.aspect * .86));
    panels.forEach((panel, i) => {
      panel.element.style.height = narrow ? '600px' : '360px';
      panel.frameMesh.scale.y = narrow ? 5.95 : 3.7; panel.screenMesh.scale.y = narrow ? 5.7 : 3.47;
      route[5 + i * 2].pos.x = route[6 + i * 2].pos.x = panel.side * (10.38 - distance);
    });
  };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const loseContext = (event: Event) => { event.preventDefault(); onFailure(); };
  renderer.domElement.addEventListener('webglcontextlost', loseContext);
  const projection = new THREE.Matrix4(), local = new THREE.Matrix4();
  // Flatten world-to-screen projection into one homography per panel. This retains
  // real perspective without nested 3D DOM contexts interfering with hit testing.
  const projectPanel = (panel: typeof panels[number]) => {
    const width = 560, height = host.clientWidth < 700 ? 600 : 360;
    local.set(1, 0, 0, -width / 2, 0, -1, 0, height / 2, 0, 0, 1, 0, 0, 0, 0, 1);
    projection.copy(camera.projectionMatrix).multiply(camera.matrixWorldInverse).multiply(panel.object.matrixWorld).multiply(local);
    const e = projection.elements, hw = host.clientWidth / 2, hh = host.clientHeight / 2;
    const m = [(e[0]+e[3])*hw, (e[3]-e[1])*hh, 0, e[3], (e[4]+e[7])*hw, (e[7]-e[5])*hh, 0, e[7], 0, 0, 1, 0, (e[12]+e[15])*hw, (e[15]-e[13])*hh, 0, e[15]];
    panel.element.style.transform = `matrix3d(${m.join(',')})`;
  };
  function tick(time: number) {
    if (disposed) return;
    frame = requestAnimationFrame(tick);
    const dt = Math.min((time - previous) / 1000 || .016, .05); previous = time;
    if (!active || document.hidden) return;
    elapsed += dt;
    progress = reduced ? target : THREE.MathUtils.lerp(progress, target, 1 - Math.exp(-dt * 9));
    if (!dirty && Math.abs(progress - lastRendered) < .00001 && !(rainEnabled && !reduced && progress < .44)) return;
    dirty = false; lastRendered = progress;
    let a = route[0], b = route[1];
    for (let i = 1; i < route.length; i++) if (progress <= route[i].p) { a = route[i - 1]; b = route[i]; break; }
    const t = smooth((progress - a.p) / (b.p - a.p));
    camera.position.lerpVectors(a.pos, b.pos, t); camera.quaternion.slerpQuaternions(a.rotation, b.rotation, t);
    const inside = smooth((progress - .34) / .1);
    (scene.fog as THREE.FogExp2).density = .013 * (1 - inside) + .0025 * inside;
    const doorOpen = smooth((progress - .3) / .075);
    doors.forEach((door, i) => { door.position.x = (i === 0 ? -1 : 1) * (2 + doorOpen * 3.8); });
    doorLogos.forEach((logoMesh, i) => { logoMesh.position.x = (i === 0 ? -1 : 1) * (.87 + doorOpen * 3.8); });
    rainMaterial.opacity = rainEnabled && !reduced ? .27 * (1 - inside) : 0;
    if (rainMaterial.opacity > 0) {
      rainSeeds.forEach(([x, y, z, speed], i) => {
        const height = (y - elapsed * 22 * speed % 65 + 65) % 65;
        rainPositions.set([x, height, z, x - .12, height - .85 * speed, z], i * 6);
      });
      rainGeometry.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera); cssScene.updateMatrixWorld();
    panels.forEach((panel, i) => {
      const delta = Math.abs(progress - (stationProgress(i) + .008));
      const visible = delta < .049;
      panel.element.style.visibility = visible ? 'visible' : 'hidden';
      panel.element.style.opacity = String(smooth((.049 - delta) / .018));
      panel.element.inert = !visible || delta > .035;
      if (visible) projectPanel(panel);
    });
    onFrame(progress);
  }
  frame = requestAnimationFrame(tick);
  return {
    panels: panels.map(panel => panel.element),
    setProgress(value: number) { target = value; },
    setRain(value: boolean) { rainEnabled = value; dirty = true; },
    setReduced(value: boolean) { reduced = value; dirty = true; },
    setActive(value: boolean) { active = value; dirty = true; },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); renderer.domElement.removeEventListener('webglcontextlost', loseContext);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => { const mesh = object as THREE.Mesh; if (mesh.geometry) geometries.add(mesh.geometry); if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => materials.add(m)); });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
      renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); panelLayer.remove();
    },
  };
}
