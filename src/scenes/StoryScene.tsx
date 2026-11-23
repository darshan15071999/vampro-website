import { forwardRef } from 'react';
import { gsap } from 'gsap';
import { Video, PenTool, Code, Cpu, Lightbulb, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="w-10 h-10 rounded-xl border border-[var(--bp-accent)]/30 flex items-center justify-center mb-3">
      <Icon size={18} className="text-[var(--bp-accent)]" strokeWidth={1.5} />
    </div>
    <h3 className="text-[var(--bp-ink-strong)] font-semibold text-[13px] tracking-wide mb-1">{title}</h3>
    <p className="text-[var(--bp-accent)]/60 text-[10px] tracking-wider">{subtitle}</p>
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
        <h2 className="bp-h2 text-[var(--bp-ink-strong)]">
          Ideas become stories
          <span className="block text-[var(--bp-ink)]/60">Stories become visuals</span>
        </h2>
        <p className="mt-6 text-sm md:text-base font-light tracking-wider text-[var(--bp-muted2)] leading-relaxed max-w-md">
          Every finished film hides its own blueprint. We work where the plan and the picture meet: storytellers, designers, and engineers drawing on the same page.
        </p>
        <blockquote className="mt-8 border-l border-[var(--bp-accent)]/30 pl-5 text-sm md:text-base font-light tracking-wider text-[var(--bp-accent)]/80 leading-relaxed max-w-md">
          "We don't choose between creativity and technology. We build where they meet."
        </blockquote>
        <section className="mt-6 max-w-md border-t border-[var(--bp-accent)]/25 pt-4" aria-labelledby="about-people">
          <h3 id="about-people" className="bp-label mb-1">People</h3>
          <p className="font-space text-sm font-medium text-[var(--bp-ink-strong)] mb-3.5">
            Meet the brains behind Vampro
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/people/darshan"
              className="group flex items-center gap-3 rounded-md border border-[var(--bp-accent)]/25 bg-[var(--bp-accent)]/[0.03] p-2.5 text-[var(--bp-ink-strong)] transition-colors hover:border-[var(--bp-accent)]/60 hover:bg-[var(--bp-accent)]/[0.08] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bp-accent)]"
            >
              <img
                src="/assets/people/darshan/portrait-blue.jpg"
                alt="Darshan S"
                width={48}
                height={48}
                loading="lazy"
                className="size-12 shrink-0 rounded-sm object-cover"
              />
              <span className="min-w-0 font-space text-xs leading-snug">
                <span className="block truncate font-semibold underline underline-offset-4 group-hover:text-[var(--bp-accent)]">
                  Darshan S
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-[var(--bp-muted2)]">
                  View portfolio
                </span>
              </span>
            </Link>

            <div
              className="flex items-center gap-3 rounded-md border border-dashed border-[var(--bp-accent)]/25 bg-[var(--bp-accent)]/[0.02] p-2.5"
              aria-label="Blank profile placeholder"
            >
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-dashed border-[var(--bp-accent)]/30 bg-[var(--bp-accent)]/[0.04] text-[var(--bp-accent)]/40"
                aria-hidden="true"
              >
                <User size={18} strokeWidth={1.5} />
              </span>
              <span className="min-w-0 flex-1 space-y-1.5" aria-hidden="true">
                <span className="block h-2.5 w-20 rounded-xs bg-[var(--bp-ink-strong)]/15" />
                <span className="block h-2 w-14 rounded-xs bg-[var(--bp-muted2)]/20" />
              </span>
            </div>
          </div>
        </section>
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
