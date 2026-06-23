import { Shield, Lock, Eye, Server, Globe, Fingerprint, CheckCircle, Mail } from 'lucide-react';

const SectionTitle = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
      <Icon size={16} className="text-indigo-400" />
    </div>
    <h2 className="text-xl font-extrabold text-white">{children}</h2>
  </div>
);

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="glass-card rounded-xl p-5 mb-3">
    <h4 className="text-sm font-bold text-white mb-2">{title}</h4>
    <div className="text-slate-400 text-sm leading-relaxed">{children}</div>
  </div>
);

const Privacy = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="privacy" className="scroll-mt-40 mb-10 border-b border-indigo-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
                <p className="gradient-blue-text font-semibold text-sm">Vampro Voice Generator Text-to-Speech</p>
                <p className="text-slate-500 text-sm mt-3">Last Updated: June 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  Vampro Voice Generator is a local text-to-speech tool for Adobe Premiere Pro. We designed it to keep your content on your own machine. This policy explains what data stays local, what uses the network, and the controls available to you.
                </p>
              </div>

              {/* ── LOCAL PROCESSING ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Shield}>What Stays on Your Device</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">Everything that matters stays local — your text, your audio, and your projects never leave your computer.</p>
                <div className="space-y-3">
                  {[
                    ['All voice synthesis happens locally', 'The text you enter and the audio you generate are processed entirely on your computer by the companion service running on localhost (127.0.0.1). Your text and audio are never transmitted to us or any third party.'],
                    ['Generated audio stored locally', 'Audio files are saved in the app\'s generated_audio folder on your device and are never uploaded anywhere.'],
                    ['Voice settings & project metadata', 'All configuration, voice presets, speed/pitch settings, and project metadata remain on your local machine.'],
                  ].map(([t, b]) => (
                    <div key={t} className="flex gap-3 items-start">
                      <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-1" />
                      <div className="text-sm"><strong className="text-white">{t}.</strong> <span className="text-slate-400">{b}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── NETWORK USAGE ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Globe}>What Uses the Network</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">The app makes limited, transparent network requests — none of which involve your content.</p>
                <div className="space-y-3">
                  <InfoCard title="Update Checks">
                    The app periodically contacts <span className="text-indigo-300 font-medium">vampro.in</span> to check whether a newer version or new voice models are available. These requests reveal your IP address, approximate time, and app version — like any web request. No content from your projects is sent.
                  </InfoCard>
                  <InfoCard title="Model Downloads">
                    If you accept (or have auto-update enabled), the service may download new voice models from <span className="text-indigo-300 font-medium">vampro.in</span> and/or <span className="text-indigo-300 font-medium">Hugging Face</span>. Only model files are downloaded; nothing is uploaded.
                  </InfoCard>
                  <InfoCard title="First-Run Fallback">
                    If the offline model bundle is not present, the service downloads the default voice model once from Hugging Face. Standard installations ship the model offline and skip this step entirely.
                  </InfoCard>
                </div>
              </div>

              {/* ── WHAT WE DON'T COLLECT ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Eye}>What We Do Not Collect</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-3">
                  {['No accounts or sign-ups', 'No telemetry or analytics', 'No advertising identifiers', 'No recording of your text or audio', 'No usage tracking', 'No project data collection'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── YOUR CONTROLS ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Fingerprint}>Your Controls</SectionTitle>
                <div className="space-y-3">
                  {[
                    ['Disable network access', 'Set the environment variable VAMPRO_FORCE_OFFLINE=1 — the service then makes zero network calls, including update checks and model downloads.'],
                    ['Delete generated audio', 'Remove files from the generated_audio folder at any time. The app never auto-deletes your files.'],
                    ['Local diagnostic logs', 'The service writes logs to its logs folder with automatic rotation and 14-day retention. Logs stay on your device and are never uploaded.'],
                  ].map(([t, b]) => (
                    <InfoCard key={t} title={t}>{b}</InfoCard>
                  ))}
                </div>
              </div>

              {/* ── DATA STORAGE & SHARING ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Lock}>Data Storage & Sharing</SectionTitle>
                {[
                  ['Data Storage', 'Generated audio, voice settings, and metadata are stored locally on your device. We have no access to this data.'],
                  ['Data Sharing', 'We do not sell or rent personal information. Disclosure occurs only when required by law.'],
                  ['Third-Party Services', 'Model downloads are served by Hugging Face; their privacy practices apply to those requests.'],
                  ['Children\'s Privacy', 'This software is not intended for children under 13.'],
                  ['International Users', 'Users are responsible for compliance with their local data protection laws.'],
                  ['Policy Changes', 'This policy may be updated. New versions will be published on the official website.'],
                ].map(([t, b]) => (
                  <div key={t} className="mb-5">
                    <h3 className="text-sm font-bold text-white mb-1">{t}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>

              {/* ── SECURITY & VERIFICATION ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Server}>Security & Verification</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">Vampro Voice Generator runs entirely on your computer, processes your text locally, and does not upload your content.</p>



                <InfoCard title="What the App Does on Your Machine">
                  <ul className="space-y-1.5">
                    {[
                      'Runs a local service on 127.0.0.1:8000 — not reachable from the internet',
                      'Processes text → audio locally; your text and audio never leave the device',
                      'Network is used only to check for and download updates and models',
                      'Reasonable security measures are implemented across the service',
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              </div>

              {/* ── THIRD-PARTY COMPONENTS ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Server}>Third-Party Open-Source Components</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Vampro Voice Generator is built on open-source software and open voice models. Below is a summary of the key components and their respective licenses.
                </p>

                <h3 className="text-sm font-bold text-white mb-3 mt-6">Voice Model & Speech Engine</h3>
                <div className="space-y-2 mb-6">
                  {[
                    ['Kokoro-82M', 'Neural text-to-speech model', 'Apache-2.0'],
                    ['kokoro', 'Python TTS pipeline', 'Apache-2.0'],
                    ['misaki', 'Grapheme-to-phoneme front end', 'MIT'],
                  ].map(([name, role, license]) => (
                    <div key={name} className="flex items-center justify-between glass-card rounded-lg px-4 py-2.5">
                      <div className="text-sm"><span className="text-white font-medium">{name}</span> <span className="text-slate-500">— {role}</span></div>
                      <span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full">{license}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-bold text-white mb-3">Text-to-Phoneme (Permissive Replacements)</h3>
                <div className="space-y-2 mb-6">
                  {[
                    ['DeepPhonemizer', 'Neural G2P engine for out-of-dictionary words', 'MIT'],
                    ['OpenPhonemizer checkpoint', 'G2P model weights', 'BSD-3-Clause-Clear'],
                    ['inflect', 'Number/ordinal/year spelling', 'MIT'],
                    ['spaCy + en_core_web_sm', 'NLP processing', 'MIT'],
                  ].map(([name, role, license]) => (
                    <div key={name} className="flex items-center justify-between glass-card rounded-lg px-4 py-2.5">
                      <div className="text-sm"><span className="text-white font-medium">{name}</span> <span className="text-slate-500">— {role}</span></div>
                      <span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full">{license}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-bold text-white mb-3">Runtime & Libraries</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-indigo-900/30">
                        <th className="text-left py-2 text-slate-400 font-medium">Component</th>
                        <th className="text-right py-2 text-slate-400 font-medium">License</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {[
                        ['PyTorch (torch)', 'BSD-3-Clause'],
                        ['NumPy / SciPy', 'BSD-3-Clause'],
                        ['FastAPI', 'MIT'],
                        ['Uvicorn', 'BSD-3-Clause'],
                        ['Pydantic', 'MIT'],
                        ['Loguru', 'MIT'],
                        ['huggingface_hub', 'Apache-2.0'],
                        ['certifi (CA bundle)', 'MPL-2.0'],
                      ].map(([comp, lic]) => (
                        <tr key={comp} className="border-b border-indigo-900/15">
                          <td className="py-2 text-white">{comp}</td>
                          <td className="py-2 text-right"><span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full">{lic}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>



                <p className="text-slate-500 text-xs mt-4">
                  Adobe® and Premiere Pro® are trademarks of Adobe Inc. Vampro Voice Generator is an independent product, not affiliated with or endorsed by Adobe.
                </p>
              </div>

              {/* ── CONTACT ── */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:support@vampro.in" className="flex items-center gap-3 glass-card rounded-xl px-5 py-3 hover:bg-indigo-900/20 transition-colors group">
                  <Mail size={16} className="text-indigo-400" />
                  <div>
                    <p className="text-xs text-slate-500">Contact Us</p>
                    <p className="text-sm font-bold gradient-blue-text">support@vampro.in</p>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;