import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { ArrowDownRight, Film, Laptop, MapPin, Megaphone, PenTool } from 'lucide-react';
import { galleryAssets } from './darshanGalleryMedia';

const disciplines = [
  { label: 'Marketing', icon: Megaphone, accent: [255, 223, 92] as const },
  { label: 'Video', icon: Film, accent: [255, 200, 74] as const },
  { label: 'Design', icon: PenTool, accent: [248, 232, 160] as const },
  { label: 'Web & apps', icon: Laptop, accent: [255, 214, 102] as const },
];

export function LinkedInLink({ href, className = '', children = 'LinkedIn' }: {
  href: string;
  className?: string;
  children?: string;
}) {
  return (
    <a className={`darshan-linkedin ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      <img src={`${galleryAssets}/logos/linkedin.png`} width={18} height={18} alt="" />
      {children}
    </a>
  );
}

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  kind: 'dot' | 'cross' | 'diamond';
  alpha: number;
};

type PulseRing = {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
};

export default function DarshanHero({ linkedin }: { linkedin: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const pulsesRef = useRef<PulseRing[]>([]);
  const accentRef = useRef<readonly [number, number, number]>(disciplines[0].accent);
  const [activeDiscipline, setActiveDiscipline] = useState<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: NodePoint[] = [];
    let raf = 0;
    let isVisible = true;

    const initNodes = () => {
      const count = width < 768 ? 28 : 56;
      const kinds: NodePoint['kind'][] = ['dot', 'dot', 'dot', 'cross', 'diamond'];
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.34,
        size: 1.4 + Math.random() * 2.2,
        kind: kinds[i % kinds.length],
        alpha: 0.22 + Math.random() * 0.45,
      }));
    };

    const resize = () => {
      width = hero.clientWidth;
      height = hero.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) initNodes();
      else {
        nodes.forEach((n) => {
          n.x = Math.min(width, Math.max(0, n.x));
          n.y = Math.min(height, Math.max(0, n.y));
        });
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    io.observe(hero);

    const drawFrame = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        const [r, g, b] = accentRef.current;
        const ptr = pointerRef.current;
        const linkDist = width < 768 ? 115 : 155;
        const mouseDist = 210;

        // Soft cursor aura glow on canvas
        if (ptr.active) {
          const grad = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, 260);
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.12)`);
          grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.04)`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        }

        // Update & draw expanding click/interaction ripple rings
        for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
          const ring = pulsesRef.current[i];
          ring.r += 4.2;
          ring.alpha *= 0.962;
          if (ring.alpha < 0.015 || ring.r > ring.maxR) {
            pulsesRef.current.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ring.alpha.toFixed(3)})`;
          ctx.lineWidth = 1.25;
          ctx.stroke();

          // Gently nudge nearby nodes along ripple edge
          for (const n of nodes) {
            const dx = n.x - ring.x;
            const dy = n.y - ring.y;
            const dist = Math.hypot(dx, dy);
            if (Math.abs(dist - ring.r) < 18 && dist > 1) {
              n.vx += (dx / dist) * 0.08;
              n.vy += (dy / dist) * 0.08;
            }
          }
        }

        // Update node positions
        if (!reducedMotion) {
          for (const n of nodes) {
            if (ptr.active) {
              const dx = ptr.x - n.x;
              const dy = ptr.y - n.y;
              const dist = Math.hypot(dx, dy);
              if (dist < mouseDist && dist > 28) {
                const pull = (1 - dist / mouseDist) * 0.014;
                n.vx += (dx / dist) * pull;
                n.vy += (dy / dist) * pull;
              }
            }

            // Gentle velocity damping to preserve calm drift
            n.vx *= 0.992;
            n.vy *= 0.992;
            const speed = Math.hypot(n.vx, n.vy);
            if (speed < 0.14) {
              n.vx += (Math.random() - 0.5) * 0.02;
              n.vy += (Math.random() - 0.5) * 0.02;
            } else if (speed > 1.5) {
              n.vx = (n.vx / speed) * 1.5;
              n.vy = (n.vy / speed) * 1.5;
            }

            n.x += n.vx;
            n.y += n.vy;

            if (n.x < -12) n.x = width + 12;
            if (n.x > width + 12) n.x = -12;
            if (n.y < -12) n.y = height + 12;
            if (n.y > height + 12) n.y = -12;
          }
        }

        // Draw connecting constellation lines between nearby nodes
        ctx.lineWidth = 0.85;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const c = nodes[j];
            const dist = Math.hypot(a.x - c.x, a.y - c.y);
            if (dist < linkDist) {
              const alpha = (1 - dist / linkDist) * 0.14;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(c.x, c.y);
              ctx.stroke();
            }
          }

          // Connect active pointer to nearby nodes
          if (ptr.active) {
            const pDist = Math.hypot(a.x - ptr.x, a.y - ptr.y);
            if (pDist < mouseDist) {
              const alpha = (1 - pDist / mouseDist) * 0.34;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(ptr.x, ptr.y);
              ctx.stroke();
            }
          }
        }

        // Draw creative nodes (dots, registration crosshairs, keyframe diamonds)
        for (const n of nodes) {
          const boost = ptr.active ? Math.max(0, 1 - Math.hypot(n.x - ptr.x, n.y - ptr.y) / mouseDist) * 0.45 : 0;
          const alpha = Math.min(0.95, n.alpha + boost);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;

          if (n.kind === 'dot') {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (n.kind === 'cross') {
            const s = n.size + 2.5;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x - s, n.y);
            ctx.lineTo(n.x + s, n.y);
            ctx.moveTo(n.x, n.y - s);
            ctx.lineTo(n.x, n.y + s);
            ctx.stroke();
          } else {
            const s = n.size + 1.8;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y - s);
            ctx.lineTo(n.x + s, n.y);
            ctx.lineTo(n.x, n.y + s);
            ctx.lineTo(n.x - s, n.y);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  function spawnPulse(x: number, y: number, maxR = 260) {
    pulsesRef.current.push({ x, y, r: 10, maxR, alpha: 0.48 });
    if (pulsesRef.current.length > 5) pulsesRef.current.shift();
  }

  function handleHeroPointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerRef.current = { x, y, active: true };

    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;
    heroRef.current.style.setProperty('--bg-shift-x', `${(nx * -22).toFixed(2)}px`);
    heroRef.current.style.setProperty('--bg-shift-y', `${(ny * -16).toFixed(2)}px`);

    if (portraitWrapRef.current) {
      portraitWrapRef.current.style.setProperty('--hx', `${(nx * 16).toFixed(2)}px`);
      portraitWrapRef.current.style.setProperty('--hy', `${(ny * 14).toFixed(2)}px`);
      portraitWrapRef.current.style.setProperty('--rx', `${(-ny * 8).toFixed(2)}deg`);
      portraitWrapRef.current.style.setProperty('--ry', `${(nx * 9).toFixed(2)}deg`);
    }
  }

  function handleHeroPointerLeave() {
    pointerRef.current.active = false;
    if (heroRef.current) {
      heroRef.current.style.setProperty('--bg-shift-x', '0px');
      heroRef.current.style.setProperty('--bg-shift-y', '0px');
    }
    if (portraitWrapRef.current) {
      portraitWrapRef.current.style.setProperty('--hx', '0px');
      portraitWrapRef.current.style.setProperty('--hy', '0px');
      portraitWrapRef.current.style.setProperty('--rx', '0deg');
      portraitWrapRef.current.style.setProperty('--ry', '0deg');
    }
  }

  function handleHeroClick(event: MouseEvent<HTMLElement>) {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    spawnPulse(event.clientX - rect.left, event.clientY - rect.top, 300);
  }

  function handleDisciplineActivate(idx: number, event: MouseEvent<HTMLButtonElement>) {
    setActiveDiscipline(idx);
    accentRef.current = disciplines[idx].accent;
    if (heroRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect();
      const btnRect = event.currentTarget.getBoundingClientRect();
      spawnPulse(
        btnRect.left - heroRect.left + btnRect.width / 2,
        btnRect.top - heroRect.top + btnRect.height / 2,
        360
      );
    }
  }

  return (
    <header
      className="darshan-hero"
      ref={heroRef}
      aria-labelledby="darshan-name"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handleHeroPointerLeave}
      onClick={handleHeroClick}
    >
      {/* Interactive full-bleed background canvas & cinema framing layers */}
      <canvas ref={canvasRef} className="darshan-hero-canvas" aria-hidden="true" />
      <div className="darshan-hero-ambient" aria-hidden="true" />
      <div className="darshan-hero-orbs" aria-hidden="true">
        <span className="darshan-hero-orb darshan-hero-orb--1" />
        <span className="darshan-hero-orb darshan-hero-orb--2" />
      </div>
      <div className="darshan-hero-frame-marks" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="darshan-container darshan-hero-body">
        <div className="darshan-hero-copy">
          <h1 id="darshan-name">Darshan <span>S</span></h1>
          <p className="darshan-hero-role">From concept ideation and video production to full-scale marketing</p>
          <p className="darshan-hero-intro">I’m your go-to creative partner for the full cycle: ideation, creation, execution, and brand positioning</p>
          <ul className="darshan-hero-disciplines" aria-label="Disciplines">
            {disciplines.map(({ label, icon: Icon }, idx) => (
              <li key={label}>
                <button
                  type="button"
                  className="darshan-discipline-btn"
                  aria-pressed={activeDiscipline === idx}
                  onMouseEnter={(e) => handleDisciplineActivate(idx, e)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDisciplineActivate(idx, e);
                  }}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="darshan-actions">
            <a className="darshan-primary" href="#darshan-work">Explore my work <ArrowDownRight size={17} aria-hidden="true" /></a>
            <LinkedInLink href={linkedin} className="darshan-text-link" />
          </div>
        </div>

        <div className="darshan-hero-visual" ref={portraitWrapRef}>
          <div className="darshan-portrait-backdrop" aria-hidden="true" />
          <figure className="darshan-hero-portrait">
            <div className="darshan-portrait-image-wrap">
              <img src={`${galleryAssets}/portrait-hd.jpg`} width={1024} height={1024} alt="Portrait of Darshan S" />
              <div className="darshan-portrait-corners" aria-hidden="true">
                <span /><span /><span /><span />
              </div>
            </div>
            <figcaption className="darshan-location">
              <MapPin size={15} aria-hidden="true" /> Coimbatore, Tamil Nadu
            </figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}
