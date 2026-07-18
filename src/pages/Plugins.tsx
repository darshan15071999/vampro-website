import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mic, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeInSection from '../components/FadeInSection';
import TiltCard from '../components/TiltCard';
import SpeedStreaks from '../components/SpeedStreaks';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { pluginsMetadata } from '../seo/metadata';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const Plugins = () => {
  const nav = useNavigate();

  return (
    <div className="dark-grid-bg min-h-screen flex flex-col">
      <SEO {...pluginsMetadata} />
      <SpeedStreaks />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(43,91,227,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="flex-grow w-full px-6 md:px-10 lg:px-16 py-16 pt-28 relative z-10">
        <FadeInSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2b5be3]/10 border border-[#2b5be3]/20 text-[#6484e1] text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Plugin Catalog
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Professional Creative Plugins
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg text-slate-400 max-w-3xl mx-auto font-light"
          >
            Tools built for professional creative workflows. Designed to integrate seamlessly into your production pipeline.
          </motion.p>
        </FadeInSection>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <TiltCard>
              <div
                onClick={() => { nav('/plugins/voice-generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="glass-card p-8 rounded-[2rem] cursor-pointer group hover:border-[#2b5be3]/30 transition-all duration-300 h-full flex flex-col"
              >
                <div className="w-14 h-14 bg-[#2b5be3] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(43,91,227,0.4)] transition-all duration-300">
                  <Mic size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Vampro Voice Generator</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  AI-powered text-to-speech directly inside Adobe Premiere Pro. Generate natural voiceovers without leaving your timeline.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[#376bfe] font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight size={14} />
                  </span>
                  <span className="ml-auto glass-card px-3 py-1 rounded-full text-[10px] text-[#6484e1] font-semibold">v1.1.0</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Placeholder for future plugins */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="glass-card p-8 rounded-[2rem] border-dashed border-[#2b5be3]/15 h-full flex flex-col items-center justify-center text-center min-h-[280px]">
              <div className="w-14 h-14 bg-[#183078]/30 rounded-2xl flex items-center justify-center mb-4">
                <Rocket size={24} className="text-[#6879aa]" />
              </div>
              <h3 className="text-lg font-bold text-[#6879aa] mb-2">More Plugins Coming Soon</h3>
              <p className="text-slate-600 text-sm max-w-[220px]">New creative tools are currently in development.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default Plugins;
