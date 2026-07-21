import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { homeMetadata } from '../seo/metadata';
import CursorGrid from '../components/CursorGrid';

import HeroScene, { heroTimeline } from '../scenes/HeroScene';
import StoryScene, { storyTimeline } from '../scenes/StoryScene';
import ServicesScene, { servicesTimeline } from '../scenes/ServicesScene';
import VoiceScene, { voiceTimeline } from '../scenes/VoiceScene';
import BlogScene, { blogTimeline } from '../scenes/BlogScene';
import YoutubeScene, { youtubeTimeline } from '../scenes/YoutubeScene';
import type { CameraRigHandle } from '../scenes/CameraRig';

// three.js wireframe camera — lazy so it never blocks first paint
const CameraRig = lazy(() => import('../scenes/CameraRig'));

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// SceneController — one pinned stage, one master timeline.
// Scroll position IS the playhead: scrubbed forward, perfectly
// reversible backward. Mobile and reduced-motion get a static,
// fully readable stacked layout instead.
// ─────────────────────────────────────────────────────────────

const CINE_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

const Home = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const voiceRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const youtubeRef = useRef<HTMLElement>(null);
  const rigRef = useRef<CameraRigHandle>(null);

  const [cine, setCine] = useState(() => window.matchMedia(CINE_QUERY).matches);

  // Track the media query live — the initial render can mis-measure (and users
  // can resize or toggle reduced-motion), so the mode must stay in sync.
  useEffect(() => {
    const mq = window.matchMedia(CINE_QUERY);
    const onChange = (e: MediaQueryListEvent) => setCine(e.matches);
    mq.addEventListener('change', onChange);
    setCine(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Listen for navigation events from the Navbar
  useEffect(() => {
    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const targetLabel = detail === 'about' ? 'story' : detail;
      
      if (cine) {
        const stage = stageRef.current;
        const st = ScrollTrigger.getAll().find(t => t.vars.trigger === stage);
        if (st && st.animation && (st.animation as any).labels[targetLabel] !== undefined) {
          const master = st.animation as any;
          const labelTime = master.labels[targetLabel];
          const targetTime = labelTime + 0.55; // Offset to the resting state of the scene
          const progress = targetTime / master.totalDuration();
          const y = st.start + progress * (st.end - st.start);
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        const elId = targetLabel === 'story' ? 'about' : targetLabel;
        const el = document.getElementById(elId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };
    
    window.addEventListener('nav-to-section', handleNav);
    return () => window.removeEventListener('nav-to-section', handleNav);
  }, [cine]);

  useLayoutEffect(() => {
    if (!cine) return;
    const stage = stageRef.current;
    if (!stage) return;

    const ytVideo = stage.querySelector<HTMLVideoElement>('[data-anim="yt-video"]');

    const ctx = gsap.context(() => {
      const master = gsap.timeline();
      master
        .addLabel('hero')
        .add(heroTimeline(heroRef.current!))
        .addLabel('story')
        .add(storyTimeline(storyRef.current!), '-=0.25')
        .addLabel('services')
        .add(servicesTimeline(servicesRef.current!), '-=0.2')
        .addLabel('voice')
        .add(voiceTimeline(voiceRef.current!), '-=0.2')
        .addLabel('blog')
        .add(blogTimeline(blogRef.current!), '-=0.2')
        .addLabel('youtube')
        .add(youtubeTimeline(youtubeRef.current!), '-=0.2');

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: '+=7000',
        pin: true,
        scrub: true,
        animation: master,
        onUpdate: self => {
          // The camera drives the whole journey; the finished film
          // only starts playing once the loop closes.
          const p = self.progress;
          rigRef.current?.setProgress(p);
          if (ytVideo) {
            if (p > 0.86 && ytVideo.paused) ytVideo.play().catch(() => {});
            else if (p <= 0.86 && !ytVideo.paused) ytVideo.pause();
          }
        }
      });
    }, stage);

    // Lenis gives scroll the weight of a camera dolly
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [cine]);

  // Handle static mode camera scrub
  useLayoutEffect(() => {
    if (cine) return;
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: self => {
          rigRef.current?.setProgress(self.progress);
        }
      });
    });

    return () => ctx.revert();
  }, [cine]);

  return (
    <div className={`bp-page bp-grid font-bank min-h-screen overflow-x-hidden ${cine ? '' : 'home-static'}`}>
      <CursorGrid />
      <SEO {...homeMetadata} />

      {/* The stage — six scenes, one continuous film.
          (The site-wide Navbar from App.tsx is the header on every page.) */}
      <div ref={stageRef} className={cine ? 'bp-cine' : 'relative'}>
        {/* Wireframe camera — full stage in cinematic mode; on mobile/tablet it
            stays fixed in the background and scrubs its animation via natural scroll */}
        <div
          className={cine ? 'absolute inset-0 pointer-events-none' : 'fixed inset-0 pointer-events-none opacity-70 z-0'}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <CameraRig ref={rigRef} />
          </Suspense>
        </div>
        <HeroScene ref={heroRef} />
        <StoryScene ref={storyRef} />
        <ServicesScene ref={servicesRef} />
        <VoiceScene ref={voiceRef} />
        <BlogScene ref={blogRef} />
        <YoutubeScene ref={youtubeRef} />
      </div>

      <HomeFooter />
    </div>
  );
};

export default Home;
