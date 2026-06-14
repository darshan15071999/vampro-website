import { type MouseEvent as RMouseEvent } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { DocSection, DocH3, DocList } from '../components/DocHelpers';

const Docs = () => {
  const scrollToDocSection = (e: RMouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 120; window.scrollTo({ top: y, behavior: 'smooth' }); }
  };

  const navItems = [
    { id: 'intro', label: 'Introduction' }, { id: 'features', label: 'Key Features' },
    { id: 'requirements', label: 'System Requirements' }, { id: 'installation', label: 'Installation Guide' },
    { id: 'quick-start', label: 'Quick Start' }, { id: 'controls', label: 'Voice Controls' },
    { id: 'audio-management', label: 'Audio Management' }, { id: 'troubleshooting', label: 'Troubleshooting' },
    { id: 'faq', label: 'FAQ' }, { id: 'releases', label: 'Release Notes' },
  ];

  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <div className="w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-10 py-8 items-start">
        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 sticky top-32 hidden md:block max-h-[calc(100vh-160px)] overflow-y-auto docs-sidebar pr-4 flex-shrink-0">
          <h3 className="font-bold text-slate-400 mb-5 tracking-widest uppercase text-xs border-b border-indigo-900/30 pb-3">Knowledge Base</h3>
          <ul className="space-y-0.5 text-sm">
            {navItems.map(item => (
              <li key={item.id}><a href={`#${item.id}`} onClick={e => scrollToDocSection(e as any, item.id)} className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-900/30 transition-all font-medium">{item.label}</a></li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              <div id="intro" className="mb-12 border-b border-indigo-900/30 pb-12 scroll-mt-40">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Documentation</h1>
                <p className="gradient-blue-text font-semibold text-base">Vampro Voice Generator Text-to-Speech</p>
                <p className="text-slate-400 mt-5 leading-relaxed">Generate natural-sounding AI voiceovers directly inside Adobe Premiere Pro. The extension uses a local AI voice generation service running on your computer.</p>
              </div>

              <DocSection id="features" title="Key Features">
                <ul className="space-y-2">
                  {['AI voiceovers inside Premiere Pro', 'Multiple voice options', 'Adjustable speed and pitch', 'Tone presets for narration styles', 'Local processing', 'Auto-startup', 'Fast workflow integration'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle size={14} className="text-green-400 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
              </DocSection>

              <DocSection id="requirements" title="System Requirements">
                <DocH3>Operating System</DocH3><DocList items={['Windows 10 (64-bit)', 'Windows 11 (64-bit)']} />
                <DocH3>Adobe Software</DocH3><DocList items={['Adobe Premiere Pro 26.0 or later']} />
                <DocH3>Hardware</DocH3>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  {[{ t: 'Minimum', s: ['i5 / Ryzen 5', '8 GB RAM', '5 GB disk'] }, { t: 'Recommended', s: ['i7 / Ryzen 7', '16 GB RAM', 'SSD'] }].map(tier => (
                    <div key={tier.t} className="glass-card p-5 rounded-2xl"><h4 className="font-bold text-white mb-2 text-sm">{tier.t}:</h4><DocList items={tier.s} /></div>
                  ))}
                </div>
              </DocSection>

              <DocSection id="installation" title="Installation Guide">
                {[['Step 1 – Install Extension', 'Install from Adobe Exchange and restart Premiere Pro.'], ['Step 2 – Install Voice Service', 'Run Vampro Voice Generator Installer.exe. It sets up the service, configures auto-startup, installs AI components. Restart Premiere Pro.'], ['Step 3 – Open Extension', 'Go to Window → Extensions → Vampro Voice Generator Text-to-Speech.']].map(([t, b], i) => (
                  <div key={t} className="mb-8">
                    <DocH3 blue>{t}</DocH3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{b}</p>
                    <div className="w-full h-48 md:h-64 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold">
                      [Image Placeholder {i + 1}]
                    </div>
                  </div>
                ))}
              </DocSection>

              <DocSection id="quick-start" title="Quick Start">
                <div className="w-full h-64 md:h-80 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold mb-8 mt-2">
                  [GIF Placeholder 1]
                </div>
                <ol className="space-y-6">
                  {[
                    ['Enter Text', 'Type or paste your script.'],
                    ['Select Voice', 'Choose from available voices.'],
                    ['Choose Tone', 'Optional presets: Professional, Voiceover, Documentary, etc.'],
                    ['Generate', 'Click Generate Voice. Audio appears in Premiere Pro.'],
                    ['Placeholder Point 1', 'Description for placeholder point 1.'],
                    ['Placeholder Point 2', 'Description for placeholder point 2.'],
                    ['Placeholder Point 3', 'Description for placeholder point 3.'],
                    ['Placeholder Point 4', 'Description for placeholder point 4.']
                  ].map(([t, b], i) => (
                    <li key={i} className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <div className="w-7 h-7 bg-[#3B3BFF] rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</div>
                        <div className="text-sm"><strong className="text-white">{t}:</strong> <span className="text-slate-400">{b}</span></div>
                      </div>
                      {i < 6 && (
                        <div className="ml-10 w-full max-w-2xl h-40 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold">
                          [Image Placeholder {i + 1}]
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </DocSection>

              <DocSection id="controls" title="Voice Controls">
                <DocH3>Speed</DocH3><DocList items={['0.8x – Slow', '1.0x – Normal', '1.2x – Fast']} />
                <DocH3>Pitch</DocH3><DocList items={['Negative → deeper', 'Positive → higher']} />
                <DocH3>Tone Presets</DocH3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {['Professional', 'Documentary', 'Voiceover', 'Dynamic', 'Casual', 'Serious', 'Comedic'].map(t => (
                    <div key={t} className="glass-card p-3 rounded-xl text-xs text-indigo-200 font-medium">{t}</div>
                  ))}
                </div>
              </DocSection>

              <DocSection id="audio-management" title="Audio Management">
                <p className="text-slate-400 text-sm mb-6">Generated audio files are stored locally by the Vampro Voice Service with metadata (text, voice, tone, speed, pitch, creation time). Modify settings and regenerate as needed.</p>

                <div className="w-full h-64 md:h-80 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold mb-6">
                  [GIF Placeholder 1]
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-full h-40 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold">
                      [Image Placeholder {i}]
                    </div>
                  ))}
                </div>
              </DocSection>

              <DocSection id="troubleshooting" title="Troubleshooting" accent="text-red-400">
                {[['Voice Generation Fails', 'Check http://127.0.0.1:8000/health — should return {"status": "ok"}.'], ['Service Not Running', 'Restart Windows. The service auto-starts after login.'], ['Antivirus Warning', 'Use the official release from Vampro distribution channels.'], ['Can\'t Connect', 'Check firewall isn\'t blocking localhost. Verify Premiere Pro version.'], ['Extension Missing', 'Restart Premiere Pro → Window → Extensions.']].map(([t, b]) => (
                  <div key={t}><DocH3>{t}</DocH3><p className="text-slate-400 text-sm leading-relaxed">{b}</p></div>
                ))}
              </DocSection>

              <DocSection id="faq" title="FAQ">
                <div className="space-y-3">
                  {[['Internet required?', 'Cloud-based AI for voice generation. Service itself is local.'], ['macOS?', 'Windows only. macOS planned for future.'], ['Runs in background?', 'Yes, auto-starts and runs silently.'], ['Commercial use?', 'Yes, but users are responsible for compliance.']].map(([q, a]) => (
                    <details key={q} className="glass-card rounded-xl overflow-hidden group">
                      <summary className="px-5 py-3.5 cursor-pointer font-bold text-white text-sm flex items-center justify-between select-none hover:bg-indigo-900/20 transition-colors">
                        {q}<ChevronDown size={16} className="text-indigo-400 group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="px-5 py-3 text-slate-400 border-t border-indigo-900/30 text-sm">{a}</div>
                    </details>
                  ))}
                </div>
              </DocSection>

              <DocSection id="releases" title="Release Notes">
                <div className="glass-card rounded-xl p-5">
                  <h3 className="text-base font-bold text-white mb-2">Version 1.1.0</h3>
                  <p className="text-slate-400 text-sm"><strong className="text-indigo-300">New:</strong> Improved installer, auto-startup, hidden service, enhanced integration, better stability.</p>
                  <p className="text-slate-400 text-sm mt-2"><strong className="text-indigo-300">Fixes:</strong> Connection failures, startup reliability, installation workflow.</p>
                </div>
                <div className="glass-card rounded-xl p-5 mt-4 border-[#3B3BFF]/20">
                  <h3 className="text-base font-bold text-white mb-1">Support</h3>
                  <p className="text-slate-400 text-sm">Contact <a href="mailto:support@vampro.in" className="gradient-blue-text font-bold">support@vampro.in</a></p>
                </div>
              </DocSection>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;