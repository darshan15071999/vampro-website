import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { CornerMarks, WaveformBars } from './wire';

const VoiceStudioScene = forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} className="bp-scene" data-scene="voice-studio">
    <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      {/* Copy / Info */}
      <div data-anim="vs-copy" className="order-1 lg:order-1">
        <div className="flex items-center gap-2 mb-5">
          <p className="bp-label">Audio Intelligence Suite</p>
          <span className="px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-[9px] uppercase font-bold tracking-wider rounded">
            Coming Soon
          </span>
        </div>
        <h2 className="bp-h2 text-[var(--bp-ink-strong)]">
          Voice Studio
          <span className="block text-[var(--bp-ink)]/60">for Adobe Premiere Pro</span>
        </h2>
        <p className="mt-6 text-sm md:text-base font-light tracking-wider text-[var(--bp-muted2)] leading-relaxed max-w-md">
          Next-generation audio intelligence built directly into your timeline. Local voice cloning, neural speech-to-speech conversion, and stem isolation. Run 100% privately on your GPU or connect ElevenLabs with your own key.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <Link to="/plugins/voice-studio" className="bp-btn bp-btn-solid px-8 py-3.5 text-xs">Explore Voice Studio</Link>
          <Link to="/docs/plugins/voice-studio" className="bp-btn px-8 py-3.5 text-xs">Read the docs</Link>
        </div>
      </div>

      {/* Wireframe Premiere Panel */}
      <div data-anim="vs-panel" className="bp-card relative p-4 order-2 lg:order-2">
        <CornerMarks inset={6} />
        
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-[var(--bp-accent)]/15 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="bp-label font-semibold">Vampro Voice Studio · Audio Engine</span>
          </div>
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 border border-[var(--bp-accent)]/40" />
            <span className="w-2 h-2 border border-[var(--bp-accent)]/40" />
          </span>
        </div>

        {/* Engine mode selector pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-center">
          <div data-anim="vs-pill" className="border border-emerald-500/40 bg-emerald-500/10 px-2 py-1.5">
            <span className="bp-label text-emerald-400 text-[9px] block">Offline GGUF</span>
          </div>
          <div data-anim="vs-pill" className="border border-[var(--bp-accent)]/25 px-2 py-1.5">
            <span className="bp-label text-[9px] block">ElevenLabs BYOK</span>
          </div>
          <div data-anim="vs-pill" className="border border-[var(--bp-accent)]/25 px-2 py-1.5">
            <span className="bp-label text-[9px] block">Speech-to-Speech</span>
          </div>
          <div data-anim="vs-pill" className="border border-[var(--bp-accent)]/25 px-2 py-1.5">
            <span className="bp-label text-[9px] block">Stem Isolation</span>
          </div>
        </div>

        {/* Timeline Tracks: Stems & Generation */}
        <div className="space-y-2 text-left">
          {/* Stem track 1: Dialogue */}
          <div data-anim="vs-track-1" className="flex items-center gap-3">
            <span className="bp-label w-8 shrink-0 text-[10px]">Stem 1</span>
            <div className="border border-[var(--bp-accent)]/30 h-9 flex-1 px-2 flex items-center justify-between relative overflow-hidden bg-[var(--bp-accent)]/5">
              <span className="bp-label text-[8px] absolute left-2 top-1 text-[var(--bp-accent)]/60">Dialogue (Isolated)</span>
              <div className="w-full pt-2">
                <WaveformBars bars={44} height={18} dataAnim="vs-wave-1" />
              </div>
            </div>
          </div>

          {/* Stem track 2: Music / Accompaniment */}
          <div data-anim="vs-track-2" className="flex items-center gap-3">
            <span className="bp-label w-8 shrink-0 text-[10px]">Stem 2</span>
            <div className="border border-[var(--bp-accent)]/20 h-9 flex-1 px-2 flex items-center justify-between relative overflow-hidden">
              <span className="bp-label text-[8px] absolute left-2 top-1 text-[var(--bp-accent)]/60">Music & Ambience</span>
              <div className="w-full pt-2">
                <WaveformBars bars={44} height={18} dataAnim="vs-wave-2" />
              </div>
            </div>
          </div>

          {/* Output track: Cloned Voice Take */}
          <div data-anim="vs-track-3" className="flex items-center gap-3">
            <span className="bp-label w-8 shrink-0 text-[10px] text-emerald-400">Master</span>
            <div className="border border-emerald-500/40 h-11 flex-1 px-2 flex items-center relative overflow-hidden bg-emerald-500/5">
              <span className="bp-label text-[8px] absolute left-2 top-1 text-emerald-400">Cloned Take · 24-bit WAV</span>
              <div className="w-full pt-2">
                <WaveformBars bars={48} height={22} dataAnim="vs-wave-3" />
              </div>
              <span data-anim="vs-playhead" className="cine-only absolute top-0 bottom-0 left-0 w-px bg-emerald-400 shadow-[0_0_8px_#34d399]" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Bottom hardware telemetry */}
        <div data-anim="vs-footer" className="flex items-center justify-between border-t border-[var(--bp-accent)]/15 pt-3 mt-4 text-[9px]">
          <span className="bp-label text-slate-400">Engine: Vulkan GPU / AVX2</span>
          <span className="bp-label text-emerald-400">Privacy: 100% Local / Zero Telemetry</span>
        </div>

      </div>

    </div>
  </section>
));

VoiceStudioScene.displayName = 'VoiceStudioScene';
export default VoiceStudioScene;

export const voiceStudioTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  gsap.set(root, { autoAlpha: 0 });
  gsap.set(q('[data-anim="vs-copy"]'), { autoAlpha: 0, y: 30 });
  gsap.set(q('[data-anim="vs-panel"]'), { autoAlpha: 0, y: 40 });
  gsap.set(q('[data-anim="vs-pill"]'), { autoAlpha: 0, scale: 0.9 });
  gsap.set(q('[data-anim="vs-track-1"], [data-anim="vs-track-2"], [data-anim="vs-track-3"]'), { autoAlpha: 0, x: -20 });
  gsap.set(q('[data-anim="vs-footer"]'), { autoAlpha: 0 });
  q('[data-anim="vs-wave-1"] [data-anim="wave-bar"], [data-anim="vs-wave-2"] [data-anim="wave-bar"], [data-anim="vs-wave-3"] [data-anim="wave-bar"]').forEach(bar => gsap.set(bar, { scaleY: 0.08, transformOrigin: 'center' }));
  gsap.set(q('[data-anim="vs-playhead"]'), { left: '0%' });

  const tl = gsap.timeline();

  // The scene assembles
  tl.to(root, { autoAlpha: 1, duration: 0.08 }, 0)
    .to(q('[data-anim="vs-copy"]'), { autoAlpha: 1, y: 0, duration: 0.22 }, 0.04)
    .to(q('[data-anim="vs-panel"]'), { autoAlpha: 1, y: 0, duration: 0.24 }, 0.1);

  // Engine mode pills stagger in
  tl.to(q('[data-anim="vs-pill"]'), { autoAlpha: 1, scale: 1, duration: 0.15, stagger: 0.04 }, 0.2);

  // Tracks slide into place
  tl.to(q('[data-anim="vs-track-1"], [data-anim="vs-track-2"], [data-anim="vs-track-3"]'), { autoAlpha: 1, x: 0, duration: 0.18, stagger: 0.06 }, 0.3);

  // Waveforms expand with sound dynamics
  tl.to(q('[data-anim="vs-wave-1"] [data-anim="wave-bar"]'), { scaleY: 1, duration: 0.2, stagger: 0.003 }, 0.4)
    .to(q('[data-anim="vs-wave-2"] [data-anim="wave-bar"]'), { scaleY: 1, duration: 0.2, stagger: 0.003 }, 0.45)
    .to(q('[data-anim="vs-wave-3"] [data-anim="wave-bar"]'), { scaleY: 1, duration: 0.25, stagger: 0.003 }, 0.5);

  // Playhead sweeps across master track
  tl.to(q('[data-anim="vs-playhead"]'), { left: '100%', duration: 0.4, ease: 'power1.inOut' }, 0.55);

  // Footer status indicator reveals
  tl.to(q('[data-anim="vs-footer"]'), { autoAlpha: 1, duration: 0.15 }, 0.6);

  // Exit
  tl.to(q('[data-anim="vs-copy"]'), { autoAlpha: 0, y: -30, duration: 0.14 }, 1.1)
    .to(q('[data-anim="vs-panel"]'), { autoAlpha: 0, y: -30, duration: 0.14 }, 1.14)
    .to(root, { autoAlpha: 0, duration: 0.06 }, 1.2);

  return tl;
};
