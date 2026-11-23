import { useEffect, useRef, useState } from 'react';
import { Maximize2, Pause, Play, SkipBack, SkipForward, X } from 'lucide-react';
import { gallery, galleryAssets as assetPath, type GalleryItem } from './darshanGalleryMedia';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const featuredProjects = [
  { file: 'cross-cut-aerial.mp4', tab: 'AI Video' },
  { file: 'aerial-court.mp4', tab: 'Aerial', startAt: 14.6 },
  { file: 'xfactor-intro-loop.mp4', tab: 'Events' },
  { file: 'green-screen-rig.mp4', tab: 'On set' },
  { file: 'property-film.mp4', tab: 'Ad film' },
].map((project) => ({ ...project, index: gallery.findIndex((item) => item.video === project.file) }));

function GalleryImage({ item, lazy = false }: { item: GalleryItem; lazy?: boolean }) {
  return (
    <img
      src={`${assetPath}/${item.poster}`}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      draggable={false}
    />
  );
}

function GalleryPreview({ item, playing }: { item: GalleryItem; playing: boolean }) {
  if (!item.video || !playing) return <GalleryImage item={item} lazy />;

  return (
    <video
      src={`${assetPath}/${item.video}`}
      poster={`${assetPath}/${item.poster}`}
      width={item.width}
      height={item.height}
      aria-hidden="true"
      preload="none"
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

export default function DarshanGallery() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);
  const offsetRef = useRef(0);
  const targetNudgeRef = useRef(0);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const [playing, setPlaying] = useState(() => !window.matchMedia(reducedMotionQuery).matches);
  const [visible, setVisible] = useState(false);
  const [featureVisible, setFeatureVisible] = useState(false);
  const [featured, setFeatured] = useState(0);
  const [nearbyTiles, setNearbyTiles] = useState<ReadonlySet<string>>(() => new Set());
  const [selection, setSelection] = useState<{ index: number; startAt?: number } | null>(null);
  const viewerItem = selection && gallery[selection.index];
  const viewerSource = viewerItem?.playback && `${assetPath}/${viewerItem.playback}${selection?.startAt ? `#t=${selection.startAt}` : ''}`;
  const animateTiles = playing && visible && selection === null;
  const project = featuredProjects[featured];
  const featuredItem = gallery[project.index];
  const featureIsWide = featuredItem.width > featuredItem.height * 2.1;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(viewport);
    const featureObserver = new IntersectionObserver(([entry]) => setFeatureVisible(entry.isIntersecting), { threshold: .15 });
    if (featureRef.current) featureObserver.observe(featureRef.current);
    const motionObserver = new IntersectionObserver((entries) => {
      setNearbyTiles((previous) => {
        const next = new Set(previous);
        for (const entry of entries) {
          const key = entry.target.getAttribute('data-motion-tile');
          if (key === null) continue;
          if (entry.isIntersecting) next.add(key);
          else next.delete(key);
        }
        return next;
      });
    }, { root: viewport, rootMargin: '0px 260px' });
    viewport.querySelectorAll('[data-motion-tile]').forEach((tile) => motionObserver.observe(tile));
    const preference = window.matchMedia(reducedMotionQuery);
    const updateMotion = (event: MediaQueryListEvent) => setPlaying(!event.matches);
    preference.addEventListener('change', updateMotion);

    return () => {
      observer.disconnect();
      featureObserver.disconnect();
      motionObserver.disconnect();
      preference.removeEventListener('change', updateMotion);
    };
  }, []);

  // Smooth GPU-composited continuously running gallery loop (no subpixel scrollLeft stalling)
  useEffect(() => {
    const track = trackRef.current;
    const strip = stripRef.current;
    if (!track || !strip) return;

    let stripWidth = strip.offsetWidth;
    let previous: number | undefined;
    const observer = new ResizeObserver(() => {
      stripWidth = strip.offsetWidth;
    });
    observer.observe(strip);

    const wrapOffset = (val: number) => {
      if (!stripWidth) return 0;
      return ((val % stripWidth) + stripWidth) % stripWidth;
    };

    const tick = (time: number) => {
      const dt = previous === undefined ? 0 : Math.min(time - previous, 50);
      previous = time;

      let moved = false;

      // Smoothly ease any manual prev/next nudge
      if (Math.abs(targetNudgeRef.current) > 0.3) {
        const step = targetNudgeRef.current * Math.min(1, dt * 0.012);
        offsetRef.current = wrapOffset(offsetRef.current + step);
        targetNudgeRef.current -= step;
        moved = true;
      } else if (targetNudgeRef.current !== 0) {
        offsetRef.current = wrapOffset(offsetRef.current + targetNudgeRef.current);
        targetNudgeRef.current = 0;
        moved = true;
      }

      // Continuous motion: slows gently on hover, pauses when user pauses or focuses
      if (animateTiles && !focusedRef.current && stripWidth) {
        const speed = hoveredRef.current ? 0.018 : 0.068; // ~68px/s continuous reel, gentle slow-mo on hover
        offsetRef.current = wrapOffset(offsetRef.current + dt * speed);
        moved = true;
      }

      if (moved) {
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    let frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [animateTiles]);

  function browse(direction: -1 | 1) {
    targetNudgeRef.current += direction * 380;
  }

  useEffect(() => {
    activeThumbnailRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }, [selection]);

  function openViewer(index: number, startAt?: number) {
    setSelection({ index, startAt });
    dialogRef.current?.showModal();
  }

  function browseViewer(direction: -1 | 1) {
    setSelection((current) => current && { index: (current.index + direction + gallery.length) % gallery.length });
  }

  function stepFeatured(direction: -1 | 1) {
    setFeatured((prev) => (prev + direction + featuredProjects.length) % featuredProjects.length);
  }

  function renderTile(item: GalleryItem, index: number, duplicate: boolean) {
    const tileKey = duplicate ? `repeat-${index}` : String(index);
    const shape = item.width < item.height ? 'portrait' : item.width > item.height * 2.1 ? 'wide' : 'landscape';

    return (
      <div
        className={`darshan-gallery-tile darshan-gallery-tile--${shape}`}
        key={`${duplicate ? 'dup' : 'orig'}-${item.poster}`}
        data-motion-tile={item.video ? tileKey : undefined}
      >
        <span className="darshan-gallery-frame">
          <GalleryPreview item={item} playing={animateTiles && nearbyTiles.has(tileKey)} />
          {item.video && <Play size={15} className="darshan-gallery-video-mark" aria-hidden="true" />}
        </span>
      </div>
    );
  }

  return (
    <section className="darshan-work" id="darshan-work" aria-labelledby="darshan-work-title" data-reveal>
      <div className="darshan-container">
        <div className="darshan-selected-header">
          <h2 id="darshan-work-title">Selected work</h2>
          <div className="darshan-feature-tabs" role="group" aria-label="Featured work">
            {featuredProjects.map(({ tab }, index) => (
              <button
                key={tab}
                type="button"
                aria-pressed={featured === index}
                onClick={() => setFeatured(index)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="darshan-feature">
          <div className="darshan-feature-copy">
            <div className="darshan-feature-meta">
              <span className="darshan-feature-index">0{featured + 1} / 0{featuredProjects.length}</span>
              <span className="darshan-feature-tag">{project.tab}</span>
            </div>
            <div className="darshan-feature-title-block">
              <h3 key={featuredItem.poster}>{featuredItem.caption}</h3>
            </div>
            <div className="darshan-feature-footer">
              <div className="darshan-feature-nav" role="group" aria-label="Switch selected project">
                <button type="button" aria-label="Previous selected project" onClick={() => stepFeatured(-1)}>
                  <SkipBack size={15} />
                </button>
                <button type="button" aria-label="Next selected project" onClick={() => stepFeatured(1)}>
                  <SkipForward size={15} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            ref={featureRef}
            className={`darshan-feature-media${featureIsWide ? ' darshan-feature-media--wide' : ''}`}
            aria-label={`View ${featuredItem.caption}`}
            onClick={() => openViewer(project.index, project.startAt)}
          >
            <GalleryPreview item={featuredItem} playing={playing && featureVisible && selection === null} />
            <Maximize2 size={16} className="darshan-gallery-expand" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="darshan-container darshan-work-heading">
        <h3>Featured work</h3>
        <div className="darshan-gallery-controls" role="group" aria-label="Gallery controls">
          <button type="button" aria-label="Previous gallery item" onClick={() => browse(-1)}><SkipBack size={17} /></button>
          <button
            type="button"
            aria-label={playing ? 'Pause gallery' : 'Play gallery'}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <button type="button" aria-label="Next gallery item" onClick={() => browse(1)}><SkipForward size={17} /></button>
        </div>
      </div>

      <div
        className="darshan-gallery"
        ref={viewportRef}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') hoveredRef.current = true; }}
        onPointerLeave={() => { hoveredRef.current = false; }}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) > 2 || event.shiftKey) {
            targetNudgeRef.current += (event.deltaX || event.deltaY) * 0.9;
          }
        }}
        onFocusCapture={() => { focusedRef.current = true; }}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) focusedRef.current = false; }}
      >
        <div className="darshan-gallery-track" ref={trackRef}>
          {[false, true].map((duplicate) => (
            <div className="darshan-gallery-set" key={String(duplicate)} ref={duplicate ? undefined : stripRef} aria-hidden={duplicate || undefined}>
              {gallery.map((item, index) => renderTile(item, index, duplicate))}
            </div>
          ))}
        </div>
      </div>

      <dialog
        className="darshan-viewer"
        ref={dialogRef}
        aria-label="Featured work viewer"
        onClose={() => setSelection(null)}
        onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') browseViewer(-1);
          if (event.key === 'ArrowRight') browseViewer(1);
        }}
      >
        <div className="darshan-viewer-body">
          <div className="darshan-viewer-heading">
            <span className="darshan-viewer-caption">{viewerItem?.caption}</span>
            <div className="darshan-gallery-controls" role="group" aria-label="Gallery viewer controls">
              <button type="button" aria-label="Previous item" onClick={() => browseViewer(-1)}><SkipBack size={17} /></button>
              <button type="button" aria-label="Next item" onClick={() => browseViewer(1)}><SkipForward size={17} /></button>
              <button type="button" aria-label="Close gallery viewer" onClick={() => dialogRef.current?.close()}><X size={20} /></button>
            </div>
          </div>
          {viewerItem && viewerSource ? (
            <video
              key={viewerSource}
              src={viewerSource}
              poster={`${assetPath}/${viewerItem.poster}`}
              width={viewerItem.width}
              height={viewerItem.height}
              aria-label={viewerItem.alt}
              preload="metadata"
              autoPlay
              muted
              playsInline
              controls
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.stopPropagation();
              }}
            />
          ) : viewerItem && <GalleryImage item={viewerItem} />}
          {selection && (
            <div className="darshan-viewer-thumbnails" role="group" aria-label="Choose gallery media">
              {gallery.map((item, index) => (
                <button key={item.poster} type="button" aria-label={item.alt} aria-pressed={selection.index === index}
                  ref={selection.index === index ? activeThumbnailRef : undefined} onClick={() => setSelection({ index })}>
                  <GalleryImage item={item} lazy />
                  {item.video && <Play size={12} className="darshan-gallery-video-mark" aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}
