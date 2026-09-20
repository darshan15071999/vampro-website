import { type MouseEvent as RMouseEvent } from 'react';
import { CheckCircle, Cpu, Cloud, Mic, Sparkles, SlidersHorizontal, AudioLines, Music } from 'lucide-react';
import { DocSection, DocH3 } from '../components/DocHelpers';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { docsVoiceStudioMetadata } from '../seo/metadata';

const DocsVoiceStudio = () => {
  const scrollToDocSection = (e: RMouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'intro', label: 'Introduction' },
    { id: 'before-you-begin', label: 'Before You Begin' },
    { id: 'processing-modes', label: 'Processing Modes' },
    { id: 'add-voice', label: 'Add a Voice (Cloning)' },
    { id: 'change-voice', label: 'Change a Clip Voice' },
    { id: 'create-speech', label: 'Create Speech & Takes' },
    { id: 'repair-audio', label: 'Repair & Stem Separation' },
    { id: 'feedback', label: 'Feedback & Tuning' },
    { id: 'storage', label: 'Files, Privacy & Recovery' },
    { id: 'specs', label: 'System Limits & Specs' },
  ];

  return (
    <div className="dark-grid-bg min-h-screen flex flex-col pt-28">
      <SEO {...docsVoiceStudioMetadata} />
      <div className="flex-grow w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-10 py-8 items-start">
        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 sticky top-32 hidden md:block max-h-[calc(100vh-160px)] overflow-y-auto docs-sidebar pr-4 flex-shrink-0">
          <h3 className="font-bold text-slate-400 mb-5 tracking-widest uppercase text-xs border-b border-indigo-900/30 pb-3">Knowledge Base</h3>
          <ul className="space-y-0.5 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToDocSection(e, item.id)}
                  className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-900/20 transition-all font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-emerald-900/30" style={{ background: 'rgba(11,26,18,0.45)' }}>
            <div className="text-slate-300">

              <div id="intro" className="mb-12 border-b border-emerald-900/30 pb-12 scroll-mt-40">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono tracking-widest uppercase">
                  <Sparkles size={12} className="text-emerald-400" /> Professional Studio Workflow
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Documentation</h1>
                <p className="text-emerald-400 font-semibold text-base">Vampro Voice Studio for Adobe Premiere Pro</p>
                <p className="text-slate-400 mt-5 leading-relaxed">
                  Vampro Voice Studio is an integrated Premiere Pro panel powered by a local Windows companion service. It enables custom voice cloning, speech-to-speech conversion, text-to-speech synthesis, dialogue cleaning, speaker grouping, and vocal/music stem separation without leaving your editing environment.
                </p>
              </div>

              {/* 1. Before You Begin */}
              <DocSection id="before-you-begin" title="Before You Begin">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Ensure the following baseline configuration is in place before initiating generation tasks:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Install and launch the Vampro Voice Studio Windows companion application.',
                    'Open Adobe Premiere Pro and access the Voice Studio extension panel (Window > Extensions > Vampro Voice Studio).',
                    'The panel establishes a secure localhost connection to the companion service on 127.0.0.1.',
                    'Ensure adequate disk storage on your system volume (%LOCALAPPDATA%\\Vampro\\VoiceStudio) for rendered stems, voice library references, and project cache.',
                    'For 100% offline generation, confirm the English Chatterbox model pack has finished initialization.',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </DocSection>

              {/* 2. Processing Modes */}
              <DocSection id="processing-modes" title="Choose How to Process">
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Voice Studio provides two dedicated execution pipelines selectable directly from the top mode switch:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="glass-card rounded-xl p-5 border-emerald-500/20 bg-emerald-950/20">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                      <Cpu size={18} />
                      <h4>1. Local Offline Studio</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Runs the English Chatterbox GGUF model and native audio workers directly on your workstation. Zero network traffic, zero third-party subscriptions, and complete data isolation. Utilizes GPU acceleration (Vulkan) with automatic CPU fallback.
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-5 border-cyan-500/20 bg-cyan-950/20">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold mb-2">
                      <Cloud size={18} />
                      <h4>2. ElevenLabs API (BYOK)</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Connect your personal ElevenLabs API key for access to community models and cloud voice clones. Your API key is encrypted locally using Windows DPAPI (CryptProtectData). Cloud jobs are only dispatched when explicitly confirmed.
                    </p>
                  </div>
                </div>
              </DocSection>

              {/* 3. Add a Voice */}
              <DocSection id="add-voice" title="Add a Voice Reference (Cloning)">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Build custom voice clones from source media in three steps:
                </p>
                <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-300 mb-6">
                  <li>
                    <strong>Select Source Media:</strong> In the Studio tab, select <em>Add Voice</em> and choose from <em>Timeline Clip</em>, <em>Bin Clip</em>, or <em>Upload File</em> (supports both WAV/MP3 audio and video containers).
                  </li>
                  <li>
                    <strong>Define Sample Range:</strong> Set the in and out points to isolate a clean 5–10 second spoken passage without background music or audible overlap. Voice references must be between 1 and 60 seconds.
                  </li>
                  <li>
                    <strong>Save to Voice Library:</strong> Enter an identifiable profile name and choose <em>Save Voice</em>. The reference is indexed in your local library under <code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">%LOCALAPPDATA%\Vampro\VoiceStudio\voices</code>.
                  </li>
                </ol>
              </DocSection>

              {/* 4. Change Voice */}
              <DocSection id="change-voice" title="Change a Clip's Voice (Speech-to-Speech)">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Reshape a spoken performance into a target voice profile while retaining pacing, cadence, and inflection:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Select a target voice from your Voice Library.',
                    'Choose the source performance from a Timeline Clip, Project Bin Asset, File Upload, or live Microphone Take.',
                    'Click Change Voice to synthesize the converted take.',
                    'Preview the result directly in the integrated audio waveform player.',
                    'Use "Import to Bin", "At Playhead", or "Apply to Original" to bring the file into Premiere Pro. When applying to an original timeline clip, Premiere undo history is preserved.',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-slate-300 text-sm">
                      <AudioLines size={14} className="text-emerald-400 flex-shrink-0 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </DocSection>

              {/* 5. Create Speech */}
              <DocSection id="create-speech" title="Create Speech & Takes">
                <DocH3>Text to Speech</DocH3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Select <em>Text</em>, pick a voice profile, type or paste up to 5,000 characters of English script, and click <em>Generate</em>. Takes are rendered in mono 24 kHz broadcast-ready PCM WAV format.
                </p>
                <DocH3>Take Management</DocH3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Generated files appear in the <em>Preview</em> player, job queue, and <em>Takes</em> catalog with duration, timestamp, and model metadata. Completed takes can be queued or deleted at any time.
                </p>
              </DocSection>

              {/* 6. Repair Audio & Stems */}
              <DocSection id="repair-audio" title="Audio Repair & Stem Separation">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Access production cleanup tools from the <em>Repair</em> tab:
                </p>
                <div className="space-y-4 mb-6">
                  <div className="glass-card rounded-xl p-4 border-emerald-900/30">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                      <SlidersHorizontal size={15} className="text-emerald-400" /> Spectral Noise Reduction
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Removes stationary noise profiles, HVAC rumble, and ambient hum from recordings using local spectral gating algorithms.
                    </p>
                  </div>
                  <div className="glass-card rounded-xl p-4 border-emerald-900/30">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                      <Mic size={15} className="text-emerald-400" /> Speaker Diarization
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Estimates speech turns and segments audio into likely speakers (Speaker A, Speaker B) for multi-mic or interview editing. Any speaker segment can be extracted into a Voice Library reference.
                    </p>
                  </div>
                  <div className="glass-card rounded-xl p-4 border-emerald-900/30">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                      <Music size={15} className="text-emerald-400" /> Two-Stem Vocal & Accompaniment Separation
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Powered by the Sherpa-ONNX runner and Spleeter two-stem model. Isolate vocals and background instrumentation into discrete WAV files for rebalancing in your timeline.
                    </p>
                  </div>
                </div>
              </DocSection>

              {/* 7. Feedback & Tuning */}
              <DocSection id="feedback" title="Feedback & Tuning">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Rate completed takes with the positive/negative feedback control. Feedback is stored strictly in your local database (<code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">studio.db</code>). For offline voice conversion, positive ratings subtly tune the voice-strength parameter for subsequent jobs on that reference. No media or training telemetry is ever transmitted to Vampro servers.
                </p>
              </DocSection>

              {/* 8. Storage & Privacy */}
              <DocSection id="storage" title="Files, Privacy & Local Storage">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Voice Studio stores all operational assets on your local Windows storage under:
                </p>
                <pre className="bg-black/50 border border-emerald-900/40 text-emerald-300 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-4">
%LOCALAPPDATA%\Vampro\VoiceStudio
                </pre>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Subdirectories include <code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">audio/</code>, <code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">voices/</code>, <code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">results/</code>, <code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">stems/</code>, and <code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">premiere-media/</code>.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  To remove all local Voice Studio data, terminate the companion application from the taskbar and delete the <code className="text-emerald-300 text-xs bg-black/40 px-1 py-0.5 rounded">%LOCALAPPDATA%\Vampro\VoiceStudio</code> directory.
                </p>
              </DocSection>

              {/* 9. System Limits & Specs */}
              <DocSection id="specs" title="System Limits & Technical Specifications">
                <div className="overflow-x-auto mt-4 mb-6">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-emerald-900/50 text-slate-300">
                        <th className="py-2.5 px-3">Parameter</th>
                        <th className="py-2.5 px-3">Specification</th>
                        <th className="py-2.5 px-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-900/20 text-slate-400">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">Supported OS</td>
                        <td className="py-2.5 px-3">Windows 10 / 11 64-bit</td>
                        <td className="py-2.5 px-3">macOS support in development</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">Host Application</td>
                        <td className="py-2.5 px-3">Adobe Premiere Pro 24.0, 25.0, 26.0+</td>
                        <td className="py-2.5 px-3">Requires UXP plugin architecture</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">Supported Languages</td>
                        <td className="py-2.5 px-3">English (Local Model)</td>
                        <td className="py-2.5 px-3">Multilingual supported via ElevenLabs API</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">Voice Reference Length</td>
                        <td className="py-2.5 px-3">1 to 60 seconds</td>
                        <td className="py-2.5 px-3">First 9 seconds utilized by local acoustic encoder</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">Max Job Duration</td>
                        <td className="py-2.5 px-3">Up to 10 minutes per clip</td>
                        <td className="py-2.5 px-3">Single continuous audio source per job</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">Hardware Acceleration</td>
                        <td className="py-2.5 px-3">NVIDIA / AMD / Intel (Vulkan)</td>
                        <td className="py-2.5 px-3">Multi-threaded CPU fallback enabled</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">Output Audio Format</td>
                        <td className="py-2.5 px-3">24 kHz 16-bit Mono PCM WAV</td>
                        <td className="py-2.5 px-3">Broadcast compliant</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DocSection>

            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <HomeFooter />
      </div>
    </div>
  );
};

export default DocsVoiceStudio;
