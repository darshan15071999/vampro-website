import { forwardRef } from 'react';
import { gsap } from 'gsap';
import { DimLine, WaveformBars } from './wire';

// The storyboard grows into the production pipeline. Every discipline is one system.

import { FileText, Camera, Scissors, Activity, Mic, Palette, Film, Zap, Sparkles, Laptop } from 'lucide-react';

const stages = [
  { key: 'story', label: 'Storytelling', desc: 'Films & branded media', Icon: Film },
  { key: 'writing', label: 'Writing', desc: 'Scripts & narrative', Icon: FileText },
  { key: 'hardware', label: 'Hardware', desc: 'Custom electronics', Icon: Zap },
  { key: 'filming', label: 'Filming', desc: 'Cameras & rigs', Icon: Camera },
  { key: 'editing', label: 'Editing', desc: 'Cut & structure', Icon: Scissors },
  { key: 'motion_design', label: 'Motion & Design', desc: 'Animation & UI/UX', Icon: Sparkles },
  { key: 'motion', label: 'Motion', desc: 'Graphics & design', Icon: Activity },
  { key: 'audio', label: 'Audio', desc: 'Voice & sound', Icon: Mic },
  { key: 'color', label: 'Color', desc: 'Grade & finish', Icon: Palette },
  { key: 'software', label: 'Software', desc: 'Apps & automation', Icon: Laptop }
];

const ServicesScene = forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} id="services" className="bp-scene" data-scene="services">
    <div className="w-full max-w-6xl mx-auto px-6 text-center">
      <div data-anim="svc-head">
        <p className="bp-label mb-3">Our Services</p>
        <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white leading-tight">
          One pipeline.
          <span className="text-white/60"> Every discipline.</span>
        </h2>
        <p className="mt-3 text-xs md:text-sm font-light tracking-wider text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Each craft is a stage in the same system that turns an idea into a finished film.
        </p>
      </div>

      <DimLine label="Production pipeline" className="my-6 max-w-3xl mx-auto" />

      {/* The pipeline */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 auto-rows-[120px] md:auto-rows-[130px]">
        {stages.map((s, i) => (
          <div
            key={s.key}
            data-anim="svc-node"
            data-node={s.key}
            className="bp-card relative w-full h-full px-2 flex flex-col items-center justify-center text-center"
          >
            <div data-anim={s.key === 'audio' ? "svc-audio-content" : undefined} className="flex flex-col items-center justify-center gap-1.5 w-full">
              <div className="w-7 h-7 rounded-lg border border-[#00e5ff]/30 flex items-center justify-center mb-1">
                <s.Icon size={14} className="text-[#00e5ff]" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.1em] text-[#00e5ff] uppercase leading-tight">{s.label}</span>
              <span className="text-[9px] font-light tracking-wider text-neutral-400 leading-tight">{s.desc}</span>
            </div>
            {s.key === 'audio' && (
              <div data-anim="svc-audio-wave" className="cine-only absolute bottom-3 w-full left-0 px-4">
                <WaveformBars bars={16} height={20} />
              </div>
            )}
          </div>
        ))}
      </div>

      <p data-anim="svc-foot" className="bp-label mt-6">Deliverable · The finished story</p>
    </div>
  </section>
));

ServicesScene.displayName = 'ServicesScene';
export default ServicesScene;

export const servicesTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  gsap.set(root, { autoAlpha: 0 });
  gsap.set(q('[data-anim="svc-head"]'), { autoAlpha: 0, y: 30 });
  gsap.set(q('[data-anim="svc-node"]'), { autoAlpha: 0, y: 24 });
  gsap.set(q('[data-anim="svc-foot"]'), { autoAlpha: 0 });
  gsap.set(q('[data-anim="svc-audio-wave"]'), { autoAlpha: 0 });

  const tl = gsap.timeline();

  // The pipeline activates stage by stage (Entrance)
  tl.to(root, { autoAlpha: 1, duration: 0.08 }, 0)
    .to(q('[data-anim="svc-head"]'), { autoAlpha: 1, y: 0, duration: 0.22 }, 0.04)
    .to(q('[data-anim="svc-node"]'), { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.03 }, 0.15)
    .to(q('[data-anim="svc-foot"]'), { autoAlpha: 1, duration: 0.12 }, 0.45);

  // Exit: the audio stage takes over — its waveform becomes the next scene
  // Notice the gap between 0.45 and 0.86 where the timeline rests so the user can read
  tl.to(q('[data-anim="svc-audio-content"]'), { y: -12, duration: 0.25 }, 0.86)
    .to(q('[data-anim="svc-audio-wave"]'), { autoAlpha: 1, duration: 0.25 }, 0.86)
    .to(q('[data-anim="svc-node"]:not([data-node="audio"])'), { autoAlpha: 0.12, duration: 0.18 }, 0.88)
    .to(q('[data-anim="svc-head"], [data-anim="svc-foot"]'), { autoAlpha: 0, duration: 0.14 }, 0.88)
    .to(q('[data-anim="svc-node"][data-node="audio"]'), { scale: 1.18, duration: 0.16 }, 0.9)
    .to(root, { autoAlpha: 0, duration: 0.1 }, 0.98);

  return tl;
};
