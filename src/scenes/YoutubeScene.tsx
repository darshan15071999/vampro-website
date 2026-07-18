import { forwardRef } from 'react';
import { gsap } from 'gsap';
import { CornerMarks } from './wire';

// Everything recombines: thumbnails converge into the finished film. The loop closes.

const thumbOffsets = [
  { x: -260, y: -140, r: -5 },
  { x: 260, y: -150, r: 4 },
  { x: -300, y: 120, r: 3 },
  { x: 300, y: 130, r: -4 },
  { x: -180, y: 220, r: -3 },
  { x: 180, y: 210, r: 5 }
];

const YoutubeScene = forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} className="bp-scene" data-scene="youtube">
    <div className="relative w-full max-w-5xl mx-auto px-6 text-center">
      {/* Thumbnail wall (cinematic mode only — converges into the player) */}
      {thumbOffsets.map((_, i) => (
        <div
          key={i}
          data-anim="yt-thumb"
          className="cine-only bp-card absolute left-1/2 top-1/2 w-40 h-24 -ml-20 -mt-12 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <polygon points="9,6 19,12 9,18" className="bp-stroke" />
          </svg>
        </div>
      ))}

      <div data-anim="yt-head">
        <p className="bp-label mb-3">YouTube</p>
        <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white leading-tight">
          Stories behind
          <span className="block text-white/60">The build</span>
        </h2>
      </div>

      <div data-anim="yt-player" className="bp-card relative p-2 max-w-2xl mx-auto mt-6">
        <CornerMarks inset={6} />
        <video
          data-anim="yt-video"
          loop
          muted
          playsInline
          className="w-full aspect-video object-cover opacity-40 mix-blend-screen"
        >
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
        <div className="flex items-center justify-between px-2 py-2 border-t border-[#00e5ff]/15 mt-2" aria-hidden="true">
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4"><polygon points="9,6 19,12 9,18" className="bp-stroke" /></svg>
            <span className="bp-label">Showreel · 2026</span>
          </span>
          <span className="bp-label">▮▮▮▮▮▯▯ 00:42</span>
        </div>
      </div>

      <div data-anim="yt-cta" className="mt-8 flex items-center justify-center">
        <a href="https://youtube.com/@vamprotech" target="_blank" rel="noreferrer" className="bp-btn bp-btn-solid px-8 py-3.5 text-xs">
          Watch on YouTube
        </a>
      </div>
    </div>
  </section>
));

YoutubeScene.displayName = 'YoutubeScene';
export default YoutubeScene;

export const youtubeTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  gsap.set(root, { autoAlpha: 0 });
  gsap.set(q('[data-anim="yt-head"]'), { autoAlpha: 0, y: 30 });
  q('[data-anim="yt-thumb"]').forEach((el, i) => {
    const o = thumbOffsets[i % thumbOffsets.length];
    gsap.set(el, { autoAlpha: 0, x: o.x * 2.2, y: o.y * 2.2, rotate: o.r * 2 });
  });
  gsap.set(q('[data-anim="yt-player"]'), { autoAlpha: 0, scale: 0.85 });
  gsap.set(q('[data-anim="yt-cta"]'), { autoAlpha: 0 });

  const tl = gsap.timeline();

  // Thumbnails fly in from the edges…
  tl.to(root, { autoAlpha: 1, duration: 0.08 }, 0)
    .to(q('[data-anim="yt-head"]'), { autoAlpha: 1, y: 0, duration: 0.2 }, 0.04);

  q('[data-anim="yt-thumb"]').forEach((el, i) => {
    const o = thumbOffsets[i % thumbOffsets.length];
    tl.to(el, { autoAlpha: 0.9, x: o.x, y: o.y, rotate: o.r, duration: 0.22 }, 0.12 + i * 0.04);
  });

  // …then converge into the single finished film
  tl.to(q('[data-anim="yt-thumb"]'), { x: 0, y: 0, rotate: 0, scale: 0.4, autoAlpha: 0, duration: 0.26, stagger: 0.03 }, 0.42)
    .to(q('[data-anim="yt-player"]'), { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.5)
    .to(q('[data-anim="yt-cta"]'), { autoAlpha: 1, duration: 0.18 }, 0.72);

  return tl;
};
