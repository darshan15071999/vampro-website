import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowDownRight, Film, Laptop, MapPin, Megaphone, PenTool } from 'lucide-react';
import { galleryAssets } from './darshanGalleryMedia';

const disciplines = [
  {
    label: 'Marketing',
    icon: Megaphone,
    video: 'property-film.mp4',
    poster: 'property-film.webp',
    frameLabel: '01 · CAMPAIGN FILM',
  },
  {
    label: 'Video',
    icon: Film,
    video: 'cross-cut-aerial.mp4',
    poster: 'cross-cut-aerial.webp',
    frameLabel: '02 · AERIAL & CUT',
  },
  {
    label: 'Design',
    icon: PenTool,
    video: 'xfactor-intro-loop.mp4',
    poster: 'xfactor-intro-loop.webp',
    frameLabel: '03 · MOTION & BRAND',
  },
  {
    label: 'Web & apps',
    icon: Laptop,
    video: 'social-media-sample.mp4',
    poster: 'social-media-sample.webp',
    frameLabel: '04 · DIGITAL BUILD',
  },
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

export default function DarshanHero({ linkedin }: { linkedin: string }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeDiscipline, setActiveDiscipline] = useState(1); // Start on Video
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const current = disciplines[activeDiscipline];

  function handleVisualMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !visualRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const nx = px - 0.5;
    const ny = py - 0.5;
    visualRef.current.style.setProperty('--hx', `${(nx * 16).toFixed(2)}px`);
    visualRef.current.style.setProperty('--hy', `${(ny * 14).toFixed(2)}px`);
    visualRef.current.style.setProperty('--rx', `${(-ny * 7).toFixed(2)}deg`);
    visualRef.current.style.setProperty('--ry', `${(nx * 8).toFixed(2)}deg`);
    visualRef.current.style.setProperty('--fx', `${(px * 100).toFixed(1)}%`);
    visualRef.current.style.setProperty('--fy', `${(py * 100).toFixed(1)}%`);
  }

  function handleVisualLeave() {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty('--hx', '0px');
    visualRef.current.style.setProperty('--hy', '0px');
    visualRef.current.style.setProperty('--rx', '0deg');
    visualRef.current.style.setProperty('--ry', '0deg');
    visualRef.current.style.setProperty('--fx', '50%');
    visualRef.current.style.setProperty('--fy', '50%');
  }

  return (
    <header className="darshan-hero" aria-labelledby="darshan-name">
      <div className="darshan-hero-ambient" aria-hidden="true" />
      <div className="darshan-container darshan-hero-body">
        <div className="darshan-hero-copy">
          <h1 id="darshan-name">Darshan <span>S</span></h1>
          <p className="darshan-hero-role">From the first campaign idea to the final cut or a working app</p>
          <p className="darshan-hero-intro">I plan campaigns, direct and edit videos, design for brands, and build websites, apps and custom tools</p>
          <ul className="darshan-hero-disciplines" aria-label="Disciplines">
            {disciplines.map(({ label, icon: Icon }, idx) => (
              <li key={label}>
                <button
                  type="button"
                  className="darshan-discipline-btn"
                  aria-pressed={activeDiscipline === idx}
                  onMouseEnter={() => setActiveDiscipline(idx)}
                  onClick={() => setActiveDiscipline(idx)}
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

        <div
          className="darshan-hero-visual"
          ref={visualRef}
          onPointerMove={handleVisualMove}
          onPointerLeave={handleVisualLeave}
        >
          <div className="darshan-hero-stage">
            <img
              className="darshan-hero-frame-study"
              src={`${galleryAssets}/hero-frame-study.webp`}
              width={880}
              height={720}
              alt=""
            />
            {reducedMotion ? (
              <img
                key={current.poster}
                className="darshan-hero-reel-media"
                src={`${galleryAssets}/${current.poster}`}
                alt=""
              />
            ) : (
              <video
                key={current.video}
                className="darshan-hero-reel-media"
                src={`${galleryAssets}/${current.video}`}
                poster={`${galleryAssets}/${current.poster}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            )}
            <div className="darshan-hero-stage-scrim" aria-hidden="true" />
            <div className="darshan-hero-reticle" aria-hidden="true" />
            <div className="darshan-hero-hud-top" aria-hidden="true">
              <span className="darshan-hero-hud-rec">
                <i />
                <span>{current.frameLabel}</span>
              </span>
              <span className="darshan-hero-hud-specs">24FPS · 4K</span>
            </div>
            <div className="darshan-hero-hud-corners" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            <div className="darshan-hero-stage-pips" role="group" aria-label="Switch hero preview">
              {disciplines.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={`Preview ${item.label}`}
                  aria-pressed={activeDiscipline === idx}
                  onClick={() => setActiveDiscipline(idx)}
                />
              ))}
            </div>
          </div>

          <figure className="darshan-hero-portrait">
            <img src={`${galleryAssets}/portrait.jpg`} width={200} height={200} alt="Portrait of Darshan S" />
            <figcaption className="darshan-location"><MapPin size={14} aria-hidden="true" /> Coimbatore, Tamil Nadu</figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}
