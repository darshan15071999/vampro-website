import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useWaitlist } from '../context/WaitlistContext';

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

  return (
    <section ref={ref} className="bp-scene relative w-full h-screen overflow-hidden flex flex-col justify-center" data-scene="hero">

      {/* Content is pushed to the bottom on desktop to avoid overlapping the camera */}
      <div data-anim="hero-copy" className="relative lg:absolute lg:bottom-[15vh] lg:left-0 w-full px-6 text-center z-10 flex flex-col items-center mt-12 lg:mt-0">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide leading-[0.85]"
          style={{ WebkitTextStroke: '2px #00e5ff', color: 'transparent' }}
        >
          Where stories
          <span className="block"><SketchRotator /></span>
        </h1>
        <p className="mt-8 text-base md:text-lg font-light tracking-wider text-[#00e5ff]/80 max-w-4xl mx-auto leading-relaxed">
          A creative lab at the intersection of creativity and technology.<br className="hidden md:block" /> From films to software, we turn ideas into real experiences.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
          <Link to="/plugins/voice-generator" className="px-10 py-4 text-sm font-medium tracking-widest uppercase border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-colors duration-300 w-full sm:w-auto">Explore products</Link>
          <button onClick={() => openModal('Hero')} className={`px-10 py-4 text-sm font-medium tracking-widest uppercase border transition-colors duration-300 w-full sm:w-auto ${hasJoined ? 'border-[#00e5ff]/30 text-[#00e5ff]/50 cursor-default' : 'border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10'}`}>
            {hasJoined ? 'Subscribed to newsletter' : 'Subscribe to newsletter'}
          </button>
        </div>
      </div>

      <div data-anim="hero-cue" className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 flex-col items-center gap-2" aria-hidden="true">
        <span className="w-px h-12 bg-white/30" />
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
