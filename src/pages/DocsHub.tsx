import { useNavigate } from 'react-router-dom';
import { Settings, Activity, Gamepad2, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { docsHubMetadata } from '../seo/metadata';

const DocsHub = () => {
  const navigate = useNavigate();

  // Public categories — only Plugins shown
  const publicCategories = [
    {
      title: 'Plugins',
      description: 'Documentation for Vampro Voice Generator and other Adobe integrations.',
      icon: <Settings className="text-[#6484e1] mb-4" size={32} />,
      link: '/docs/plugins/voice-generator',
      bgClass: 'bg-[#2b5be3]/5 hover:bg-[#2b5be3]/10 border-[#2b5be3]/20 text-[#6484e1]'
    }
  ];

  // Hidden categories — preserved for future use
  const _hiddenCategories = [
    {
      title: 'Software',
      description: 'Guides and API references for SignalScope and tracking tools.',
      icon: <Activity className="text-amber-400 mb-4" size={32} />,
      link: '/docs/software/signalscope',
      bgClass: 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20 text-amber-400'
    },
    {
      title: 'Games',
      description: 'Player manuals, controls, and system requirements for Spoch.',
      icon: <Gamepad2 className="text-emerald-400 mb-4" size={32} />,
      link: '/docs/games/spoch',
      bgClass: 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    }
  ];
  // Suppress unused variable warning
  void _hiddenCategories;

  return (
    <div className="dark-grid-bg min-h-screen pt-32 relative overflow-hidden flex flex-col">
      <SEO {...docsHubMetadata} />
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2b5be3]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3e6cec]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 z-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 font-space"
          >
            Documentation Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Browse plugin documentation, installation guides, and technical references.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-lg mx-auto">
          {publicCategories.map((cat, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => navigate(cat.link)}
              className={`text-left p-8 rounded-2xl border transition-all duration-300 group ${cat.bgClass} backdrop-blur-sm`}
            >
              {cat.icon}
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{cat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 h-10">
                {cat.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-medium">
                View Documentation 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Subtle coming soon note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2b5be3]/10 bg-[#183078]/10 text-[#6879aa] text-xs font-medium">
            <Sparkles size={12} /> More documentation will be added as new plugins launch
          </div>
        </motion.div>
      </main>
      <div className="mt-auto">
         <HomeFooter />
      </div>
    </div>
  );
};

export default DocsHub;
