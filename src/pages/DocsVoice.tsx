import { type MouseEvent as RMouseEvent } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { DocSection, DocH3, DocList } from '../components/DocHelpers';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { docsVoiceMetadata } from '../seo/metadata';

const DocsVoice = () => {
  const scrollToDocSection = (e: RMouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 120; window.scrollTo({ top: y, behavior: 'smooth' }); }
  };

  const navItems = [
    { id: 'intro', label: 'Introduction' }, { id: 'features', label: 'Key Features' },
    { id: 'requirements', label: 'System Requirements' }, { id: 'installation', label: 'Installation Guide' },
    { id: 'quick-start', label: 'Quick Start' }, { id: 'elevenlabs', label: 'ElevenLabs Integration' },
    { id: 'controls', label: 'Voice Controls' }, { id: 'audio-management', label: 'Audio Management' },
    { id: 'troubleshooting', label: 'Troubleshooting' }, { id: 'faq', label: 'FAQ' },
    { id: 'releases', label: 'Release Notes' },
  ];

  return (
    <div className="dark-grid-bg min-h-screen flex flex-col pt-28">
      <SEO {...docsVoiceMetadata} />
      <div className="flex-grow w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-10 py-8 items-start">
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
                <p className="text-slate-400 mt-5 leading-relaxed">
                  Generate natural-sounding AI voiceovers directly inside Adobe Premiere Pro. The extension features a dual-engine architecture: a 100% offline local AI engine running on your machine powered by Kokoro-82M, and a native ElevenLabs API integration that lets you access your custom voice clones, library voices, and multilingual models directly from your Premiere Pro sequence.
                </p>
              </div>

              <DocSection id="features" title="Key Features">
                <ul className="space-y-2">
                  {[
                    'AI voiceovers directly inside Adobe Premiere Pro',
                    'Dual engine architecture: 100% offline Local TTS & ElevenLabs Cloud TTS',
                    'Direct ElevenLabs API key integration with local secure credential storage',
                    'Access your custom ElevenLabs voice clones & full community voice library',
                    'Support for Eleven Multilingual v2, Eleven Turbo, and Eleven Flash models',
                    'Fine-tuned voice shaping: Stability, Similarity, Style Exaggeration, and Speaker Boost',
                    'Local Kokoro engine with 27+ offline voices and tone presets',
                    'Adjustable speech speed and pitch controls',
                    'Interactive audio waveform preview prior to timeline placement',
                    'One-click "Add to timeline" at current playhead and "Import to Bin"',
                    '1-click clip modification — select any timeline voice clip to reload text and regenerate',
                    'Automatic companion service startup on Windows login',
                  ].map(f => (
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
                {[['Step 1: Install Extension', 'Install plugin from Adobe Marketplace and restart Premiere Pro.'], ['Step 2: Install Voice Service', 'Install and Run Vampro Voice Service Companion app from the Microsoft Store. It sets up the service, configures auto-startup, installs AI components.'], ['Step 3: Open Extension', 'Go to Window → UXP Plugins → Vampro Voice Generator Text-to-Speech.']].map(([t, b]) => (
                  <div key={t} className="mb-8">
                    <DocH3 blue>{t}</DocH3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{b}</p>
                    {/* <div className="w-full h-48 md:h-64 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold">
                      [Image Placeholder {i + 1}]
                    </div> */}
                  </div>
                ))}
              </DocSection>

              <DocSection id="quick-start" title="Quick Start">
                {/* <div className="w-full h-64 md:h-80 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold mb-8 mt-2">
                  [GIF Placeholder 1]
                </div> */}
                <ol className="space-y-6">
                  {[
                    ['Enter Text', 'Type or paste your script.'],
                    ['Select Voice', 'Choose from available voices.'],
                    ['Choose Tone', 'Optional presets: Professional, Voiceover, Documentary, etc.'],
                    ['Generate', 'Click Generate Voice. Audio appears in Premiere Pro.'],
                    /* ['Placeholder Point 1', 'Description for placeholder point 1.'],
                     ['Placeholder Point 2', 'Description for placeholder point 2.'],
                     ['Placeholder Point 3', 'Description for placeholder point 3.'],
                     ['Placeholder Point 4', 'Description for placeholder point 4.']*/
                  ].map(([t, b], i) => (
                    <li key={i} className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <div className="w-7 h-7 bg-[#3B3BFF] rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</div>
                        <div className="text-sm"><strong className="text-white">{t}:</strong> <span className="text-slate-400">{b}</span></div>
                      </div>
                      {/* {i < 6 && (
                        <div className="ml-10 w-full max-w-2xl h-40 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500/50 text-sm font-semibold">
                          [Image Placeholder {i + 1}]
                        </div>
                      )} */}
                    </li>
                  ))}
                </ol>
              </DocSection>

              <DocSection id="elevenlabs" title="ElevenLabs Integration">
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Vampro Voice Generator now includes native integration with <span className="text-cyan-300 font-semibold">ElevenLabs</span>. In addition to the built-in 100% offline Kokoro engine, you can toggle to the ElevenLabs workflow to access your custom voice clones, the full ElevenLabs voice library, cutting-edge multilingual models, and fine-grained voice settings — rendering voiceovers directly into your Adobe Premiere Pro sequence or project bins.
                </p>

                <DocH3 blue>1. Connecting Your API Key</DocH3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  Click the <strong>ElevenLabs</strong> tab at the top of the plugin panel. Paste your ElevenLabs API Key into the field.
                </p>
                <div className="glass-card rounded-xl p-4 border-cyan-500/20 mb-6 bg-cyan-950/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white">Local Credential Security:</strong> Your API key is stored strictly on your local machine within the Adobe UXP panel storage. It is never transmitted to Vampro servers. Whenever you want to remove it, simply click the <strong>Clear Key</strong> button.
                    </div>
                  </div>
                </div>

                <DocH3 blue>2. Loading Voices & Models</DocH3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  Click <strong>Load Voices & Models</strong>. The plugin connects directly to ElevenLabs' API (<code className="text-cyan-300 text-xs bg-black/40 px-1 py-0.5 rounded">api.elevenlabs.io</code>) and populates your dropdown menus with:
                </p>
                <DocList items={[
                  'Your personalized, custom cloned voices created in ElevenLabs',
                  'Community & default library voices across diverse accents and tones',
                  'Supported synthesis models: Eleven Multilingual v2, Eleven Turbo v2.5, and Eleven Flash v2.5',
                ]} />

                <DocH3 blue>3. Fine-Tuning Voice Parameters</DocH3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  Dial in exact performance nuances using the panel controls:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="glass-card p-3.5 rounded-xl border-white/5">
                    <h5 className="font-bold text-white text-xs mb-1">Stability (0.00 to 1.00)</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Determines voice consistency. Lower values yield more expressive, dynamic delivery; higher values ensure steady, uniform pronunciation. Default: 0.50.</p>
                  </div>
                  <div className="glass-card p-3.5 rounded-xl border-white/5">
                    <h5 className="font-bold text-white text-xs mb-1">Similarity / Clarity (0.00 to 1.00)</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Controls how closely the output adheres to the original voice profile. Enhances clarity while preventing artifacts. Default: 0.75.</p>
                  </div>
                  <div className="glass-card p-3.5 rounded-xl border-white/5">
                    <h5 className="font-bold text-white text-xs mb-1">Style Exaggeration (0.00 to 1.00)</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Amplifies stylistic emotion, dramatic inflection, and theatrical flair. Default: 0.00.</p>
                  </div>
                  <div className="glass-card p-3.5 rounded-xl border-white/5">
                    <h5 className="font-bold text-white text-xs mb-1">Speaker Boost (On / Off)</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Boosts similarity and presence to make the speaker sound closer to the microphone. Default: On.</p>
                  </div>
                  <div className="glass-card p-3.5 rounded-xl border-white/5 sm:col-span-2">
                    <h5 className="font-bold text-white text-xs mb-1">Speed & Pitch</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Fine-tune speaking cadence (e.g. 1.00x) and pitch offset directly without re-rendering in external audio editors.</p>
                  </div>
                </div>

                <DocH3 blue>4. Direct Timeline Ingestion & Clip Modification</DocH3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  Once your script is ready, click <strong>Generate Voice</strong>. An interactive audio waveform will render instantly in the preview box. From there:
                </p>
                <DocList items={[
                  'Click "Add to timeline" or "Import to Timeline" to place the audio clip right at your current playhead on the active sequence audio track.',
                  'Click "Import to Bin" to store the audio asset cleanly in your Premiere Pro Project Bin for later use.',
                  'To revise a clip, select it on the Premiere Pro timeline and click "Modify Selected Clip" in the panel — the original text and settings will reload automatically so you can tweak and update in seconds.',
                ]} />
              </DocSection>

              <DocSection id="controls" title="Voice Controls">
                <DocH3>Local Kokoro Controls</DocH3>
                <DocList items={['Speed: 0.8x (Slow), 1.0x (Normal), 1.2x (Fast)', 'Pitch: Negative (deeper), Positive (higher)']} />
                <DocH3>Tone Presets (Local)</DocH3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 mb-6">
                  {['Professional', 'Documentary', 'Voiceover', 'Dynamic', 'Casual', 'Serious', 'Comedic'].map(t => (
                    <div key={t} className="glass-card p-3 rounded-xl text-xs text-indigo-200 font-medium">{t}</div>
                  ))}
                </div>

                <DocH3>ElevenLabs Cloud Controls</DocH3>
                <DocList items={[
                  'Stability: 0.00 to 1.00 (expression vs consistency)',
                  'Similarity: 0.00 to 1.00 (voice fidelity and clarity)',
                  'Style: 0.00 to 1.00 (stylistic exaggeration and emotion)',
                  'Boost: On/Off (speaker presence and volume enhancement)',
                  'Speed (0.50x to 2.00x) and Pitch offset (-5.0 to +5.0)',
                ]} />
              </DocSection>

              <DocSection id="audio-management" title="Audio Management">
                <p className="text-slate-400 text-sm mb-6">Generated audio files are stored locally in the app\'s <code className="text-indigo-300 text-xs bg-black/40 px-1.5 py-0.5 rounded">generated_audio</code> folder with rich metadata (script text, engine, voice, tone, speed, pitch, creation time). You can modify settings and regenerate anytime by selecting the clip in Premiere Pro and clicking "Modify Selected Clip".</p>
              </DocSection>

              <DocSection id="troubleshooting" title="Troubleshooting" accent="text-red-400">
                {[['Voice Generation Fails', 'Check http://127.0.0.1:8000/health — should return {"status": "ok"}. For ElevenLabs, ensure your API key is valid and has sufficient character quota.'], ['Service Not Running', 'Restart Windows. The companion service auto-starts after login.'], ['ElevenLabs Key Error', 'Check your API key in the ElevenLabs dashboard, or click "Clear Key" in the panel and re-enter.'], ['Antivirus Warning', 'Use the official release from Vampro distribution channels.'], ['Can\'t Connect', 'Check firewall isn\'t blocking localhost. Verify Premiere Pro version.'], ['Extension Missing', 'Restart Premiere Pro → Window → UXP Plugins.']].map(([t, b]) => (
                  <div key={t}><DocH3>{t}</DocH3><p className="text-slate-400 text-sm leading-relaxed">{b}</p></div>
                ))}
              </DocSection>

              <DocSection id="faq" title="FAQ">
                <div className="space-y-3">
                  {[
                    ['Can I use my ElevenLabs voice clones?', 'Yes. When you provide your ElevenLabs API key and click "Load Voices & Models", all custom voice clones and generated voices in your ElevenLabs account appear automatically in the voice dropdown.'],
                    ['Where is my ElevenLabs API key stored?', 'Your API key is saved strictly on your local machine in Adobe extension local storage. It is never transmitted to Vampro servers. You can click "Clear Key" at any time to delete it immediately.'],
                    ['Does ElevenLabs require an internet connection?', 'Yes. While Vampro\'s Local voice generation is 100% offline, the ElevenLabs workflow communicates directly with api.elevenlabs.io using your API key.'],
                    ['What ElevenLabs account plans are supported?', 'Any ElevenLabs account that provides an API key (Free, Starter, Creator, Pro, Scale) is supported. Generation usage is deducted directly from your ElevenLabs character quota.'],
                    ['Internet required for Local mode?', 'Internet is required only during initial download and updates. Local voice synthesis is 100% offline and on-device.'],
                    ['macOS support?', 'Windows 10/11 (64-bit) currently. macOS version is in active development.'],
                    ['Runs in background?', 'Yes, the companion service auto-starts and runs silently on localhost.'],
                    ['Commercial use permitted?', 'Yes. Local Kokoro-82M voices are Apache-2.0 licensed for commercial use. ElevenLabs commercial usage is governed by your ElevenLabs subscription tier.'],
                  ].map(([q, a]) => (
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
                <div className="glass-card rounded-xl p-5 mb-4 border-cyan-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white">Version 1.2.0</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Latest</span>
                  </div>
                  <p className="text-slate-400 text-sm"><strong className="text-cyan-300">New:</strong> Added native ElevenLabs integration! Editors can now enter their ElevenLabs API key to access custom voice clones, the complete ElevenLabs voice library, and advanced models including Eleven Multilingual v2, Eleven Turbo, and Eleven Flash directly inside Adobe Premiere Pro. Added full parameter shaping controls (Stability, Similarity, Style Exaggeration, Speaker Boost, Speed, and Pitch). Added real-time waveform visualization, one-click playhead insertion onto active timeline tracks, Project Bin ingestion, and timeline clip modification.</p>
                  <p className="text-slate-400 text-sm mt-2"><strong className="text-cyan-300">Improvements:</strong> Enhanced local key management with instant "Clear Key" option, streamlined service response times, and improved UI styling with responsive tab toggling between Local and ElevenLabs modes.</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="text-base font-bold text-white mb-2">Version 1.1.0</h3>
                  <p className="text-slate-400 text-sm"><strong className="text-indigo-300">New:</strong> Introduced AI-powered voice generation directly within Adobe Premiere Pro, allowing creators to generate narration, voiceovers, tutorials, explainer audio, and spoken content without leaving their editing workflow. Added support for multiple voice options, voice customization through speed and pitch controls, and built-in tone presets including Professional, Documentary, Voiceover, Dynamic, Casual, Serious, and Comedic. This release also includes audio preview capabilities, metadata support for generated voice clips, seamless integration with the Vampro Voice Service companion application, automatic service startup after Windows login, and an improved installation and onboarding experience for first-time users.</p>
                  <p className="text-slate-400 text-sm mt-2"><strong className="text-indigo-300">Fixes:</strong> Improved communication between the Premiere Pro extension and the Vampro Voice Service companion application to provide a more reliable voice generation workflow. Enhanced error handling and validation to deliver clearer user feedback when the companion service is unavailable or encounters an issue, improved startup reliability and service initialization, refined installation behavior and startup configuration, resolved inconsistencies in product branding and naming across the plugin and companion application, and implemented overall stability and usability improvements to ensure a smoother experience across supported Windows environments.</p>
                </div>
                <div className="glass-card rounded-xl p-5 mt-4 border-[#3B3BFF]/20">
                  <h3 className="text-base font-bold text-white mb-1">Support</h3>
                  <p className="text-slate-400 text-sm">Contact <a href="mailto:support@vampro.in" className="gradient-blue-text font-bold">support@vampro.in</a></p>
                </div>
              </DocSection>

              <DocSection id="disclosure" title="Important Disclosure">
                <p className="text-slate-400 text-sm mb-6">Vampro Voice Generator Text-to-Speech requires installation and use of the Vampro Voice Service companion application, which enables AI-powered voice generation within Adobe Premiere Pro and must be installed for the plugin to function. This plugin requires installation and use of a companion application. Companion applications may include generative AI capabilities and be able to perform actions on your behalf, including accessing your files, exporting data, and generating content in your Adobe application. You are responsible for determining whether the use of this plugin and its companion application is appropriate for your project. Vampro Voice Service runs locally on your computer and is designed for use with Adobe Premiere Pro on Windows 10 (64-bit) and Windows 11 (64-bit). To get started, install the Vampro Voice Service companion application, install the Vampro Voice Generator Text-to-Speech plugin, restart Adobe Premiere Pro, and open the plugin from Window → Extensions → Vampro Voice Generator Text-to-Speech.</p>

                <div className="glass-card rounded-xl p-5 border-indigo-500/20 mt-6">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Open-Source Attribution & Third-Party Services
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-2">
                    Local voices powered by <span className="text-indigo-300 font-medium">Kokoro</span>, <span className="text-indigo-300 font-medium">DeepPhonemizer</span>, <span className="text-indigo-300 font-medium">OpenPhonemizer</span>, and <span className="text-indigo-300 font-medium">inflect</span> — open-source models licensed under <span className="text-white font-medium">Apache 2.0</span>, <span className="text-white font-medium">MIT</span>, and <span className="text-white font-medium">BSD-3-Clause-Clear</span> permissive licenses.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Cloud voice generation powered by <span className="text-cyan-300 font-medium">ElevenLabs</span> via official API endpoints using the user's API key.
                  </p>
                </div>
              </DocSection>

            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default DocsVoice;