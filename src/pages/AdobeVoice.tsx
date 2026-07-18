import { useState, useEffect, useRef } from 'react';
import { Store, Grid2x2, MonitorPlay, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Wand2, FileText, Shield, ArrowRight,
  Layers, Mic, Zap, Layout, CheckCircle, } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import TiltCard from '../components/TiltCard';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { voiceMetadata } from '../seo/metadata';
import TextParticles from '../components/TextParticles';
import FloatingLines from '../components/FloatingLines';
import WaveformCanvas from '../components/WaveformCanvas';
import ColorBends from '../components/ColorBends';

import RadialOrbitalTimeline from '../components/RadialOrbitalTimeline';
import DOMCircularGallery from '../components/DOMCircularGallery';
import PixelCard from '../components/PixelCard';
import CardSwap, { Card } from '../components/CardSwap';

import ShinyText from '../components/ShinyText';
import SoftAurora from '../components/SoftAurora';
import SpecularButton from '../components/SpecularButton';
import { useSignup } from '../context/SignupContext';

const FEATURES = ['🏗 Built for Premiere Pro', '🎙 Multiple AI Voices', '💾 Offline Voice Generation', '🔌 Integrated Workflow'];

const TIMELINE_DATA = [
  {
    id: 1,
    title: "Open Plugin",
    content: "Launch inside Premiere Pro.",
    icon: Layout,
  },
  {
    id: 2,
    title: "Enter Text",
    content: "Paste or write narration.",
    icon: FileText,
  },
  {
    id: 3,
    title: "Choose Voice",
    content: "Select a voice profile and tone.",
    icon: Mic,
  },
  {
    id: 4,
    title: "Generate",
    content: "AI processes your audio.",
    icon: Zap,
  },
  {
    id: 5,
    title: "Import",
    content: "Add to your project timeline or bin.",
    icon: Download,
  }
];

const ENABLED_WAVES = ["top","middle","bottom"] as const;
const LINES_GRADIENT = ["#1f16b8", "#3476be", "#3438c2"];

const REQUIREMENTS = ['Adobe Premiere Pro (26.0+)', 'Windows 10/11 (64-bit)'];

const AdobeVoice = () => {
  const nav = useNavigate();
  const { openSignup } = useSignup();

  const handleDownloadWindows = (_source?: string) => {
    openSignup('Windows App', () => {
      window.open("https://apps.microsoft.com/detail/9nltft936rk2?hl=en-US&gl=IN&ocid=pdpshare", "_blank");
    });
  };

  const handleDownloadAdobe = (_source?: string) => {
    openSignup('Adobe Extension', () => {
      window.open("https://exchange.adobe.com/apps/cc/d6d01a94/vampro-voice-generator-text-to-speech", "_blank");
    });
  };
  
  const reasonImages = [
    "/reason1.png",
    "/reason2.png",
    "/reason3.png",
    "/reason4.png",
  ];

  const reasonRef = useRef<HTMLDivElement>(null);
  const [reasonVisible, setReasonVisible] = useState(false);
  const [autoPlayReason, setAutoPlayReason] = useState(true);
  const [activeReason, setActiveReason] = useState(0);

  useEffect(() => {
    // howRef and observer removed
  }, []);

  const whoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = whoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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

  const navigate = (path: string) => {
    nav(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#04030A] text-white flex flex-col">
      <SEO {...voiceMetadata} />
      {/* Announcement */}
      <div className="bg-gradient-to-r from-[#3B3BFF] via-[#1B2A6B] to-[#3B3BFF] text-white py-2.5 px-4 flex items-center justify-center gap-4 sticky top-[96px] z-40">
        <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase opacity-90 text-center leading-relaxed">From script to voiceover: without leaving Premiere Pro</span>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 z-0 pointer-events-none mix-blend-screen opacity-30" style={{ top: '70vh', bottom: '-250px', maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
          <FloatingLines 
            enabledWaves={["top","middle","bottom"]}
            lineCount={8}
            lineDistance={8}
            bendRadius={8}
            bendStrength={-2}
            interactive={false}
            parallax={true}
            animationSpeed={1}
            linesGradient={["#1f16b8", "#3476be", "#3438c2"]}
          />
        </div>
        {/* HERO — dark with waveform and text particles */}
      <section className="relative min-h-[calc(100vh-96px)] flex flex-col items-center justify-start md:justify-center pt-[160px] md:pt-36 pb-10 overflow-hidden ">
          
          <div className="absolute inset-0 z-0 opacity-80" style={{ maskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)' }}>
            <SoftAurora
              speed={0.6}
              scale={1.5}
              brightness={1}
              color1="#5280ca"
              color2="#0c0fb6"
              noiseFrequency={2.5}
              noiseAmplitude={1}
              bandHeight={0.5}
              bandSpread={1}
              octaveDecay={0.1}
              layerOffset={0}
              colorSpeed={1}
              enableMouseInteraction
              mouseInfluence={0.25}
            />
          </div>

          <WaveformCanvas />
        
        
        <TextParticles />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,59,255,0.1) 0%, transparent 70%)' }} />
        
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 text-center">
          <FadeInSection>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {FEATURES.map(b => (
                <span key={b} className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg px-4 py-2 text-xs font-semibold text-indigo-200"><ShinyText text={b} speed={2} shineColor="#ffffff" color="#c7d2fe" /></span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              <ShinyText text="Vampro Voice Generator" speed={3} className="text-white" shineColor="#ffffff" color="#f0f0f0" /><br />
              <ShinyText text="Text-to-Speech" speed={3} delay={0.5} className="gradient-blue-text" shineColor="#ffffff" color="#3B3BFF" />
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Generate natural sounding AI voiceovers from text in seconds directly inside Adobe Premiere Pro. Modify generated audio anytime by simply selecting the clip.
            </p>
          </FadeInSection>
          <FadeInSection delay="200ms" className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <SpecularButton onClick={() => handleDownloadWindows('Hero')}
              className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] !px-9 !py-4">
              <div className="flex items-center justify-center gap-2 font-bold text-lg text-white">
                <Grid2x2 size={25} /> Install Companion App
              </div>
            </SpecularButton>
            <SpecularButton onClick={() => handleDownloadAdobe('Hero')}
              className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] !px-9 !py-4">
              <div className="flex items-center justify-center gap-2 font-bold text-lg text-white">
                <Store size={22} /> Get the Extension
              </div>
            </SpecularButton>
          </FadeInSection>
        </div>
        
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-16 relative">
        
        
        
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection className="text-center mb-0 relative z-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md"><ShinyText text="How It Works" speed={2.5} shineColor="#ffffff" color="#ffffff" /></h2>
            <p className="text-lg text-slate-300 font-light drop-shadow-md">A seamless process designed for editors.</p>
          </FadeInSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1400px] mx-auto mt-8 relative z-10">
            {/* Left: YouTube Video */}
            <FadeInSection delay="100ms">
              <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] border-none">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/_-GJ3CX9iuI"
                  title="Vampro Voice Generator Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </FadeInSection>
            
            {/* Right: Radial Orbital Timeline */}
            <FadeInSection delay="200ms">
              <RadialOrbitalTimeline autoPlay={true} timelineData={TIMELINE_DATA} />
            </FadeInSection>
          </div>
        </div>
        
      </section>

      </div>
      
{/* WHY CREATORS */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute left-0 right-0 z-0 pointer-events-none opacity-25" style={{ top: '-200px', bottom: '-200px', maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
            <ColorBends
              colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
              rotation={90}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={0}
              noise={0.15}
              parallax={0.5}
              iterations={1}
              intensity={1.5}
              bandWidth={6}
              transparent
              autoRotate={0}
              color="#557ef7"
            />
          </div>
        

        
        
        
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection><h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12 text-center drop-shadow-md"><ShinyText text="Complete Workflow Built Into Your Timeline" speed={3} shineColor="#ffffff" color="#ffffff" /></h2></FadeInSection>
          <div ref={reasonRef} className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection className="space-y-3">
              {[
                { title: 'Stay Inside Premiere Pro', desc: 'No more jumping between tools and your editing timeline.' },
                { title: 'Reduce Production Time', desc: 'Generate narration in seconds and insert directly inside yor timeline at your playhead location.' },
                { title: 'Built for Ultra-Smooth Workflows', desc: 'Change the generated voice instantly by simply selecting the clip and modifying the script, voice, and tone.' },
                { title: 'Unlimited Offline Voice Generation', desc: 'Paste a script, select a voice, and generate audio, completely processed on your machine.' },
              ].map((item, i) => (
                  <div key={i} onClick={() => { setActiveReason(i); setAutoPlayReason(false); }} onMouseEnter={() => { setActiveReason(i); setAutoPlayReason(false); }} className="flex gap-4 cursor-pointer p-5 rounded-3xl transition-all duration-300 bg-white/5 backdrop-blur-[40px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-white/10 group">
                    <div className="flex flex-col items-center pt-1.5">
                      <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeReason === i ? 'bg-[#3B3BFF] shadow-[0_0_15px_#3B3BFF] scale-125' : 'bg-white/20'}`} />
                      <div className={`w-[2px] h-full mt-3 rounded-full transition-all duration-500 ${activeReason === i ? 'bg-gradient-to-b from-[#3B3BFF]/50 to-transparent' : 'bg-white/10'}`} />
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg mb-1 transition-colors duration-300 ${activeReason === i ? 'text-[#ffffff] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-white/70 group-hover:text-white'}`}>{item.title}</h4>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${activeReason === i ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>{item.desc}</p>
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
                    {['Seamless Integration', 'Lightning Fast', 'Content Optimized', 'Unlimited Voice Generation'][activeReason]}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {['A unified workspace without leaving your timeline.', 'Voice generated directly in your desired location on the timeline.', 'Instant script updates and voice modifications.', 'Generate and modify voices as many times as you require.'][activeReason]}
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
        
      </section>

      {/* FEATURES */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute left-0 right-0 z-0 pointer-events-none opacity-25" style={{ top: '-200px', bottom: '-200px', maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 75%, transparent)' }}>
            <ColorBends
              colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
              rotation={90}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={0}
              noise={0.15}
              parallax={0.5}
              iterations={1}
              intensity={1.5}
              bandWidth={6}
              transparent
              autoRotate={0}
              color="#557ef7"
            />
          </div>
          
          <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
            <FadeInSection><h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12 text-center drop-shadow-md"><ShinyText text="Built for Creative Speed" speed={2.5} shineColor="#ffffff" color="#ffffff" /></h2></FadeInSection>
            
            <FadeInSection delay="100ms" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { icon: <Zap size={22} />, title: 'Instant AI Voice Generation', desc: 'Generate narration from text in seconds. The companion application bundles the entire package for offline use with ultra fast processing.' },
                  { icon: <Mic size={22} />, title: 'Multiple Voice Profiles', desc: 'Choose from 27+ natural voices (both male and female) with 7+ unique tone profiles and dedicated presets for each voice.' },
                  { icon: <FileText size={22} />, title: 'Seamless Text-to-Speech Conversion', desc: 'Convert text into natural-sounding speech directly inside Premiere Pro and insert inside your project timeline or bin.' },
                  { icon: <Layers size={22} />, title: 'Complete workflow inside your project', desc: 'Insert generated voices directly inside your timeline. When a clip requires modification, simply select it and modify the contents.' },
                ].map((f, i) => (
                <TiltCard key={i} className="h-full">
                  <div className="w-full h-full">
                    <div className="w-full h-full rounded-[30px] border border-white/10 bg-white/5 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-[40px] hover:bg-white/10 transition-colors duration-300">
                      <div className="p-8 h-full w-full flex flex-col group cursor-default transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl text-indigo-400 group-hover:text-white group-hover:bg-[#3B3BFF] flex items-center justify-center mb-6 transition-all duration-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(59,59,255,0.15)]">{f.icon}</div>
                        <h4 className="font-bold text-white mb-3 text-2xl">{f.title}</h4>
                        <p className="text-slate-300 text-lg leading-relaxed flex-grow">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </FadeInSection>
          </div>
          
        </section>


        {/* WHO IS IT FOR */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute left-0 right-0 z-0 pointer-events-none" style={{ top: '-200px', bottom: '-200px', opacity: 0.25, maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 75%, transparent)' }}>
                        <ColorBends
              colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
              rotation={90}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={0}
              noise={0.15}
              parallax={0.5}
              iterations={1}
              intensity={1.5}
              bandWidth={6}
              transparent
              autoRotate={0}
              color="#557ef7"
            />
        </div>
        
        
        <div ref={whoRef} className="w-full relative z-10 pointer-events-none">
          <FadeInSection className="text-center mb-8 px-6 md:px-10"><h2 className="text-3xl md:text-5xl font-extrabold text-white"><ShinyText text="Who Is It For?" speed={2.5} shineColor="#ffffff" color="#ffffff" /></h2></FadeInSection>
          <div className="w-full relative pointer-events-auto">
            <DOMCircularGallery bend={2.5}>
              {[
                { title: 'YouTube Creators', desc: 'Narration without recording equipment.', image: '/creator.png', colorClass: 'red', shadow: 'shadow-[0_0_24px_rgba(239,68,68,0.15)] border-red-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(239,68,68,0.15)] group-hover:border-red-500/30', bgGlow: 'from-red-500/20', bar: 'bg-red-500' },
                { title: 'Video Editors', desc: 'Generate voiceovers quickly.', image: '/editor.png', colorClass: 'violet', shadow: 'shadow-[0_0_24px_rgba(139,92,246,0.15)] border-violet-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] group-hover:border-violet-500/30', bgGlow: 'from-violet-500/20', bar: 'bg-violet-500' },
                { title: 'Marketing Teams', desc: 'Produce demos faster.', image: '/marketing.png', colorClass: 'green', shadow: 'shadow-[0_0_24px_rgba(34,197,94,0.15)] border-green-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(34,197,94,0.15)] group-hover:border-green-500/30', bgGlow: 'from-green-500/20', bar: 'bg-green-500' },
                { title: 'Educators', desc: 'Scripts into spoken explanations.', image: '/educator.png', colorClass: 'yellow', shadow: 'shadow-[0_0_24px_rgba(234,179,8,0.15)] border-yellow-500/30', hoverShadow: 'group-hover:shadow-[0_0_24px_rgba(234,179,8,0.15)] group-hover:border-yellow-500/30', bgGlow: 'from-yellow-500/20', bar: 'bg-yellow-500' },
              ].map((item, i) => (
                <TiltCard key={i}>
                  <PixelCard variant={item.colorClass === 'red' ? 'red' : item.colorClass === 'violet' ? 'violet' : item.colorClass === 'green' ? 'green' : 'yellow'}>
                    <div className={`group w-full h-full flex flex-col justify-end p-6 relative overflow-hidden cursor-pointer transition-all duration-500 border border-transparent rounded-[2rem] ${item.hoverShadow}`}>
                      <img src={item.image} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 scale-100 group-hover:opacity-10 group-hover:scale-105" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07060F]/95 via-[#07060F]/40 to-transparent pointer-events-none" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.bgGlow} to-transparent opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100`} />
                      <div className="relative z-10 transition-transform duration-500 -translate-y-[120px] group-hover:translate-y-0">
                        <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                        <p className="text-slate-400 text-xs">{item.desc}</p>
                        <div className={`mt-2 h-1 ${item.bar} transition-all duration-500 rounded-full w-0 group-hover:w-4`} />
                      </div>
                    </div>
                  </PixelCard>
                </TiltCard>
              ))}
            </DOMCircularGallery>
          </div>
        </div>
        
      </section>

      {/* GETTING STARTED */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.25, maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
                      <ColorBends
              colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
              rotation={90}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={0}
              noise={0.15}
              parallax={0.5}
              iterations={1}
              intensity={1.5}
              bandWidth={6}
              transparent
              autoRotate={0}
              color="#557ef7"
            />
        </div>
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 mb-8">
            <FadeInSection className="text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4"><ShinyText text="Getting Started" speed={2.5} shineColor="#ffffff" color="#ffffff" /></h2>
              <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">Three quick steps to set everything up and start generating voiceovers.</p>
            </FadeInSection>
          </div>
          <div className="w-full relative max-w-5xl mx-auto flex items-center justify-center" style={{ height: '650px' }}>
            <CardSwap
              width={450}
              height={500}
              cardDistance={60}
              verticalDistance={45}
              delay={3500}
              pauseOnHover
            >
              <Card customClass="cursor-pointer hover:bg-white/10 transition-colors p-10 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(59,59,255,0.3)]">
                <div className="mb-8 text-white p-5 bg-white/10 rounded-2xl"><Store size={56} /></div>
                <h3 className="text-3xl font-bold text-white mb-4">1. Install Extension</h3>
                <p className="text-slate-300 text-lg leading-relaxed">Get the Vampro Voice Generator Text-to-Speech extension from the Adobe Marketplace and install it.</p>
              </Card>
              <Card customClass="cursor-pointer hover:bg-white/10 transition-colors p-10 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(59,59,255,0.3)]">
                <div className="mb-8 text-white p-5 bg-white/10 rounded-2xl"><Download size={56} /></div>
                <h3 className="text-3xl font-bold text-white mb-4">2. Run Companion App</h3>
                <p className="text-slate-300 text-lg leading-relaxed">Download and install the Vampro Voice Service companion app from the Microsoft Store, then launch it.</p>
              </Card>
              <Card customClass="cursor-pointer hover:bg-white/10 transition-colors p-10 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(59,59,255,0.3)]">
                <div className="mb-8 text-white p-5 bg-white/10 rounded-2xl"><MonitorPlay size={56} /></div>
                <h3 className="text-3xl font-bold text-white mb-4">3. Open Premiere Pro</h3>
                <p className="text-slate-300 text-lg leading-relaxed">Inside Premiere Pro, go to Window → UXP Plugins and select Vampro Voice Generator to start using the plugin.</p>
              </Card>
            </CardSwap>
          </div>
        
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="py-16 md:py-24 text-center relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-30" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
          <FloatingLines 
            enabledWaves={ENABLED_WAVES}
            lineCount={8}
            lineDistance={8}
            bendRadius={8}
            bendStrength={-2}
            interactive={false}
            parallax={true}
            animationSpeed={1}
            linesGradient={LINES_GRADIENT}
          />
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse, rgba(59,59,255,0.15) 0%, transparent 70%)' }} />
        <div className="w-full px-6 md:px-10 lg:px-16 max-w-3xl mx-auto relative z-10 pointer-events-none">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12"><ShinyText text="Before You Download" speed={3} shineColor="#ffffff" color="#ffffff" /></h2>
            <TiltCard>
              <div className="w-full h-full">
                <div className="w-full h-full rounded-[30px] border border-white/10 bg-white/5 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-[40px] hover:bg-white/10 transition-colors duration-300 pointer-events-auto relative z-20 mb-12">
                  <div className="p-10 text-left flex flex-col md:flex-row items-center justify-between gap-8 h-full w-full">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-400 mb-6 uppercase tracking-widest text-xs flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Requirements</h4>
                      <ul className="space-y-4">
                        {REQUIREMENTS.map(r => (
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
                </div>
              </div>
            </TiltCard>
            <div className="space-y-8 pointer-events-none">
              <div><p className="text-4xl md:text-6xl font-black text-white mb-1 animate-blur-pulse tracking-tight">Completely free.</p></div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pointer-events-auto relative z-20">
                <SpecularButton onClick={() => handleDownloadWindows('Download')}
                  className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] !px-9 !py-4">
                  <div className="flex items-center justify-center gap-2 font-bold text-lg text-white">
                    <Grid2x2 size={25} /> Microsoft Store
                  </div>
                </SpecularButton>
                <SpecularButton onClick={() => handleDownloadAdobe('Download')}
                  className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] !px-9 !py-4">
                  <div className="flex items-center justify-center gap-2 font-bold text-lg text-white">
                    <Store size={22} /> Adobe Marketplace
                  </div>
                </SpecularButton>
              </div>
              <p className="text-slate-500 text-sm pointer-events-auto relative z-20">Need help? <button onClick={() => navigate('/docs/plugins/voice-generator')} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-semibold">Read the installation guide.</button></p>
              
              
              
            </div>
          </FadeInSection>
        </div>
      </section>

      

      {/* DOCS & LEGAL */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
          <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <FileText size={24} />, title: 'Documentation', desc: 'Guides, installation, and troubleshooting.', cta: 'Read Docs', action: () => navigate('/docs/plugins/voice-generator') },
              { icon: <Shield size={24} />, title: 'Terms of Use', desc: 'Licensing, restrictions, and agreements.', cta: 'Full Terms', action: () => navigate('/terms') },
              { icon: <Shield size={24} />, title: 'Privacy Policy', desc: 'Data handling and user information.', cta: 'Read Privacy', action: () => navigate('/privacy') },
            ].map((item, i) => (
              <TiltCard key={i}>
                <div className="bg-white/5 backdrop-blur-[40px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 rounded-[2rem] text-center flex flex-col items-center cursor-pointer h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300" onClick={item.action}>
                  <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-4 border border-white/10">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 mb-6 flex-grow text-sm">{item.desc}</p>
                  <span className="text-white font-bold flex items-center gap-1.5 text-sm group-hover:text-slate-300 transition-colors">{item.cta} <ArrowRight size={14} /></span>
                </div>
              </TiltCard>
            ))}
          </FadeInSection>
        </div>
      </section>
      <HomeFooter />
    </div>
  );
};

export default AdobeVoice;