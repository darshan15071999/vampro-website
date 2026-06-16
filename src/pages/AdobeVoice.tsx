import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MonitorPlay, Wand2, Download, FileText, Shield, ArrowRight,
  Layers, Mic, Zap, Layout, CheckCircle, AlertTriangle, Check
} from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import TiltCard from '../components/TiltCard';
import WaveformCanvas from '../components/WaveformCanvas';
import TextParticles from '../components/TextParticles';
import SpeedStreaks from '../components/SpeedStreaks';
import { useWaitlist } from '../context/WaitlistContext';
import { Helmet } from "react-helmet-async";


<Helmet>
  <title>Adobe Voice Generator for Premiere Pro | Vampro</title>

  <meta
    name="description"
    content="Generate realistic AI voiceovers directly inside Adobe Premiere Pro."
  />

  <meta
    property="og:title"
    content="Adobe Voice Generator for Premiere Pro | Vampro"
  />

  <meta
    property="og:description"
    content="Generate realistic AI voiceovers directly inside Adobe Premiere Pro."
  />
</Helmet>

const AdobeVoice = () => {
  const nav = useNavigate();
  const howRef = useRef<HTMLDivElement>(null);
  const [howVisible, setHowVisible] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [activeReason, setActiveReason] = useState(0);

  const reasonImages = [
    "/reason1.png",
    "/reason2.png",
    "/reason3.png",
    "/reason4.png",
  ];

  const [stepsRevealed, setStepsRevealed] = useState(false);
  const [autoPlayHow, setAutoPlayHow] = useState(true);

  const reasonRef = useRef<HTMLDivElement>(null);
  const [reasonVisible, setReasonVisible] = useState(false);
  const [autoPlayReason, setAutoPlayReason] = useState(true);

  const whoRef = useRef<HTMLDivElement>(null);
  const [activeWho] = useState(-1);

  const { openModal, hasJoined } = useWaitlist();

  const handleWaitlist = (e: React.MouseEvent, source: string) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(source);
  };

  useEffect(() => {
    const el = reasonRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setReasonVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!reasonVisible || !autoPlayReason) return;
    const interval = setInterval(() => {
      setActiveReason(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [reasonVisible, autoPlayReason]);

  useEffect(() => {
    const el = whoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Autoscroll removed as per request

  useEffect(() => {
    const el = howRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setHowVisible(true);
        setTimeout(() => setStepsRevealed(true), 200);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!howVisible || !autoPlayHow) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, [howVisible, autoPlayHow]);

  const steps = [
    { num: '1', title: 'Open Plugin', desc: 'Launch inside Premiere Pro', icon: <Layout size={28} /> },
    { num: '2', title: 'Enter Text', desc: 'Paste or write narration', icon: <FileText size={28} /> },
    { num: '3', title: 'Choose Voice', desc: 'Select a voice profile', icon: <Mic size={28} /> },
    { num: '4', title: 'Generate', desc: 'AI processes your audio', icon: <Zap size={28} /> },
    { num: '5', title: 'Import', desc: 'Use in your project', icon: <Download size={28} /> },
  ];



  const navigate = (path: string) => {
    nav(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Announcement */}
      <div className="bg-gradient-to-r from-[#3B3BFF] via-[#1B2A6B] to-[#3B3BFF] text-white py-2.5 px-4 flex items-center justify-center gap-4 sticky top-[96px] z-40">
        <span className="text-xs font-bold tracking-widest uppercase opacity-90">From script to voiceover — without leaving Premiere Pro (App yet to be launched*)</span>
        {hasJoined ? (
          <button disabled className="bg-white/10 text-white/50 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-1 cursor-not-allowed">
            <Check size={12} /> Joined
          </button>
        ) : (
          <button onClick={(e) => handleWaitlist(e, 'Adobe Voice Announcement')} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-colors shadow-sm">
            Join Waitlist
          </button>
        )}
      </div>

      {/* HERO — dark with waveform and text particles */}
      <section className="relative min-h-[calc(100vh-96px)] flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden dark-grid-bg">
        <WaveformCanvas />
        <TextParticles />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,59,255,0.1) 0%, transparent 70%)' }} />
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 text-center">
          <FadeInSection>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['🏗 Built for Premiere Pro', '🎙 Multiple AI Voices', '☁️ Cloud Voice Generation', '🔌 Integrated Workflow'].map(b => (
                <span key={b} className="glass-card px-4 py-2 rounded-full text-xs font-semibold text-indigo-200">{b}</span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              <span className="text-white">Vampro Voice Generator</span><br />
              <span className="gradient-blue-text">Text to Speech</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Generate AI-powered voiceovers directly inside Adobe Premiere Pro. Write your script, choose a voice, and create narrations in minutes.
            </p>
          </FadeInSection>
          <FadeInSection delay="200ms" className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="relative group/plugin w-full sm:w-auto">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 opacity-0 group-hover/plugin:opacity-100 transition-opacity z-20 pointer-events-none group-hover/plugin:pointer-events-auto">
                App yet to be launched
                {hasJoined ? (
                  <button disabled className="bg-green-500/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto cursor-not-allowed" title="Joined Waitlist"><Check size={14} /></button>
                ) : (
                  <button onClick={(e) => handleWaitlist(e, 'Adobe Voice Page')} className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto" title="Join Waitlist">+</button>
                )}
              </div>
              <button onClick={() => {
                document.getElementById('download')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
                className="group relative w-full sm:w-auto bg-[#3B3BFF] text-white px-9 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all shadow-[0_0_40px_rgba(59,59,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Download size={20} className="relative z-10" /><span className="relative z-10">Get the Extension</span>
              </button>
            </div>
            <div className="relative group/plugin w-full sm:w-auto">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 opacity-0 group-hover/plugin:opacity-100 transition-opacity z-20 pointer-events-none group-hover/plugin:pointer-events-auto">
                App yet to be launched
                {hasJoined ? (
                  <button disabled className="bg-green-500/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto cursor-not-allowed" title="Joined Waitlist"><Check size={14} /></button>
                ) : (
                  <button onClick={(e) => handleWaitlist(e, 'Adobe Voice Page')} className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto" title="Join Waitlist">+</button>
                )}
              </div>
              <button onClick={() => window.open('#', '_blank')} className="w-full sm:w-auto glass-card hover:border-indigo-500/40 text-white px-9 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center"><img src="/marketplacelogo.png" alt="Marketplace" className="w-full h-full object-contain"></img></div>
                View in Marketplace
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* HOW IT WORKS — light dot bg */}
      <section className="py-24 md:py-32 light-dot-bg relative">
        <SpeedStreaks />
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#07060F] mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 font-light">A seamless process designed for editors.</p>
          </FadeInSection>

          <div ref={howRef} className="relative" style={{ minHeight: 180 }}>
            {howVisible && (
              <>
                {/* Desktop */}
                <div className="hidden md:flex items-center justify-center relative w-full" style={{ height: 160 }}>
                  <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${stepsRevealed ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 1000 160" preserveAspectRatio="none" style={{ zIndex: 0 }}>
                    <path d="M 100 80 C 200 30, 400 130, 500 80 C 600 30, 800 130, 900 80" fill="none" stroke="url(#cg)" strokeWidth="2" strokeDasharray="1200" strokeDashoffset="0" className={stepsRevealed ? "animate-path-draw" : ""} strokeLinecap="round" />
                    <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3B3BFF" stopOpacity="0.2" /><stop offset="50%" stopColor="#818cf8" stopOpacity="0.5" /><stop offset="100%" stopColor="#3B3BFF" stopOpacity="0.2" /></linearGradient></defs>
                  </svg>
                  {steps.map((step, i) => {
                    const isCenter = i === 2;
                    const pos = ['10%', '30%', '50%', '70%', '90%'][i];
                    return (
                      <div key={i}
                        className="absolute"
                        style={{
                          left: stepsRevealed ? pos : '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: stepsRevealed ? 1 : (isCenter ? 1 : 0),
                          transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s`,
                          zIndex: isCenter ? 20 : 10,
                        }}
                      >
                        <button onClick={() => { setActiveStep(i); setAutoPlayHow(false); }} onMouseEnter={() => { setActiveStep(i); setAutoPlayHow(false); }}
                          className={`flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 w-36 group ${activeStep === i
                            ? 'bg-white shadow-[0_0_24px_rgba(59,59,255,0.3)] border-2 border-[#3B3BFF]/40 scale-105'
                            : 'bg-white shadow-md border border-slate-200 hover:border-indigo-300'
                            }`}
                        >
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${activeStep === i ? 'bg-[#3B3BFF] text-white' : 'bg-indigo-50 text-indigo-500 group-hover:bg-[#3B3BFF] group-hover:text-white'}`}>
                            {step.icon}
                          </div>
                          <div className="text-[9px] font-black text-indigo-400 mb-0.5">STEP {step.num}</div>
                          <div className="text-[#07060F] font-bold text-xs">{step.title}</div>
                        </button>
                      </div>
                    );
                  })}
                </div>
                {/* Mobile */}
                <div className="flex md:hidden flex-col gap-3 w-full">
                  {steps.map((step, i) => (
                    <button key={i} onClick={() => { setActiveStep(i); setAutoPlayHow(false); }} className={`p-4 rounded-2xl text-left transition-all duration-200 flex items-center gap-4 ${activeStep === i ? 'bg-white shadow-lg border-2 border-[#3B3BFF]/40 scale-[1.02]' : 'bg-white/80 border border-slate-200 hover:border-indigo-300'
                      }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${activeStep === i ? 'bg-[#3B3BFF] text-white' : 'bg-indigo-50 text-indigo-500'}`}>{step.icon}</div>
                      <div><div className="text-[#07060F] font-bold text-sm">{step.num}. {step.title}</div><div className="text-slate-500 text-xs">{step.desc}</div></div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <FadeInSection delay="200ms">
            <div className="relative mt-10 max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden shadow-xl border border-slate-200">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/_-GJ3CX9iuI"
                title="Vampro Voice Generator Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* WHY CREATORS — dark grid */}
      <section className="py-24 md:py-32 dark-grid-bg relative">
        <SpeedStreaks />
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection><h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12 text-center">Why Should Creators Use It</h2></FadeInSection>
          <div ref={reasonRef} className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection className="space-y-3">
              {[
                { title: 'Stay Inside Premiere Pro', desc: 'No more jumping between tools and your editing timeline.' },
                { title: 'Reduce Production Time', desc: 'Generate narration in minutes instead of manual recording.' },
                { title: 'Built for Content Workflows', desc: 'Designed for YouTube, explainers, demos, and presentations.' },
                { title: 'Simple Voice Generation', desc: 'Paste a script, select a voice, and generate. That\'s it.' },
              ].map((item, i) => (
                <div key={i} onClick={() => { setActiveReason(i); setAutoPlayReason(false); }} onMouseEnter={() => { setActiveReason(i); setAutoPlayReason(false); }} className={`flex gap-4 cursor-pointer p-5 rounded-2xl transition-all duration-200 ${activeReason === i ? 'glass-card border-indigo-500/30 bg-indigo-900/20 shadow-[0_0_24px_rgba(59,59,255,0.2)]' : 'hover:bg-indigo-900/10 border border-transparent'}`}>
                  <div className={`w-1 rounded-full flex-shrink-0 transition-colors ${activeReason === i ? 'bg-[#3B3BFF]' : 'bg-slate-700'}`} />
                  <div>
                    <h4 className={`font-bold text-lg mb-1 transition-colors ${activeReason === i ? 'text-[#3B3BFF]' : 'text-white'}`}>{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </FadeInSection>
            <FadeInSection delay="200ms">
              <div className="relative aspect-video glass-card rounded-[2rem] overflow-hidden">
                <img key={activeReason} src={reasonImages[activeReason]} className="absolute inset-0 w-full h-full object-contain bg-black" alt="Feature" />
                <div key={activeReason} className="absolute inset-0 bg-gradient-to-t from-[#07060F]/70 via-[#07060F]/20 to-transparent flex flex-col justify-end p-8 animate-fade-up">
                  <div className="w-10 h-10 bg-[#3B3BFF] rounded-xl flex items-center justify-center mb-4 animate-glow-pulse">
                    {[<Layers size={18} />, <Zap size={18} />, <MonitorPlay size={18} />, <Wand2 size={18} />][activeReason]}
                  </div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
                    {['Seamless Integration', 'Lightning Fast', 'Content Optimized', 'Intuitive Interface'][activeReason]}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {['A unified workspace without leaving your timeline.', 'Skip manual recording and audio cleanup.', 'Perfect for YouTube, explainers, and presentations.', 'Just paste, select, and generate.'][activeReason]}
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* FEATURES — light grid bg */}
      <section className="py-24 md:py-32 sketchbook-bg relative">
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection><h2 className="text-3xl md:text-5xl font-extrabold text-[#07060F] mb-12 text-center">Built Around Your Workflow</h2></FadeInSection>
          <FadeInSection delay="100ms" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={22} />, title: 'AI Voice Generation', desc: 'Convert text into natural-sounding speech directly from Premiere Pro.' },
              { icon: <Mic size={22} />, title: 'Multiple Profiles', desc: 'Choose from available voices based on your project\'s tone.' },
              { icon: <FileText size={22} />, title: 'Script-Based', desc: 'Generate narration from text without recording equipment.' },
              { icon: <Layers size={22} />, title: 'Project Integration', desc: 'Keep voice generation close to your editing workflow.' },
            ].map((f, i) => (
              <TiltCard key={i}>
                <div className="glass-card-light p-7 rounded-[2rem] h-full flex flex-col group cursor-default">
                  <div className="w-11 h-11 rounded-xl text-indigo-500 group-hover:text-white group-hover:bg-[#3B3BFF] flex items-center justify-center mb-4 transition-all duration-300 border border-indigo-200">{f.icon}</div>
                  <h4 className="font-bold text-[#07060F] mb-2 text-base">{f.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow">{f.desc}</p>
                </div>
              </TiltCard>
            ))}
          </FadeInSection>

        </div>
      </section>

      {/* WHO IS IT FOR — dark dot bg */}
      <section className="py-24 md:py-32 dark-dot-bg relative">
        <SpeedStreaks />
        <div ref={whoRef} className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection className="text-center mb-12"><h2 className="text-3xl md:text-5xl font-extrabold text-white">Who Is It For?</h2></FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'YouTube Creators', desc: 'Narration without recording equipment.', image: '/creator.png', colorClass: 'red', shadow: 'shadow-[0_0_24px_rgba(239,68,68,0.15)] border-red-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(239,68,68,0.15)] group-hover:border-red-500/30', bgGlow: 'from-red-500/20', bar: 'bg-red-500' },
              { title: 'Video Editors', desc: 'Generate voiceovers quickly.', image: '/editor.png', colorClass: 'violet', shadow: 'shadow-[0_0_24px_rgba(139,92,246,0.15)] border-violet-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] group-hover:border-violet-500/30', bgGlow: 'from-violet-500/20', bar: 'bg-violet-500' },
              { title: 'Marketing Teams', desc: 'Produce demos faster.', image: '/marketing.png', colorClass: 'green', shadow: 'shadow-[0_0_24px_rgba(34,197,94,0.15)] border-green-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(34,197,94,0.15)] group-hover:border-green-500/30', bgGlow: 'from-green-500/20', bar: 'bg-green-500' },
              { title: 'Educators', desc: 'Scripts into spoken explanations.', image: '/educator.png', colorClass: 'yellow', shadow: 'shadow-[0_0_24px_rgba(234,179,8,0.15)] border-yellow-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(234,179,8,0.15)] group-hover:border-yellow-500/30', bgGlow: 'from-yellow-500/20', bar: 'bg-yellow-500' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={`${i * 80}ms`}>
                <TiltCard>
                  <div
                    className={`group glass-card rounded-[2rem] h-[600px] flex flex-col justify-end p-7 relative overflow-hidden cursor-pointer transition-all duration-500 ${item.hoverShadow} ${activeWho === i ? `${item.shadow} scale-[1.02]` : 'border-transparent'}`}
                  >
                    <img src={item.image} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${activeWho === i ? 'opacity-50 scale-105' : 'opacity-0 scale-100 group-hover:opacity-10 group-hover:scale-105'}`} alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07060F]/95 via-[#07060F]/40 to-transparent pointer-events-none" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.bgGlow} to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${activeWho === i ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                    <div className="relative z-10 transition-transform duration-500 -translate-y-[230px] group-hover:translate-y-0">
                      <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                      <div className={`mt-3 h-1 ${item.bar} transition-all duration-500 rounded-full ${activeWho === i ? 'w-10' : 'w-0 group-hover:w-4'}`} />
                    </div>
                  </div>
                </TiltCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD — dark grid */}
      <section id="download" className="py-24 md:py-32 dark-grid-bg text-center relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(59,59,255,0.15) 0%, transparent 70%)' }} />
        <div className="w-full px-6 md:px-10 lg:px-16 max-w-3xl mx-auto relative z-10">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10">Before You Download</h2>
            <div className="glass-card rounded-[2rem] p-10 mb-12 text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h4 className="font-bold text-slate-400 mb-6 uppercase tracking-widest text-xs flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Requirements</h4>
                <ul className="space-y-4">
                  {['Adobe Premiere Pro (26.0+)', 'Active internet connection', 'Windows 10/11 (64-bit)'].map(r => (
                    <li key={r} className="flex items-center gap-3 text-white"><span className="text-green-400 font-bold">✔</span>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-auto flex flex-col items-center justify-center">
                <div className="w-full max-w-[520px] aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative">
                  <img src="/header.png" alt="Version preview" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-4 text-slate-500 text-sm font-medium tracking-wide">Version 1.1.0</p>
              </div>
            </div>
            <div className="space-y-8">
              <div><p className="text-4xl md:text-6xl font-black text-white mb-1 animate-blur-pulse tracking-tight">Completely free.</p></div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="relative group/plugin w-full sm:w-auto">
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 opacity-0 group-hover/plugin:opacity-100 transition-opacity z-20 pointer-events-none group-hover/plugin:pointer-events-auto">
                    App yet to be launched
                    {hasJoined ? (
                      <button disabled className="bg-green-500/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto cursor-not-allowed" title="Joined Waitlist"><Check size={14} /></button>
                    ) : (
                      <button onClick={(e) => handleWaitlist(e, 'Adobe Voice Page')} className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto" title="Join Waitlist">+</button>
                    )}
                  </div>
                  <button onClick={() => { window.open("https://pub-385a87554a7340a09de10ff1f708bf66.r2.dev/Vampro-Voiceover-Plugin/Vampro%20Voice%20Generator%20Installer.exe", "_blank"); }}
                    className="group w-full sm:w-auto relative bg-[#3B3BFF] text-white px-9 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all shadow-[0_0_40px_rgba(59,59,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                    <Download size={20} className="relative z-10" /><span className="relative z-10">Download for Windows</span></button>
                </div>
                <div className="relative group/plugin w-full sm:w-auto">
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 opacity-0 group-hover/plugin:opacity-100 transition-opacity z-20 pointer-events-none group-hover/plugin:pointer-events-auto">
                    App yet to be launched
                    {hasJoined ? (
                      <button disabled className="bg-green-500/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto cursor-not-allowed" title="Joined Waitlist"><Check size={14} /></button>
                    ) : (
                      <button onClick={(e) => handleWaitlist(e, 'Adobe Voice Page')} className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto" title="Join Waitlist">+</button>
                    )}
                  </div>
                  <button className="w-full sm:w-auto glass-card text-white px-9 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                    <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center"><img src="/marketplacelogo.png" alt="Marketplace" className="w-full h-full object-contain" /></div>
                    Adobe Marketplace
                  </button>
                </div>
              </div>
              <p className="text-slate-500 text-sm">Need help? <button onClick={() => navigate('/docs')} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-semibold">Read the installation guide.</button></p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* LIMITATIONS — dark */}
      <section className="py-16 bg-[#07060F] border-y border-amber-900/20">
        <div className="w-full px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto">
          <FadeInSection className="glass-card rounded-[2rem] px-8 py-5 border-amber-500/20">
            <div className="flex flex-col xl:flex-row items-center gap-8 w-full">
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="bg-amber-900/30 p-3 rounded-xl text-amber-400 border border-amber-500/20 flex-shrink-0"><AlertTriangle size={24} /></div>
                <h3 className="text-lg font-bold text-amber-300">Current Limitations</h3>
              </div>
              <div className="hidden xl:block h-8 w-px bg-amber-900/30"></div>
              <div className="flex-1 w-full flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 text-amber-200/70 text-sm md:text-base">
                {['Requires internet connection', 'Cloud-based processing', 'Voice quality may vary'].map(l => (
                  <div key={l} className="flex items-center gap-3 whitespace-nowrap"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />{l}</div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* DOCS & LEGAL — light dot bg */}
      <section className="py-20 light-dot-bg">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <FileText size={24} />, title: 'Documentation', desc: 'Guides, installation, and troubleshooting.', cta: 'Read Docs', action: () => navigate('/docs') },
              { icon: <Shield size={24} />, title: 'Terms of Use', desc: 'Licensing, restrictions, and agreements.', cta: 'Full Terms', action: () => navigate('/terms') },
              { icon: <Shield size={24} />, title: 'Privacy Policy', desc: 'Data handling and user information.', cta: 'Read Privacy', action: () => navigate('/privacy') },
            ].map((item, i) => (
              <TiltCard key={i}>
                <div className="glass-card-light glow-card p-8 rounded-[2rem] text-center flex flex-col items-center cursor-pointer h-full" onClick={item.action}>
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-500 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-[#07060F] mb-2">{item.title}</h3>
                  <p className="text-slate-500 mb-6 flex-grow text-sm">{item.desc}</p>
                  <span className="text-[#3B3BFF] font-bold flex items-center gap-1.5 text-sm">{item.cta} <ArrowRight size={14} /></span>
                </div>
              </TiltCard>
            ))}
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default AdobeVoice;