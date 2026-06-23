import { type MouseEvent as RMouseEvent } from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { DocSection, DocH3, DocList } from '../components/DocHelpers';

const Licenses = () => {
  const scrollToSection = (e: RMouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 120; window.scrollTo({ top: y, behavior: 'smooth' }); }
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'licensing', label: 'Component Licenses' },
    { id: 'voice-models', label: 'Voice Models' },
    { id: 'updates', label: 'Updates' },
    { id: 'voice-architecture', label: 'Voices' },
  ];

  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <div className="w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-10 py-8 items-start">
        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 sticky top-32 hidden md:block max-h-[calc(100vh-160px)] overflow-y-auto docs-sidebar pr-4 flex-shrink-0">
          <h3 className="font-bold text-slate-400 mb-5 tracking-widest uppercase text-xs border-b border-indigo-900/30 pb-3">Licenses</h3>
          <ul className="space-y-0.5 text-sm">
            {navItems.map(item => (
              <li key={item.id}><a href={`#${item.id}`} onClick={e => scrollToSection(e as any, item.id)} className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-900/30 transition-all font-medium">{item.label}</a></li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* ── OVERVIEW ── */}
              <div id="overview" className="mb-12 border-b border-indigo-900/30 pb-12 scroll-mt-40">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Licenses</h1>
                <p className="gradient-blue-text font-semibold text-base">Vampro Voice Generator Text-to-Speech</p>
                <p className="text-slate-400 mt-5 leading-relaxed">
                  Vampro Voice Generator is built on open-source technology. This page provides transparency about the licensing of every component, the AI models powering voice generation, and the voice engine used. All components ship under permissive licenses (Apache-2.0, MIT, BSD) that allow commercial use. No GPL-licensed components are included.
                </p>
              </div>

              {/* ── COMPONENT LICENSES ── */}
              <DocSection id="licensing" title="Component Licenses">
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  All components used in Vampro Voice Generator are licensed under permissive open-source licenses that permit commercial use. No GPL-licensed code is included in the application.
                </p>

                {/* License Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-indigo-900/30">
                        <th className="text-left py-2.5 text-slate-400 font-medium">Component</th>
                        <th className="text-left py-2.5 text-slate-400 font-medium hidden sm:table-cell">Role</th>
                        <th className="text-center py-2.5 text-slate-400 font-medium">License</th>
                        <th className="text-center py-2.5 text-slate-400 font-medium">Commercial</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {[
                        ['Kokoro-82M', 'TTS model weights', 'Apache-2.0', true],
                        ['kokoro', 'TTS pipeline', 'Apache-2.0', true],
                        ['misaki', 'G2P front end', 'MIT', true],
                        ['DeepPhonemizer', 'G2P engine', 'MIT', true],
                        ['OpenPhonemizer', 'G2P model weights', 'BSD-3-Clause-Clear', true],
                        ['inflect', 'Number → words', 'MIT', true],
                        ['torch / numpy / scipy', 'Runtime', 'BSD-3-Clause', true],
                        ['fastapi / pydantic / loguru', 'Service framework', 'MIT', true],
                        ['uvicorn', 'ASGI server', 'BSD-3-Clause', true],
                        ['huggingface_hub', 'Model management', 'Apache-2.0', true],
                        ['spaCy + en_core_web_sm', 'NLP processing', 'MIT', true],
                      ].map(([comp, role, license, commercial]) => (
                        <tr key={comp as string} className="border-b border-indigo-900/15 hover:bg-indigo-900/10 transition-colors">
                          <td className="py-2.5 text-white font-medium">{comp as string}</td>
                          <td className="py-2.5 text-slate-500 hidden sm:table-cell">{role as string}</td>
                          <td className="py-2.5 text-center"><span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full">{license as string}</span></td>
                          <td className="py-2.5 text-center">{commercial ? <CheckCircle size={14} className="text-green-400 mx-auto" /> : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="glass-card rounded-xl p-4 border-green-500/15 mb-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-400 text-sm">
                      <span className="text-green-400 font-medium">No GPL components.</span> All shipped components use Apache-2.0, MIT, or BSD permissive licenses that allow commercial use.
                    </p>
                  </div>
                </div>

                <DocH3>Source Links</DocH3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    ['Kokoro-82M', 'https://huggingface.co/hexgrad/Kokoro-82M'],
                    ['DeepPhonemizer', 'https://github.com/as-ideas/DeepPhonemizer'],
                    ['OpenPhonemizer', 'https://github.com/NeuralVox/OpenPhonemizer'],
                    ['inflect', 'https://pypi.org/project/inflect/'],
                  ].map(([name, url]) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 transition-colors">
                      {name} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </DocSection>

              {/* ── VOICE MODELS ── */}
              <DocSection id="voice-models" title="Voice Models">
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  The app ships with a bundled voice model for fully offline use. Additional models may be downloaded when available.
                </p>

                <div className="glass-card rounded-xl p-5 mb-5">
                  <div className="flex flex-wrap gap-4 mb-3">
                    {[
                      ['Model', 'Kokoro-82M'],
                      ['Voices', '54 included'],
                      ['License', 'Apache-2.0'],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-slate-500">{label}</p>
                        <p className="text-sm font-medium text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {[
                      'Voice synthesis runs fully offline — generating audio never requires the network',
                      'The bundled model is licensed under Apache-2.0, permitting commercial use of generated audio',
                      'Network access can be fully disabled by setting VAMPRO_FORCE_OFFLINE=1',
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-slate-500 text-xs">
                  Only models cleared for commercial use under permissive licenses are included. The default Kokoro-82M model is based on StyleTTS2 and is © hexgrad.
                </p>
              </DocSection>

              {/* ── UPDATES ── */}
              <DocSection id="updates" title="Updates">
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  The app periodically checks for new application updates and voice models. When updates are available, a non-blocking notification is shown with a link to download the latest version. The app continues to function normally during this process and never blocks voice generation.
                </p>
                <DocList items={[
                  'Updates and new voice models are checked for automatically when the app is online',
                  'The app stays fully functional offline — update checks are silent and non-blocking',
                  'You may disable all network activity by setting VAMPRO_FORCE_OFFLINE=1',
                  'The panel extension may also be updated independently via the Adobe Marketplace',
                ]} />
              </DocSection>

              {/* ── VOICES ── */}
              <DocSection id="voice-architecture" title="Voices">
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Vampro Voice Generator includes 27 English voices, all running fully offline through the bundled Kokoro-82M model (Apache-2.0).
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  <div className="glass-card rounded-xl p-4">
                    <p className="text-xs text-indigo-400 font-medium mb-1.5">🇺🇸 US English</p>
                    <p className="text-sm text-slate-300">11 female, 8 male voices</p>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <p className="text-xs text-indigo-400 font-medium mb-1.5">🇬🇧 UK English</p>
                    <p className="text-sm text-slate-300">4 female, 4 male voices</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  The voice menu is built dynamically, so new voices and models can be added in future updates without requiring changes to the extension panel. The architecture is engine-agnostic by design, allowing additional TTS models to be integrated as they become available.
                </p>

                <div className="glass-card rounded-xl p-4 border-indigo-500/15">
                  <p className="text-slate-400 text-sm">
                    <span className="text-white font-medium">Note:</span> Kokoro-82M is currently the best small, commercially-licensed, CPU-friendly local TTS model available. All voices are licensed for commercial use under Apache-2.0.
                  </p>
                </div>
              </DocSection>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Licenses;
