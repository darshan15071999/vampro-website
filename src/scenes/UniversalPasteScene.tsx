import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { CornerMarks } from './wire';

const UniversalPasteScene = forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} className="bp-scene" data-scene="universal-paste">
    <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      {/* Wireframe UI */}
      <div data-anim="up-panel" className="bp-card relative p-4 order-2 lg:order-1">
        <CornerMarks inset={6} />
        <div className="flex items-center justify-between border-b border-[var(--bp-accent)]/15 pb-3 mb-4">
          <span className="bp-label">Universal Paste Workflow</span>
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 border border-[var(--bp-accent)]/40" />
            <span className="w-2 h-2 border border-[var(--bp-accent)]/40" />
          </span>
        </div>

        {/* Browser / Clipboard Source */}
        <div data-anim="up-source" className="border border-[var(--bp-accent)]/20 px-4 py-3 text-left relative overflow-hidden">
          <span className="bp-label block mb-2">Web Browser</span>
          <div className="flex items-center gap-3">
            <div data-anim="up-img" className="w-10 h-10 border border-[var(--bp-accent)]/40 flex items-center justify-center">
              <span className="bp-label">IMG</span>
            </div>
            <div className="flex-1 space-y-2">
              <div data-anim="up-line" className="h-1 bg-[var(--bp-accent)]/30 w-3/4" />
              <div data-anim="up-line" className="h-1 bg-[var(--bp-accent)]/20 w-1/2" />
            </div>
          </div>
          
          <div data-anim="up-copy-box" className="absolute inset-0 border-2 border-[var(--bp-accent)] border-dashed opacity-0 flex items-center justify-center bg-[var(--bp-accent)]/5 backdrop-blur-[2px]">
            <span className="bp-label bg-black text-[var(--bp-accent)] px-3 py-1 font-bold">CTRL + C</span>
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <div data-anim="up-arrow" className="w-px h-6 bg-[var(--bp-accent)]/50 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 border-r border-b border-[var(--bp-accent)]/50 rotate-45" />
          </div>
        </div>

        {/* Timeline tracks */}
        <div data-anim="up-timeline" className="border border-[var(--bp-accent)]/20 p-4 text-left relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="bp-label">Premiere Pro Timeline</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bp-label w-7 shrink-0">V2</span>
              <div className="border border-[var(--bp-accent)]/20 h-8 flex-1 relative">
                <div data-anim="up-clip" className="absolute left-8 top-1 bottom-1 w-24 bg-[var(--bp-accent)]/20 border border-[var(--bp-accent)]/40 flex items-center px-2 opacity-0 scale-95">
                  <span className="bp-label text-[8px] truncate">Pasted Image</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bp-label w-7 shrink-0">V1</span>
              <div className="border border-[var(--bp-accent)]/20 h-8 flex-1 flex gap-1 p-1" aria-hidden="true">
                <span className="w-1/3 border border-[var(--bp-accent)]/15" />
                <span className="flex-1 border border-[var(--bp-accent)]/15" />
              </div>
            </div>
          </div>
          <div data-anim="up-paste-box" className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
            <span className="bp-label bg-black text-[var(--bp-accent)] px-3 py-1 font-bold">CTRL + V</span>
          </div>
        </div>
      </div>

      <div data-anim="up-copy" className="order-1 lg:order-2">
        <p className="bp-label mb-5">Workflow Plugin</p>
        <h2 className="bp-h2 text-[var(--bp-ink-strong)]">
          Universal Paste
          <span className="block text-[var(--bp-ink)]/60">for Adobe Premiere Pro</span>
        </h2>
        <p className="mt-6 text-sm md:text-base font-light tracking-wider text-[var(--bp-muted2)] leading-relaxed max-w-md">
          The universal sidekick for editors. Copy images, SVGs, texts, and web elements directly from your browser and paste them into your Premiere Pro timeline instantly.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <Link to="/plugins/universal-paste" className="bp-btn bp-btn-solid px-8 py-3.5 text-xs">Explore the plugin</Link>
          <Link to="/docs/plugins/universal-paste" className="bp-btn px-8 py-3.5 text-xs">Read the docs</Link>
        </div>
      </div>

    </div>
  </section>
));

UniversalPasteScene.displayName = 'UniversalPasteScene';
export default UniversalPasteScene;

export const universalPasteTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  gsap.set(root, { autoAlpha: 0 });
  gsap.set(q('[data-anim="up-copy"]'), { autoAlpha: 0, y: 30 });
  gsap.set(q('[data-anim="up-panel"]'), { autoAlpha: 0, y: 40 });
  gsap.set(q('[data-anim="up-img"], [data-anim="up-line"]'), { autoAlpha: 0, x: -10 });
  gsap.set(q('[data-anim="up-copy-box"]'), { autoAlpha: 0, scale: 1.1 });
  gsap.set(q('[data-anim="up-arrow"]'), { scaleY: 0, transformOrigin: 'top' });
  gsap.set(q('[data-anim="up-timeline"]'), { autoAlpha: 0, y: 20 });
  gsap.set(q('[data-anim="up-paste-box"]'), { autoAlpha: 0, scale: 0.9 });
  gsap.set(q('[data-anim="up-clip"]'), { autoAlpha: 0, scale: 0.9 });

  const tl = gsap.timeline();

  // The scene assembles
  tl.to(root, { autoAlpha: 1, duration: 0.08 }, 0)
    .to(q('[data-anim="up-copy"]'), { autoAlpha: 1, y: 0, duration: 0.22 }, 0.04)
    .to(q('[data-anim="up-panel"]'), { autoAlpha: 1, y: 0, duration: 0.24 }, 0.1)
    
  // Load browser content
  tl.to(q('[data-anim="up-img"], [data-anim="up-line"]'), { autoAlpha: 1, x: 0, duration: 0.15, stagger: 0.05 }, 0.2)
  
  // CTRL+C animation
  tl.to(q('[data-anim="up-copy-box"]'), { autoAlpha: 1, scale: 1, duration: 0.15 }, 0.4)
    .to(q('[data-anim="up-copy-box"]'), { autoAlpha: 0, scale: 0.95, duration: 0.1 }, 0.6)

  // Arrow down to timeline
  tl.to(q('[data-anim="up-timeline"]'), { autoAlpha: 1, y: 0, duration: 0.2 }, 0.5)
    .to(q('[data-anim="up-arrow"]'), { scaleY: 1, duration: 0.15 }, 0.55)

  // CTRL+V animation
  tl.to(q('[data-anim="up-paste-box"]'), { autoAlpha: 1, scale: 1, duration: 0.15 }, 0.7)
    .to(q('[data-anim="up-paste-box"]'), { autoAlpha: 0, scale: 1.05, duration: 0.1 }, 0.9)

  // Clip drops in
  tl.to(q('[data-anim="up-clip"]'), { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(1.7)" }, 0.8)

  // Exit
  tl.to(q('[data-anim="up-copy"]'), { autoAlpha: 0, y: -30, duration: 0.14 }, 1.1)
    .to(q('[data-anim="up-panel"]'), { autoAlpha: 0, y: -30, duration: 0.14 }, 1.14)
    .to(root, { autoAlpha: 0, duration: 0.06 }, 1.2);

  return tl;
};
