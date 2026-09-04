import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Copy,
  Video,
  Scissors,
  RefreshCw,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import './WorkflowSlideshow.css';

export interface WorkflowCardItem {
  id: string;
  stepNum: string;
  stepBadge: string;
  title: string;
  desc: string;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  youtubeId?: string;
  accentColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const WORKFLOW_CARDS: WorkflowCardItem[] = [
  {
    id: 'clipboard',
    stepNum: '01',
    stepBadge: 'STEP 1',
    title: 'Clipboard',
    desc: 'Copy an image, GIF or URL, set the clip duration and paste it into your timeline in seconds',
    mediaType: 'image',
    mediaSrc: '/assets/universal-paste/STEP 1.png',
    accentColor: '#ffd437', // Comic Yellow
    icon: Copy,
  },
  {
    id: 'video',
    stepNum: '02',
    stepBadge: 'STEP 2',
    title: 'Video',
    desc: 'Copy a video URL (YouTube, Vimeo, Reddit, etc), and simply paste the link to directly download and insert it into your timeline',
    mediaType: 'image',
    mediaSrc: '/assets/universal-paste/STEP 2.png',
    accentColor: '#1d8fff', // Comic Blue
    icon: Video,
  },
  {
    id: 'capture',
    stepNum: '03',
    stepBadge: 'STEP 3',
    title: 'Capture',
    desc: 'Record specific tabs or screens, either full screen or selected area with or without audio and directly insert into your timeline.',
    mediaType: 'image',
    mediaSrc: '/assets/universal-paste/STEP 3.png',
    accentColor: '#ff00aa', // Comic Magenta
    icon: Scissors,
  },
  {
    id: 'replace',
    stepNum: '04',
    stepBadge: 'STEP 4',
    title: 'Replace',
    desc: 'Click any timeline clip and replace it with the asset copied in the clipboard. Need to replace an image with a video, you can do it in seconds.',
    mediaType: 'image',
    mediaSrc: '/assets/universal-paste/STEP 4.png',
    accentColor: '#00d4ff', // Comic Cyan
    icon: RefreshCw,
  },
  {
    id: 'action',
    stepNum: '05',
    stepBadge: 'WALKTHROUGH',
    title: 'See it in action',
    desc: 'The complete walkthrough captured for you.',
    mediaType: 'video',
    mediaSrc: 'https://www.youtube-nocookie.com/embed/sBH96I9fajo?rel=0&modestbranding=1&enablejsapi=1',
    youtubeId: 'sBH96I9fajo',
    accentColor: '#ed1c24', // Comic Red
    icon: Play,
  },
];

const AUTOSCROLL_DURATION_MS = 3000;

interface WorkflowSlideshowProps {
  onCardChange?: (index: number) => void;
}

export const WorkflowSlideshow: React.FC<WorkflowSlideshowProps> = ({ onCardChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Switch to slide
  const goToSlide = useCallback((index: number) => {
    const nextIndex = (index + WORKFLOW_CARDS.length) % WORKFLOW_CARDS.length;
    setActiveIndex(nextIndex);
    onCardChange?.(nextIndex);

    // Scroll active card into view on small screens
    const targetCard = cardRefs.current[nextIndex];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [onCardChange]);

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Autoscroll timer: 3 sec pause per card
  useEffect(() => {
    if (isPaused || isUserHovering) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOSCROLL_DURATION_MS);

    return () => clearInterval(timer);
  }, [isPaused, isUserHovering, activeIndex, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (deltaX > 45) {
        // Swiped left -> next
        nextSlide();
      } else if (deltaX < -45) {
        // Swiped right -> prev
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeCard = WORKFLOW_CARDS[activeIndex];

  return (
    <div
      className="sv-workflow-slideshow"
      onMouseEnter={() => setIsUserHovering(true)}
      onMouseLeave={() => setIsUserHovering(false)}
    >
      {/* ─── 1. TOP 16:9 MEDIA STAGE (PREVIEW MONITOR) ─── */}
      <div
        className="sv-workflow-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Stage Header Banner */}
        <div className="sv-workflow-stage-bar">
          <div className="sv-workflow-stage-bar-left">
            <span className="sv-workflow-monitor-badge">
              <span className={`sv-workflow-pulse-dot ${isPaused || isUserHovering ? 'paused' : ''}`} />
              {isPaused ? 'AUTOPLAY PAUSED' : isUserHovering ? 'HOVER PAUSED' : 'AUTOPLAY 3s'}
            </span>
            <span className="sv-workflow-step-indicator" style={{ color: activeCard.accentColor }}>
              {activeCard.stepBadge} // {activeCard.title.toUpperCase()}
            </span>
          </div>

          <div className="sv-workflow-stage-bar-right">
            <span className="sv-workflow-counter">
              CARD {activeIndex + 1} OF {WORKFLOW_CARDS.length}
            </span>

            <button
              type="button"
              className="sv-workflow-ctrl-btn"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume Autoplay' : 'Pause Autoplay'}
              aria-label={isPaused ? 'Resume Autoplay' : 'Pause Autoplay'}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>

            <button
              type="button"
              className="sv-workflow-ctrl-btn"
              onClick={prevSlide}
              title="Previous Card"
              aria-label="Previous Card"
            >
              <ChevronLeft size={14} />
            </button>

            <button
              type="button"
              className="sv-workflow-ctrl-btn"
              onClick={nextSlide}
              title="Next Card"
              aria-label="Next Card"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Viewport Display (16:9 Aspect Ratio) */}
        <div className="sv-workflow-viewport">
          {/* Subtle CRT / Halftone screen scanline overlay */}
          <div className="sv-workflow-scanlines" aria-hidden="true" />

          {/* Render Media */}
          {activeCard.mediaType === 'image' ? (
            <div className="sv-workflow-image-container" key={activeCard.id}>
              <img
                src={activeCard.mediaSrc}
                alt={`${activeCard.title} - ${activeCard.desc}`}
                className="sv-workflow-image"
                loading="eager"
                decoding="async"
              />
              <div className="sv-workflow-image-overlay">
                <span className="sv-workflow-image-tag" style={{ background: activeCard.accentColor }}>
                  {activeCard.stepBadge}
                </span>
                <span className="sv-workflow-image-caption">
                  {activeCard.title}: {activeCard.desc}
                </span>
              </div>
            </div>
          ) : (
            <div className="sv-workflow-video-container" key={activeCard.id}>
              <iframe
                src={activeCard.mediaSrc}
                title="Vampro Universal Paste - Full Walkthrough Video"
                className="sv-workflow-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="sv-workflow-video-overlay-bar">
                <span className="sv-workflow-image-tag" style={{ background: activeCard.accentColor }}>
                  ★ WALKTHROUGH
                </span>
                <span className="sv-workflow-image-caption">
                  {activeCard.desc}
                </span>
                <a
                  href="https://youtu.be/sBH96I9fajo?si=5UYx7SEz2SpjKgzG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sv-workflow-yt-external-btn"
                  title="Watch on YouTube"
                >
                  Watch on YouTube <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* Floating Left / Right Chevrons */}
          <button
            type="button"
            className="sv-workflow-arrow sv-workflow-arrow--left"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            className="sv-workflow-arrow sv-workflow-arrow--right"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dynamic bottom caption badge */}
        <div className="sv-workflow-stage-footer">
          <div className="sv-workflow-stage-footer-icon" style={{ background: activeCard.accentColor }}>
            <activeCard.icon size={16} />
          </div>
          <div className="sv-workflow-stage-footer-text">
            <strong>{activeCard.title}:</strong> {activeCard.desc}
          </div>
        </div>
      </div>

      {/* ─── 2. THE 5 INTERACTIVE CARDS RAIL / GRID ─── */}
      <div className="sv-workflow-cards-track">
        {WORKFLOW_CARDS.map((card, index) => {
          const isActive = index === activeIndex;
          const IconComponent = card.icon;

          return (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`sv-workflow-card ${isActive ? 'sv-workflow-card--active' : ''}`}
              onClick={() => goToSlide(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToSlide(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-selected={isActive}
              aria-label={`Card ${index + 1}: ${card.title}`}
              style={{
                '--card-accent': card.accentColor,
              } as React.CSSProperties}
            >
              {/* Card Top Row: Number badge & Tag */}
              <div className="sv-workflow-card-top">
                <span className="sv-workflow-card-num">{card.stepNum}</span>
                <span className="sv-workflow-card-tag" style={{ background: card.accentColor }}>
                  {card.stepBadge}
                </span>
                <div className="sv-workflow-card-icon-wrap" style={{ borderColor: card.accentColor }}>
                  <IconComponent size={14} />
                </div>
              </div>

              {/* Card Title */}
              <h3 className="sv-workflow-card-title">
                {card.title}
                {isActive && <CheckCircle2 size={14} className="sv-workflow-card-active-check" />}
              </h3>

              {/* Card Description */}
              <p className="sv-workflow-card-desc">
                {card.desc}
              </p>

              {/* 3-Second Countdown Progress Bar (Active Card Only) */}
              <div className="sv-workflow-progress-track">
                {isActive ? (
                  <div
                    key={`progress-${index}-${isPaused || isUserHovering}`}
                    className={`sv-workflow-progress-fill ${isPaused || isUserHovering ? 'paused' : ''}`}
                    style={{ background: card.accentColor }}
                  />
                ) : (
                  <div className="sv-workflow-progress-inactive" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 3. MOBILE PAGINATION DOTS ─── */}
      <div className="sv-workflow-dots-nav" aria-label="Slideshow pagination">
        {WORKFLOW_CARDS.map((card, index) => (
          <button
            key={card.id}
            type="button"
            className={`sv-workflow-dot ${index === activeIndex ? 'sv-workflow-dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${card.title}`}
            style={{
              backgroundColor: index === activeIndex ? card.accentColor : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkflowSlideshow;
