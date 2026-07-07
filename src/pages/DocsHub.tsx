import { useNavigate } from 'react-router-dom';
import { Settings, Activity, Gamepad2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { docsHubMetadata } from '../seo/metadata';

const DocsHub = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Plugins',
      description: 'Documentation for Vampro Voice Generator and other Adobe integrations.',
      icon: <Settings className="text-indigo-400 mb-4" size={32} />,
      link: '/docs/plugins/voice-generator',
      bgClass: 'bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
    },
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

  return (
    <div className="dark-grid-bg min-h-screen pt-32 relative overflow-hidden flex flex-col">
      <SEO {...docsHubMetadata} />
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 font-space">
            Documentation Hub
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Choose a product category below to access guides, API references, and manuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
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
            </button>
          ))}
        </div>
      </main>
      <div className="mt-auto">
         <HomeFooter />
      </div>
    </div>
  );
};

export default DocsHub;
