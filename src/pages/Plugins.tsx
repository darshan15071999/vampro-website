import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mic, Check } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import TiltCard from '../components/TiltCard';
import SpeedStreaks from '../components/SpeedStreaks';
import { useWaitlist } from '../context/WaitlistContext';

const Plugins = () => {
  const nav = useNavigate();

  const { openModal, hasJoined } = useWaitlist();

  const handleWaitlist = (e: React.MouseEvent, source: string) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(source);
  };

  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SpeedStreaks />
      <div className="w-full px-6 md:px-10 lg:px-16 py-16 relative z-10">
        <FadeInSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Plugin Catalog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">Our Plugins</h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto font-light">Tools built for creative workflows.</p>
        </FadeInSection>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeInSection>
            <TiltCard>
              <div className="relative group/plugin h-full">
                <div
                  onClick={() => { nav('/plugins/adobe-voice'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="glass-card p-8 rounded-[2rem] cursor-pointer group hover:border-indigo-500/30 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="w-14 h-14 bg-[#3B3BFF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Mic size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Vampro Voice Generator</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    AI-powered text-to-speech directly inside Adobe Premiere Pro. Generate natural voiceovers without leaving your timeline.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#3B3BFF] font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight size={14} />
                    </span>
                    <span className="ml-auto glass-card px-3 py-1 rounded-full text-[10px] text-indigo-300 font-semibold">v1.1.0</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 whitespace-nowrap bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 opacity-0 group-hover/plugin:opacity-100 transition-opacity z-20 pointer-events-none group-hover/plugin:pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                  App yet to be launched
                  {hasJoined ? (
                    <button disabled className="bg-green-500/20 text-green-400 w-5 h-5 rounded-full flex items-center justify-center transition-colors pointer-events-auto cursor-not-allowed" title="Joined Waitlist"><Check size={12} /></button>
                  ) : (
                    <button onClick={(e) => handleWaitlist(e, 'Plugins Page')} className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 w-5 h-5 rounded-full flex items-center justify-center transition-colors pointer-events-auto" title="Join Waitlist">+</button>
                  )}
                </div>
              </div>
            </TiltCard>
          </FadeInSection>

          {/* Placeholder for future plugins */}
          <FadeInSection delay="100ms">
            <div className="glass-card p-8 rounded-[2rem] border-dashed border-indigo-500/20 h-full flex flex-col items-center justify-center text-center min-h-[280px]">
              <div className="w-14 h-14 bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-slate-500 mb-2">More Coming Soon</h3>
              <p className="text-slate-600 text-sm">New creative tools are in development.</p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default Plugins;
