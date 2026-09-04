import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import { universalPasteMetadata } from '../seo/metadata';
import WorkflowSlideshow from '../components/WorkflowSlideshow';
import { Button } from '@/components/ui/button';
import { useEventOnomatopoeia } from '@/components/ui/onomatopoeia';
import { useSignup } from '../context/SignupContext';
import {
  Volume2,
  VolumeX,
  ArrowLeft,
  FastForward,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Scissors,
  Video,
  RefreshCw
} from 'lucide-react';
import './UniversalPaste.css';

gsap.registerPlugin(ScrollTrigger);

// Mouse click interaction: ONLY 'PASTE!'
const SFX_WORDS = ['PASTE!'];
const HERO_AUDIO_SRC = '/assets/universal-paste/heroaudio.mp3';
const SPIDERWEB_SHOT_AUDIO_SRC = '/assets/universal-paste/spiderweb-shot.mp3';
const PAGE_FLIP_AUDIO_SRC = '/assets/universal-paste/page-flip.mp3';
const INTRO_VIDEO_SRC = new URL('../Intro Animation.mp4', import.meta.url).href;
const SECTION_SPIDERWEB_IN_SRC = new URL('../spiderweb in.mp4', import.meta.url).href;
const HERO_SLIDE_DURATION_MS = 460;
const SCROLL_GLITCH_DURATION_MS = 800;

/* ════════════════════════════════════════
   1. CONTINUOUSLY SCROLLING 2D CHECKERBOARD AMBIENT GRID
   (Pans both horizontally and vertically across 100% space)
   ════════════════════════════════════════ */
const AmbientAlternatingComicGrid = () => {
  const cells = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div className="sv-ambient-comic-grid-wrap" aria-hidden="true">
      <div className="sv-ambient-comic-grid sv-ambient-comic-grid--infinite-scroll">
        {cells.map((index) => {
          const isLogo = index % 2 === 0;
          return (
            <div key={index} className={`sv-grid-cell ${isLogo ? 'sv-grid-cell--logo' : 'sv-grid-cell--mascot'}`}>
              <img
                src={isLogo ? '/assets/universal-paste/universal-paste-transparent.png' : '/assets/universal-paste/superhero.png'}
                alt=""
                className={`sv-grid-cell-img ${isLogo ? 'sv-grid-cell-img--logo' : 'sv-grid-cell-img--mascot'}`}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   2. SECTION YELLOW PILLS WITH RANDOM COMIC TEXT
   ════════════════════════════════════════ */
interface PillLayout {
  text: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  rotate: string;
  delay: string;
}

const SECTION_YELLOW_PILLS: Record<string, PillLayout[]> = {
  hero: [
    { text: 'POW! 1-CLICK', top: '8%', left: '2%', width: '135px', height: '36px', rotate: '-6deg', delay: '0s' },
    { text: 'ZAP! CTRL+V', top: '38%', right: '3%', width: '135px', height: '38px', rotate: '8deg', delay: '1.2s' },
    { text: 'ZERO CLUTTER!', bottom: '12%', left: '4%', width: '145px', height: '36px', rotate: '4deg', delay: '2.4s' },
    { text: 'INSTANT INGEST', bottom: '24%', right: '6%', width: '150px', height: '38px', rotate: '-7deg', delay: '0.6s' },
  ],
  benefits: [
    { text: 'TIMELINE READY', top: '14%', right: '5%', width: '150px', height: '38px', rotate: '7deg', delay: '0.4s' },
    { text: 'NO SAVES!', top: '55%', left: '3%', width: '120px', height: '34px', rotate: '-5deg', delay: '1.8s' },
    { text: 'AUTO BINS', bottom: '8%', right: '12%', width: '125px', height: '36px', rotate: '-8deg', delay: '2.8s' },
    { text: 'FAST INGEST', top: '30%', left: '8%', width: '130px', height: '34px', rotate: '6deg', delay: '1.0s' },
  ],
  how: [
    { text: '5 FAST STEPS', top: '10%', left: '6%', width: '140px', height: '38px', rotate: '-8deg', delay: '1.5s' },
    { text: 'COPY -> PASTE', top: '48%', right: '4%', width: '145px', height: '36px', rotate: '5deg', delay: '0.2s' },
    { text: 'SCREEN SNIP', bottom: '16%', left: '4%', width: '135px', height: '36px', rotate: '9deg', delay: '2.1s' },
    { text: 'PLAYHEAD DROP', bottom: '6%', right: '8%', width: '155px', height: '38px', rotate: '-4deg', delay: '0.9s' },
  ],
  workflow: [
    { text: '3 SEC AUTOPLAY', top: '8%', left: '4%', width: '150px', height: '36px', rotate: '-7deg', delay: '0.4s' },
    { text: 'PASTE IN SECONDS', top: '42%', right: '3%', width: '160px', height: '38px', rotate: '6deg', delay: '1.2s' },
    { text: 'INSTANT SWAP', bottom: '12%', left: '5%', width: '140px', height: '36px', rotate: '7deg', delay: '2.0s' },
    { text: 'ZERO LATENCY', bottom: '22%', right: '5%', width: '145px', height: '36px', rotate: '-5deg', delay: '0.8s' },
  ],
  for: [
    { text: 'FAST-TURN CUTS', top: '18%', left: '4%', width: '155px', height: '38px', rotate: '6deg', delay: '2.0s' },
    { text: 'TUTORIAL SPEED', top: '25%', right: '6%', width: '150px', height: '36px', rotate: '-7deg', delay: '0.7s' },
    { text: 'ZERO LATENCY', bottom: '10%', left: '10%', width: '145px', height: '38px', rotate: '-5deg', delay: '1.4s' },
    { text: 'PRO WORKFLOW', bottom: '26%', right: '3%', width: '145px', height: '36px', rotate: '8deg', delay: '2.6s' },
  ],
  why: [
    { text: 'UXP ENGINE', top: '12%', right: '4%', width: '130px', height: '34px', rotate: '-6deg', delay: '0.5s' },
    { text: 'LIVE COMPANION', top: '60%', left: '2%', width: '160px', height: '38px', rotate: '7deg', delay: '1.9s' },
    { text: '1-CLICK SWAP', bottom: '14%', right: '7%', width: '140px', height: '36px', rotate: '-4deg', delay: '2.5s' },
    { text: 'INSTANT PREVIEW', top: '32%', left: '5%', width: '160px', height: '36px', rotate: '5deg', delay: '1.1s' },
  ],
  cta: [
    { text: 'JOIN THE EDITORS', top: '15%', left: '5%', width: '165px', height: '38px', rotate: '8deg', delay: '0.3s' },
    { text: 'DOWNLOAD NOW', top: '22%', right: '4%', width: '155px', height: '36px', rotate: '-6deg', delay: '1.7s' },
    { text: 'PREMIERE PRO', bottom: '18%', left: '6%', width: '150px', height: '36px', rotate: '-8deg', delay: '2.2s' },
    { text: 'LEVEL UP!', bottom: '8%', right: '5%', width: '130px', height: '36px', rotate: '5deg', delay: '0.8s' },
  ],
  faq: [
    { text: 'COPY & PASTE', top: '12%', right: '5%', width: '150px', height: '36px', rotate: '6deg', delay: '0.4s' },
    { text: 'ZERO GUESSWORK', top: '45%', left: '3%', width: '150px', height: '36px', rotate: '-5deg', delay: '1.6s' },
    { text: 'OFFLINE SPEED', bottom: '15%', right: '8%', width: '145px', height: '36px', rotate: '-7deg', delay: '2.2s' },
    { text: 'PRO WORKFLOW', bottom: '28%', left: '6%', width: '145px', height: '38px', rotate: '8deg', delay: '1.0s' },
  ],
};

const UNIVERSAL_PASTE_FAQS = [
  {
    q: 'What is Vampro Universal Paste?',
    a: 'Vampro Universal Paste is an Adobe Premiere Pro extension (UXP) that turns clipboard content, screenshots, window recordings, URLs, GIFs, images, and videos into timeline-ready assets with a single click.'
  },
  {
    q: 'How do I paste clipboard images directly into Adobe Premiere Pro?',
    a: 'With Vampro Universal Paste installed, simply copy any image or GIF from your web browser or desktop (Ctrl+C), switch to Premiere Pro, open the Universal Paste panel, preview the detected asset, and click "Paste to Timeline" or "Import to Bin". It places the asset directly at your playhead without requiring manual saving to your desktop.'
  },
  {
    q: 'Can I take screenshots or record screen videos directly into Premiere Pro?',
    a: 'Yes! The integrated companion app includes region screenshot snipping and screen recording tools. Captured media is automatically encoded, saved into dedicated project media bins, and placed directly onto your timeline sequence.'
  },
  {
    q: 'Does Universal Paste require saving files to my desktop first?',
    a: 'No. Universal Paste eliminates desktop clutter by automatically reading the system clipboard or downloading web media in the background, saving assets into an organized project folder, and importing them straight into Premiere Pro.'
  },
  {
    q: 'What media formats are supported by Universal Paste?',
    a: 'Universal Paste supports PNG, JPG, JPEG, WebP, animated GIFs, MP4, WebM, clipboard bitmap buffers, and direct video/media URLs.'
  },
  {
    q: 'Which versions of Adobe Premiere Pro are compatible?',
    a: 'Vampro Universal Paste is compatible with Adobe Premiere Pro 25.6 and later releases on Windows 10/11 64-bit (with macOS support planned for the future).'
  }
];

const SectionYellowPills = ({ sectionId }: { sectionId: string }) => {
  const pills = SECTION_YELLOW_PILLS[sectionId] || [];
  return (
    <div className="sv-ambient-pills-container">
      {pills.map((p, idx) => (
        <div
          key={idx}
          className="sv-ambient-yellow-pill"
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
            width: p.width,
            height: p.height,
            transform: `rotate(${p.rotate})`,
            animationDelay: p.delay,
          }}
        >
          <span className="sv-yellow-pill-text">{p.text}</span>
        </div>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════
   3. SECTION-LEVEL SPIDERWEB STAGE (BOTTOM ALIGNED)
   ════════════════════════════════════════ */
const SectionSpiderwebOverlay = () => {
  return (
    <div className="sv-section-spiderweb-stage sv-section-spiderweb-stage--bottom-aligned" aria-hidden="true">
      <video
        className="sv-spiderweb-video sv-spiderweb-video--in"
        src={SECTION_SPIDERWEB_IN_SRC}
        muted
        playsInline
        preload="none"
      />
      <video
        className="sv-spiderweb-video sv-spiderweb-video--out"
        src="/assets/universal-paste/spiderweb-out.mp4"
        muted
        playsInline
        preload="none"
      />
    </div>
  );
};

/* ════════════════════════════════════════
   4. CINEMATIC HERO TITLE (SIDEKICK PUSHED BY WEB)
   ════════════════════════════════════════ */
const CinematicHeroTitle = () => {
  const [animState, setAnimState] = useState<'superhero' | 'striking' | 'struck' | 'sidekick'>('superhero');

  useEffect(() => {
    let timer1: any, timer2: any, timer3: any, timer4: any, timer5: any;

    const runLoop = () => {
      setAnimState('superhero');

      timer1 = setTimeout(() => {
        setAnimState('striking');
      }, 1800);

      timer2 = setTimeout(() => {
        setAnimState('struck');
      }, 2200);

      timer3 = setTimeout(() => {
        setAnimState('sidekick');
      }, 2800);

      timer4 = setTimeout(() => {
        timer5 = setTimeout(runLoop, 250);
      }, 6500);
    };

    runLoop();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <h1 className="sv-cinematic-hero-title">
      <svg className="sv-web-svg" viewBox="0 0 600 240" fill="none" preserveAspectRatio="none">
        <path d="M 0 0 L 85 20 M 0 0 L 65 60 M 0 0 L 20 85" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.5" />
        <path d="M 30 0 Q 45 45 0 30 M 60 0 Q 85 85 0 60 M 90 0 Q 120 120 0 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="4 2" />

        <path d="M 600 0 L 515 20 M 600 0 L 535 60 M 600 0 L 580 85" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.5" />
        <path d="M 570 0 Q 555 45 600 30 M 540 0 Q 515 85 600 60 M 510 0 Q 480 120 600 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="4 2" />

        <path d="M 0 240 L 85 220 M 0 240 L 65 180 M 0 240 L 20 155" stroke="rgba(237, 28, 36, 0.6)" strokeWidth="1.5" />
        <path d="M 600 240 L 515 220 M 600 240 L 535 180 M 600 240 L 580 155" stroke="rgba(237, 28, 36, 0.6)" strokeWidth="1.5" />
      </svg>

      <div className="sv-title-line-1">
        THE UNIVERSAL
      </div>

      <div className="sv-title-line-dynamic">
        {animState !== 'sidekick' ? (
          <span className={`sv-word-superhero ${(animState === 'striking' || animState === 'struck') ? 'struck' : ''}`}>
            SUPERHERO
            {(animState === 'striking' || animState === 'struck') && <span className="sv-strike-line" />}
          </span>
        ) : (
          <span className="sv-word-sidekick sv-word-sidekick--web-pushed">
            <div className="sv-sidekick-web-effect">
              <svg viewBox="0 0 160 80" className="sv-sidekick-web-svg" fill="none">
                <path d="M 0 40 Q 80 10 160 40 M 80 0 L 80 80 M 20 20 L 140 60 M 20 60 L 140 20" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2.5" strokeDasharray="5 3" />
              </svg>
            </div>
            SIDEKICK
          </span>
        )}
      </div>

      <div className="sv-title-line-3">
        FOR EDITORS
      </div>
    </h1>
  );
};

/* ════════════════════════════════════════
   4.5. CENTER CINEMATIC YELLOW STRIP
   (Mascot Fade-in: 'Hero' -> Striked Out -> 'Sidekick' Incoming)
   ════════════════════════════════════════ */
const CenterCinematicYellowStrip = ({
  wordState,
  onSkip,
}: {
  wordState: 'hero' | 'striking' | 'struck' | 'sidekick';
  onSkip: () => void;
}) => {
  return (
    <div className="sv-center-cinematic-stage" onClick={onSkip} title="Click to skip animation">
      <div className="sv-center-yellow-strip-card sv-interactive-glitch-elem">
        <div className="sv-center-strip-main">
          <span className="sv-center-strip-prefix">THE</span>
          <div className="sv-center-strip-dynamic-container">
            {wordState !== 'sidekick' ? (
              <span className={`sv-center-word-hero ${(wordState === 'striking' || wordState === 'struck') ? 'struck' : ''}`}>
                HERO
                {(wordState === 'striking' || wordState === 'struck') && <span className="sv-center-strike-line" />}
              </span>
            ) : (
              <span className="sv-center-word-sidekick sv-word-sidekick--web-pushed">
                <div className="sv-sidekick-web-effect">
                  <svg viewBox="0 0 160 80" className="sv-sidekick-web-svg" fill="none">
                    <path d="M 0 40 Q 80 10 160 40 M 80 0 L 80 80 M 20 20 L 140 60 M 20 60 L 140 20" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2.5" strokeDasharray="5 3" />
                  </svg>
                </div>
                SIDEKICK
              </span>
            )}
          </div>
          <span className="sv-center-strip-suffix">FOR EDITORS</span>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   5. 2-GRID COMIC STORY PAGES WITH EXACT PRODUCT SCREENS
   (Top: Exact Product Screen UI • Bottom: Explanation • Hero Slide)
   ════════════════════════════════════════ */
interface ComicPageData {
  id: number;
  type: 'cover' | 'story' | 'finale';
  kicker: string;
  badge: string;
  badgeColor?: 'red' | 'yellow' | 'blue';
  title: string;
  desc: string;
  featureKey: 'clipboard' | 'capture' | 'video' | 'replace' | 'cover' | 'finale';
  pageNumberText: string;
  imageSrc?: string;
  imageAlt?: string;
}

const COMIC_PAGES: ComicPageData[] = [
  {
    id: 0,
    type: 'cover',
    kicker: '★ VAMPRO COMICS GROUP • ISSUE #1 ★',
    badge: 'COLLECTORS EDITION',
    badgeColor: 'red',
    title: 'UNIVERSAL PASTE',
    desc: 'PASTE ANYTHING DIRECTLY INTO PREMIERE PRO!',
    featureKey: 'cover',
    pageNumberText: 'COLLECTORS ISSUE #1',
    imageSrc: '/assets/universal-paste/comic-pages/COVER.webp',
    imageAlt: 'Universal Paste comic cover',
  },
  {
    id: 1,
    type: 'story',
    kicker: 'FEATURE 1: CLIPBOARD INGESTION',
    badge: 'CTRL+C',
    badgeColor: 'yellow',
    title: '1-CLICK CLIPBOARD TO TIMELINE',
    desc: 'Copy any web image, GIF, or local file. The companion reads clipboard buffer and places it directly on active timeline with zero file chasing.',
    featureKey: 'clipboard',
    pageNumberText: 'PAGE 1 OF 4',
    imageSrc: '/assets/universal-paste/comic-pages/PAGE%201.webp',
    imageAlt: 'Universal Paste comic page 1',
  },
  {
    id: 2,
    type: 'story',
    kicker: 'FEATURE 2: SCREEN SNIPER CAPTURE',
    badge: 'SNIP!',
    badgeColor: 'red',
    title: 'TARGETED REGION SCREENSHOTS',
    desc: 'Snip application windows or freeform screen regions directly to playhead on Track V2 without leaving Premiere Pro.',
    featureKey: 'capture',
    pageNumberText: 'PAGE 2 OF 4',
    imageSrc: '/assets/universal-paste/comic-pages/PAGE%202.webp',
    imageAlt: 'Universal Paste comic page 2',
  },
  {
    id: 3,
    type: 'story',
    kicker: 'FEATURE 3: VIDEO & STREAM PIPELINE',
    badge: '4K REF',
    badgeColor: 'blue',
    title: 'INSTANT URL & STREAM INGESTION',
    desc: 'Paste YouTube, Vimeo, or web MP4 links. Media is decoded in the background and placed on timeline ready for editing.',
    featureKey: 'video',
    pageNumberText: 'PAGE 3 OF 4',
    imageSrc: '/assets/universal-paste/comic-pages/PAGE%203.webp',
    imageAlt: 'Universal Paste comic page 3',
  },
  {
    id: 4,
    type: 'story',
    kicker: 'FEATURE 4: IN-PLACE CLIP REPLACE',
    badge: 'SWAP!',
    badgeColor: 'yellow',
    title: 'NON-DESTRUCTIVE CLIP SWAP',
    desc: 'Swap existing timeline clips with one click while preserving all cuts, keyframes, transitions, and audio sync.',
    featureKey: 'replace',
    pageNumberText: 'PAGE 4 OF 4',
    imageSrc: '/assets/universal-paste/comic-pages/PAGE%204_.webp',
    imageAlt: 'Universal Paste comic page 4',
  },
  {
    id: 5,
    type: 'finale',
    kicker: '★ VAMPRO COMICS FINALE ★',
    badge: 'APPROVED!',
    badgeColor: 'yellow',
    title: 'THE EDITORS CHOICE',
    desc: 'Join thousands of fast-turn Premiere Pro editors who save hours every week.',
    featureKey: 'finale',
    pageNumberText: 'FINAL PAGE',
    imageSrc: '/assets/universal-paste/comic-pages/FINAL%20PAGE.webp',
    imageAlt: 'Universal Paste final comic page',
  },
  {
    id: 6,
    type: 'cover',
    kicker: '★ VAMPRO COMICS BACK COVER ★',
    badge: 'THE END',
    badgeColor: 'red',
    title: 'END COVER',
    desc: 'Universal Paste back cover.',
    featureKey: 'cover',
    pageNumberText: 'END COVER',
    imageSrc: '/assets/universal-paste/comic-pages/END%20COVER.webp',
    imageAlt: 'Universal Paste end cover',
  },
];

/* ── Top Box: Exact Product Screen UI (From Companion Lab) ── */
const ComicProductScreenTopBox = ({ featureKey }: { featureKey: 'clipboard' | 'capture' | 'video' | 'replace' | 'cover' | 'finale' }) => {
  return (
    <div className="sv-comic-product-screen-wrap">
      {/* Header bar of the inspector */}
      <div className="sv-mini-inspector-head">
        <div className="sv-mini-dots">
          <span className="sv-dot sv-dot--red" />
          <span className="sv-dot sv-dot--yellow" />
          <span className="sv-dot sv-dot--blue" />
        </div>
        <span className="sv-mini-inspector-title">UXP Companion Lab • Live Engine</span>
      </div>

      {/* Tab bar */}
      <div className="sv-mini-tabs-row">
        <span className={`sv-mini-tab ${featureKey === 'clipboard' ? 'active' : ''}`}>
          <Copy size={10} /> Clipboard
        </span>
        <span className={`sv-mini-tab ${featureKey === 'capture' ? 'active' : ''}`}>
          <Scissors size={10} /> Capture
        </span>
        <span className={`sv-mini-tab ${featureKey === 'video' ? 'active' : ''}`}>
          <Video size={10} /> Video
        </span>
        <span className={`sv-mini-tab ${featureKey === 'replace' ? 'active' : ''}`}>
          <RefreshCw size={10} /> Replace
        </span>
      </div>

      {/* Screen Preview Body */}
      <div className="sv-mini-preview-body">
        {featureKey === 'clipboard' && (
          <div className="sv-mini-loaded-item">
            <div className="sv-mini-thumb">
              <img src="/assets/universal-paste/universal-paste-transparent.png" alt="Clipboard Logo" />
            </div>
            <div className="sv-mini-details">
              <span className="sv-mini-badge-tag">PNG/IMAGE • 1080x1080</span>
              <strong>vampro_logo_paste.png</strong>
              <span className="sv-mini-status">● Ready to Paste to Timeline</span>
            </div>
          </div>
        )}

        {featureKey === 'capture' && (
          <div className="sv-mini-loaded-item">
            <div className="sv-mini-thumb sv-mini-thumb--sniper">
              <img src="/assets/universal-paste/superhero.png" alt="Sniper Capture" />
              <div className="sv-mini-crosshair" />
            </div>
            <div className="sv-mini-details">
              <span className="sv-mini-badge-tag" style={{ background: '#00d4ff', color: '#07080b' }}>SNIP • 1920x1080</span>
              <strong>screen_snip_playhead.png</strong>
              <span className="sv-mini-status" style={{ color: '#00d4ff' }}>● Region Locked to Playhead</span>
            </div>
          </div>
        )}

        {featureKey === 'video' && (
          <div className="sv-mini-loaded-item">
            <div className="sv-mini-thumb">
              <img src="/assets/universal-paste/universal-paste-transparent.png" alt="Video Ref" />
            </div>
            <div className="sv-mini-details">
              <span className="sv-mini-badge-tag" style={{ background: '#ff00aa', color: '#fff' }}>VIDEO/MP4 • 4K 60FPS</span>
              <strong>YT_Tutorial_Action_Ref.mp4</strong>
              <span className="sv-mini-status" style={{ color: '#ffd437' }}>● Transcode Ready</span>
            </div>
          </div>
        )}

        {featureKey === 'replace' && (
          <div className="sv-mini-loaded-item">
            <div className="sv-mini-thumb">
              <img src="/assets/universal-paste/superhero.png" alt="Replace Asset" />
            </div>
            <div className="sv-mini-details">
              <span className="sv-mini-badge-tag" style={{ background: '#4ade80', color: '#07080b' }}>1-CLICK SWAP</span>
              <strong>B_Roll_Swapped_Hero.png</strong>
              <span className="sv-mini-status" style={{ color: '#4ade80' }}>● Cuts & Keyframes Preserved</span>
            </div>
          </div>
        )}
      </div>

      {/* Mini Action Buttons */}
      <div className="sv-mini-action-row">
        <span className="sv-mini-btn sv-mini-btn--active">
          {featureKey === 'clipboard' ? '1. Copy Image' : featureKey === 'capture' ? '1. Snap Region' : featureKey === 'video' ? '1. Fetch URL' : '1. Select Target'}
        </span>
        <span className="sv-mini-btn sv-mini-btn--red">
          {featureKey === 'clipboard' ? '2. Paste to Playhead' : featureKey === 'capture' ? '2. Insert at Playhead' : featureKey === 'video' ? '2. Send to Timeline' : '2. Confirm Swap'}
        </span>
      </div>

      {/* Mini Timeline Track */}
      <div className="sv-mini-timeline-track">
        <div className="sv-mini-lane">
          <span className="sv-mini-lane-tag">V1</span>
          <span className="sv-mini-lane-clip">
            {featureKey === 'clipboard' ? 'vampro_logo.png' : featureKey === 'capture' ? 'screen_snip_01.png' : featureKey === 'video' ? 'YT_Tutorial_4K.mp4' : 'Swapped_B_Roll.png'}
          </span>
        </div>
      </div>
    </div>
  );
};

const HeroLiveComicBook = ({ isActive, onFlipSound }: { isActive: boolean; onFlipSound: () => void }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  const turnToPage = (newPage: number) => {
    if (isSliding || newPage === currentPage) return;
    const forwardDistance = (newPage - currentPage + COMIC_PAGES.length) % COMIC_PAGES.length;
    setSlideDirection(forwardDistance <= COMIC_PAGES.length / 2 ? 'next' : 'prev');
    setIsSliding(true);
    setCurrentPage(newPage);
    onFlipSound();
    window.setTimeout(() => setIsSliding(false), HERO_SLIDE_DURATION_MS);
  };

  useEffect(() => {
    if (!isActive) {
      setCurrentPage(0);
      setIsSliding(false);
      return;
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      turnToPage((currentPage + 1) % COMIC_PAGES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentPage, isActive, isAutoPlaying, isHovered]);

  const handleNextPage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    turnToPage((currentPage + 1) % COMIC_PAGES.length);
  };

  const handlePrevPage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    turnToPage((currentPage - 1 + COMIC_PAGES.length) % COMIC_PAGES.length);
  };

  const page = COMIC_PAGES[currentPage];

  const renderComicLeafContent = (leafPage: ComicPageData) => (
    <>
      {leafPage.imageSrc ? (
        <img
          src={leafPage.imageSrc}
          alt={leafPage.imageAlt || leafPage.title}
          className="sv-comic-page-image"
          width={1240}
          height={1754}
          loading={leafPage.id === 0 ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={leafPage.id === 0 ? 'high' : 'low'}
          draggable={false}
        />
      ) : leafPage.type === 'cover' ? (
        /* ── FULL BLEED HERO COMIC COVER ── */
        <div className="sv-cover-layout sv-cover-layout--full-bleed">
          <img
            src="/assets/universal-paste/superhero.png"
            alt="Superhero Mascot"
            className="sv-cover-full-bleed-art"
          />
          <div className="sv-cover-art-scrim" />

          <div className="sv-cover-top-group">
            <div className="sv-cover-header-bar">
              <span className="sv-cover-logo-tag">★ VAMPRO COMICS GROUP</span>
              <span className="sv-cover-issue-tag">ISSUE #1</span>
              <span className="sv-cover-price-tag">25¢ • PREMIERE PRO</span>
            </div>

            <div className="sv-cover-authority-seal">
              <span>APPROVED BY THE</span>
              <strong>EDITORS</strong>
              <span>CODE AUTHORITY</span>
            </div>
          </div>

          <div className="sv-cover-title-block sv-cover-title-block--overlaid">
            <div className="sv-cover-kicker-strip">
              ★ THE ULTIMATE EDITING WEAPON ★
            </div>
            <h2 className="sv-cover-main-title sv-cover-main-title--overlaid">
              UNIVERSAL PASTE
            </h2>
            <div className="sv-cover-subtitle-pill">
              PASTE ANYTHING DIRECTLY TO TIMELINE!
            </div>
          </div>

          <div className="sv-cover-action-badges-row">
            <div className="sv-cover-burst-tag">
              <span>ZERO SAVES!</span>
            </div>
            <div className="sv-cover-burst-tag sv-cover-burst-tag--cyan">
              <span>INSTANT PASTE!</span>
            </div>
          </div>

          <div className="sv-cover-footer-strip">
            <div className="sv-cover-barcode">
              <div className="sv-barcode-lines" />
              <span>UPC 0-71486-02264-1</span>
            </div>
            <div className="sv-cover-tagline">
              CLICK TO SLIDE PAGE ➔
            </div>
          </div>
        </div>
      ) : leafPage.type === 'finale' ? (
        /* ── LAST PAGE: VAMPRO PASTE LOGO ON RED PAGE BACKDROP ── */
        <div className="sv-finale-red-page">
          <div className="sv-finale-kicker">★ VAMPRO COMICS FINALE ★</div>
          <div className="sv-finale-logo-wrap">
            <img
              src="/assets/universal-paste/universal-paste-transparent.png"
              alt="Vampro Paste Logo"
              className="sv-finale-logo-img"
            />
          </div>
          <div className="sv-finale-seal">
            <strong>100% APPROVED</strong>
            <span>EDITORS CHOICE</span>
          </div>
          <h3 className="sv-finale-title">UNIVERSAL PASTE</h3>
          <p className="sv-finale-desc">The essential companion plugin for Adobe Premiere Pro.</p>
          <div className="sv-finale-badge">★ READY FOR TIMELINE DROP ★</div>
        </div>
      ) : (
        /* ── 2-GRID STORY LAYOUT: TOP PRODUCT SCREEN + BOTTOM EXPLANATION ── */
        <div className="sv-comic-2grid-page">
          <div className="sv-comic-page-header-banner">
            <span className="sv-page-chapter-kicker">{leafPage.kicker}</span>
            <span className="sv-page-issue-stamp">ISSUE #1</span>
          </div>

          <div className="sv-comic-2grid-top-box">
            <ComicProductScreenTopBox featureKey={leafPage.featureKey} />
          </div>

          <div className="sv-comic-2grid-bottom-box">
            <h3 className="sv-story-heading--vintage">{leafPage.title}</h3>
            <p className="sv-story-desc--vintage">{leafPage.desc}</p>
          </div>

          <div className="sv-comic-page-footer-margin">
            <span>VAMPRO UNIVERSAL PASTE</span>
            <span className="sv-page-num-pill">{leafPage.pageNumberText}</span>
          </div>
        </div>
      )}
    </>
  );

  const leafClassName = (leafPage: ComicPageData, extra = '') => `sv-comic-leaf ${leafPage.type === 'cover'
    ? 'sv-comic-leaf--cover'
    : leafPage.type === 'finale'
      ? 'sv-comic-leaf--red-backdrop'
      : 'sv-comic-leaf--2grid-story'
    } ${leafPage.imageSrc ? 'sv-comic-leaf--image-page' : ''} ${extra}`;

  return (
    <div
      className="sv-hero-comic-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNextPage}
      title="Click comic to slide page"
    >
      {/* Hero comic uses a regular slide; physical flips are reserved for the intro. */}
      <div className={`sv-hero-comic-book ${isSliding ? 'sv-comic-sliding' : ''} sv-comic-slide-${slideDirection}`}>
        {/* Top Floating Action Badge */}
        {!page.imageSrc && (
          <div className={`sv-sfx-badge sv-sfx-badge--${page.badgeColor || 'red'} sv-hero-comic-sfx`}>
            {page.badge}
          </div>
        )}

        {/* Comic Sheet Content */}
        <div className={leafClassName(page, 'sv-comic-leaf--base sv-hero-slide-leaf')}>
          {renderComicLeafContent(page)}
        </div>

        {/* Layered Paper Edge on the Right */}
        <div className="sv-comic-page-edges" />
      </div>

      {/* Comic Interactive Controls Bar */}
      <div className="sv-comic-control-bar" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="sv-comic-ctrl-btn"
          onClick={handlePrevPage}
          title="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="sv-comic-page-dots">
          {COMIC_PAGES.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              className={`sv-comic-dot ${currentPage === idx ? 'active' : ''}`}
              onClick={() => turnToPage(idx)}
              title={`Jump to ${p.pageNumberText}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="sv-comic-ctrl-btn"
          onClick={handleNextPage}
          title="Next page"
        >
          <ChevronRight size={16} />
        </button>

        <button
          type="button"
          className="sv-comic-ctrl-btn"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          style={{ marginLeft: '4px', color: isAutoPlaying ? 'var(--comic-yellow)' : '#999' }}
        >
          {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
        </button>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   6. MAIN UNIVERSAL PASTE PAGE COMPONENT
   ════════════════════════════════════════ */
type IntroSequencePhase = 'video' | 'mascot-fade' | 'checkered-grid' | 'ready';
type StripAnimWord = 'hero' | 'striking' | 'struck' | 'sidekick';
type SimulatorTab = 'clipboard' | 'capture' | 'video' | 'replace';
type SimulatorTimelineItem = {
  id: string;
  name: string;
  track: 'V1' | 'V2';
  color: string;
  position: number;
  type: 'image' | 'capture' | 'video';
  src?: string;
  assetId?: string;
};

const SIMULATOR_ASSETS = [
  // Backend placeholder: replace these records with API-provided image options when available.
  { id: 'paste-logo', label: 'Paste Logo', src: '/assets/universal-paste/universal-paste-transparent.png' },
  { id: 'hero-mark', label: 'Hero Mark', src: '/assets/universal-paste/superhero.png' },
  { id: 'mascot-1', label: 'Mascot 1', src: '/assets/universal-paste/mascot_pose_1.jpg' },
  { id: 'mascot-2', label: 'Mascot 2', src: '/assets/universal-paste/mascot_pose_2.jpg' },
  { id: 'mascot-3', label: 'Mascot 3', src: '/assets/universal-paste/mascot_pose_3.jpg' },
];
const SIMULATOR_VIDEO_SRC = '/assets/universal-paste/superhero.mp4';
const SIMULATOR_AUTOPILOT_STEPS: Array<{
  tab: SimulatorTab;
  assetIndex: number;
  playhead: number;
  captureReady: boolean;
  tracks: SimulatorTimelineItem[];
}> = [
    {
      tab: 'clipboard',
      assetIndex: 0,
      playhead: 24,
      captureReady: false,
      tracks: [],
    },
    {
      tab: 'capture',
      assetIndex: 1,
      playhead: 38,
      captureReady: true,
      tracks: [
        {
          id: 'autopilot-clipboard',
          name: 'Hero Mark.png',
          track: 'V1',
          color: '#ec4899',
          position: 38,
          type: 'image',
          src: SIMULATOR_ASSETS[1].src,
          assetId: SIMULATOR_ASSETS[1].id,
        },
      ],
    },
    {
      tab: 'capture',
      assetIndex: 2,
      playhead: 56,
      captureReady: true,
      tracks: [
        {
          id: 'autopilot-clipboard',
          name: 'Hero Mark.png',
          track: 'V1',
          color: '#ec4899',
          position: 38,
          type: 'image',
          src: SIMULATOR_ASSETS[1].src,
          assetId: SIMULATOR_ASSETS[1].id,
        },
        {
          id: 'autopilot-capture',
          name: 'capture_tab_snapshot.png',
          track: 'V2',
          color: '#eab308',
          position: 56,
          type: 'capture',
        },
      ],
    },
    {
      tab: 'video',
      assetIndex: 3,
      playhead: 72,
      captureReady: true,
      tracks: [
        {
          id: 'autopilot-clipboard',
          name: 'Hero Mark.png',
          track: 'V1',
          color: '#ec4899',
          position: 38,
          type: 'image',
          src: SIMULATOR_ASSETS[1].src,
          assetId: SIMULATOR_ASSETS[1].id,
        },
        {
          id: 'autopilot-video',
          name: 'Intro Animation.mp4',
          track: 'V1',
          color: '#06b6d4',
          position: 72,
          type: 'video',
        },
      ],
    },
    {
      tab: 'replace',
      assetIndex: 4,
      playhead: 72,
      captureReady: true,
      tracks: [
        {
          id: 'autopilot-replace',
          name: 'Mascot 3_replacement.png',
          track: 'V1',
          color: '#22c55e',
          position: 72,
          type: 'image',
          src: SIMULATOR_ASSETS[4].src,
          assetId: SIMULATOR_ASSETS[4].id,
        },
      ],
    },
  ];

const UniversalPaste = () => {
  const { openSignup } = useSignup();

  const handleOpenWaitlist = (source: string) => {
    openSignup({
      product: 'Universal Paste',
      source,
      title: 'Join Universal Paste Waitlist',
      subtitle: 'Be the first to paste images, GIFs, videos, and URLs directly into Adobe Premiere Pro.',
      buttonText: 'Join Waitlist',
      successTitle: "You're on the list!",
      successMessage: 'Thank you for joining the Universal Paste early access waitlist. We will notify you when early access opens.',
      alwaysShow: true,
    });
  };

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const [introPhase, setIntroPhase] = useState<IntroSequencePhase>('video');
  const [stripAnimWord, setStripAnimWord] = useState<StripAnimWord>('hero');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Track intro sound start to avoid double plays during transition
  const introSoundStartedRef = useRef(false);

  // Track sections that have already played their transition sound in this user session
  const playedSectionsSession = useRef<Set<string>>(new Set());

  // Interactive Companion State (Why This Plugin Section)
  const [simulatorStarted, setSimulatorStarted] = useState(true);
  const [simulatorAutopilot, setSimulatorAutopilot] = useState(true);
  const [activeMockTab, setActiveMockTab] = useState<SimulatorTab>('clipboard');
  const [selectedAssetId, setSelectedAssetId] = useState(SIMULATOR_ASSETS[0].id);
  const [playheadPercent, setPlayheadPercent] = useState(35);
  const [captureReady, setCaptureReady] = useState(false);
  const [selectedTimelineItemId, setSelectedTimelineItemId] = useState<string | null>(null);
  const [timelineTracks, setTimelineTracks] = useState<SimulatorTimelineItem[]>([]);

  const { domElement: sfxPortals, trigger: triggerSFX } = useEventOnomatopoeia({
    showClickBurst: true,
  });

  /* ── Audio helpers ── */
  const playSpiderwebShotSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio(SPIDERWEB_SHOT_AUDIO_SRC);
      audio.volume = 0.72;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  }, [soundEnabled]);

  const playPageFlipSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio(PAGE_FLIP_AUDIO_SRC);
      audio.volume = 0.72;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  }, [soundEnabled]);

  const playWebSwingSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const userActivation = (navigator as Navigator & { userActivation?: { hasBeenActive?: boolean } }).userActivation;
      if (userActivation && !userActivation.hasBeenActive) return;

      const audio = new Audio(HERO_AUDIO_SRC);
      audio.volume = 0.72;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Fallback to spiderweb sound
        playSpiderwebShotSound();
      });
    } catch {
      // Audio playback unavailable.
    }
  }, [soundEnabled, playSpiderwebShotSound]);

  const stopWebVideo = useCallback((video?: HTMLVideoElement | null) => {
    if (!video) return;
    video.pause();
    video.onended = null;
    video.onerror = null;
    video.style.visibility = 'hidden';
    video.style.opacity = '0';
  }, []);

  const playWebVideo = useCallback((video?: HTMLVideoElement | null) => {
    if (!video) return;

    stopWebVideo(video);
    video.currentTime = 0;
    video.playbackRate = 1;
    video.style.visibility = 'visible';
    video.style.opacity = '1';
    video.onended = () => stopWebVideo(video);
    video.onerror = () => stopWebVideo(video);
    video.play().catch(() => stopWebVideo(video));
  }, [stopWebVideo]);

  const handleStageClick = (e: React.MouseEvent) => {
    playWebSwingSound();
    triggerSFX({
      x: e.clientX,
      y: e.clientY,
      duration: 500,
      displayElement: (
        <span className="sv-sfx-badge sv-sfx-badge--yellow" style={{ fontSize: '20px', padding: '4px 10px' }}>
          {SFX_WORDS[0]}
        </span>
      ),
    });
  };

  const startIntroAudio = useCallback(() => {
    if (introSoundStartedRef.current) return;
    introSoundStartedRef.current = true;
    playPageFlipSound();
  }, [playPageFlipSound]);

  const skipToMascotSequence = useCallback(() => {
    startIntroAudio();
    if (introOverlayRef.current) {
      gsap.to(introOverlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.35,
        onComplete: () => {
          setIntroPhase('mascot-fade');
        },
      });
    } else {
      setIntroPhase('mascot-fade');
    }
  }, [startIntroAudio]);

  const skipAllToReady = useCallback(() => {
    setIntroPhase('ready');
    window.setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  // Step 1: Video phase timeout / completion
  useEffect(() => {
    if (introPhase !== 'video') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroPhase('ready');
      return;
    }

    window.scrollTo({ top: 0 });
    let cancelled = false;

    const finishVideo = () => {
      if (cancelled) return;
      skipToMascotSequence();
    };

    const metadataFallback = window.setTimeout(() => {
      const video = introOverlayRef.current?.querySelector<HTMLVideoElement>('.sv-intro-video-placeholder-media');
      if (!video || video.readyState < 1) {
        finishVideo();
      }
    }, 9000);

    return () => {
      cancelled = true;
      window.clearTimeout(metadataFallback);
    };
  }, [introPhase, skipToMascotSequence]);

  // Step 2: Mascot cinematic fade + yellow strip ('Hero' -> struck -> 'Sidekick') -> Checkered Grid
  useEffect(() => {
    if (introPhase !== 'mascot-fade') return;

    setStripAnimWord('hero');
    // Ensure intro page flip sound has started (triggers at t=-0.35s before cut, or now if skipped)
    startIntroAudio();

    // 250ms after mascot card appears (~550ms after page-flip started): spiderweb shot strikes HERO
    const timer1 = window.setTimeout(() => {
      setStripAnimWord('striking');
      playSpiderwebShotSound();
    }, 250);

    const timer2 = window.setTimeout(() => {
      setStripAnimWord('struck');
    }, 550);

    const timer3 = window.setTimeout(() => {
      setStripAnimWord('sidekick');
    }, 950);

    const timer4 = window.setTimeout(() => {
      setIntroPhase('ready');
      window.setTimeout(() => ScrollTrigger.refresh(), 100);
    }, 1800);

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(timer3);
      window.clearTimeout(timer4);
    };
  }, [introPhase, startIntroAudio, playSpiderwebShotSound]);

  useEffect(() => {
    if (introPhase === 'checkered-grid') {
      const timer = window.setTimeout(() => {
        setIntroPhase('ready');
        window.setTimeout(() => ScrollTrigger.refresh(), 100);
      }, 300);
      return () => window.clearTimeout(timer);
    }
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== 'ready' || !simulatorStarted || !simulatorAutopilot) return;

    let stepIndex = 0;
    const applyStep = () => {
      const step = SIMULATOR_AUTOPILOT_STEPS[stepIndex % SIMULATOR_AUTOPILOT_STEPS.length];
      const asset = SIMULATOR_ASSETS[step.assetIndex] || SIMULATOR_ASSETS[0];
      setActiveMockTab(step.tab);
      setSelectedAssetId(asset.id);
      setPlayheadPercent(step.playhead);
      setCaptureReady(step.captureReady);
      setSelectedTimelineItemId(step.tracks[0]?.id || null);
      setTimelineTracks(step.tracks);
      stepIndex += 1;
    };

    applyStep();
    const interval = window.setInterval(applyStep, 1200);

    return () => {
      window.clearInterval(interval);
    };
  }, [introPhase, simulatorStarted, simulatorAutopilot]);

  // Step 3: Checkered Grid entrance -> Ready (Hero Box + Scroll Animations)
  useEffect(() => {
    if (introPhase !== 'checkered-grid') return;

    const timer = window.setTimeout(() => {
      setIntroPhase('ready');
      window.setTimeout(() => ScrollTrigger.refresh(), 100);
    }, 850);

    return () => {
      window.clearTimeout(timer);
    };
  }, [introPhase]);

  // ════════════════════════════════════════
  // 2. SPIDERWEB PASTE IN (2s GLITCH) & OUT TRANSITIONS
  // ════════════════════════════════════════
  useEffect(() => {
    if (!containerRef.current || introPhase !== 'ready') return;

    const ctx = gsap.context(() => {
      const pages = gsap.utils.toArray<HTMLElement>('.sv-vpage');
      if (pages.length === 0) return;

      pages.forEach((page) => {
        const pageId = page.id || 'sv-section';
        const frame = page.querySelector<HTMLElement>('.sv-comic-panel-frame');
        const webStage = page.querySelector<HTMLElement>('.sv-section-spiderweb-stage');
        const videoIn = page.querySelector<HTMLVideoElement>('.sv-spiderweb-video--in');
        const videoOut = page.querySelector<HTMLVideoElement>('.sv-spiderweb-video--out');

        const resetFrame = () => {
          if (!frame) return;
          gsap.killTweensOf(frame);
          frame.querySelectorAll<HTMLElement>('.sv-impact-smoke-burst').forEach((smoke) => {
            smoke.remove();
          });
          gsap.set(frame, {
            transformOrigin: 'center bottom',
            scale: 0.05,
            y: 40,
            opacity: 0,
            rotateX: 0,
            force3D: true,
          });
        };

        resetFrame();

        const alignWebStageToSectionBottom = () => {
          if (!frame || !webStage) return;
          webStage.style.top = `${Math.max(0, frame.offsetTop)}px`;
          webStage.style.bottom = '0px';
          webStage.style.height = 'auto';
        };

        alignWebStageToSectionBottom();

        const triggerPasteIn = () => {
          alignWebStageToSectionBottom();

          const triggerImpact = () => {
            if (frame) {
              frame.querySelectorAll<HTMLElement>('.sv-impact-smoke-burst').forEach((smoke) => {
                smoke.remove();
              });
              const frameRect = frame.getBoundingClientRect();
              const smoke = document.createElement('span');
              smoke.className = 'sv-impact-smoke-burst';
              smoke.style.width = `${Math.min(frameRect.width * 0.86, 880)}px`;
              frame.appendChild(smoke);

              window.setTimeout(() => {
                smoke.remove();
              }, 600);
            }

            page.classList.remove('sv-panel-impact-active');
            void page.offsetWidth;
            page.classList.add('sv-panel-impact-active');

            window.setTimeout(() => {
              page.classList.remove('sv-panel-impact-active');
            }, 550);
          };

          const revealFrame = () => {
            if (!frame) return;
            gsap.killTweensOf(frame);
            gsap.timeline()
              .fromTo(
                frame,
                {
                  y: 40,
                  scale: 0.05,
                  opacity: 0.2,
                  rotateX: 0,
                },
                {
                  y: -10,
                  scale: 1.06,
                  opacity: 1,
                  rotateX: 0,
                  duration: 0.42,
                  ease: 'back.out(1.5)',
                  force3D: true,
                }
              )
              .to(frame, {
                y: 2,
                scaleX: 1.02,
                scaleY: 0.97,
                duration: 0.08,
                ease: 'power3.out',
                force3D: true,
                onStart: triggerImpact,
              })
              .to(frame, {
                y: 0,
                scale: 1,
                duration: 0.16,
                ease: 'power2.out',
                force3D: true,
              });
          };

          resetFrame();
          playWebVideo(videoIn);
          revealFrame();

          page.classList.remove('sv-glitch-active');
          void page.offsetWidth;
          page.classList.add('sv-glitch-active');

          // Play transition sound ONLY ONCE PER SESSION for this section!
          if (!playedSectionsSession.current.has(pageId)) {
            playedSectionsSession.current.add(pageId);
            playSpiderwebShotSound();
          }

          setTimeout(() => {
            page.classList.remove('sv-glitch-active');
          }, SCROLL_GLITCH_DURATION_MS);
        };

        const triggerWebPullOut = () => {
          alignWebStageToSectionBottom();
          page.classList.remove('sv-panel-impact-active');
          if (frame) {
            gsap.killTweensOf(frame);
            gsap.to(frame, {
              scale: 0.05,
              y: 40,
              opacity: 0,
              duration: 0.22,
              ease: 'power2.in',
              force3D: true,
            });
          }
          playWebVideo(videoOut);
        };

        ScrollTrigger.create({
          trigger: page,
          start: 'top 78%',
          end: 'bottom 22%',
          onEnter: () => triggerPasteIn(),
          onLeave: () => triggerWebPullOut(),
          onEnterBack: () => triggerPasteIn(),
          onLeaveBack: () => triggerWebPullOut(),
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      document.querySelectorAll<HTMLElement>('.sv-impact-smoke-burst').forEach((smoke) => {
        smoke.remove();
      });
      document.querySelectorAll<HTMLVideoElement>('.sv-spiderweb-video').forEach((video) => {
        stopWebVideo(video);
      });
      ctx.revert();
    };
  }, [introPhase, playWebSwingSound, playWebVideo, stopWebVideo]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || introPhase !== 'ready') return;

    const handleLocalGlitch = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const box = target?.closest<HTMLElement>(
        '.sv-interactive-glitch-elem, .sv-comic-card, .sv-step-card, .sv-inspector-panel, .sv-comic-2grid-top-box, .sv-comic-2grid-bottom-box'
      );
      if (!box) return;

      box.classList.remove('sv-local-glitch-active');
      void box.offsetWidth;
      box.classList.add('sv-local-glitch-active');

      window.setTimeout(() => {
        box.classList.remove('sv-local-glitch-active');
      }, 1800);
    };

    root.addEventListener('click', handleLocalGlitch);
    root.addEventListener('touchstart', handleLocalGlitch, { passive: true });

    return () => {
      root.removeEventListener('click', handleLocalGlitch);
      root.removeEventListener('touchstart', handleLocalGlitch);
    };
  }, [introPhase]);

  const selectedAsset = SIMULATOR_ASSETS.find((asset) => asset.id === selectedAssetId) || SIMULATOR_ASSETS[0];
  const selectedTimelineItem = timelineTracks.find((item) => item.id === selectedTimelineItemId);

  // Why Vampro simulator action handlers
  const handleStartSimulator = () => {
    playWebSwingSound();
    setSimulatorAutopilot(false);
    setSimulatorStarted(true);
    setActiveMockTab('clipboard');
  };

  const handleResetCompanion = () => {
    playWebSwingSound();
    setSimulatorAutopilot(false);
    setSimulatorStarted(false);
    setActiveMockTab('clipboard');
    setSelectedAssetId(SIMULATOR_ASSETS[0].id);
    setPlayheadPercent(35);
    setCaptureReady(false);
    setSelectedTimelineItemId(null);
    setTimelineTracks([]);
  };

  const addTimelineItem = (item: Omit<SimulatorTimelineItem, 'id' | 'position'>) => {
    setSimulatorAutopilot(false);
    const newItem = {
      ...item,
      id: `${item.type}-${Date.now()}-${Math.round(playheadPercent)}`,
      position: playheadPercent,
    };

    setTimelineTracks((prev) => [...prev, newItem]);
    setSelectedTimelineItemId(newItem.id);
    playWebSwingSound();
  };

  const handleInsertCurrentPreview = () => {
    setSimulatorAutopilot(false);
    if (activeMockTab === 'clipboard') {
      addTimelineItem({
        name: `${selectedAsset.label}.png`,
        track: 'V1',
        color: '#ec4899',
        type: 'image',
        src: selectedAsset.src,
        assetId: selectedAsset.id,
      });
      return;
    }

    if (activeMockTab === 'capture' && captureReady) {
      addTimelineItem({
        name: 'capture_tab_snapshot.png',
        track: 'V2',
        color: '#eab308',
        type: 'capture',
      });
      return;
    }

    if (activeMockTab === 'video') {
      addTimelineItem({
        name: 'Intro Animation.mp4',
        track: 'V1',
        color: '#06b6d4',
        type: 'video',
      });
      return;
    }

    if (activeMockTab === 'replace' && selectedTimelineItemId) {
      setTimelineTracks((prev) => prev.map((item) => (
        item.id === selectedTimelineItemId
          ? {
            ...item,
            name: `${selectedAsset.label}_replacement.png`,
            color: '#22c55e',
            type: 'image',
            src: selectedAsset.src,
            assetId: selectedAsset.id,
          }
          : item
      )));
      playWebSwingSound();
    }
  };

  const handleSnapCapture = () => {
    setSimulatorAutopilot(false);
    setCaptureReady(true);
    playWebSwingSound();
  };

  const handleTimelinePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    setSimulatorAutopilot(false);
    const target = event.currentTarget;
    const lane = target.classList.contains('sv-timeline-tracks')
      ? target.querySelector<HTMLElement>('.sv-track-lane--interactive')
      : target;
    const rect = (lane || target).getBoundingClientRect();
    const nextPercent = ((event.clientX - rect.left) / rect.width) * 100;
    setPlayheadPercent(Math.min(100, Math.max(0, nextPercent)));
  };

  return (
    <div className="sv-scroll-root" ref={containerRef} onClick={handleStageClick}>
      <SEO {...universalPasteMetadata} />
      {sfxPortals}

      {/* ════════════════════════════════════════
          1. CINEMATIC 3D INTRO STAGE (SPIDERWEB PULL & 100% COVERAGE)
         ════════════════════════════════════════ */}
      {introPhase === 'video' && (
        <div
          className="sv-intro-overlay"
          ref={introOverlayRef}
          onClick={skipToMascotSequence}
          title="Click anywhere to skip intro"
        >
          <button
            type="button"
            className="sv-intro-skip-btn"
            onClick={(e) => {
              e.stopPropagation();
              skipToMascotSequence();
            }}
          >
            SKIP INTRO <FastForward size={14} style={{ display: 'inline', marginLeft: '4px' }} />
          </button>

          <div className="sv-intro-video-shell">
            <video
              className="sv-intro-video-placeholder-media"
              src={INTRO_VIDEO_SRC}
              muted
              playsInline
              autoPlay
              preload="auto"
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                if (video.duration && video.currentTime >= video.duration - 0.35) {
                  startIntroAudio();
                }
              }}
              onEnded={skipToMascotSequence}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                window.setTimeout(skipToMascotSequence, 900);
              }}
            />
            <div className="sv-intro-video-placeholder-copy" aria-hidden="true">
              <span>16:9 4K INTRO VIDEO</span>
              <small>Intro Animation.mp4</small>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          1.5. CENTER CINEMATIC YELLOW STRIP DURING MASCOT FADE IN
          ('Hero' -> Striked Out -> 'Sidekick' Incoming)
         ════════════════════════════════════════ */}
      {(introPhase === 'mascot-fade' || introPhase === 'checkered-grid') && (
        <CenterCinematicYellowStrip
          wordState={stripAnimWord}
          onSkip={skipAllToReady}
        />
      )}

      {/* ════════════════════════════════════════
          2. STICKY TOP COMIC HEADER (INCREASED SIZE)
         ════════════════════════════════════════ */}
      <header className="sv-comic-navbar" onClick={(e) => e.stopPropagation()}>
        <div className="sv-comic-navbar-inner">
          <div className="sv-comic-navbar-left">
            <Link to="/" className="sv-comic-nav-link sv-comic-nav-link--home">
              <ArrowLeft size={15} /> <span>Home</span>
            </Link>
            <Link className="sv-comic-brand" to="/plugins/universal-paste">
              <img src="/assets/universal-paste/universal-paste-transparent.png" alt="Vampro Universal Paste" />
              <span>Universal Paste</span>
            </Link>
          </div>

          <nav className="sv-comic-nav-links">
            <a href="#sv-hero" className="sv-comic-nav-link">Hero</a>
            <a href="#sv-benefits" className="sv-comic-nav-link">Benefits</a>
            <a href="#sv-how" className="sv-comic-nav-link">How It Works</a>
            <a href="#sv-workflow" className="sv-comic-nav-link">Workflow</a>
            <a href="#sv-for" className="sv-comic-nav-link">For Editors</a>
            <a href="#sv-why" className="sv-comic-nav-link">Why Vampro</a>
            <a href="#sv-faq" className="sv-comic-nav-link">FAQ</a>
            <a href="#sv-cta" className="sv-comic-nav-link">Get Plugin</a>
          </nav>

          <div className="sv-comic-navbar-actions">
            <button
              type="button"
              className="sv-comic-nav-link"
              style={{ padding: '8px 10px' }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <Link
              to="/blog"
              className="sv-comic-nav-link"
              style={{ background: '#ffffff', color: '#07080b', border: '2px solid #07080b' }}
            >
              Blogs ↗
            </Link>
            <Link
              to="/docs/plugins/universal-paste"
              className="sv-comic-nav-link"
              style={{ background: '#ffd437', color: '#07080b' }}
            >
              Docs ↗
            </Link>
          </div>
        </div>
      </header>

      {/* ── YELLOW COMING SOON BANNER JUST BELOW HEADER ── */}
      <div
        className="sv-coming-soon-banner"
        onClick={() => handleOpenWaitlist('Top Yellow Bar')}
        style={{ cursor: 'pointer' }}
      >
        <div className="sv-coming-soon-track">
          <span>⚡ PLUGIN IN PROGRESS • COMING SOON TO ADOBE PREMIERE PRO • EARLY ACCESS WAITLIST OPEN ⚡</span>
        </div>
        <button
          type="button"
          className="sv-top-banner-waitlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenWaitlist('Top Yellow Bar');
          }}
        >
          ★ JOIN WAITLIST
        </button>
      </div>

      {/* ════════════════════════════════════════
          3. VERTICAL COMIC STRIP SPREADS (ALTERNATING RED / BLACK WITH OPPOSITE BOX COLORS)
         ════════════════════════════════════════ */}
      <main className="sv-vpage-container">

        {/* ── SECTION 1: HERO (RED BACKGROUND • BLACK BOX) ── */}
        <section className="sv-vpage sv-vpage--red" id="sv-hero">
          {introPhase !== 'video' && introPhase !== 'mascot-fade' && <AmbientAlternatingComicGrid />}
          <SectionYellowPills sectionId="hero" />

          <div className={`sv-hero-bg ${introPhase === 'mascot-fade' ? 'sv-hero-bg--cinematic-fade' : ''}`}>
            <img
              src="/assets/universal-paste/superhero.png"
              alt="Superhero Background"
              className="sv-hero-bg-img"
            />
            <div className="sv-hero-bg-overlay" />
          </div>

          <div className="sv-halftone" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className={`sv-comic-panel-frame sv-comic-panel-frame--black ${introPhase !== 'ready' ? 'sv-frame-hidden-pre-entry' : ''}`}>
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>HERO</span>
              <button
                type="button"
                className="sv-header-tab-waitlist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenWaitlist('Hero Callout');
                }}
              >
                ★ JOIN WAITLIST
              </button>
            </div>

            <div className="sv-wrap">
              <div className="sv-hero-grid">
                <div>
                  <div className="sv-kicker sv-kicker-paste">
                    ★ THE ESSENTIAL EDITING WEAPON ★
                  </div>

                  <CinematicHeroTitle />

                  <p className="sv-lead" style={{ color: '#cbd2dc', textShadow: '2px 2px 0 #000' }}>
                    Copy an image, grab a GIF, paste a video URL, capture a screen, or record a window, and send it straight into your Premiere Pro timeline.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px' }}>
                    <a href="#sv-why" onClick={(e) => e.stopPropagation()}>
                      <Button variant="primary" size="lg" className="sv-interactive-glitch-elem">
                        WHY THIS PLUGIN ➔
                      </Button>
                    </a>
                    <Link to="/docs/plugins/universal-paste" onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="lg" className="sv-interactive-glitch-elem">
                        READ DOCS
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="sv-hero-comic-container">
                  <HeroLiveComicBook isActive={introPhase === 'ready'} onFlipSound={playWebSwingSound} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: BENEFITS (BLACK BACKGROUND • RED BOX) ── */}
        <section className="sv-vpage sv-vpage--noir" id="sv-benefits">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="benefits" />

          {/* Comic Halftone dots on black background */}
          <div className="sv-halftone sv-halftone--noir" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--red">
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>BENEFITS</span>
            </div>

            <div className="sv-wrap">
              <div>
                <div className="sv-kicker sv-kicker-paste" style={{ background: '#ffd437', color: '#07080b' }}>
                  ONE PLUGIN. EVERY SOURCE.
                </div>
                <h2 className="sv-glitch-title">TURN MEDIA MOMENTS INTO TIMELINE ASSETS</h2>
                <p className="sv-lead" style={{ color: '#fff' }}>
                  Universal Paste eliminates browser saves, download folder hunting, and manual import rituals.
                </p>
              </div>

              <div className="sv-comic-card-grid">
                <article className="sv-comic-card sv-interactive-glitch-elem">
                  <div className="sv-comic-card-tag">CLIPBOARD</div>
                  <h3>PASTE MEDIA DIRECTLY</h3>
                  <p>Images, GIFs, copied files, text prompts, and supported URLs become organized project assets ready for your timeline.</p>
                </article>

                <article className="sv-comic-card sv-interactive-glitch-elem">
                  <div className="sv-comic-card-tag" style={{ background: '#1d8fff', color: '#fff' }}>CAPTURE</div>
                  <h3>SCREENSHOT & RECORD</h3>
                  <p>Capture entire displays, application windows, or snipped regions through a local companion built for editor rhythm.</p>
                </article>

                <article className="sv-comic-card sv-interactive-glitch-elem">
                  <div className="sv-comic-card-tag" style={{ background: '#ffd437', color: '#07080b' }}>TIMELINE</div>
                  <h3>LESS FILE CHASING</h3>
                  <p>Imported assets land in discoverable, date-stamped project bins - sent straight to playhead with zero drag-and-drop friction.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: HOW IT WORKS (RED BACKGROUND • BLACK BOX) ── */}
        <section className="sv-vpage sv-vpage--red" id="sv-how">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="how" />

          <div className="sv-halftone" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--black">
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>HOW IT WORKS</span>
            </div>

            <div className="sv-wrap">
              <div>
                <div className="sv-kicker sv-kicker-paste" style={{ background: '#ffd437', color: '#07080b' }}>
                  FLOW
                </div>
                <h2 className="sv-glitch-title">THE 5-STEP WORKFLOW</h2>
                <p className="sv-lead">
                  The flow is intentionally simple: capture or fetch, preview, then place it where your cut needs it.
                </p>
              </div>

              <div className="sv-steps-grid">
                {[
                  { n: '1', title: 'Copy', desc: 'Copy a URL, image, GIF, video reference, or file.' },
                  { n: '2', title: 'Detect', desc: 'The companion reads clipboard and URL content locally.' },
                  { n: '3', title: 'Capture', desc: 'Take screenshots or window recordings on demand.' },
                  { n: '4', title: 'Preview', desc: 'Confirm the asset before it enters your Premiere project.' },
                  { n: '5', title: 'Create', desc: 'Import to bin or place directly into the active timeline.' },
                ].map((step) => (
                  <div className="sv-step-card sv-interactive-glitch-elem" key={step.n}>
                    <div className="sv-step-num">{step.n}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION: WORKFLOW SHOWCASE (BLACK BACKGROUND • RED BOX) ── */}
        <section className="sv-vpage sv-vpage--noir sv-vpage--workflow" id="sv-workflow">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="workflow" />

          {/* Comic Halftone dots on black background */}
          <div className="sv-halftone sv-halftone--noir" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--red">
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>COPY, CAPTURE, PASTE, REPLACE</span>
            </div>

            <div className="sv-wrap">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  className="sv-kicker sv-kicker-paste"
                  style={{ margin: '0 auto 12px', background: '#ffd437', color: '#07080b' }}
                >
                  ★ 5-PART POWER WORKFLOW ★
                </div>
                <h2 className="sv-glitch-title" style={{ margin: '0 auto 12px' }}>
                  COPY, CAPTURE, PASTE, REPLACE
                </h2>
                <p className="sv-lead" style={{ margin: '0 auto', color: '#cbd2dc', maxWidth: '720px' }}>
                  Watch how fast you can ingest URLs, grab screen clips, paste clipboard assets, and replace timeline cuts without ever breaking your creative flow.
                </p>
              </div>

              <WorkflowSlideshow />
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FOR EDITORS (BLACK BACKGROUND • RED BOX) ── */}
        <section className="sv-vpage sv-vpage--noir" id="sv-for">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="for" />

          {/* Comic Halftone dots on black background */}
          <div className="sv-halftone sv-halftone--noir" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--red">
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>FOR EDITORS</span>
            </div>

            <div className="sv-wrap">
              <div>
                <div className="sv-kicker sv-kicker-paste" style={{ background: '#07080b', color: '#fff' }}>
                  AUDIENCE
                </div>
                <h2 className="sv-glitch-title">TAILORED FOR FAST-TURN CREATORS</h2>
                <p className="sv-lead" style={{ color: '#fff' }}>
                  Built for editors who keep moving between research, reference, screen capture, browser media, and the timeline.
                </p>
              </div>

              <div className="sv-audience-grid">
                {[
                  { title: 'Video Editors', desc: 'Pull visual references, screenshots, overlays, and quick inserts into projects faster.' },
                  { title: 'Content Teams', desc: 'Reduce handoffs when social, product, and web references need to become edit material.' },
                  { title: 'Tutorial Creators', desc: 'Capture screens, app windows, and snippets without leaving the editing rhythm.' },
                  { title: 'Fast-Turn Editors', desc: 'Move from idea to timeline when deadlines leave no room for import rituals.' },
                ].map((item) => (
                  <div className="sv-comic-card sv-interactive-glitch-elem" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: WHY VAMPRO (RED BACKGROUND • BLACK BOX) ── */}
        <section className="sv-vpage sv-vpage--red sv-vpage--why" id="sv-why">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="why" />

          <div className="sv-halftone" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--black">
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>WHY VAMPRO</span>
            </div>

            <div className="sv-wrap">
              <div className="sv-split-grid sv-split-grid--enlarged">
                {/* Left Column: Enlarged UXP Companion Inspector with Real Comic Speech Bubble Callout */}
                <div className="sv-why-left-col">
                  <div
                    className="sv-inspector-panel sv-inspector-panel--enlarged sv-interactive-glitch-elem"
                    onClick={(e) => e.stopPropagation()}
                    onPointerDownCapture={() => setSimulatorAutopilot(false)}
                  >
                    <div className="sv-inspector-header">
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span className="sv-dot sv-dot--red" />
                        <span className="sv-dot sv-dot--yellow" />
                        <span className="sv-dot sv-dot--blue" />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#07080b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        UXP Companion Lab • Live Simulator
                      </span>
                      <button
                        type="button"
                        className="sv-interactive-reset-btn"
                        onClick={handleResetCompanion}
                        title="Reset current tab simulator"
                      >
                        <RotateCcw size={12} style={{ display: 'inline', marginRight: '4px' }} /> RESET
                      </button>
                    </div>

                    <div className="sv-inspector-body">
                      {!simulatorStarted ? (
                        <div className="sv-simulator-intro-screen">
                          <img src="/assets/universal-paste/universal-paste-transparent.png" alt="Vampro Paste" />
                          <p>This tab is interactive. Click Start to try the paste workflow.</p>
                          <Button variant="primary" size="sm" onClick={handleStartSimulator}>
                            Start
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="sv-mock-tabs">
                            <button
                              type="button"
                              className={`sv-mock-tab ${activeMockTab === 'clipboard' ? 'active' : ''}`}
                              onClick={() => setActiveMockTab('clipboard')}
                            >
                              <Copy size={12} style={{ display: 'inline', marginRight: '4px' }} /> Clipboard
                            </button>
                            <button
                              type="button"
                              className={`sv-mock-tab ${activeMockTab === 'capture' ? 'active' : ''}`}
                              onClick={() => setActiveMockTab('capture')}
                            >
                              <Scissors size={12} style={{ display: 'inline', marginRight: '4px' }} /> Capture
                            </button>
                            <button
                              type="button"
                              className={`sv-mock-tab ${activeMockTab === 'video' ? 'active' : ''}`}
                              onClick={() => setActiveMockTab('video')}
                            >
                              <Video size={12} style={{ display: 'inline', marginRight: '4px' }} /> Video
                            </button>
                            <button
                              type="button"
                              className={`sv-mock-tab ${activeMockTab === 'replace' ? 'active' : ''}`}
                              onClick={() => setActiveMockTab('replace')}
                            >
                              <RefreshCw size={12} style={{ display: 'inline', marginRight: '4px' }} /> Replace
                            </button>
                          </div>

                          <div className="sv-mock-preview sv-mock-preview--interactive">
                            {activeMockTab === 'clipboard' && (
                              <div className="sv-preview-loaded-card sv-preview-loaded-card--large">
                                <div className="sv-preview-img-wrap sv-preview-img-wrap--large">
                                  <img src={selectedAsset.src} alt={selectedAsset.label} />
                                </div>
                                <div className="sv-preview-meta">
                                  <span className="sv-tag-badge">IMAGE/PNG • READY</span>
                                  <strong>{selectedAsset.label}.png</strong>
                                  <span style={{ color: '#4ade80' }}>Place at {Math.round(playheadPercent)}%</span>
                                </div>
                              </div>
                            )}

                            {activeMockTab === 'capture' && (
                              <div className="sv-preview-content">
                                {captureReady ? (
                                  <div className="sv-capture-snapshot-preview">
                                    <div className="sv-capture-window-bar">
                                      <span>capture.tab</span>
                                      <span>SNAPPED</span>
                                    </div>
                                    <div className="sv-capture-window-body">
                                      <div className="sv-capture-reticle" />
                                      <div className="sv-capture-mini-card" />
                                      <div className="sv-capture-mini-card sv-capture-mini-card--wide" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="sv-preview-idle">
                                    <span className="sv-idle-pulse">[Capture]: Ready to snap this tab window.</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {activeMockTab === 'video' && (
                              <div className="sv-video-preview">
                                <video src={SIMULATOR_VIDEO_SRC} muted loop autoPlay playsInline controls />
                              </div>
                            )}

                            {activeMockTab === 'replace' && (
                              <div className="sv-preview-loaded-card sv-preview-loaded-card--large">
                                <div className="sv-preview-img-wrap sv-preview-img-wrap--large">
                                  <img src={selectedAsset.src} alt={selectedAsset.label} />
                                </div>
                                <div className="sv-preview-meta">
                                  <span className="sv-tag-badge" style={{ background: '#4ade80', color: '#07080b' }}>REPLACE SOURCE</span>
                                  <strong>{selectedAsset.label}.png</strong>
                                  <span style={{ color: selectedTimelineItem ? '#4ade80' : '#ffd437' }}>
                                    {selectedTimelineItem ? `Target: ${selectedTimelineItem.name}` : 'Select a timeline item'}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="sv-asset-picker-row">
                            {SIMULATOR_ASSETS.map((asset) => (
                              <button
                                key={asset.id}
                                type="button"
                                className={`sv-asset-pick ${selectedAssetId === asset.id ? 'active' : ''}`}
                                onClick={() => setSelectedAssetId(asset.id)}
                                title={asset.label}
                              >
                                <img src={asset.src} alt={asset.label} />
                              </button>
                            ))}
                          </div>

                          <div className="sv-simulator-action-row">
                            {activeMockTab === 'capture' && (
                              <Button variant={captureReady ? 'outline' : 'primary'} size="sm" onClick={handleSnapCapture}>
                                Snap Region
                              </Button>
                            )}
                            <Button
                              variant="red"
                              size="sm"
                              onClick={handleInsertCurrentPreview}
                              disabled={(activeMockTab === 'capture' && !captureReady) || (activeMockTab === 'replace' && !selectedTimelineItemId)}
                            >
                              {activeMockTab === 'replace' ? 'Confirm Swap' : 'Add to Timeline'}
                            </Button>
                          </div>

                          <div className="sv-simulated-timeline">
                            <div className="sv-timeline-top-bar">
                              <span style={{ color: '#ffd437', fontWeight: 900 }}>PREMIERE PRO TIMELINE</span>
                              <span className="sv-timeline-timecode">PLAYHEAD {Math.round(playheadPercent)}%</span>
                            </div>

                            <div className="sv-playhead-ruler" onPointerDown={handleTimelinePointer}>
                              <div className="sv-playhead-ruler-line" />
                              <div className="sv-playhead-ruler-cap" style={{ left: `${playheadPercent}%` }} />
                              <span>00:00</span>
                              <span>00:10</span>
                              <span>00:20</span>
                            </div>

                            <div
                              className="sv-timeline-tracks"
                              onPointerDown={(event) => {
                                event.currentTarget.setPointerCapture(event.pointerId);
                                handleTimelinePointer(event);
                              }}
                              onPointerMove={(event) => {
                                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                                  handleTimelinePointer(event);
                                }
                              }}
                              onPointerUp={(event) => {
                                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                                  event.currentTarget.releasePointerCapture(event.pointerId);
                                }
                              }}
                            >
                              <div className="sv-timeline-playhead-line" style={{ left: `${playheadPercent}%` }} />
                              <div className="sv-track-row">
                                <div className="sv-track-header">V2</div>
                                <div className="sv-track-lane sv-track-lane--interactive">
                                  {timelineTracks.filter((t) => t.track === 'V2').map((item) => (
                                    <button
                                      key={item.id}
                                      type="button"
                                      className={`sv-timeline-block sv-timeline-block--placed ${selectedTimelineItemId === item.id ? 'active' : ''}`}
                                      style={{ background: item.color, left: `${item.position}%` }}
                                      onPointerDown={(event) => event.stopPropagation()}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setSelectedTimelineItemId(item.id);
                                      }}
                                    >
                                      {item.src && <img src={item.src} alt="" />}
                                      <span>{item.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="sv-track-row">
                                <div className="sv-track-header">V1</div>
                                <div className="sv-track-lane sv-track-lane--interactive">
                                  {timelineTracks.filter((t) => t.track === 'V1').map((item) => (
                                    <button
                                      key={item.id}
                                      type="button"
                                      className={`sv-timeline-block sv-timeline-block--placed ${selectedTimelineItemId === item.id ? 'active' : ''}`}
                                      style={{ background: item.color, left: `${item.position}%` }}
                                      onPointerDown={(event) => event.stopPropagation()}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setSelectedTimelineItemId(item.id);
                                      }}
                                    >
                                      {item.src && <img src={item.src} alt="" />}
                                      <span>{item.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: 4 Boxes in 2x2 Grid */}
                <div className="sv-why-info-col">
                  <div>
                    <div className="sv-kicker sv-kicker-paste">WHY THIS PLUGIN?</div>
                    <h2 className="sv-glitch-title" style={{ fontSize: 'clamp(24px, 4vw, 42px)', marginBottom: '16px' }}>
                      EDITING SHOULD NOT PAUSE FOR FILE LOGISTICS.
                    </h2>
                  </div>

                  {/* 2x2 Grid: 2 on top, 2 on bottom */}
                  <div className="sv-why-2x2-grid">
                    <div className="sv-comic-card sv-why-card sv-interactive-glitch-elem">
                      <div className="sv-comic-card-tag" style={{ background: 'var(--comic-yellow)', color: '#07080b' }}>
                        UNIFIED
                      </div>
                      <h3>Universal Ingestion</h3>
                      <p>Single unified workflow for clipboard, capture, URLs, images, GIFs, and videos.</p>
                    </div>

                    <div className="sv-comic-card sv-why-card sv-interactive-glitch-elem">
                      <div className="sv-comic-card-tag" style={{ background: '#1d8fff', color: '#fff' }}>
                        ZERO LAG
                      </div>
                      <h3>Lightweight Engine</h3>
                      <p>Local companion handles heavy fetching and encoding while Premiere stays snappy.</p>
                    </div>

                    <div className="sv-comic-card sv-why-card sv-interactive-glitch-elem">
                      <div className="sv-comic-card-tag" style={{ background: '#ff00aa', color: '#fff' }}>
                        HYGIENE
                      </div>
                      <h3>Automated Bins</h3>
                      <p>Assets are organized in structured date-stamped folders for instant search.</p>
                    </div>

                    <div className="sv-comic-card sv-why-card sv-interactive-glitch-elem">
                      <div className="sv-comic-card-tag" style={{ background: '#4ade80', color: '#07080b' }}>
                        DIRECT
                      </div>
                      <h3>Playhead Drop</h3>
                      <p>Media lands right at your playhead on Track V1/V2 with zero drag-and-drop friction.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: INSTALLATION & SETUP (BLACK BACKGROUND • RED BOX) ── */}
        <section className="sv-vpage sv-vpage--noir sv-vpage--setup" id="sv-setup">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="setup" />

          {/* Comic Halftone dots on black background */}
          <div className="sv-halftone sv-halftone--noir" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--red">
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>INSTALL & SETUP</span>
            </div>

            <div className="sv-wrap">
              <div>
                <div className="sv-kicker sv-kicker-paste" style={{ background: '#07080b', color: '#fff' }}>
                  SETUP
                </div>
                <h2 className="sv-glitch-title">READY IN THREE FAST STEPS</h2>
                <p className="sv-lead" style={{ color: '#fff' }}>
                  Install the plugin, launch the companion app, and keep the full paste pipeline running locally.
                </p>
              </div>

              <div className="sv-setup-grid">
                {[
                  {
                    n: '1',
                    tag: 'ADOBE EXCHANGE',
                    title: 'Install the Plugin',
                    desc: 'Install Universal Paste from Adobe Exchange and enable it inside Premiere Pro.',
                  },
                  {
                    n: '2',
                    tag: 'WINDOWS STORE',
                    title: 'Run the Companion',
                    desc: 'Install and run the companion app from the Windows Store so clipboard, capture, and media handling stay available.',
                  },
                  {
                    n: '3',
                    tag: 'OFFLINE ENGINE',
                    title: 'Paste at Full Speed',
                    desc: 'The entire package is processed offline with ultra fast local processing.',
                  },
                ].map((step) => (
                  <article className="sv-setup-card sv-interactive-glitch-elem" key={step.n}>
                    <div className="sv-setup-num">{step.n}</div>
                    <div className="sv-comic-card-tag">{step.tag}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: FAQ & INTEL (RED BACKGROUND • BLACK BOX) ── */}
        <section className="sv-vpage sv-vpage--red" id="sv-faq">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="faq" />

          <div className="sv-halftone" />
          <div className="sv-speed-lines" />
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--black">
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>FAQ & INTEL</span>
            </div>

            <div className="sv-wrap">
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div className="sv-kicker sv-kicker-paste" style={{ margin: '0 auto 12px', background: '#ffd437', color: '#07080b' }}>
                  ★ ANSWERS & INTEL ★
                </div>
                <h2 className="sv-glitch-title sv-glitch-title--faq">FREQUENTLY ASKED QUESTIONS</h2>
                <p className="sv-lead" style={{ color: '#cbd2dc', maxWidth: '720px', margin: '0 auto' }}>
                  Direct answers to how Universal Paste operates with Adobe Premiere Pro, supported media, file handling, and workflow automation.
                </p>
              </div>

              <div className="sv-faq-container">
                {UNIVERSAL_PASTE_FAQS.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <article key={idx} className={`sv-faq-item ${isOpen ? 'sv-faq-item--open' : ''}`}>
                      <button
                        type="button"
                        className="sv-faq-question-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenFaqIndex(isOpen ? null : idx);
                        }}
                        aria-expanded={isOpen}
                      >
                        <span>{item.q}</span>
                        <span className="sv-faq-badge">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="sv-faq-answer">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: CTA (BLACK BACKGROUND • RED BOX) ── */}
        <section className="sv-vpage sv-vpage--noir" id="sv-cta">
          <AmbientAlternatingComicGrid />
          <SectionYellowPills sectionId="cta" />

          {/* Comic Halftone dots on black background */}
          <div className="sv-halftone sv-halftone--noir" />
          <div className="sv-speed-lines" />

          {/* Section-level Spiderweb Transition Overlay (Bottom-aligned) */}
          <SectionSpiderwebOverlay />

          <div className="sv-comic-panel-frame sv-comic-panel-frame--red">
            {/* Box Internal Halftone Dots Layer */}
            <div className="sv-box-halftone-dots" />

            <div className="sv-panel-header-tab">
              <span>GET PLUGIN</span>
            </div>

            <div className="sv-wrap">
              <div className="sv-cta-box">
                <div className="sv-kicker sv-kicker-paste" style={{ margin: '0 auto 16px', background: '#ffd437', color: '#07080b' }}>
                  GET STARTED
                </div>
                <h2 className="sv-glitch-title" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
                  PASTE THE WEB INTO YOUR EDIT.
                </h2>
                <p className="sv-lead" style={{ margin: '0 auto 36px', color: '#ffd437' }}>
                  Vampro Universal Paste gives Premiere Pro editors a faster bridge between what they find, what they capture, and what they create.
                </p>

                <div className="sv-cta-btn-group" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <Link to="/docs/plugins/universal-paste" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="lg" className="sv-interactive-glitch-elem">
                      EXPLORE SETUP & WORKFLOWS ➔
                    </Button>
                  </Link>
                  <Link to="/blog" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="sv-interactive-glitch-elem"
                      style={{
                        background: '#ffd437',
                        color: '#07080b',
                        borderColor: '#07080b',
                        borderWidth: '2px',
                        fontWeight: 900,
                        boxShadow: '3px 3px 0 #07080b'
                      }}
                    >
                      READ BLOGS ➔
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    size="lg"
                    className="sv-interactive-glitch-elem sv-cta-waitlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenWaitlist('Bottom CTA');
                    }}
                  >
                    ★ JOIN THE WAITLIST ➔
                  </Button>
                </div>
              </div>

              <footer className="sv-footer">
                <div className="sv-footer-inner">
                  <span>© 2026 Vampro. All rights reserved. Vampro Universal Paste for Adobe Premiere Pro.</span>
                  <div className="sv-footer-links">
                    <Link to="/docs/plugins/universal-paste">Docs</Link>
                    <Link to="/blog">Blogs</Link>
                    <Link to="/plugins/universal-paste/licenses">Licenses</Link>
                    <Link to="/plugins/universal-paste/terms">Terms</Link>
                    <Link to="/plugins/universal-paste/privacy">Privacy</Link>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UniversalPaste;
