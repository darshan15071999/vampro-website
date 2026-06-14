import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PenTool, Cpu, Video, ArrowRight, PlayCircle, Settings,
  Code, Zap, Lightbulb, Users, ExternalLink,
  Sparkles, ChevronDown, Star, Rocket, Flag
} from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import TiltCard from '../components/TiltCard';
import Typewriter from '../components/Typewriter';
import AntigravityParticles from '../components/AntigravityParticles';
import SpeedStreaks from '../components/SpeedStreaks';

const Home = () => {
  const nav = useNavigate();
  const aboutRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallaxActive, setParallaxActive] = useState(false);
  const [activeNote, setActiveNote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNote(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleAboutMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!aboutRef.current) return;
    const rect = aboutRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
    setParallaxActive(true);
  };

  const navigate = (path: string, sectionId?: string) => {
    nav(path);
    if (sectionId) {
      setTimeout(() => { const el = document.getElementById(sectionId); if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } }, 100);
    } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  return (
    <div className="relative min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden sketchbook-bg pt-24" onMouseMove={handleAboutMouseMove}>
        <AntigravityParticles />
        {/* Subtle cursor tracking glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 600px at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(59,59,255,0.06) 0%, transparent 80%)`,
            opacity: parallaxActive ? 1 : 0,
            zIndex: 1
          }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,59,255,0.04) 0%, transparent 70%)', zIndex: 0 }} />
        <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 text-center py-24 md:py-32">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-300/40 bg-indigo-50/60 backdrop-blur-md text-indigo-700 text-sm font-semibold mb-8 animate-blur-pulse">
              <Sparkles size={14} /> Vampro Creative Lab — Where Ideas Come Alive
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05] text-[#07060F]">
              Where Stories{' '}<br className="hidden md:block" />
              <span className="gradient-blue-text">
                <Typewriter texts={['Become Experiences.', 'Come to Life.', 'Meet Technology.', 'Shape the Future.']} />
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              A creative lab at the intersection of <strong className="text-[#3B3BFF] font-semibold">creativity</strong> and{' '}
              <strong className="text-[#3B3BFF] font-semibold">technology</strong>. From films to software, we turn ideas into real experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <button onClick={() => navigate('/', 'services')} className="group relative bg-[#07060F] text-white px-9 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all shadow-xl hover:shadow-[0_0_40px_rgba(59,59,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                <span className="absolute inset-0 bg-gradient-to-r from-[#3B3BFF] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">Explore Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <button onClick={() => navigate('/plugins/adobe-voice')} className="group glass-card-light text-[#07060F] px-9 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                View Plugins <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          </FadeInSection>
          {/* F1 decorative flags */}
          <div className="absolute top-[15%] left-6 md:left-16 flex flex-col gap-6 opacity-15 pointer-events-none">
            <Flag size={32} className="text-[#3B3BFF]" />
            <div className="w-px h-24 bg-gradient-to-b from-[#3B3BFF] to-transparent mx-auto" />
          </div>
          <div className="absolute top-[20%] right-6 md:right-16 flex flex-col gap-6 opacity-15 pointer-events-none">
            <Rocket size={28} className="text-indigo-500 rotate-45" />
            <div className="w-px h-20 bg-gradient-to-b from-indigo-500 to-transparent mx-auto" />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 z-10">
          <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} className="text-indigo-400 animate-bounce" />
        </div>
      </section>

      {/* ABOUT — "More Than a Studio" — dark grid bg with pinned notes board */}
      <section id="about" ref={aboutRef} onMouseMove={handleAboutMouseMove} onMouseLeave={() => setParallaxActive(false)} className="py-16 md:py-20 scroll-mt-24 dark-grid-bg relative overflow-hidden">
        <SpeedStreaks />
        {/* Nebula */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,59,255,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(27,42,107,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <FadeInSection className="mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-900/20 text-indigo-300 text-[10px] font-semibold mb-4 tracking-widest uppercase">
              <Star size={10} /> Our Story
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              More Than a Studio.<br />
              <span className="gradient-blue-text">A Place to Build.</span>
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
            {/* Left Side: 16:9 Showreel */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <FadeInSection className="w-full max-w-[480px]">
                <div onClick={() => window.open('https://youtube.com', '_blank')} className="relative w-full aspect-video glass-card rounded-[2rem] overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform duration-500 flex items-center justify-center shadow-2xl border border-indigo-500/20">
                  <img src="/splash.jpg" alt="Showreel" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060F]/80 via-transparent to-transparent" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center group-hover:bg-[#3B3BFF]/80 transition-all duration-300 animate-glow-pulse mb-3">
                      <PlayCircle size={40} className="text-white ml-1" />
                    </div>
                    <span className="text-white/90 font-bold text-sm tracking-widest uppercase mt-2">Play Showreel</span>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right Side: Rectangular Sticky Notes (Stacked & Cycling) */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-start relative w-full mt-12 lg:mt-0">
              <div className="relative w-full aspect-[4/3] lg:aspect-video max-w-[480px]"
                style={{
                  perspective: '1000px',
                  transform: parallaxActive ? `rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)` : 'none',
                  transition: parallaxActive ? 'transform 0.1s ease' : 'transform 0.6s ease',
                }}
              >
                {/* Note 1 — Quote */}
                <div
                  className={`absolute inset-0 glass-card p-6 md:p-8 rounded-[2rem] shadow-xl transition-all duration-700 ease-in-out cursor-pointer flex flex-col items-center justify-center text-center
                    ${activeNote === 0 ? 'z-30 opacity-100 scale-100 rotate-0 translate-y-0 border-indigo-400/50 bg-indigo-900/50 shadow-[0_20px_40px_rgba(79,70,229,0.2)]' :
                      activeNote === 2 ? 'z-20 opacity-60 scale-95 -translate-y-8 rotate-3 border-indigo-400/20 bg-indigo-900/20' :
                        'z-10 opacity-30 scale-90 -translate-y-16 -rotate-2 border-indigo-400/10 bg-indigo-900/10'}`}
                  onClick={() => setActiveNote(0)}
                >
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
                  <p className="text-base md:text-lg lg:text-xl text-white italic leading-relaxed font-medium">
                    "We don't choose between creativity and technology. <br /><br /><span className="gradient-blue-text font-extrabold not-italic">We build where they meet.</span>"
                  </p>
                </div>

                {/* Note 2 — Mission */}
                <div
                  className={`absolute inset-0 glass-card p-6 md:p-8 rounded-[2rem] shadow-xl transition-all duration-700 ease-in-out cursor-pointer flex flex-col items-center justify-center text-center
                    ${activeNote === 1 ? 'z-30 opacity-100 scale-100 rotate-0 translate-y-0 border-violet-400/50 bg-violet-900/50 shadow-[0_20px_40px_rgba(139,92,246,0.2)]' :
                      activeNote === 0 ? 'z-20 opacity-60 scale-95 -translate-y-8 -rotate-2 border-violet-400/20 bg-violet-900/20' :
                        'z-10 opacity-30 scale-90 -translate-y-16 rotate-3 border-violet-400/10 bg-violet-900/10'}`}
                  onClick={() => setActiveNote(1)}
                >
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                  <div className="mt-2">
                    <h4 className="font-bold text-violet-300 text-sm lg:text-base uppercase tracking-widest mb-4">Our Mission</h4>
                    <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-light">
                      Bridge the gap between <strong className="text-white font-semibold">creative vision</strong> and <strong className="text-white font-semibold">technical execution</strong>. Every project pushes boundaries.
                    </p>
                  </div>
                </div>

                {/* Note 3 — Philosophy */}
                <div
                  className={`absolute inset-0 glass-card p-6 md:p-8 rounded-[2rem] shadow-xl transition-all duration-700 ease-in-out cursor-pointer flex flex-col items-center justify-center text-center
                    ${activeNote === 2 ? 'z-30 opacity-100 scale-100 rotate-0 translate-y-0 border-blue-400/50 bg-blue-900/50 shadow-[0_20px_40px_rgba(59,130,246,0.2)]' :
                      activeNote === 1 ? 'z-20 opacity-60 scale-95 -translate-y-8 rotate-2 border-blue-400/20 bg-blue-900/20' :
                        'z-10 opacity-30 scale-90 -translate-y-16 -rotate-3 border-blue-400/10 bg-blue-900/10'}`}
                  onClick={() => setActiveNote(2)}
                >
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
                  <div className="mt-2">
                    <h4 className="font-bold text-indigo-300 text-sm lg:text-base uppercase tracking-widest mb-4">Philosophy</h4>
                    <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-light">
                      We believe the best work happens when <strong className="text-white font-semibold">storytellers</strong>, <strong className="text-white font-semibold">designers</strong>, and <strong className="text-white font-semibold">engineers</strong> work as one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capability Cards — Vertical Format with One Line Subtext */}
        <div className="w-full px-4 md:px-6 lg:px-10 relative z-10 max-w-[1600px] mx-auto mt-16 lg:mt-20">
          <FadeInSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { icon: <Video size={24} />, title: 'Storytelling', desc: 'Films & motion' },
              { icon: <PenTool size={24} />, title: 'Design', desc: 'Branding & graphics' },
              { icon: <Code size={24} />, title: 'Software', desc: 'Apps & plugins' },
              { icon: <Cpu size={24} />, title: 'Hardware', desc: 'Electronics & rigs' },
              { icon: <Lightbulb size={24} />, title: 'Innovation', desc: 'Prototypes & R&D' },
              { icon: <Users size={24} />, title: 'Community', desc: 'Content & projects' },
            ].map((item, i) => (
              <TiltCard key={i} className="group h-full">
                <div className="glass-card p-4 lg:p-5 xl:p-6 rounded-[1.5rem] cursor-default relative overflow-hidden h-full transition-all duration-300 flex flex-col justify-center items-center text-center hover:bg-indigo-900/30 hover:border-indigo-500/40 shadow-lg">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-indigo-300 group-hover:text-white group-hover:bg-[#3B3BFF] transition-all duration-300 mb-4 border border-indigo-500/20 group-hover:border-transparent group-hover:shadow-[0_0_24px_rgba(59,59,255,0.4)]">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm lg:text-base mb-1.5 whitespace-nowrap">{item.title}</h3>
                  <p className="text-slate-400 text-[10px] xl:text-xs whitespace-nowrap leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            ))}
          </FadeInSection>
        </div>
      </section>

      {/* SERVICES — light dot bg with contextual animations */}
      <section id="services" className="py-24 md:py-32 scroll-mt-24 light-dot-bg relative">
        <SpeedStreaks />
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-300/40 bg-indigo-50/60 text-indigo-700 text-xs font-semibold mb-4 tracking-widest uppercase">
              <Zap size={11} /> What We Build
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#07060F] mb-4 tracking-tight">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-light">At the intersection of storytelling, design, software, and engineering.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🎬', title: 'Storytelling', desc: 'Films, content, documentaries, and branded media.', animation: 'alphabets' },
              { emoji: '✨', title: 'Motion & Design', desc: 'Animation, graphics, branding, and interfaces.', animation: 'doodles' },
              { emoji: '💻', title: 'Software & Tools', desc: 'Apps, websites, plugins, and automation.', animation: 'loading-bar' },
              { emoji: '⚡', title: 'Hardware & Prototyping', desc: 'Electronics, rigs, and custom builds.', animation: 'analog-waves' },
            ].map((s, i) => (
              <FadeInSection key={i} delay={`${i * 80}ms`}>
                <TiltCard>
                  <div className="glass-card-light p-8 rounded-[2rem] transition-all duration-500 flex flex-col items-start group cursor-default relative overflow-hidden h-full">
                    <div className="text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 mb-4">{s.emoji}</div>
                    <h3 className="text-xl font-bold text-[#07060F] mb-2 group-hover:text-[#3B3BFF] transition-colors">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-light flex-grow">{s.desc}</p>

                    {/* Contextual animation per service */}
                    <div className={`mt-6 w-full h-8 relative overflow-hidden bg-transparent rounded-lg flex items-center justify-center`}>
                      {s.animation === 'alphabets' && (
                        <div className="absolute inset-0 flex justify-around items-end overflow-hidden font-mono text-[#3B3BFF] font-bold text-base pb-1">
                          <span className="float-up delay-100">A</span>
                          <span className="float-up delay-300">k</span>
                          <span className="float-up delay-500">M</span>
                          <span className="float-up delay-700">x</span>
                          <span className="float-up delay-200">Z</span>
                        </div>
                      )}
                      {s.animation === 'doodles' && (
                        <div className="absolute inset-0 flex justify-around items-end overflow-hidden text-[#818cf8] text-base pb-1">
                          <span className="float-up delay-100">✧</span>
                          <span className="float-up delay-400">✦</span>
                          <span className="float-up delay-200">△</span>
                          <span className="float-up delay-600">✧</span>
                          <span className="float-up delay-300">◯</span>
                        </div>
                      )}
                      {s.animation === 'loading-bar' && (
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full w-0 service-anim-fill" />
                        </div>
                      )}
                      {s.animation === 'analog-waves' && (
                        <div className="w-full h-full flex items-center overflow-hidden">
                          <svg className="w-[200%] h-full wave-anim" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path d="M 0 10 Q 12.5 0, 25 10 T 50 10 Q 62.5 0, 75 10 T 100 10 Q 112.5 0, 125 10 T 150 10 Q 162.5 0, 175 10 T 200 10" fill="none" stroke="#3B3BFF" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[#3B3BFF] blur-2xl" />
                  </div>
                </TiltCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PLUGIN — dark grid bg */}
      <section className="py-24 md:py-32 dark-grid-bg relative overflow-hidden">
        <SpeedStreaks />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(59,59,255,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 text-center">
          <FadeInSection>
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-widest uppercase">Featured Software</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
              Vampro Voice Generator<br />
              <span className="gradient-blue-text">Text to Speech for Premiere Pro</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Voice generation built into your creative workflow. Natural-sounding voiceovers directly inside Adobe applications.
            </p>
          </FadeInSection>
          <FadeInSection delay="200ms" className="relative max-w-5xl mx-auto mb-12">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-indigo-500/20 shadow-[0_0_40px_rgba(59,59,255,0.15)]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/MKSFsz1PdB4"
                title="Vampro Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['⚡ Fast Generation', '🎙 Natural Voices', '🔌 Adobe Integration'].map(tag => (
                <div key={tag} className="glass-card px-5 py-2 rounded-full text-sm font-semibold text-slate-300 cursor-default">{tag}</div>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection delay="300ms">
            <button onClick={() => navigate('/plugins/adobe-voice')} className="group relative bg-[#3B3BFF] text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(59,59,255,0.4)] hover:shadow-[0_0_60px_rgba(59,59,255,0.6)] hover:-translate-y-1 flex items-center mx-auto gap-3 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3">Explore Plugin <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* YOUTUBE — light dot bg */}
      <section className="py-24 md:py-32 light-dot-bg relative">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <FadeInSection>
            <div className="glass-card-light border border-indigo-100/60 rounded-[2rem] p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="relative z-10 lg:w-1/2">
                <div className="bg-red-50 text-red-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6"><PlayCircle size={32} /></div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#07060F] mb-4 tracking-tight">Stories Behind the Build</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                  Follow the journey — from filmmaking and design to software, electronics, and creative experiments.
                </p>
                <button onClick={() => window.open('https://youtube.com/@vamprotech?si=uC4oGsUcVknjpfF9', '_blank')} className="group bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-red-600/40 hover:-translate-y-1 flex items-center gap-2">
                  Explore the Channel <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/RSolWxyzn2c"
                  title="Vampro YouTube Channel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Home;