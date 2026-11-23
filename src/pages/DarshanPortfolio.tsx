import { useEffect, useRef, type PointerEvent } from 'react';
import {
  Building2, Calendar, Camera, Clapperboard, Code, Coffee, Cpu, Factory, Film, Globe,
  GraduationCap, HeartPulse, Megaphone, Monitor, PenTool, Plus, Smartphone, Trophy, Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { darshanPortfolioMetadata } from '../seo/metadata';
import DarshanCoimbatoreMap from './DarshanCoimbatoreMap';
import DarshanGallery from './DarshanGallery';
import DarshanHero, { LinkedInLink } from './DarshanHero';
import { galleryAssets } from './darshanGalleryMedia';
import './DarshanPortfolio.css';

const linkedin = 'https://www.linkedin.com/in/darshan-s-34145a16b/';

const serviceGroups = [
  {
    title: 'Creative production',
    services: [
      { icon: Megaphone, title: 'Marketing services', description: 'Campaign concepts, messaging and content planning built around what each audience needs to hear.' },
      { icon: Film, title: 'Video editing', description: 'Shaping footage, sound and pacing into stories for social, campaigns and longer formats.' },
      { icon: PenTool, title: 'Design', description: 'Visual direction, campaign graphics and layouts that carry an idea consistently across formats.' },
      { icon: Camera, title: 'Shoots', description: 'Planning and capturing photo and video for brands, people, spaces and live events.' },
      { icon: Clapperboard, title: 'Short films', description: 'Developing narrative ideas and carrying them through production, editing and the final cut.' },
    ],
  },
  {
    title: 'Development & hardware',
    services: [
      { icon: Globe, title: 'Web development', description: 'Responsive websites, from portfolio and campaign pages to interactive web experiences.' },
      { icon: Smartphone, title: 'App development', description: 'Turning product ideas into apps with clear interfaces and practical workflows.' },
      { icon: Code, title: 'Custom software', description: 'Building tools around specific needs, including plugins, utilities and workflow automation.' },
      { icon: Wrench, title: 'Camera rigs', description: 'Designing and building camera setups around the movement, mounting and handling a shoot needs.' },
      { icon: Cpu, title: 'Electronics', description: 'Prototyping and assembling electronic systems for custom hardware and creative projects.' },
    ],
  },
];

const industries = [
  { label: 'Media', icon: Camera },
  { label: 'Software', icon: Monitor },
  { label: 'Manufacturing', icon: Factory },
  { label: 'Education', icon: GraduationCap },
  { label: 'Cafes', icon: Coffee },
  { label: 'Events', icon: Calendar },
  { label: 'Real estate', icon: Building2 },
  { label: 'Short films', icon: Clapperboard },
  { label: 'Ad films', icon: Megaphone },
  { label: 'Sports', icon: Trophy },
  { label: 'Healthcare', icon: HeartPulse },
];

const toolkit = [
  { area: 'Editing, motion & sound', names: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'FL Studio'] },
  { area: 'Design & image editing', names: ['Illustrator', 'Photoshop', 'Affinity'] },
  { area: 'Generative video', names: ['Higgsfield', 'Google Flow'] },
  { area: 'Development & 3D', names: ['Antigravity', 'Blender', 'Unity'] },
];

const gear = ['Lumix', 'DJI', 'Samsung', 'ASUS', 'Insta360', 'Hollyland'];

function ToolkitItem({ name }: { name: string }) {
  const filename = name.toLowerCase().replaceAll(' ', '-');
  const extension = filename === 'fl-studio' || filename === 'hollyland' ? 'png' : 'svg';

  return (
    <li>
      <span className={`darshan-tool-logo${filename === 'google-flow' || filename === 'lumix' ? ' darshan-tool-logo--dark' : ''}`}>
        <img src={`${galleryAssets}/logos/${filename}.${extension}`} width={40} height={40} alt="" loading="lazy" />
      </span>
      <span>{name}</span>
    </li>
  );
}

export default function DarshanPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleScroll = () => {
      if (!progressRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progressRef.current.style.transform = `scaleX(${pct})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    root.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  function handlePagePointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !rootRef.current) return;
    rootRef.current.style.setProperty('--cx', `${event.clientX}px`);
    rootRef.current.style.setProperty('--cy', `${event.clientY}px`);
  }

  function handleCardGlow(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <div
      className="darshan-portfolio"
      id="darshan-top"
      ref={rootRef}
      onPointerMove={handlePagePointer}
    >
      <SEO {...darshanPortfolioMetadata} author="Darshan S" twitterCard="summary" themeColor="#111310" />
      <div className="darshan-scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="darshan-cursor-glow" aria-hidden="true" />

      <DarshanHero linkedin={linkedin} />

      <section className="darshan-services" aria-labelledby="darshan-services-title" data-reveal>
        <div className="darshan-container">
          <h2 id="darshan-services-title">What I do</h2>
          <div className="darshan-service-layout">
            {serviceGroups.map(({ title, services }, groupIndex) => (
              <div className="darshan-service-group" key={title}>
                <h3>
                  <span className="darshan-group-index">0{groupIndex + 1}</span>
                  <span>{title}</span>
                </h3>
                <ul className="darshan-service-list">
                  {services.map(({ icon: Icon, title: service, description }, index) => (
                    <li key={service}>
                      <details name={`darshan-services-${title}`} open={index === 0}>
                        <summary>
                          <Icon size={21} strokeWidth={1.75} aria-hidden="true" />
                          <span>{service}</span>
                          <Plus className="darshan-service-toggle" size={17} aria-hidden="true" />
                        </summary>
                        <p>{description}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DarshanGallery />

      <section className="darshan-toolkit" id="darshan-toolkit" aria-labelledby="darshan-toolkit-title" data-reveal>
        <div className="darshan-container">
          <div className="darshan-toolkit-header">
            <h2 id="darshan-toolkit-title">Tools &amp; gear</h2>
          </div>

          <div className="darshan-toolkit-groups">
            {toolkit.map(({ area, names }, idx) => (
              <div
                className="darshan-toolkit-group"
                key={area}
                onPointerMove={handleCardGlow}
              >
                <div className="darshan-toolkit-group-head">
                  <span className="darshan-group-index">0{idx + 1}</span>
                  <h3>{area}</h3>
                </div>
                <ul>{names.map((name) => <ToolkitItem key={name} name={name} />)}</ul>
              </div>
            ))}

            <div
              className="darshan-toolkit-group darshan-toolkit-gear"
              onPointerMove={handleCardGlow}
            >
              <div className="darshan-toolkit-group-head">
                <span className="darshan-group-index">05</span>
                <h3>Gear</h3>
              </div>
              <ul>{gear.map((name) => <ToolkitItem key={name} name={name} />)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="darshan-roots" aria-labelledby="darshan-roots-title" data-reveal>
        <div className="darshan-container darshan-roots-layout">
          <div className="darshan-roots-copy">
            <h2 id="darshan-roots-title">Rooted in<br />Coimbatore</h2>
            <p>Coimbatore is home and the starting point for my creative work. I work with clients across industries, adapting the story and the format to the people each project needs to reach.</p>
            <ul className="darshan-industries" aria-label="Industries">
              {industries.map(({ label, icon: Icon }) => (
                <li key={label}><Icon size={16} strokeWidth={1.75} aria-hidden="true" />{label}</li>
              ))}
            </ul>
          </div>
          <DarshanCoimbatoreMap />
        </div>
      </section>

      <footer className="darshan-container darshan-footer" id="darshan-contact" data-reveal>
        <div>
          <h2>Let&rsquo;s work together</h2>
          <Link to="/" className="darshan-text-link">Back to Vampro</Link>
        </div>
        <LinkedInLink href={linkedin} className="darshan-primary">Connect on LinkedIn</LinkedInLink>
      </footer>
    </div>
  );
}
