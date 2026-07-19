import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { CornerMarks, WaveformBars } from './wire';

// The audio branch becomes a Premiere timeline: the Voice Generator plugin, working live.

const SCRIPT_TEXT = 'A story begins with a voice.';

const VoiceScene = forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} className="bp-scene" data-scene="voice">
    <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div data-anim="vo-copy">
        <p className="bp-label mb-5">Featured Plugin</p>
        <h2 className="bp-h2 text-[var(--bp-ink-strong)]">
          Voice Generator
          <span className="block text-[var(--bp-ink)]/60">for Adobe Premiere Pro</span>
        </h2>
        <p className="mt-6 text-sm md:text-base font-light tracking-wider text-[var(--bp-muted2)] leading-relaxed max-w-md">
          Type a script, choose a voice, and natural narration lands on your timeline in seconds. 27+ voices, fully offline, without leaving Premiere Pro.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <Link to="/plugins/voice-generator" className="bp-btn bp-btn-solid px-8 py-3.5 text-xs">Explore the plugin</Link>
          <Link to="/docs/plugins/voice-generator" className="bp-btn px-8 py-3.5 text-xs">Read the docs</Link>
        </div>
      </div>

      {/* Wireframe Premiere panel */}
      <div data-anim="vo-panel" className="bp-card relative p-4">
        <CornerMarks inset={6} />
        <div className="flex items-center justify-between border-b border-[var(--bp-accent)]/15 pb-3 mb-4">
          <span className="bp-label">Vampro Voice Generator</span>
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 border border-[var(--bp-accent)]/40" />
            <span className="w-2 h-2 border border-[var(--bp-accent)]/40" />
          </span>
        </div>

        {/* Script input */}
        <div data-anim="vo-input" className="border border-[var(--bp-accent)]/20 px-4 py-3 text-left">
          <span className="bp-label block mb-1.5">Script</span>
          <span className="text-sm md:text-base font-light tracking-wider text-[var(--bp-ink-strong)]">
            {SCRIPT_TEXT.split('').map((ch, i) => (
              <span key={i} data-anim="vo-char" className="whitespace-pre">{ch}</span>
            ))}
            <span data-anim="vo-caret" className="cine-only inline-block w-px h-4 bg-[var(--bp-accent)] align-middle ml-0.5" aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span data-anim="vo-voice" className="bp-label border border-[var(--bp-accent)]/25 px-3 py-1.5">Voice · Heart</span>
          <span data-anim="vo-voice" className="bp-label border border-[var(--bp-accent)]/25 px-3 py-1.5">Tone · Narration</span>
          <span data-anim="vo-generate" className="bp-btn px-4 py-1.5 text-[10px] pointer-events-none">Generate</span>
        </div>

        {/* Timeline tracks */}
        <div className="mt-5 space-y-2 text-left">
          <div data-anim="vo-track-v" className="flex items-center gap-3">
            <span className="bp-label w-7 shrink-0">V1</span>
            <div className="border border-[var(--bp-accent)]/20 h-8 flex-1 flex gap-1 p-1" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className="flex-1 border border-[var(--bp-accent)]/15" />
              ))}
            </div>
          </div>
          <div data-anim="vo-track-a" className="flex items-center gap-3">
            <span className="bp-label w-7 shrink-0">A1</span>
            <div className="border border-[var(--bp-accent)]/40 h-10 flex-1 px-1 flex items-center relative overflow-hidden">
              <WaveformBars bars={56} height={30} dataAnim="vo-wave" />
              <span data-anim="vo-playhead" className="cine-only absolute top-0 bottom-0 left-0 w-px bg-[var(--bp-accent)]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

VoiceScene.displayName = 'VoiceScene';
export default VoiceScene;

export const voiceTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  gsap.set(root, { autoAlpha: 0 });
  gsap.set(q('[data-anim="vo-copy"]'), { autoAlpha: 0, y: 30 });
  gsap.set(q('[data-anim="vo-panel"]'), { autoAlpha: 0, y: 40 });
  gsap.set(q('[data-anim="vo-char"]'), { autoAlpha: 0 });
  gsap.set(q('[data-anim="vo-voice"], [data-anim="vo-generate"]'), { autoAlpha: 0 });
  gsap.set(q('[data-anim="vo-track-v"], [data-anim="vo-track-a"]'), { autoAlpha: 0, x: -24 });
  q('[data-anim="vo-wave"] [data-anim="wave-bar"]').forEach(bar => gsap.set(bar, { scaleY: 0.06, transformOrigin: 'center' }));
  gsap.set(q('[data-anim="vo-playhead"]'), { left: '0%' });

  const tl = gsap.timeline();

  // The panel assembles
  tl.to(root, { autoAlpha: 1, duration: 0.08 }, 0)
    .to(q('[data-anim="vo-copy"]'), { autoAlpha: 1, y: 0, duration: 0.22 }, 0.04)
    .to(q('[data-anim="vo-panel"]'), { autoAlpha: 1, y: 0, duration: 0.24 }, 0.1)
    .to(q('[data-anim="vo-track-v"], [data-anim="vo-track-a"]'), { autoAlpha: 1, x: 0, duration: 0.18, stagger: 0.06 }, 0.2);

  // Typing — each character lands as you scroll
  tl.to(q('[data-anim="vo-char"]'), { autoAlpha: 1, duration: 0.012, stagger: 0.012 }, 0.3)
    .to(q('[data-anim="vo-voice"], [data-anim="vo-generate"]'), { autoAlpha: 1, duration: 0.12, stagger: 0.04 }, 0.62);

  // Generation — the waveform renders bar by bar, the playhead follows
  tl.to(q('[data-anim="vo-wave"] [data-anim="wave-bar"]'), { scaleY: 1, duration: 0.2, stagger: 0.004 }, 0.7)
    .to(q('[data-anim="vo-playhead"]'), { left: '100%', duration: 0.28 }, 0.7);

  // Exit: the waveform flattens into text lines — audio becomes knowledge
  tl.to(q('[data-anim="vo-wave"] [data-anim="wave-bar"]'), { scaleY: 0.06, duration: 0.14 }, 0.92)
    .to(q('[data-anim="vo-copy"]'), { autoAlpha: 0, y: -30, duration: 0.14 }, 0.92)
    .to(q('[data-anim="vo-panel"]'), { autoAlpha: 0, y: -30, duration: 0.14 }, 0.96)
    .to(root, { autoAlpha: 0, duration: 0.06 }, 1.02);

  return tl;
};
