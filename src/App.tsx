import React, { useState, useEffect, useRef } from 'react';
import { 
  MonitorPlay, Wand2, PenTool, Cpu, Video, Download, 
  FileText, Shield, ArrowRight, PlayCircle, Settings, 
  Layers, Mic, ChevronRight, Menu, X, Youtube,
  Code, Zap, Layout, Lightbulb, Users, CheckCircle, 
  AlertTriangle, ExternalLink
} from 'lucide-react';

// --- Reusable Intersection Observer Component for Scroll Animations ---
const FadeInSection = ({ children, delay = '0ms', className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`} 
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeReason, setActiveReason] = useState(0);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page, sectionId = null) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -100; // Account for sticky navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Custom styles for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html { scroll-behavior: smooth; }
      
      .font-bank-gothic {
        font-family: "BankGothic Md BT", "Bank Gothic Medium", "Bank Gothic", sans-serif;
      }

      /* Animated Blobs */
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.05); }
        66% { transform: translate(-20px, 20px) scale(0.95); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob { animation: blob 15s infinite; }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }

      /* Glowing border effect */
      .glow-card {
        position: relative;
      }
      .glow-card::before {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        background: linear-gradient(to right, rgba(59,130,246,0.3), rgba(147,197,253,0.1), rgba(59,130,246,0.3));
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .glow-card:hover::before {
        opacity: 1;
      }

      /* Custom scrollbar for docs sidebar */
      .docs-sidebar::-webkit-scrollbar { width: 4px; }
      .docs-sidebar::-webkit-scrollbar-track { background: transparent; }
      .docs-sidebar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const Navbar = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-xl' : 'bg-slate-950/50 backdrop-blur-md border-b border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Logo Provision */}
          <div className="flex-1 flex justify-start items-center">
            <div className="cursor-pointer group relative" onClick={() => navigate('home')}>
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img src="splash.jpg" alt="Vampro Logo" className="h-11 w-11 rounded-xl shadow-lg object-cover relative z-10 border border-slate-700/50 group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          {/* Center: Vampro Creative Lab */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer group" onClick={() => navigate('home')}>
            <span className="font-bank-gothic text-2xl md:text-3xl text-white tracking-[0.15em] leading-none mb-1 group-hover:text-blue-400 transition-colors duration-300">
              VAMPRO
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-blue-400 font-semibold bg-blue-900/30 px-3 py-0.5 rounded-full border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              Creative Lab
            </span>
          </div>
          
          {/* Right: Desktop Links */}
          <div className="hidden md:flex flex-1 justify-end items-center space-x-8">
            <button onClick={() => navigate('home', 'about')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About Us
            </button>
            <button onClick={() => navigate('home', 'services')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Services
            </button>
            <button onClick={() => navigate('plugin')} className={`text-sm font-medium transition-colors ${currentPage === 'plugin' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}>
              Plugins
            </button>
            <button onClick={() => window.open('https://youtube.com', '_blank')} className="text-sm font-medium text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
              YouTube <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-1 flex justify-end items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 pb-4 pt-2 px-4 space-y-2 shadow-2xl absolute w-full z-20">
          <button onClick={() => navigate('home', 'about')} className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-slate-800 rounded-lg">About Us</button>
          <button onClick={() => navigate('home', 'services')} className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-slate-800 rounded-lg">Services</button>
          <button onClick={() => navigate('plugin')} className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-slate-800 rounded-lg">Plugins</button>
          <button onClick={() => navigate('docs')} className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-slate-800 rounded-lg">Documentation & Legal</button>
          <button onClick={() => window.open('https://youtube.com', '_blank')} className="block w-full text-left px-4 py-3 text-red-400 font-medium hover:bg-slate-800 rounded-lg flex items-center gap-2">YouTube <ExternalLink size={16}/></button>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
             <img src="splash.jpg" alt="Vampro" className="h-10 w-10 rounded-xl border border-slate-800" />
             <span className="font-bank-gothic text-2xl text-white tracking-widest">VAMPRO</span>
          </div>
          <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
            A creative lab exploring the space between creativity and technology. We turn ideas into real experiences.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-3">
            <li><button onClick={() => navigate('home', 'about')} className="hover:text-blue-400 transition-colors">About Us</button></li>
            <li><button onClick={() => navigate('home', 'services')} className="hover:text-blue-400 transition-colors">Services</button></li>
            <li><button onClick={() => navigate('plugin')} className="hover:text-blue-400 transition-colors">Plugins</button></li>
            <li><button onClick={() => window.open('https://youtube.com', '_blank')} className="hover:text-red-400 transition-colors flex items-center gap-2">YouTube <ExternalLink size={12}/></button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Knowledge Base</h4>
          <ul className="space-y-3">
            <li><button onClick={() => navigate('docs')} className="hover:text-blue-400 transition-colors">Documentation</button></li>
            <li><button onClick={() => {navigate('docs'); setTimeout(()=> document.getElementById('terms').scrollIntoView({behavior:'smooth'}), 200)}} className="hover:text-blue-400 transition-colors">Terms of Use</button></li>
            <li><button onClick={() => {navigate('docs'); setTimeout(()=> document.getElementById('privacy').scrollIntoView({behavior:'smooth'}), 200)}} className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-900 text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center relative z-10">
        <p>&copy; {new Date().getFullYear()} Vampro. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built by Darshan.</p>
      </div>
    </footer>
  );

  // --- PAGES ---

  const HomePage = () => (
    <div className="animate-in fade-in duration-500 relative min-h-screen bg-slate-50">
      
      {/* Global Interactive Background */}
      <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40rem] h-[40rem] bg-sky-300/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden z-10">
        <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Where Stories <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
              Become Experiences.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Vampro is a creative lab exploring the space between creativity and technology. Stories can live in a frame, a design, a piece of code, or a circuit board, we turn these ideas into real experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button onClick={() => navigate('home', 'services')} className="bg-slate-950 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:shadow-blue-500/30 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Explore services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('plugin')} className="bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group">
              View Plugins <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </FadeInSection>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white/70 backdrop-blur-lg border-y border-white scroll-mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeInSection>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">More Than a Studio.<br/><span className="text-blue-600">A Place to Build.</span></h2>
              <div className="text-lg text-slate-600 mb-10 space-y-6 leading-relaxed">
                <p>Vampro began with a simple idea: <strong className="text-slate-800">creativity shouldn't be limited by medium.</strong></p>
                <p>Some ideas become films. Some become designs. Some become software, electronics, or tools. We explore wherever curiosity leads—blending storytelling, technology, and hands-on creation to bring ambitious ideas to life.</p>
                <p>Every project is different, but the goal remains the same:<br/><strong className="text-slate-800 bg-blue-50 px-2 py-1 rounded">Create experiences that people can see, use, and remember.</strong></p>
              </div>
              <div className="bg-slate-950 p-8 rounded-3xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <p className="text-2xl font-medium text-white italic leading-snug">
                  "We don't choose between creativity and technology. <br/>
                  <span className="text-blue-400 font-bold">We build where they meet.</span>"
                </p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay="200ms" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: <Video/>, title: "Storytelling", desc: "Films, content, motion design, and visual experiences." },
                { icon: <PenTool/>, title: "Design", desc: "Branding, graphics, interfaces, and creative systems." },
                { icon: <Code/>, title: "Software", desc: "Websites, applications, automation, and plugins." },
                { icon: <Cpu/>, title: "Hardware", desc: "Custom electronics, creator rigs, and experimental builds." },
                { icon: <Lightbulb/>, title: "Innovation", desc: "Prototypes, experiments, and new ideas." },
                { icon: <Users/>, title: "Community", desc: "Sharing knowledge through content and creative projects." },
              ].map((item, i) => (
                <div key={i} className="glow-card bg-white/80 backdrop-blur border border-slate-200 p-6 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">What We Build</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">Exploring the intersection of storytelling, design, software, and engineering to create experiences that go beyond a single medium.</p>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { emoji: "🎬", title: "Storytelling", desc: "Films, content, documentaries, branded media." },
              { emoji: "✨", title: "Motion & Design", desc: "Animation, graphics, branding, interfaces." },
              { emoji: "💻", title: "Software & Tools", desc: "Apps, websites, plugins, automation." },
              { emoji: "⚡", title: "Hardware & Prototyping", desc: "Electronics, rigs, custom builds." }
            ].map((service, idx) => (
              <FadeInSection key={idx} delay={`${idx * 100}ms`}>
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200 flex items-start gap-6 group hover:-translate-y-2 cursor-default">
                  <div className="text-5xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 drop-shadow-sm">{service.emoji}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plugin Section (Re-introduced) */}
      <section className="py-32 bg-slate-950 text-white relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          <FadeInSection>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Featured Software
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              <span className="text-white">Vampro Voice Generator</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Text to Speech for Adobe Premiere Pro</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
              Voice generation, built into your creative workflow. Create natural-sounding voiceovers directly inside Adobe applications and keep your entire production process in one place—from script to final edit.
            </p>
          </FadeInSection>

          <FadeInSection delay="200ms" className="relative max-w-5xl mx-auto mb-16">
             {/* Interactive Video Placeholder Container */}
             <div className="aspect-video bg-slate-900 rounded-3xl shadow-[0_0_50px_rgba(30,58,138,0.3)] overflow-hidden relative border border-slate-800 group cursor-pointer transform hover:scale-[1.02] transition-transform duration-500">
                <img src="splash.jpg" alt="Video Cover" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-blue-600/90 transition-all duration-300 shadow-2xl group-hover:scale-110">
                    <PlayCircle size={48} className="text-white ml-2" />
                  </div>
                </div>
             </div>

             {/* Hover Animated Callouts */}
             <div className="flex flex-wrap justify-center gap-4 mt-8">
               <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 px-6 py-3 rounded-full shadow-lg hover:-translate-y-1 hover:border-blue-500 transition-all font-semibold text-slate-200 cursor-default">
                 ⚡ Fast Generation
               </div>
               <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 px-6 py-3 rounded-full shadow-lg hover:-translate-y-1 hover:border-blue-500 transition-all font-semibold text-slate-200 cursor-default">
                 🎙 Natural Voices
               </div>
               <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 px-6 py-3 rounded-full shadow-lg hover:-translate-y-1 hover:border-blue-500 transition-all font-semibold text-slate-200 cursor-default">
                 🔌 Adobe Integration
               </div>
             </div>
          </FadeInSection>

          <FadeInSection delay="400ms">
            <button onClick={() => navigate('plugin')} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center mx-auto gap-3 group">
              Explore Plugin <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[3rem] p-10 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16 shadow-2xl">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full mix-blend-multiply filter blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="relative z-10 lg:w-1/2">
              <div className="bg-red-50 text-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Youtube size={36} />
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Stories Behind <br/>the Build</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                Follow the journey behind the projects. From filmmaking and design to software, electronics, and creative experiments, the channel is where ideas are explored, built, and shared.
              </p>
              <button onClick={() => window.open('https://youtube.com', '_blank')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-red-600/40 hover:-translate-y-1 flex items-center gap-3 group">
                Explore the Channel <ExternalLink size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="relative z-10 lg:w-1/2 flex justify-center w-full">
              <div onClick={() => window.open('https://youtube.com', '_blank')} className="relative w-full aspect-video bg-slate-900 rounded-[2rem] shadow-2xl flex items-center justify-center group cursor-pointer overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                 <img src="splash.jpg" alt="Vampro Channel" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                 <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    <PlayCircle className="text-white" size={48} fill="white"/>
                 </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );

  const PluginPage = () => (
    <div className="animate-in fade-in duration-500 bg-slate-50 min-h-screen">
      
      {/* Dynamic Banner Callout */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-3 px-4 text-center sticky top-[80px] z-40 shadow-md">
        <span className="text-sm md:text-base font-bold tracking-widest uppercase opacity-90">
          From script to voiceover without leaving Premiere Pro
        </span>
      </div>

      {/* Plugin Hero */}
      <section className="pt-32 pb-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <FadeInSection>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              <span className="text-white">Vampro Voice Generator</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Text to Speech</span>
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['Built for Premiere Pro', '🎙 Multiple AI Voices', '☁️ Cloud Voice Generation', '🔌 Integrated Workflow'].map((badge, i) => (
                 <span key={i} className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-sm font-semibold text-blue-100 shadow-xl">{badge}</span>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
              Generate AI-powered voiceovers directly inside Adobe Premiere Pro. Write your script, choose a voice, and create narration without leaving your editing workflow.
            </p>
          </FadeInSection>

          {/* Dual CTAs with Image Icon Provision */}
          <FadeInSection delay="200ms" className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <button onClick={() => { document.getElementById('download').scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3">
              <Download size={24} /> Get the Extension
            </button>
            <button onClick={() => window.open('#', '_blank')} className="w-full sm:w-auto bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 border border-slate-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
              {/* Provision for Adobe Logo */}
              <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center overflow-hidden border border-red-500">
                 <span className="text-[10px] font-bold">Ad</span>
              </div>
              View in Marketplace
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">How It Works</h2>
            <p className="text-xl text-slate-600 font-light">A seamless process designed for editors.</p>
          </FadeInSection>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-50 via-blue-200 to-blue-50 z-0 rounded-full"></div>
            
            {[
              { num: "1", title: "Open the Plugin", desc: "Launch Vampro Voice inside Premiere Pro", icon: <Layout size={32}/> },
              { num: "2", title: "Enter Your Script", desc: "Paste or write narration directly in the panel", icon: <FileText size={32}/> },
              { num: "3", title: "Choose a Voice", desc: "Select from available voice profiles", icon: <Mic size={32}/> },
              { num: "4", title: "Generate Audio", desc: "Voice is processed through the cloud engine", icon: <Zap size={32}/> },
              { num: "5", title: "Download & Use", desc: "Insert the generated narration into your project", icon: <Download size={32}/> }
            ].map((step, index) => (
              <FadeInSection key={index} delay={`${index * 150}ms`} className="relative z-10 flex flex-col items-center group w-full text-center cursor-pointer" onMouseEnter={() => setActiveStep(index)}>
                <div className={`w-24 h-24 bg-white border-4 rounded-3xl flex items-center justify-center font-bold shadow-xl transition-all duration-300 mb-8 relative overflow-hidden transform hover:-translate-y-2 ${activeStep === index ? 'border-blue-500 text-blue-600 shadow-blue-500/20 -translate-y-2' : 'border-slate-100 text-slate-400 group-hover:border-blue-300 group-hover:text-blue-400'}`}>
                  {step.icon}
                  <div className={`absolute top-2 right-2 text-xs font-black ${activeStep === index ? 'text-blue-200' : 'text-slate-200 group-hover:text-blue-100'}`}>{step.num}</div>
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-3">{step.num}. {step.title}</h4>
                <p className="text-slate-500 px-2 leading-relaxed">{step.desc}</p>
                {index < 4 && <div className="md:hidden mt-8 text-slate-300"><ChevronRight className="rotate-90" size={32}/></div>}
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay="300ms" className="mt-16">
            <div className="relative w-full h-64 md:h-80 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 border border-slate-800">
               <img src="splash.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 hover:scale-105" alt={`Step ${activeStep + 1}`} />
               <div className="absolute inset-0 flex items-end p-10 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent">
                 <div>
                   <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">Step {activeStep + 1}</span>
                   <h3 className="text-white font-bold text-2xl md:text-4xl">
                     {[
                        "Launch Vampro Voice inside Premiere Pro",
                        "Paste or write narration directly in the panel",
                        "Select from available voice profiles",
                        "Voice is processed through the cloud engine",
                        "Insert the generated narration into your project"
                     ][activeStep]}
                   </h3>
                 </div>
               </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why Creators Use It */}
      <section className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-16 text-center md:text-left">Why Creators Use It</h2>
          </FadeInSection>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            <FadeInSection className="space-y-4">
              {[
                { title: "Stay Inside Premiere Pro", desc: "No need to jump between voice generation tools and your editing timeline." },
                { title: "Reduce Production Time", desc: "Generate narration in minutes instead of recording, cleaning, and exporting audio manually." },
                { title: "Built for Content Workflows", desc: "Designed for editors creating YouTube videos, explainers, demos, and presentations." },
                { title: "Simple Voice Generation", desc: "Paste a script, select a voice, and generate audio with minimal setup." }
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveReason(i)}
                  className={`flex gap-6 cursor-pointer p-6 rounded-3xl transition-all duration-300 ${activeReason === i ? 'bg-white shadow-xl border border-slate-200' : 'hover:bg-slate-100 border border-transparent'}`}
                >
                  <div className={`w-1.5 rounded-full transition-colors duration-300 ${activeReason === i ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                  <div>
                    <h4 className={`font-bold text-2xl mb-3 transition-colors ${activeReason === i ? 'text-blue-700' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className="text-lg text-slate-600 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
                 <img src="splash.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 hover:scale-105" alt="Feature Showcase" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent flex flex-col justify-end p-10">
                    <div className="transform transition-transform duration-500 translate-y-0">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                        {activeReason === 0 && <Layers className="text-white" size={28}/>}
                        {activeReason === 1 && <Zap className="text-white" size={28}/>}
                        {activeReason === 2 && <MonitorPlay className="text-white" size={28}/>}
                        {activeReason === 3 && <Wand2 className="text-white" size={28}/>}
                      </div>
                      <h3 className="text-white font-bold text-3xl md:text-4xl mb-4">
                        {[
                          "Seamless Integration",
                          "Lightning Fast Generation",
                          "Optimized for Content",
                          "Intuitive Interface"
                        ][activeReason]}
                      </h3>
                      <p className="text-blue-100 font-light text-xl leading-relaxed">
                         {[
                           "Experience a unified workspace without leaving your timeline.",
                           "Skip the manual recording and cleaning process.",
                           "Perfect for YouTube, explainers, and presentations.",
                           "Just paste, select, and generate in a few clicks."
                         ][activeReason]}
                      </p>
                    </div>
                 </div>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* Built Around Your Workflow (Features) */}
      <section className="py-32 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-16 text-center">Built Around Your Workflow</h2>
          </FadeInSection>
          
          <FadeInSection delay="200ms" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: <Zap size={28}/>, title: "AI Voice Generation", desc: "Convert text into natural-sounding speech directly from Premiere Pro." },
              { icon: <Mic size={28}/>, title: "Multiple Voice Profiles", desc: "Choose from available voices based on your project's tone and style." },
              { icon: <FileText size={28}/>, title: "Script-Based Workflow", desc: "Generate narration from text without recording equipment." },
              { icon: <Layers size={28}/>, title: "Project Integration", desc: "Keep voice generation close to your editing workflow instead of switching applications." }
            ].map((feature, i) => (
              <div key={i} className="glow-card bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full">
                <div className="w-14 h-14 bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors border border-slate-200 shadow-sm">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-slate-900 mb-3 text-2xl">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed font-light flex-grow">{feature.desc}</p>
              </div>
            ))}
          </FadeInSection>

          <FadeInSection delay="400ms">
            <div onClick={() => window.open('https://youtube.com', '_blank')} className="relative max-w-5xl mx-auto aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden group cursor-pointer border border-slate-800">
                <img src="splash.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" alt="Tutorial Video" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/20 group-hover:bg-transparent transition-colors duration-500">
                  <div className="w-24 h-24 bg-blue-600/90 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-300">
                    <PlayCircle size={48} className="text-white ml-2" />
                  </div>
                  <span className="mt-6 text-white font-bold tracking-widest uppercase text-sm drop-shadow-md bg-slate-900/60 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-blue-900/80 transition-colors">Watch Tutorial</span>
                </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Who Is It For?</h2>
           </FadeInSection>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "YouTube Creators", desc: "Create narration without recording equipment." },
                { title: "Video Editors", desc: "Generate placeholder or final voiceovers quickly." },
                { title: "Marketing Teams", desc: "Produce product demos and promotional videos faster." },
                { title: "Educators", desc: "Turn scripts into spoken explanations with minimal effort." }
              ].map((item, i) => (
                <FadeInSection key={i} delay={`${i * 100}ms`}>
                  <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 h-[380px] flex flex-col justify-end p-8 cursor-default shadow-sm hover:shadow-2xl transition-all duration-500">
                     {/* Default Background */}
                     <div className="absolute inset-0 bg-white group-hover:opacity-0 transition-opacity duration-500 z-0"></div>
                     {/* Pop out background */}
                     <img src="splash.jpg" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-100 group-hover:scale-110 z-0" alt={item.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                     
                     {/* Content */}
                     <div className="relative z-20 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0 text-center md:text-left">
                       <h3 className="font-bold text-3xl text-slate-900 group-hover:text-white mb-4 transition-colors duration-300">{item.title}</h3>
                       <p className="text-slate-600 group-hover:text-blue-100 font-light text-lg transition-colors duration-300">{item.desc}</p>
                     </div>
                  </div>
                </FadeInSection>
              ))}
           </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-32 bg-slate-950 text-white text-center relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-12">Before You Download</h2>
            
            <div className="bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] p-12 mb-16 border border-slate-800 inline-block text-left shadow-2xl">
              <h4 className="font-bold text-slate-400 mb-8 uppercase tracking-widest text-sm flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500"/> Requirements
              </h4>
              <ul className="space-y-6 text-xl">
                <li className="flex items-center gap-4"><span className="text-green-500 font-bold">✔</span> Adobe Premiere Pro (24 and above)</li>
                <li className="flex items-center gap-4"><span className="text-green-500 font-bold">✔</span> Active internet connection</li>
                <li className="flex items-center gap-4"><span className="text-green-500 font-bold">✔</span> Windows 10/11</li>
              </ul>
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-3xl font-extrabold text-white mb-2">Completely free.</p>
                <p className="text-slate-400 text-lg">Version 1.1.0</p>
              </div>
              
              {/* Dual CTAs in Download Section */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3">
                  <Download size={24} /> Get the Extension
                </button>
                <button onClick={() => window.open('#', '_blank')} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
                   {/* Provision for Adobe Logo */}
                  <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center overflow-hidden border border-red-500">
                     <span className="text-[10px] font-bold">Ad</span>
                  </div>
                  View in Marketplace
                </button>
              </div>

              <p className="text-slate-400 mt-6 text-lg">
                Need help installing? <button onClick={() => navigate('docs')} className="text-blue-400 hover:text-blue-300 underline underline-offset-4 font-semibold">Read the installation guide here.</button>
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Limitations Section (Moved below Download) */}
      <section className="py-20 bg-amber-50 border-y border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection className="flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="bg-amber-100 p-6 rounded-[2rem] text-amber-600 shadow-sm border border-amber-200">
                 <AlertTriangle size={48} />
              </div>
              <div className="flex-1">
                 <h3 className="text-3xl font-bold text-amber-900 mb-6">Current Limitations</h3>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-amber-800 text-lg">
                    <li className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Requires an internet connection</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Voice generation depends on cloud processing</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Voice quality may vary between models</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Adobe Premiere Pro required</li>
                 </ul>
              </div>
           </FadeInSection>
        </div>
      </section>

      {/* Docs & Legal CTAs Added to Plugin Page Bottom */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glow-card bg-slate-50 p-10 rounded-[2rem] border border-slate-100 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer" onClick={() => navigate('docs')}>
                 <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><FileText size={32} /></div>
                 <h3 className="text-2xl font-bold mb-4 text-slate-900">Documentation</h3>
                 <p className="text-slate-500 mb-8 flex-grow leading-relaxed font-light">Comprehensive guides, installation instructions, and troubleshooting for the plugin.</p>
                 <span className="text-blue-600 font-bold flex items-center gap-2 group">Read Docs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
              </div>
              
              <div className="glow-card bg-slate-50 p-10 rounded-[2rem] border border-slate-100 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer" onClick={() => {navigate('docs'); setTimeout(()=> document.getElementById('terms').scrollIntoView({behavior:'smooth'}), 200)}}>
                 <div className="w-16 h-16 bg-slate-200 text-slate-700 rounded-2xl flex items-center justify-center mb-6"><Shield size={32} /></div>
                 <h3 className="text-2xl font-bold mb-4 text-slate-900">Terms of Use</h3>
                 <p className="text-slate-500 mb-8 flex-grow leading-relaxed font-light">Licensing, restrictions, and general usage agreements for software distribution.</p>
                 <span className="text-slate-700 font-bold flex items-center gap-2 group">Full Terms <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
              </div>
              
              <div className="glow-card bg-slate-50 p-10 rounded-[2rem] border border-slate-100 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer" onClick={() => {navigate('docs'); setTimeout(()=> document.getElementById('privacy').scrollIntoView({behavior:'smooth'}), 200)}}>
                 <div className="w-16 h-16 bg-slate-200 text-slate-700 rounded-2xl flex items-center justify-center mb-6"><Shield size={32} /></div>
                 <h3 className="text-2xl font-bold mb-4 text-slate-900">Privacy Policy</h3>
                 <p className="text-slate-500 mb-8 flex-grow leading-relaxed font-light">How we handle data, local processing, telemetry, and user information.</p>
                 <span className="text-slate-700 font-bold flex items-center gap-2 group">Read Privacy <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
              </div>
           </FadeInSection>
        </div>
      </section>

    </div>
  );

  const DocsPage = () => {
    // Knowledge Base scroll helper for local anchors
    const scrollToDocSection = (e, id) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -100; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    return (
      <div className="animate-in fade-in duration-500 bg-slate-50 min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-start">
          
          {/* Knowledge Base Sidebar */}
          <aside className="md:w-1/4 sticky top-28 hidden md:block max-h-[85vh] overflow-y-auto docs-sidebar pr-6">
            <h3 className="font-extrabold text-slate-900 mb-8 tracking-wider uppercase text-sm border-b border-slate-200 pb-4">Knowledge Base</h3>
            <ul className="space-y-4 text-[15px] font-medium text-slate-600">
              <li><a href="#intro" onClick={(e) => scrollToDocSection(e, 'intro')} className="hover:text-blue-600 transition-colors block">Introduction</a></li>
              <li><a href="#features" onClick={(e) => scrollToDocSection(e, 'features')} className="hover:text-blue-600 transition-colors block">Key Features</a></li>
              <li><a href="#requirements" onClick={(e) => scrollToDocSection(e, 'requirements')} className="hover:text-blue-600 transition-colors block">System Requirements</a></li>
              <li><a href="#installation" onClick={(e) => scrollToDocSection(e, 'installation')} className="hover:text-blue-600 transition-colors block">Installation Guide</a></li>
              <li><a href="#quick-start" onClick={(e) => scrollToDocSection(e, 'quick-start')} className="hover:text-blue-600 transition-colors block">Quick Start</a></li>
              <li><a href="#controls" onClick={(e) => scrollToDocSection(e, 'controls')} className="hover:text-blue-600 transition-colors block">Voice Controls</a></li>
              <li><a href="#audio-management" onClick={(e) => scrollToDocSection(e, 'audio-management')} className="hover:text-blue-600 transition-colors block">Audio Management</a></li>
              <li><a href="#troubleshooting" onClick={(e) => scrollToDocSection(e, 'troubleshooting')} className="hover:text-blue-600 transition-colors block">Troubleshooting</a></li>
              <li><a href="#faq" onClick={(e) => scrollToDocSection(e, 'faq')} className="hover:text-blue-600 transition-colors block">FAQ</a></li>
              <li><a href="#releases" onClick={(e) => scrollToDocSection(e, 'releases')} className="hover:text-blue-600 transition-colors block">Release Notes</a></li>
              <li className="pt-4 mt-4 border-t border-slate-200">
                <a href="#terms" onClick={(e) => scrollToDocSection(e, 'terms')} className="hover:text-blue-600 transition-colors font-bold block">Terms of Use</a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => scrollToDocSection(e, 'privacy')} className="hover:text-blue-600 transition-colors font-bold block">Privacy Policy</a>
              </li>
            </ul>
          </aside>

          {/* Documentation Content */}
          <div className="md:w-3/4 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100 w-full relative z-10">
            
            <div id="intro" className="mb-12 border-b border-slate-100 pb-12 scroll-mt-28">
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Documentation</h1>
              <p className="text-2xl text-slate-500 font-light">Vampro Voice Generator Text-to-Speech</p>
            </div>

            <div className="prose prose-lg prose-blue max-w-none text-slate-600 prose-headings:text-slate-900 prose-headings:font-bold prose-headings:scroll-mt-32 prose-a:text-blue-600">
              <p className="lead text-2xl text-slate-700 mb-8 font-light leading-relaxed">
                Generate natural-sounding AI voiceovers directly inside Adobe Premiere Pro. 
                Vampro Voice Generator Text-to-Speech is an extension for Adobe Premiere Pro that enables creators, editors, educators, marketers, and businesses to generate high-quality voiceovers without leaving their editing workflow.
              </p>
              <p>
                The extension uses a local AI voice generation service running on your computer, allowing voice generation directly from Premiere Pro.
              </p>

              <h2 id="features" className="text-3xl mt-16 mb-6">Key Features</h2>
              <ul className="space-y-3">
                <li>Generate AI voiceovers directly inside Premiere Pro</li>
                <li>Multiple voice options</li>
                <li>Adjustable speed and pitch controls</li>
                <li>Tone presets for different narration styles</li>
                <li>Local processing</li>
                <li>Automatic startup after installation</li>
                <li>Fast workflow integration</li>
              </ul>

              <h2 id="requirements" className="text-3xl mt-16 mb-6">System Requirements</h2>
              
              <h3 className="text-2xl mt-8">Operating System</h3>
              <ul>
                <li>Windows 10 (64-bit)</li>
                <li>Windows 11 (64-bit)</li>
              </ul>

              <h3 className="text-2xl mt-8">Adobe Software</h3>
              <ul>
                <li>Adobe Premiere Pro 26.0 or later</li>
              </ul>

              <h3 className="text-2xl mt-8">Hardware</h3>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h4 className="font-extrabold text-slate-900 mb-4 mt-0">Minimum:</h4>
                  <ul className="mb-0 space-y-2">
                    <li>Intel Core i5 or AMD Ryzen 5</li>
                    <li>8 GB RAM</li>
                    <li>5 GB free disk space</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h4 className="font-extrabold text-slate-900 mb-4 mt-0">Recommended:</h4>
                  <ul className="mb-0 space-y-2">
                    <li>Intel Core i7 or AMD Ryzen 7</li>
                    <li>16 GB RAM</li>
                    <li>SSD storage</li>
                  </ul>
                </div>
              </div>

              <h2 id="installation" className="text-3xl mt-16 mb-6">Installation Guide</h2>
              
              <h3 className="text-xl text-blue-700 mt-8">Step 1 – Install the Premiere Pro Extension</h3>
              <p>Install Vampro Voice Generator Text-to-Speech from Adobe Exchange. After installation, restart Premiere Pro.</p>

              <h3 className="text-xl text-blue-700 mt-8">Step 2 – Install the Voice Service</h3>
              <p>Download and run: <code className="bg-slate-100 text-blue-600 px-2 py-1 rounded">Vampro Voice Generator Installer.exe</code></p>
              <p>The installer will:</p>
              <ul>
                <li>Install the Vampro Voice Service</li>
                <li>Configure automatic startup</li>
                <li>Install required AI components</li>
                <li>Enable communication with Premiere Pro</li>
              </ul>
              <p>After installation, restart Premiere Pro.</p>

              <h3 className="text-xl text-blue-700 mt-8">Step 3 – Open the Extension</h3>
              <p>Inside Premiere Pro: Go to <strong>Window → Extensions → Vampro Voice Generator Text-to-Speech</strong>. The panel should open successfully.</p>

              <hr className="my-16 border-slate-200"/>

              <h2 id="quick-start" className="text-3xl mt-16 mb-6">Quick Start</h2>
              <h3 className="text-2xl mt-8">Generate Your First Voiceover</h3>
              <ol className="space-y-6 list-decimal list-inside">
                <li><strong>Enter Text:</strong> Type or paste your script into the text editor.</li>
                <li><strong>Select a Voice:</strong> Choose a voice from the available voice list.</li>
                <li><strong>Choose a Tone:</strong> Optional tone presets include: Professional, Voiceover, Documentary, Casual, Dynamic, Serious, Comedic.</li>
                <li><strong>Generate:</strong> Click <strong>Generate Voice</strong>. The generated audio will appear inside Premiere Pro.</li>
              </ol>

              <h2 id="controls" className="text-3xl mt-16 mb-6">Voice Controls</h2>
              <h3 className="text-2xl mt-8">Voice Selection</h3>
              <p>Different voices provide different speaking characteristics. Select the voice that best matches your content style.</p>
              
              <h3 className="text-2xl mt-8">Speed Control</h3>
              <p>Adjust narration speed. Examples:</p>
              <ul>
                <li>0.8x – Slow narration</li>
                <li>1.0x – Normal narration</li>
                <li>1.2x – Faster narration</li>
              </ul>

              <h3 className="text-2xl mt-8">Pitch Control</h3>
              <p>Adjust vocal pitch. Examples:</p>
              <ul>
                <li>Negative values → deeper voice</li>
                <li>Positive values → higher voice</li>
              </ul>

              <h3 className="text-2xl mt-8">Tone Presets</h3>
              <p>Tone presets automatically adjust speed and pitch.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100"><strong>Professional:</strong> Corporate videos, Training, Presentations</div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100"><strong>Documentary:</strong> Educational, Narration, Explainers</div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100"><strong>Voiceover:</strong> General, YouTube, Tutorials</div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100"><strong>Dynamic:</strong> Promotional, Product showcases</div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100"><strong>Casual:</strong> Social content, Informal narration</div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100"><strong>Serious:</strong> Dramatic content, Formal presentations</div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100"><strong>Comedic:</strong> Entertaining content, Humorous videos</div>
              </div>

              <h2 id="audio-management" className="text-3xl mt-16 mb-6">Audio Management</h2>
              <h3 className="text-2xl mt-8">Generated Files</h3>
              <p>Generated audio files are automatically stored by the Vampro Voice Service. Each file includes metadata such as: Text, Voice, Tone, Speed, Pitch, Creation time.</p>
              
              <h3 className="text-2xl mt-8">Regenerating Audio</h3>
              <p>Modify Text, Voice, Speed, Pitch, or Tone. Then generate a new version.</p>

              <hr className="my-16 border-slate-200"/>

              <h2 id="troubleshooting" className="text-3xl mt-16 mb-6 text-red-600">Troubleshooting</h2>
              
              <h3 className="text-2xl mt-8">The Extension Opens But Voice Generation Fails</h3>
              <p>Verify that the Vampro Voice Service is installed. Open <code>http://127.0.0.1:8000/health</code>. If installed correctly, the page should display:</p>
              <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl text-sm shadow-inner"><code>{`{\n  "status": "ok"\n}`}</code></pre>

              <h3 className="text-2xl mt-8">Service Not Running</h3>
              <p>Restart Windows and reopen Premiere Pro. The service is configured to start automatically after login.</p>

              <h3 className="text-2xl mt-8">Antivirus Warning During Installation</h3>
              <p>Only download the installer from official Vampro distribution channels. If your antivirus blocks the installer, ensure that you are using the latest official release.</p>

              <h3 className="text-2xl mt-8">Premiere Pro Cannot Connect</h3>
              <p>Verify: Premiere Pro version is supported, Service is installed, Firewall is not blocking localhost communication.</p>

              <h3 className="text-2xl mt-8">Extension Does Not Appear</h3>
              <p>Restart Premiere Pro. Then check: <strong>Window → Extensions</strong> for <strong>Vampro Voice Generator Text-to-Speech</strong>.</p>

              <h2 id="faq" className="text-3xl mt-16 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-8 mt-8">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <strong className="block text-slate-900 text-xl mb-3">Does this require an internet connection?</strong>
                  <p className="mt-1 mb-0">The voice generation service runs locally after installation. Some AI components may require internet access during initial setup.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <strong className="block text-slate-900 text-xl mb-3">Is macOS supported?</strong>
                  <p className="mt-1 mb-0">Current release: <strong>Windows Only</strong>. macOS support is planned for a future release.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <strong className="block text-slate-900 text-xl mb-3">Does the service run in the background?</strong>
                  <p className="mt-1 mb-0">Yes. The Vampro Voice Service starts automatically after login and runs silently in the background.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <strong className="block text-slate-900 text-xl mb-3">Do I need to launch the service manually?</strong>
                  <p className="mt-1 mb-0">No. After installation, the service starts automatically.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <strong className="block text-slate-900 text-xl mb-3">Can I use generated voices commercially?</strong>
                  <p className="mt-1 mb-0">Users are responsible for ensuring compliance with applicable laws, platform policies, and content regulations when using generated audio.</p>
                </div>
              </div>

              <h2 id="releases" className="text-3xl mt-16 mb-6">Release Notes</h2>
              <h3 className="text-2xl mt-8">Version 1.1.0</h3>
              <p><strong>New Features:</strong> Improved installer experience, Automatic startup configuration, Hidden background service, Enhanced Premiere Pro integration, Improved voice generation stability.</p>
              <p><strong>Fixes:</strong> Fixed connection failures between Premiere Pro and the voice service, Improved startup reliability, Improved installation workflow.</p>

              <div className="bg-blue-50 p-10 rounded-3xl mt-16 border border-blue-100">
                <h3 className="text-2xl font-extrabold text-blue-900 mt-0 mb-4">Support</h3>
                <p className="m-0 text-blue-800 text-lg">For support, installation assistance, bug reports, and feature requests, contact: <strong><a href="mailto:support@vampro.in" className="text-blue-700 underline font-bold">Vampro Support</a></strong>.</p>
              </div>

              {/* TERMS OF USE SECTION */}
              <hr className="my-20 border-slate-200 border-2"/>
              <div id="terms" className="scroll-mt-28">
                <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Terms of Use</h1>
                <p className="text-slate-500 font-medium text-lg mb-10">Terms of Use for Vampro Voice Generator Text-to-Speech<br/>Last Updated: June 2026</p>
                
                <p>These Terms of Use govern your use of Vampro Voice Generator Text-to-Speech and related software, documentation, and services. By installing or using the Software, you agree to these Terms.</p>

                <h3 className="text-2xl mt-10">1. License Grant</h3>
                <p>Subject to compliance with these Terms, Vampro grants you a limited, non-exclusive, non-transferable, revocable license to install and use the Software.</p>

                <h3 className="text-2xl mt-10">2. Permitted Use</h3>
                <p>You may use the Software to:</p>
                <ul>
                  <li>Generate voiceovers</li>
                  <li>Create content for personal projects</li>
                  <li>Create content for commercial projects</li>
                  <li>Produce educational, entertainment, and business content</li>
                </ul>

                <h3 className="text-2xl mt-10">3. Restrictions</h3>
                <p>You may not:</p>
                <ul>
                  <li>Reverse engineer, decompile, or disassemble the Software except where permitted by law</li>
                  <li>Modify, redistribute, sublicense, lease, rent, or resell the Software without authorization</li>
                  <li>Circumvent security or licensing mechanisms</li>
                  <li>Use the Software in violation of applicable laws</li>
                </ul>

                <h3 className="text-2xl mt-10">4. User Responsibility</h3>
                <p>You are solely responsible for:</p>
                <ul>
                  <li>Content generated using the Software</li>
                  <li>Compliance with applicable laws and regulations</li>
                  <li>Ensuring appropriate rights and permissions for content creation and distribution</li>
                </ul>

                <h3 className="text-2xl mt-10">5. Generated Content</h3>
                <p>Ownership of generated content remains with the user, subject to applicable laws and third-party rights. Users are responsible for ensuring that generated content:</p>
                <ul>
                  <li>Does not infringe intellectual property rights</li>
                  <li>Does not violate privacy rights</li>
                  <li>Complies with platform policies and applicable laws</li>
                </ul>

                <h3 className="text-2xl mt-10">6. Software Updates</h3>
                <p>Vampro may provide updates, bug fixes, enhancements, or new features. Some updates may be required for continued compatibility with supported platforms.</p>

                <h3 className="text-2xl mt-10">7. Third-Party Software</h3>
                <p>The Software incorporates third-party and open-source components. Such components remain subject to their respective licenses. Nothing in these Terms overrides those licenses.</p>

                <h3 className="text-2xl mt-10">8. Disclaimer of Warranties</h3>
                <p>THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, VAMPRO DISCLAIMS ALL WARRANTIES, INCLUDING:</p>
                <ul>
                  <li>MERCHANTABILITY</li>
                  <li>FITNESS FOR A PARTICULAR PURPOSE</li>
                  <li>NON-INFRINGEMENT</li>
                  <li>AVAILABILITY OR ERROR-FREE OPERATION</li>
                </ul>

                <h3 className="text-2xl mt-10">9. Limitation of Liability</h3>
                <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, VAMPRO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING FROM THE USE OF OR INABILITY TO USE THE SOFTWARE. THIS INCLUDES LOSS OF:</p>
                <ul>
                  <li>DATA</li>
                  <li>REVENUE</li>
                  <li>PROFITS</li>
                  <li>BUSINESS OPPORTUNITIES</li>
                </ul>

                <h3 className="text-2xl mt-10">10. Termination</h3>
                <p>These Terms remain effective until terminated. Vampro may terminate or suspend access if these Terms are violated. Upon termination, users must discontinue use of the Software.</p>

                <h3 className="text-2xl mt-10">11. Intellectual Property</h3>
                <p>The Software, branding, documentation, logos, trademarks, and associated materials remain the property of Vampro and its licensors. No ownership rights are transferred under these Terms.</p>

                <h3 className="text-2xl mt-10">12. Export Compliance</h3>
                <p>Users agree to comply with applicable export control and sanctions laws when using the Software.</p>

                <h3 className="text-2xl mt-10">13. Governing Law</h3>
                <p>These Terms shall be governed by and interpreted in accordance with applicable laws in the jurisdiction of the Software publisher.</p>
              </div>

              {/* PRIVACY POLICY SECTION */}
              <hr className="my-20 border-slate-200 border-2"/>
              <div id="privacy" className="scroll-mt-28">
                <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Privacy Policy</h1>
                <p className="text-slate-500 font-medium text-lg mb-10">Privacy Policy for Vampro Voice Generator Text-to-Speech<br/>Last Updated: June 2026</p>
                
                <p>Vampro ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how Vampro Voice Generator Text-to-Speech ("Software") collects, uses, stores, and protects information when you use our software and related services.</p>
                <p>By installing or using the Software, you agree to the practices described in this Privacy Policy.</p>

                <h3 className="text-2xl mt-10">1. Information We Collect</h3>
                <h4 className="text-xl font-bold mt-6">Information You Provide</h4>
                <p>The Software may process information that you provide, including:</p>
                <ul>
                  <li>Text entered for voice generation</li>
                  <li>Voice generation settings</li>
                  <li>Project-related metadata</li>
                  <li>Support requests and communications</li>
                </ul>
                
                <h4 className="text-xl font-bold mt-6">Technical Information</h4>
                <p>The Software may collect limited technical information necessary for operation, including:</p>
                <ul>
                  <li>Software version information</li>
                  <li>Operating system information</li>
                  <li>Error logs generated during operation</li>
                  <li>Installation and configuration status</li>
                </ul>

                <h3 className="text-2xl mt-10">2. How Voice Generation Works</h3>
                <p>Vampro Voice Generator Text-to-Speech uses a local AI voice generation service that runs on your computer. Voice generation requests are processed locally on your device. Generated audio files and related metadata are stored locally on your computer unless you choose to export, share, or distribute them.</p>

                <h3 className="text-2xl mt-10">3. Data Storage</h3>
                <p>Generated content may be stored locally on your device, including:</p>
                <ul>
                  <li>Generated audio files</li>
                  <li>Voice settings</li>
                  <li>Metadata associated with generated content</li>
                </ul>
                <p>We do not intentionally upload or transmit generated content to external servers as part of the normal operation of the Software.</p>

                <h3 className="text-2xl mt-10">4. Use of Information</h3>
                <p>Information may be used to:</p>
                <ul>
                  <li>Generate voice content</li>
                  <li>Operate and improve the Software</li>
                  <li>Diagnose technical issues</li>
                  <li>Provide customer support</li>
                  <li>Maintain product security and reliability</li>
                </ul>

                <h3 className="text-2xl mt-10">5. Data Sharing</h3>
                <p>We do not sell, rent, or trade personal information. We may disclose information only:</p>
                <ul>
                  <li>When required by applicable law</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect the rights, safety, or property of users or Vampro</li>
                  <li>With your explicit consent</li>
                </ul>

                <h3 className="text-2xl mt-10">6. Third-Party Components</h3>
                <p>The Software may incorporate third-party and open-source software components. Such components are governed by their respective licenses and privacy practices. Examples may include:</p>
                <ul>
                  <li>Kokoro</li>
                  <li>PyTorch</li>
                  <li>FastAPI</li>
                  <li>spaCy</li>
                  <li>Other open-source libraries</li>
                </ul>

                <h3 className="text-2xl mt-10">7. Security</h3>
                <p>We implement reasonable measures to protect information processed by the Software. However, no software or method of electronic storage can be guaranteed to be completely secure. Users are responsible for maintaining the security of their own devices and systems.</p>

                <h3 className="text-2xl mt-10">8. Children's Privacy</h3>
                <p>The Software is not intended for children under the age of 13. We do not knowingly collect personal information from children.</p>

                <h3 className="text-2xl mt-10">9. International Users</h3>
                <p>Users are responsible for ensuring that their use of the Software complies with applicable laws and regulations in their jurisdiction.</p>

                <h3 className="text-2xl mt-10">10. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. Updated versions will be published on the official Vampro website and will become effective upon publication.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-950 selection:bg-blue-300 selection:text-blue-950">
      <Navbar />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'plugin' && <PluginPage />}
        {currentPage === 'docs' && <DocsPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;