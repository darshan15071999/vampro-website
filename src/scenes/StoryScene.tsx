import { forwardRef } from 'react';
import { gsap } from 'gsap';
import { Video, PenTool, Code, Cpu, Lightbulb, Users } from 'lucide-react';
import { DimLine } from './wire';

const storyBoxes = [
  { icon: Video, title: 'Storytelling', subtitle: 'Films & motion' },
  { icon: PenTool, title: 'Design', subtitle: 'Branding & graphics' },
  { icon: Code, title: 'Software', subtitle: 'Apps & plugins' },
  { icon: Cpu, title: 'Hardware', subtitle: 'Electronics & rigs' },
  { icon: Lightbulb, title: 'Innovation', subtitle: 'Prototypes & R&D' },
  { icon: Users, title: 'Community', subtitle: 'Content & projects' }
];

const StoryCard = ({ icon: Icon, title, subtitle, dataAnim }: any) => (
  <div data-anim={dataAnim} className="bp-card flex flex-col items-center justify-center p-5 text-center aspect-square">
    <div className="w-10 h-10 rounded-xl border border-[#00e5ff]/30 flex items-center justify-center mb-3">
      <Icon size={18} className="text-[#00e5ff]" strokeWidth={1.5} />
    </div>
    <h3 className="text-white font-semibold text-[13px] tracking-wide mb-1">{title}</h3>
    <p className="text-[#00e5ff]/60 text-[10px] tracking-wider">{subtitle}</p>
  </div>
);

// Deterministic scatter offsets the frames assemble from
const scatter = [
  { x: -120, y: -80, r: -6 },
  { x: 90, y: -110, r: 5 },
  { x: -70, y: 90, r: 4 },
  { x: 130, y: 60, r: -5 },
  { x: -140, y: 20, r: 3 },
  { x: 110, y: -30, r: -4 }
];

const StoryScene = forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} id="about" className="bp-scene" data-scene="story">
    <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div data-anim="story-board">
        <DimLine label="What we do" className="mb-6" />
        <div className="grid grid-cols-3 gap-4">
          {storyBoxes.map((box, i) => (
            <StoryCard key={i} {...box} dataAnim="story-frame" />
          ))}
        </div>
        <DimLine label="6 disciplines · 1 pipeline" className="mt-6" />
      </div>

      <div data-anim="story-copy">
        <p className="bp-label mb-5">Our Story</p>
        <h2 className="text-1xl md:text-4xl font-bold tracking-wide text-white leading-tight">
          Ideas become stories
          <span className="block text-white/60">Stories become visuals</span>
        </h2>
        <p className="mt-6 text-sm md:text-base font-light tracking-wider text-neutral-400 leading-relaxed max-w-md">
          Every finished film hides its own blueprint. We work where the plan and the picture meet: storytellers, designers, and engineers drawing on the same page.
        </p>
        <blockquote className="mt-8 border-l border-[#00e5ff]/30 pl-5 text-sm md:text-base font-light tracking-wider text-[#00e5ff]/80 leading-relaxed max-w-md">
          "We don't choose between creativity and technology. We build where they meet."
        </blockquote>
      </div>
    </div>
  </section>
));

StoryScene.displayName = 'StoryScene';
export default StoryScene;

export const storyTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  gsap.set(root, { autoAlpha: 0 });
  q('[data-anim="story-frame"]').forEach((el, i) => {
    const s = scatter[i % scatter.length];
    gsap.set(el, { autoAlpha: 0, x: s.x, y: s.y, rotate: s.r });
  });
  gsap.set(q('[data-anim="story-copy"]'), { autoAlpha: 0, y: 40 });

  const tl = gsap.timeline();

  // Scattered sketches assemble into the storyboard
  tl.to(root, { autoAlpha: 1, duration: 0.1 }, 0)
    .to(q('[data-anim="story-frame"]'), { autoAlpha: 1, x: 0, y: 0, rotate: 0, duration: 0.35, stagger: 0.06 }, 0.05)
    .to(q('[data-anim="story-copy"]'), { autoAlpha: 1, y: 0, duration: 0.3 }, 0.3);

  // Exit: the board condenses toward the production pipeline
  tl.to(q('[data-anim="story-frame"]'), { y: -30, scale: 0.82, autoAlpha: 0, duration: 0.25, stagger: 0.04 }, 0.75)
    .to(q('[data-anim="story-copy"]'), { autoAlpha: 0, y: -40, duration: 0.2 }, 0.8)
    .to(root, { autoAlpha: 0, duration: 0.1 }, 0.92);

  return tl;
};
