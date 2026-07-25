import { type MouseEvent as RMouseEvent } from 'react';
import { Gamepad2, Crosshair, Cpu, ChevronDown } from 'lucide-react';
import { DocSection, DocH3, DocList } from '../components/DocHelpers';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { docsSpochMetadata } from '../seo/metadata';

const DocsSpoch = () => {
  const scrollToDocSection = (e: RMouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 120; window.scrollTo({ top: y, behavior: 'smooth' }); }
  };

  const navItems = [
    { id: 'intro', label: 'Introduction' },
    { id: 'controls', label: 'Controls' },
    { id: 'gameplay', label: 'Gameplay' },
    { id: 'system', label: 'System Requirements' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <div className="dark-grid-bg min-h-screen flex flex-col pt-28">
      <SEO {...docsSpochMetadata} />
      <div className="flex-grow w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-10 py-8 items-start">
        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 sticky top-32 hidden md:block max-h-[calc(100vh-160px)] overflow-y-auto docs-sidebar pr-4 flex-shrink-0">
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">Spoch Docs</h4>
            <ul className="space-y-1 border-l border-indigo-900/30 ml-2">
              {navItems.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => scrollToDocSection(e, item.id)}
                    className="block px-4 py-1.5 text-sm text-slate-400 hover:text-indigo-300 hover:bg-white/5 border-l-2 border-transparent hover:border-indigo-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Mobile dropdown */}
        <div className="md:hidden w-full relative z-20 mb-6 group">
          <button className="w-full bg-[#07060F]/80 backdrop-blur-md border border-indigo-500/20 px-4 py-3 rounded-xl flex items-center justify-between text-sm text-white">
            <span>Documentation Menu</span>
            <ChevronDown size={16} className="text-slate-400 group-focus-within:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-full left-0 w-full mt-2 bg-[#07060F]/95 backdrop-blur-xl border border-indigo-500/20 rounded-xl shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => { scrollToDocSection(e, item.id); (document.activeElement as HTMLElement)?.blur(); }}
                className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 border-b border-indigo-900/20 last:border-0">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-4xl min-w-0 docs-content pb-20">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
              <Gamepad2 size={14} /> Games
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              Spoch
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              An 8-bit Semi 3D Open World Survival Adventure.
            </p>
          </div>

          <div className="space-y-16">
            <DocSection id="intro" title="Introduction">
              <p className="text-slate-300 leading-relaxed mb-4">
                Spoch is a nostalgic survival game that bridges the gap between retro 8-bit aesthetics and modern 3D mechanics. Explore a vast open world, scavenge for resources, and survive against the elements.
              </p>
            </DocSection>

            <DocSection id="controls" title="Controls">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="glass-card rounded-xl p-6 border-indigo-500/15 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                  <Crosshair className="text-indigo-400 mb-4" size={24} />
                  <h4 className="text-white font-medium mb-2">Movement</h4>
                  <p className="text-slate-400 text-sm">W A S D to move</p>
                  <p className="text-slate-400 text-sm">Space to jump</p>
                  <p className="text-slate-400 text-sm">Shift to sprint</p>
                </div>

                <div className="glass-card rounded-xl p-6 border-indigo-500/15 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                  <Gamepad2 className="text-indigo-400 mb-4" size={24} />
                  <h4 className="text-white font-medium mb-2">Interactions</h4>
                  <p className="text-slate-400 text-sm">E to interact</p>
                  <p className="text-slate-400 text-sm">Left Click to attack</p>
                  <p className="text-slate-400 text-sm">Tab for inventory</p>
                </div>
              </div>
            </DocSection>

            <DocSection id="gameplay" title="Gameplay">
              <DocH3>Survival Elements (coming soon)</DocH3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Manage your hunger, thirst, and energy. Scavenge for food, craft tools, and build shelters to survive the harsh environments.
              </p>
              <DocList items={[
                'Dynamic day-night cycle',
                'Procedurally generated terrain',
                'Resource gathering and crafting',
                'Hostile wildlife and enemies'
              ]} />
            </DocSection>

            <DocSection id="system" title="System Requirements">
              <div className="glass-card rounded-xl p-6 border-indigo-500/15 mt-4">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="text-indigo-400" size={24} />
                  <h4 className="text-white font-medium text-lg">Minimum Requirements</h4>
                </div>
                <DocList items={[
                  'OS: Windows 10/11',
                  'Processor: Intel Core i3 or equivalent',
                  'Memory: 4 GB RAM',
                  'Graphics: Intel HD Graphics 4000 or better',
                  'Storage: 500 MB available space',
                  'Game runs completely on the browser, requirements are specified for smooth gameplay'
                ]} />
              </div>
            </DocSection>

            <DocSection id="faq" title="FAQ">
              <DocH3>Is multiplayer supported?</DocH3>
              <p className="text-slate-300 leading-relaxed mb-4">Currently, Spoch is a single-player experience. Multiplayer features may be explored in future updates.</p>

              <DocH3>Can I mod the game?</DocH3>
              <p className="text-slate-300 leading-relaxed">Basic modding support is planned for a future release.</p>
            </DocSection>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default DocsSpoch;