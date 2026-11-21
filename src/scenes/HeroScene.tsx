import { forwardRef, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { AlertTriangle, ChevronDown, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWaitlist } from '../context/WaitlistContext';

const HOME_PRODUCTS = [
  {
    label: 'Voice Generator',
    href: '/plugins/voice-generator',
    description: 'AI text-to-speech for Premiere Pro',
  },
  {
    label: 'Universal Paste',
    href: '/plugins/universal-paste',
    description: 'Turn clipboard content into timeline assets',
  },
  {
    label: 'Voice Studio',
    href: '/plugins/voice-studio',
    description: 'Offline voice cloning, STS & stem separation',
    comingSoon: true,
  },
];

// Rotating hero word: each new word sketches itself in while the
// previous ones stay behind as faint pencil ghosts (onion-skin style).
const ROTATE_WORDS = ['become experiences', 'come to life', 'meet technology'];
const GHOST_LIMIT = 3;

const SketchRotator = () => {
  const [idx, setIdx] = useState(0);
  const [ghosts, setGhosts] = useState<number[]>([]);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(prev => {
        setGhosts(g => [...g, prev].slice(-GHOST_LIMIT));
        return (prev + 1) % ROTATE_WORDS.length;
      });
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-grid place-items-center">
      {/* Invisible sizer reserves the widest word so the line never jumps */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">become experiences</span>
      {ghosts.map((wi, i) => (
        <span
          key={`${wi}-${i}`}
          aria-hidden="true"
          className="sketch-word-ghost col-start-1 row-start-1 whitespace-nowrap"
          style={{
            transform: `translate(${(ghosts.length - i) * 7}px, ${(ghosts.length - i) * -6}px) rotate(${(i % 2 ? -1 : 1) * 1.3}deg)`,
            opacity: 0.34 - (ghosts.length - i) * 0.09
          }}
        >
          {ROTATE_WORDS[wi]}
        </span>
      ))}
      <span key={idx} className="sketch-word-active col-start-1 row-start-1 whitespace-nowrap">
        {ROTATE_WORDS[idx]}
      </span>
    </span>
  );
};

// The instrument itself: the wireframe camera, assembled. Scrolling
// begins the teardown — the finished film waits at the far end.

const HeroScene = forwardRef<HTMLElement>((_, ref) => {
  const { openModal, hasJoined } = useWaitlist();
  const [showSubscribedWarning, setShowSubscribedWarning] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!productsOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (productsMenuRef.current && !productsMenuRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [productsOpen]);

  const handleSubscribeClick = () => {
    if (hasJoined) {
      setShowSubscribedWarning(true);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      warningTimerRef.current = setTimeout(() => {
        setShowSubscribedWarning(false);
      }, 4500);
      return;
    }
    openModal('Hero');
  };

  return (
    <section ref={ref} className="bp-scene relative w-full min-h-screen overflow-hidden flex flex-col justify-center" data-scene="hero">

      {/* Content is pushed to the bottom on desktop to avoid overlapping the camera */}
      <div data-anim="hero-copy" className="relative lg:absolute lg:bottom-[15vh] lg:left-0 w-full px-6 text-center z-10 flex flex-col items-center mt-12 lg:mt-0">
        <h1 className="hero-outline text-[7.4vw] sm:text-4xl md:text-7xl lg:text-8xl font-bold tracking-wide leading-[0.95] md:leading-[0.85]">
          Where stories
          <span className="block"><SketchRotator /></span>
        </h1>
        <p className="mt-8 text-base md:text-lg font-light tracking-wider text-[var(--bp-accent)]/80 max-w-4xl mx-auto leading-relaxed">
          A creative lab at the intersection of creativity and technology.<br className="hidden md:block" /> From films to software, we turn ideas into real experiences.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div ref={productsMenuRef} className="relative w-full sm:w-auto z-30">
            <button
              type="button"
              onClick={() => setProductsOpen((prev) => !prev)}
              aria-expanded={productsOpen}
              aria-haspopup="menu"
              className={`px-6 py-3 sm:px-10 sm:py-4 text-xs sm:text-sm font-medium tracking-widest uppercase border border-[var(--bp-accent)] text-[var(--bp-accent)] transition-colors duration-300 w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2.5 ${
                productsOpen ? 'bg-[var(--bp-accent)]/15' : 'hover:bg-[var(--bp-accent)]/10'
              }`}
            >
              <span>Explore products</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 top-full -mt-px lg:top-auto lg:bottom-full lg:mt-0 lg:-mb-px min-w-full sm:w-80 border border-[var(--bp-accent)] bg-[var(--bp-bg)]/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.45)] text-left divide-y divide-[var(--bp-accent)]/20 z-40"
                >
                  {HOME_PRODUCTS.map((product) => (
                    <Link
                      key={product.href}
                      role="menuitem"
                      to={product.href}
                      onClick={() => setProductsOpen(false)}
                      className="group flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-[var(--bp-accent)]/10 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[var(--bp-ink-strong)] group-hover:text-[var(--bp-accent)] transition-colors">
                            {product.label}
                          </span>
                          {product.comingSoon && (
                            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 border border-emerald-400/40 bg-emerald-500/15 text-emerald-400 shrink-0">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-light tracking-wide text-[var(--bp-muted2)] mt-1 leading-snug">
                          {product.description}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-[var(--bp-accent)]/60 group-hover:text-[var(--bp-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5"
                      />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={handleSubscribeClick}
            className={`px-6 py-3 sm:px-10 sm:py-4 text-xs sm:text-sm font-medium tracking-widest uppercase border transition-colors duration-300 w-full sm:w-auto cursor-pointer ${
              hasJoined
                ? 'border-[var(--bp-accent)]/50 text-[var(--bp-accent)] hover:bg-[var(--bp-accent)]/10'
                : 'border-[var(--bp-accent)] text-[var(--bp-accent)] hover:bg-[var(--bp-accent)]/10'
            }`}
          >
            {hasJoined ? 'Subscribed to newsletter' : 'Subscribe to newsletter'}
          </button>
        </div>

        {showSubscribedWarning && (
          <div
            role="alert"
            className="mt-5 px-5 py-3 bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 rounded-lg shadow-[0_4px_24px_rgba(245,158,11,0.2)] animate-fade-in transition-all"
          >
            <AlertTriangle size={18} className="text-amber-400 shrink-0" />
            <span>You are already subscribed to the newsletter.</span>
          </div>
        )}
      </div>

      <div data-anim="hero-cue" className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 flex-col items-center gap-2" aria-hidden="true">
        <span className="w-px h-12 bg-[var(--bp-ink)]/30" />
      </div>
    </section>
  );
});

HeroScene.displayName = 'HeroScene';
export default HeroScene;

// Choreography: the copy and drafting marks step aside — the camera
// (owned by CameraRig) begins its teardown as this scene yields.
export const heroTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  const tl = gsap.timeline();

  tl.to(q('[data-anim="hero-cue"]'), { autoAlpha: 0, duration: 0.08 }, 0)
    .to(q('[data-anim="hero-copy"]'), { autoAlpha: 0, y: -40, duration: 0.25 }, 0.05)
    .to(root, { autoAlpha: 0, duration: 0.12 }, 0.85);

  return tl;
};
