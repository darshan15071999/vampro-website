//import { useNavigate } from 'react-router-dom';
import {
  //FileText, Shield, ArrowRight,
  Bot, Activity, Eye, MessageSquare, Link as LinkIcon, BarChart2, Globe, TrendingUp, Check, CheckCircle, Search,
  FileText,
  ArrowRight
} from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import TiltCard from '../components/TiltCard';
import TextParticles from '../components/TextParticles';
import SpeedStreaks from '../components/SpeedStreaks';
import { useWaitlist } from '../context/WaitlistContext';
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';

const TypingText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
        hidden: {},
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 5 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const HeroSearchAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-50">
      <motion.div
        className="absolute w-[600px] md:w-[900px] h-[600px] md:h-[900px] border-[1px] border-indigo-500/20 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] border-[2px] border-[#3B3BFF]/20 rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <svg className="absolute w-full h-full opacity-30" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <motion.path
          d="M0,100 L100,100 L150,20 L200,180 L250,50 L300,150 L350,80 L400,120 L450,100 L1000,100"
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, x: [0, -50, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B3BFF" stopOpacity="0" />
            <stop offset="20%" stopColor="#818CF8" stopOpacity="1" />
            <stop offset="40%" stopColor="#F97316" stopOpacity="1" />
            <stop offset="60%" stopColor="#3B3BFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B3BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1], x: ['-50%', '-50%', '-50%'], y: ['-50%', '-52%', '-50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2"
      >
        <Search className="text-indigo-500/10 w-[300px] h-[300px] md:w-[600px] md:h-[600px]" strokeWidth={0.5} />
      </motion.div>
    </div>
  );
};

const AeoPage = () => {
  //const navigate = useNavigate();
  const { openModal, hasJoined } = useWaitlist();

  const handleWaitlist = (e: React.MouseEvent, source: string) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(source);
  };

  return (
    <div className="animate-in fade-in duration-500 bg-slate-950 min-h-screen text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Helmet>
        <title>SignalScope - AEO Tracker | Vampro</title>
        <meta name="description" content="Discover the discussions influencing tomorrow's AI answers with SignalScope." />
        <meta property="og:title" content="SignalScope - AEO Tracker | Vampro" />
        <meta property="og:description" content="Discover the discussions influencing tomorrow's AI answers with SignalScope." />
      </Helmet>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#3B3BFF] via-[#1B2A6B] to-[#3B3BFF] text-white py-1.5 px-4 flex items-center justify-center gap-3 sticky top-[96px] z-40 shadow-md border-b border-indigo-500/20">
        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-90 flex items-center gap-2">
          <Bot size={12} /> SignalScope by Vampro - Launching in phases | Explore Reddit Intelligence Now
        </span>
        {hasJoined ? (
          <button disabled className="bg-white/10 text-white/50 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold shadow-sm flex items-center gap-1 cursor-not-allowed">
            <Check size={10} /> Joined
          </button>
        ) : (
          <button onClick={(e) => handleWaitlist(e, 'SignalScope Announcement')} className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-colors shadow-sm cursor-pointer">
            Join Waitlist
          </button>
        )}
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-96px)] flex flex-col items-center justify-center pt-40 md:pt-48 pb-20 overflow-hidden dark-grid-bg border-b border-slate-800/50">
        <HeroSearchAnimation />
        <TextParticles />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,59,255,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                <span className="text-white">Dominate AI </span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-sky-400">
                  <TypingText text="Recommendations" delay={0.5} />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed font-light">
                Track, analyze, and influence the conversations shaping what AI tells your customers
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://app.vampro.in/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#3B3BFF] hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(59,59,255,0.4)] hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                  <Activity size={20} /> Try Free Beta
                </a>
                {hasJoined ? (
                  <button disabled className="w-full sm:w-auto bg-green-500/20 text-green-400 border border-green-500/30 px-8 py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 cursor-not-allowed transition-all">
                    <Check size={20} /> Joined Waitlist
                  </button>
                ) : (
                  <button onClick={(e) => handleWaitlist(e, 'SignalScope Hero')} className="w-full sm:w-auto bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 border border-slate-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center cursor-pointer">
                    Join Waitlist
                  </button>
                )}
              </div>
            </FadeInSection>

            {/* Enlarged and Animated Dashboard Mockup */}
            <FadeInSection delay="200ms" className="relative flex items-center justify-center lg:justify-end w-full mt-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-[#3B3BFF]/30 rounded-full blur-[100px]"></div>
              <motion.div
                animate={{ y: [0, -15, 0], rotateX: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-xl"
              >
                <TiltCard>
                  <div className="relative w-full bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden glass-card cursor-default">
                    <div className="h-14 border-b border-slate-800 flex items-center px-6 gap-2 bg-slate-950/70">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                      </div>
                      <div className="ml-auto bg-slate-800/80 rounded-md px-3 py-1 text-xs text-slate-300 font-bold tracking-widest flex items-center gap-2">
                        <Activity size={14} className="text-[#3B3BFF]" /> SIGNALSCOPE
                      </div>
                    </div>
                    <div className="p-8 md:p-8 flex flex-col gap-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-slate-400 text-xs uppercase tracking-widest mb-1.5 font-semibold">Brand Influence Signal</div>
                          <div className="text-4xl font-extrabold text-white flex items-center gap-3">
                            High
                            <span className="text-emerald-400 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">↑ Trending</span>
                          </div>
                        </div>
                        <div className="bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-500/30 flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                          <Eye size={14} className="animate-pulse" /> Scanning Reddit
                        </div>
                      </div>
                      <div className="h-32 bg-slate-950/80 rounded-xl border border-slate-800/80 p-4 flex items-end gap-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3B3BFF]/5 to-transparent"></div>
                        {[30, 50, 40, 70, 60, 90, 85].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-[#3B3BFF]/40 to-[#3B3BFF] rounded-t-sm opacity-90 animate-chart-bar relative z-10 hover:opacity-100 transition-opacity" style={{ '--target-height': `${h}%`, animationDelay: `${i * 100}ms` } as React.CSSProperties}></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                          <div className="text-slate-400 text-xs mb-1.5 font-medium uppercase tracking-wider">Top Source</div>
                          <div className="text-white text-base font-bold flex items-center gap-2"><Globe size={16} className="text-orange-500" /> r/software</div>
                        </div>
                        <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                          <div className="text-slate-400 text-xs mb-1.5 font-medium uppercase tracking-wider">Sentiment</div>
                          <div className="text-emerald-400 text-base font-bold flex items-center gap-2"><CheckCircle size={16} /> 85% Positive</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* SEARCH IS BECOMING RECOMMENDATION (Paradigm Shift) */}
      <section className="py-24 md:py-32 border-b border-slate-800/50 dark-dot-bg relative z-10">
        <SpeedStreaks />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">The Paradigm Shift</div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">Search Is Getting Replaced by Recommendations</h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-6">
              For years, discoverability meant rankings. Today, it means recommendations
            </p>
          </FadeInSection>

          {/* Interactive Visuals */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <FadeInSection delay="100ms">
              <TiltCard>
                <div className="glass-card p-8 md:p-10 rounded-3xl border-slate-700/50 bg-slate-900/50 relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-slate-500/5 rounded-full blur-3xl group-hover:bg-slate-500/10 transition-all"></div>
                  <div className="text-slate-400 font-bold mb-6 flex items-center gap-3 text-sm tracking-widest uppercase">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500" /> The Past: Rankings
                  </div>
                  <h3 className="text-2xl text-white font-bold mb-4">Users browse through 10 blue links.</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">Brands fought for the top spot on search engines to be discovered.</p>

                  {/* Fake search results animation */}
                  <div className="space-y-4 opacity-60">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                        whileHover={{ x: 10, backgroundColor: 'rgba(51,65,85,0.5)' }}
                      >
                        <div className="h-3 w-1/3 bg-[#3B3BFF]/40 rounded mb-2" />
                        <div className="h-2 w-full bg-slate-700 rounded mb-1.5" />
                        <div className="h-2 w-5/6 bg-slate-700 rounded" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <TiltCard>
                <div className="glow-card p-8 md:p-10 rounded-3xl border-[#3B3BFF]/30 bg-indigo-900/10 relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#3B3BFF]/10 rounded-full blur-3xl group-hover:bg-[#3B3BFF]/20 transition-all"></div>
                  <div className="text-[#3B3B] font-bold mb-6 flex items-center gap-3 text-sm tracking-widest uppercase">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-[#3B3BFF]"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    The Present: Recommendations
                  </div>
                  <h3 className="text-2xl text-white font-bold mb-4">AI synthesizes conversations into one definitive answer.</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">Users ask questions, and AI provides the exact product or service recommendation instantly.</p>

                  {/* Fake AI Chat animation */}
                  <div className="mt-6 bg-slate-900/80 border border-indigo-500/30 p-5 rounded-2xl rounded-tl-none shadow-[0_10px_30px_rgba(59,59,255,0.15)] relative">
                    <motion.div
                      className="absolute -top-4 -left-4 w-8 h-8 bg-[#3B3BFF] rounded-full flex items-center justify-center text-white shadow-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Bot size={16} />
                    </motion.div>
                    <div className="flex gap-2 mb-4 pl-4">
                      <span className="text-xs text-[#3B3BFF] font-bold uppercase tracking-wider">AI Answer</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-2 w-full bg-indigo-500/20 rounded" />
                      <div className="h-2 w-full bg-indigo-500/20 rounded" />
                      <div className="h-2 w-4/5 bg-indigo-500/20 rounded" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-indigo-500/20 flex gap-2">
                      <div className="h-4 w-16 bg-slate-800 rounded flex items-center justify-center text-[8px] text-slate-500 font-bold uppercase">Citation 1</div>
                      <div className="h-4 w-16 bg-slate-800 rounded flex items-center justify-center text-[8px] text-slate-500 font-bold uppercase">Reddit</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeInSection>
          </div>

          <FadeInSection delay="400ms" className="mt-16 text-center">
            <div className="glass-card p-6 inline-block rounded-2xl border-[#3B3BFF]/30 shadow-[0_0_30px_rgba(59,59,255,0.15)]">
              <p className="text-xl md:text-2xl text-[#3B3] font-medium flex items-center gap-3">
                <Activity size={24} /> The next generation of visibility lies in AI recommendations
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* WE'RE BUILDING THE VISIBILITY LAYER */}
      <section className="py-24 md:py-32 relative z-10 dark-grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at right center, rgba(59,59,255,0.05) 0%, transparent 50%)' }} />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#3B3BFF]/5 rounded-full blur-[80px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">The Visibility Layer For AI Answers</h2>
            <p className="text-xl text-slate-400 font-light">Position your brand in the answers AI gives, with advanced insights</p>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {[
              "Why a competitor gets recommended.",
              "Which discussions influence AI answers.",
              "What communities shape brand perception.",
              "Where discoverability begins before citation happens."
            ].map((text, i) => (
              <FadeInSection key={i} delay={`${i * 100}ms`}>
                <TiltCard>
                  <div className="glass-card bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-indigo-500/40 p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 h-full group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3B3BFF] group-hover:text-white transition-colors">
                      <Eye className="text-indigo-400 group-hover:text-white transition-colors" size={20} />
                    </div>
                    <span className="text-slate-300 font-medium text-lg leading-snug">{text}</span>
                  </div>
                </TiltCard>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay="400ms" className="text-center">
            <p className="text-3xl text-white font-bold mb-3">That's the platform we're building</p>
            <p className="text-xl text-[#3B3B]">A unified intelligence layer for the age of AI search</p>
          </FadeInSection>
        </div>
      </section>

      {/* THE VISION (Dynamic Background Added) */}
      <section className="py-32 bg-slate-950 border-y border-slate-800/50 relative z-10 overflow-hidden">
        {/* Dynamic Visual Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#3B3BFF]/10 via-indigo-500/5 to-sky-400/10 rounded-full blur-[100px] pointer-events-none"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <SpeedStreaks />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeInSection>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold tracking-widest uppercase shadow-lg">The Vision</div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">One platform</h2>
            <p className="text-2xl md:text-3xl text-slate-400 font-light mb-16">Every signal influencing AI visibility</p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-20 relative">
              {/* Connecting lines behind tags */}
              <div className="absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#3B3BFF]/30 to-transparent -translate-y-1/2 -z-10 hidden md:block" />

              {['Reddit', 'Forums', 'News', 'Documentation', 'Reviews', 'Community discussions', 'Citation sources', 'AI-generated answers'].map((tag, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-6 py-3 bg-slate-900/90 backdrop-blur-md border border-[#3B3BFF]/20 rounded-xl text-lg text-slate-200 shadow-[0_0_15px_rgba(59,59,255,0.1)] hover:border-[#3B3BFF]/60 hover:shadow-[0_0_20px_rgba(59,59,255,0.3)] transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <TiltCard>
              <div className="glass-card inline-block p-10 md:p-12 rounded-[3rem] border-indigo-500/30 shadow-[0_0_60px_rgba(59,59,255,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#3B3BFF]/5 to-transparent pointer-events-none" />
                <p className="text-2xl md:text-3xl text-white font-medium flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10">
                  <span className="flex items-center gap-3"><LinkIcon className="text-slate-500" /> Everything connected</span>
                  <span className="hidden md:inline text-slate-600 font-light text-4xl">•</span>
                  <span className="flex items-center gap-3"><BarChart2 className="text-slate-500" /> Everything measurable</span>
                  <span className="hidden md:inline text-slate-600 font-light text-4xl">•</span>
                  <span className="text-[#3B3BFF] font-bold flex items-center gap-3"><Bot /> Everything explained</span>
                </p>
              </div>
            </TiltCard>
          </FadeInSection>
        </div>
      </section>

      {/* PIVOT TO REDDIT (Visual Timeline) */}
      <section className="py-24 md:py-32 relative z-10 dark-grid-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Start Analyzing the Obvious</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">The journey from a casual conversation to a definitive AI recommendation happens in stages, starting from authentic discussions</p>
          </FadeInSection>

          {/* Interactive Timeline */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mb-16 relative">
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-slate-800 -translate-y-1/2 z-0" />

            {[
              { title: "1. Conversations Happen", desc: "People recommend products organically in communities", icon: <MessageSquare size={24} />, color: "orange" },
              { title: "2. Signals Emerge", desc: "These discussions build into measurable sentiment", icon: <Activity size={24} />, color: "indigo" },
              { title: "3. AI Recommends", desc: "AI models ingest signals and formulate citations", icon: <Bot size={24} />, color: "emerald" }
            ].map((step, i) => (
              <FadeInSection key={i} delay={`${i * 150}ms`} className="flex-1 relative z-10">
                <TiltCard>
                  <div className={`glass-card p-8 rounded-[2rem] bg-slate-900/80 border-slate-700/50 flex flex-col items-center text-center group h-full transition-all duration-300 hover:border-${step.color}-500/50 hover:bg-slate-800/90 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                    <div className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 text-${step.color}-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {step.icon}
                    </div>
                    <h4 className="text-white font-bold text-xl mb-3">{step.title}</h4>
                    <p className="text-slate-400 text-base">{step.desc}</p>
                  </div>
                </TiltCard>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay="500ms">
            <TiltCard>
              <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/30 p-10 md:p-12 rounded-[3rem] shadow-[0_0_50px_rgba(249,115,22,0.15)] glass-card relative overflow-hidden text-center cursor-default">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400" />
                <p className="text-3xl md:text-4xl text-white font-extrabold mb-6">Understand Reddit Insights</p>
                <p className="text-slate-300 text-xl md:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto">Reddit is the #1 source on the internet for unfiltered human opinions and is the top contributor to LLM answers</p>
                <div className="inline-flex items-center justify-center bg-orange-500/20 px-6 py-3 rounded-xl border border-orange-500/30">
                  <p className="text-orange-400 font-bold text-sm md:text-base tracking-widest uppercase flex items-center gap-2"><Globe size={18} /> The first layer</p>
                </div>
              </div>
            </TiltCard>
          </FadeInSection>
        </div>
      </section>

      {/* AVAILABLE TODAY */}
      <section className="py-24 md:py-32 border-y border-slate-800/50 bg-[#07060F] relative z-10 overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)]">Available Today</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Reddit Intelligence</h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">Explore the conversations shaping future visibility</p>

              <div className="glass-card bg-slate-900/50 p-8 rounded-3xl border border-slate-700/50 mb-10 shadow-xl hover:border-orange-500/30 transition-colors">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Track Contextual Signals:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {['Brand mentions', 'Competitor mentions', 'Community sentiment', 'Recommendations', 'Emerging narratives', 'Category momentum'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-200 text-base font-medium">
                      <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href="https://app.vampro.in/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_25px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 text-lg inline-flex items-center justify-center text-center">
                  Launch Reddit Intelligence
                </a>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500" /> Free during beta
                </span>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms" className="hidden lg:flex justify-center">
              <TiltCard>
                <div className="w-[450px] aspect-square glass-card rounded-full border border-slate-700/50 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                  <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors duration-500"></div>
                  <div className="absolute inset-4 border border-orange-500/20 rounded-full border-dashed animate-spin-slow"></div>
                  <div className="absolute inset-12 border border-slate-700/50 rounded-full border-dotted animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
                  <MessageSquare className="text-orange-500 relative z-10 filter drop-shadow-[0_0_20px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-500" size={120} />
                </div>
              </TiltCard>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* COMING SOON (Equal Boxes) */}
      <section className="py-24 md:py-32 relative z-10 dark-grid-bg">
        <SpeedStreaks />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">Coming Soon</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">The complete SignalScope platform</h2>
          </FadeInSection>

          {/* ensure boxes are equal size with flex-1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {[
              { title: "AI Citation Intelligence", desc: "Discover where AI gets its information and how frequently your brand is sourced.", icon: <LinkIcon size={24} /> },
              { title: "AI Visibility Tracking", desc: "Monitor appearances across ChatGPT, Perplexity, and other major AI search engines.", icon: <Eye size={24} /> },
              { title: "Competitive AI Intelligence", desc: "Understand who owns the recommendation in your specific category.", icon: <BarChart2 size={24} /> },
              { title: "Source Intelligence", desc: "Track the raw signals, discussions, and news articles shaping discoverability.", icon: <Globe size={24} /> },
              { title: "Visibility Monitoring", desc: "Measure changes in your AI visibility score over time as narratives shift.", icon: <TrendingUp size={24} /> },
              { title: "Automated Reports", desc: "Get weekly updates on your brand's AI share of voice delivered to your inbox.", icon: <FileText size={24} /> }
            ].map((module, i) => (
              <FadeInSection key={i} delay={`${i * 100}ms`} className="h-full">
                <TiltCard className="h-full">
                  <div className="glass-card bg-slate-900/60 hover:bg-indigo-900/20 border border-slate-700/50 hover:border-[#3B3BFF]/40 p-8 rounded-3xl h-full flex flex-col group transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-[#3B3BFF] group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
                      {module.icon}
                    </div>
                    <h4 className="text-xl text-white font-bold mb-3">{module.title}</h4>
                    <p className="text-slate-400 text-base leading-relaxed flex-1">{module.desc}</p>
                  </div>
                </TiltCard>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay="500ms" className="mt-16 text-center">
            {hasJoined ? (
              <button disabled className="bg-green-500/20 text-green-400 border border-green-500/30 px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 cursor-not-allowed mx-auto transition-all shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                <Check size={20} /> Joined Waitlist
              </button>
            ) : (
              <button onClick={(e) => handleWaitlist(e, 'SignalScope Coming Soon')} className="bg-[#3B3BFF] hover:bg-indigo-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(59,59,255,0.4)] hover:-translate-y-1 mx-auto flex items-center gap-2">
                Join early access <ArrowRight size={18} />
              </button>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* AUDIENCE SECTION (Visual & Interactive) */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800/50 relative z-10 dark-dot-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12">Built For Teams Preparing For What Comes Next</h2>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {['Founders', 'Marketers', 'Agencies', 'Growth Teams', 'SEO Professionals', 'Product Leaders'].map((team, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card px-6 md:px-8 py-4 rounded-2xl border border-slate-700/50 hover:border-[#3B3BFF]/50 bg-slate-900/50 flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(59,59,255,0.2)] transition-all group"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-[#3B3BFF] group-hover:shadow-[0_0_10px_rgba(59,59,255,0.8)] transition-colors" />
                  <span className="text-slate-300 group-hover:text-white font-bold text-lg md:text-xl transition-colors">{team}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 h-px w-32 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
            <div className="mt-12 glass-card inline-block px-8 py-4 rounded-full border-indigo-500/20 bg-slate-900/50">
              <p className="text-[#3B3B] text-sm md:text-lg uppercase tracking-widest font-bold">
                For anyone who believes discoverability is defined by recommendations
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FINAL CTA (Visuals Added) */}
      <section className="py-32 relative z-10 overflow-hidden text-center dark-grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,59,255,0.15) 0%, transparent 80%)' }}></div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-20 left-[20%] text-[#3B3BFF]"><MessageSquare size={64} /></motion.div>
          <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-32 right-[20%] text-emerald-500"><TrendingUp size={80} /></motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-40 right-[25%] text-orange-500"><Globe size={48} /></motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl mx-auto flex items-center justify-center mb-8 border border-indigo-500/20 shadow-[0_0_30px_rgba(59,59,255,0.2)]">
              <Bot size={40} className="text-[#3B3BFF]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
              Conversations Happen First
            </h2>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-[#3B3BFF] mb-10 leading-tight drop-shadow-md">
              Recommendations Come Later
            </h2>
            <p className="text-2xl text-slate-300 font-light mb-12 leading-relaxed max-w-3xl mx-auto bg-slate-900/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-md">
              SignalScope helps you understand both.
              Start exploring Reddit Intelligence today.
              Join the waitlist for everything that's coming next.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a href="https://app.vampro.in/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#3B3BFF] hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-bold text-xl transition-all shadow-[0_0_40px_rgba(59,59,255,0.4)] hover:-translate-y-1 inline-flex items-center justify-center gap-3">
                <Activity size={24} /> Try Free Beta
              </a>
              {hasJoined ? (
                <button disabled className="w-full sm:w-auto bg-green-500/20 text-green-400 border border-green-500/30 px-10 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 cursor-not-allowed transition-all">
                  <Check size={24} /> Joined Waitlist
                </button>
              ) : (
                <button onClick={(e) => handleWaitlist(e, 'SignalScope CTA')} className="w-full sm:w-auto bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 border border-slate-600 text-white px-10 py-4 rounded-xl font-bold text-xl transition-all shadow-xl hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2">
                  Join Early Access <ArrowRight size={20} />
                </button>
              )}
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest bg-slate-900/50 inline-flex px-4 py-2 rounded-lg border border-slate-800">
              <CheckCircle size={16} className="text-emerald-500" /> Free During Beta
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* DOCS & LEGAL — light dot bg
      <section className="py-24 light-dot-bg">
        <div className="w-full px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
          <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FileText size={24} />, title: 'Documentation', desc: 'Guides, installation, and troubleshooting.', cta: 'Read Docs', action: () => navigate('/docs') },
              { icon: <Shield size={24} />, title: 'Terms of Use', desc: 'Licensing, restrictions, and agreements.', cta: 'Full Terms', action: () => navigate('/terms') },
              { icon: <Shield size={24} />, title: 'Privacy Policy', desc: 'Data handling and user information.', cta: 'Read Privacy', action: () => navigate('/privacy') },
            ].map((item, i) => (
              <TiltCard key={i}>
                <div className="glass-card-light glow-card p-10 rounded-[2.5rem] text-center flex flex-col items-center cursor-pointer h-full hover:border-[#3B3BFF]/30 transition-colors" onClick={item.action}>
                  <div className="w-14 h-14 bg-indigo-100 text-[#3B3BFF] rounded-2xl flex items-center justify-center mb-6 shadow-sm">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#07060F] mb-3">{item.title}</h3>
                  <p className="text-slate-500 mb-8 flex-grow text-base">{item.desc}</p>
                  <span className="text-[#3B3BFF] font-bold flex items-center gap-2 text-base group">{item.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </TiltCard>
            ))}
          </FadeInSection>
        </div>
      </section>*/}
    </div>
  );
};

export default AeoPage;