import { type MouseEvent as RMouseEvent } from 'react';
import { Search, BarChart2, ChevronDown, Activity } from 'lucide-react';
import { DocSection, DocH3, DocList } from '../components/DocHelpers';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { docsSignalScopeMetadata } from '../seo/metadata';

const DocsSignalScope = () => {
  const scrollToDocSection = (e: RMouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 120; window.scrollTo({ top: y, behavior: 'smooth' }); }
  };

  const navItems = [
    { id: 'intro', label: 'Introduction' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'tracking', label: 'Tracking Entities' },
    { id: 'reports', label: 'Understanding Reports' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <div className="dark-grid-bg min-h-screen flex flex-col pt-28">
      <SEO {...docsSignalScopeMetadata} />
      <div className="flex-grow w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-10 py-8 items-start">
        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 sticky top-32 hidden md:block max-h-[calc(100vh-160px)] overflow-y-auto docs-sidebar pr-4 flex-shrink-0">
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">SignalScope Docs</h4>
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
              <Activity size={14} /> Software
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              SignalScope
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              Track how Reddit conversations influence AI search visibility across ChatGPT, Gemini, Claude and Perplexity.
            </p>
          </div>

          <div className="space-y-16">
            <DocSection id="intro" title="Introduction">
              <p className="text-slate-300 leading-relaxed mb-4">
                SignalScope is an Answer Engine Optimization (AEO) tracking tool designed to monitor mentions of your brand or keywords across major AI engines. It connects Reddit sentiment to AI engine outputs.
              </p>
            </DocSection>

            <DocSection id="getting-started" title="Getting Started">
              <DocList items={[
                'Sign up for a SignalScope account',
                'Configure your primary brand keywords',
                'Connect your data sources (if applicable)',
                'View your baseline visibility report'
              ]} />
            </DocSection>

            <DocSection id="tracking" title="Tracking Entities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="glass-card rounded-xl p-6 border-indigo-500/15 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                  <Search className="text-indigo-400 mb-4" size={24} />
                  <h4 className="text-white font-medium mb-2">Keywords</h4>
                  <p className="text-slate-400 text-sm">Track exact phrases, brand names, and product mentions across engines.</p>
                </div>

                <div className="glass-card rounded-xl p-6 border-indigo-500/15 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                  <BarChart2 className="text-indigo-400 mb-4" size={24} />
                  <h4 className="text-white font-medium mb-2">Sentiment</h4>
                  <p className="text-slate-400 text-sm">Analyze if the AI mentions are positive, neutral, or negative.</p>
                </div>
              </div>
            </DocSection>

            <DocSection id="reports" title="Understanding Reports">
              <DocH3>Visibility Score</DocH3>
              <p className="text-slate-300 leading-relaxed mb-4">
                The Visibility Score is a proprietary metric (0-100) indicating how prominently your brand is featured when a user asks an AI engine relevant questions.
              </p>
              <DocH3>Reddit Influence</DocH3>
              <p className="text-slate-300 leading-relaxed mb-4">
                This report maps highly upvoted Reddit posts to corresponding AI engine responses, showing you which threads are feeding the AI's knowledge base.
              </p>
            </DocSection>

            <DocSection id="faq" title="FAQ">
              <DocH3>Which AI Engines are tracked?</DocH3>
              <p className="text-slate-300 leading-relaxed mb-4">Currently, we track ChatGPT, Gemini, Claude, and Perplexity.</p>

              <DocH3>How often is data updated?</DocH3>
              <p className="text-slate-300 leading-relaxed">Visibility reports are updated daily for Enterprise customers and weekly for Pro customers.</p>
            </DocSection>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default DocsSignalScope;