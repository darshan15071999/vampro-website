import { CheckCircle, Shield, Eye, Lock, Server, Mail, Globe, Fingerprint } from 'lucide-react';
import SEO from '../../components/SEO';
import { privacyMetadata } from '../../seo/metadata';

const SectionTitle = ({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) => (
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
      <SEO {...privacyMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="privacy" className="scroll-mt-40 mb-10 border-b border-indigo-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
                <p className="gradient-blue-text font-semibold text-sm">Vampro Voice Generator Text-to-Speech</p>
                <p className="text-slate-500 text-sm mt-3">Last Updated: September 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  Vampro Voice Generator is a text-to-speech tool for Adobe Premiere Pro offering both a 100% offline Local workflow and an optional ElevenLabs cloud workflow. The Local workflow keeps your content strictly on your own machine. The ElevenLabs workflow uses the API key you provide to generate speech through ElevenLabs. This policy explains what data stays local, what uses the network, and the controls available to you.
                </p>
              </div>

              {/* ── WORKFLOWS & DATA PROCESSING ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Shield}>Workflows & Data Processing</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">Vampro Voice Generator provides two distinct generation modes with transparent data boundaries.</p>
                
                <div className="space-y-4 mb-6">
                  <div className="glass-card rounded-2xl p-5 border-indigo-500/20">
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      1. Local Workflow (100% Offline & Private)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-1" />
                        <span><strong>Processed entirely on your device:</strong> Text-to-speech synthesis is handled locally by the companion service on <code className="text-indigo-300 text-xs bg-black/40 px-1 py-0.5 rounded">127.0.0.1</code> (localhost).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-1" />
                        <span><strong>Zero transmission:</strong> Local script text and audio are never transmitted to Vampro or any third party.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-1" />
                        <span><strong>Local storage:</strong> Generated audio files are saved in your app's local <code className="text-indigo-300 text-xs bg-black/40 px-1 py-0.5 rounded">generated_audio</code> folder and are never uploaded.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-card rounded-2xl p-5 border-cyan-500/20">
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      2. ElevenLabs Workflow (Cloud Speech via Your API Key)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-1" />
                        <span><strong>Direct API communication:</strong> When you select the ElevenLabs tab, the text you enter, selected voice, selected model, and voice settings are sent directly to ElevenLabs (<code className="text-cyan-300 text-xs bg-black/40 px-1 py-0.5 rounded">api.elevenlabs.io</code>) using your provided API key.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-1" />
                        <span><strong>Local API key storage:</strong> Your ElevenLabs API key is stored strictly on your local machine by the Adobe UXP panel so it can reload your voices and models. It is never transmitted to or stored on Vampro servers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-1" />
                        <span><strong>Local audio download:</strong> Generated ElevenLabs audio is retrieved by the local companion service and saved directly into the same local <code className="text-indigo-300 text-xs bg-black/40 px-1 py-0.5 rounded">generated_audio</code> directory.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── NETWORK USAGE ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Globe}>What Uses the Network (And Only This)</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">The app makes limited, clearly defined network requests:</p>
                <div className="space-y-3">
                  <InfoCard title="1. ElevenLabs API Requests (Optional)">
                    When you choose to use the ElevenLabs tab, the local companion service contacts <code className="text-cyan-300 text-xs bg-black/40 px-1 py-0.5 rounded">api.elevenlabs.io</code> to load available voices, load models, and generate speech using your API key. If you remain on the Local tab, zero ElevenLabs calls are made.
                  </InfoCard>
                  <InfoCard title="2. Update Checks">
                    The app periodically contacts <span className="text-indigo-300 font-medium">vampro.in</span> to check whether a newer version or new voice models are available. These requests reveal your IP address, approximate time, and app version — like any web request. No content from your projects is sent.
                  </InfoCard>
                  <InfoCard title="3. Model Downloads">
                    If you accept (or have auto-update enabled), the service may download new voice models from <span className="text-indigo-300 font-medium">vampro.in</span> and/or <span className="text-indigo-300 font-medium">Hugging Face</span>. Only model files are downloaded; nothing is uploaded.
                  </InfoCard>
                  <InfoCard title="4. First-Run Fallback (Local Engine Only)">
                    If the offline model bundle is not present, the service downloads the default Kokoro voice model once from Hugging Face. Standard installations ship the model offline and skip this step entirely.
                  </InfoCard>
                </div>
              </div>

              {/* ── WHAT WE DON'T COLLECT ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Eye}>What We Do Not Collect</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'No Vampro accounts or mandatory sign-ups',
                    'No telemetry or analytics tracking',
                    'No advertising identifiers or tracking cookies',
                    'No recording or logging of your text or audio on Vampro servers',
                    'No storage of your ElevenLabs API keys on our infrastructure',
                    'No access to or collection of your Premiere Pro project files',
                  ].map(item => (
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
                    ['Clear ElevenLabs Credentials', 'Use the "Clear Key" button in the ElevenLabs tab at any time to immediately purge your API key from local storage.'],
                    ['Disable Network Access (Force Offline)', 'Set the environment variable VAMPRO_FORCE_OFFLINE=1 — the service then skips all Vampro and Hugging Face update/model-download calls. (Do not use the ElevenLabs tab if you want zero network requests).'],
                    ['Delete Generated Audio', 'Remove files from the generated_audio folder on your device at any time. The app never auto-deletes your files.'],
                    ['Local Diagnostic Logs', 'The service writes logs to its logs folder with automatic rotation and 14-day retention. Logs stay on your device and are never uploaded.'],
                  ].map(([t, b]) => (
                    <InfoCard key={t} title={t}>{b}</InfoCard>
                  ))}
                </div>
              </div>

              {/* ── DATA STORAGE & THIRD PARTIES ── */}
              <div className="mb-10 border-b border-indigo-900/30 pb-10">
                <SectionTitle icon={Lock}>Data Storage & Third-Party Services</SectionTitle>
                {[
                  ['Data Storage', 'Generated audio, voice settings, and metadata are stored locally on your device in the app\'s generated_audio directory. We have no access to this data.'],
                  ['ElevenLabs Requests', 'When using the ElevenLabs workflow, your requests are processed by ElevenLabs under their own terms and privacy practices. See https://elevenlabs.io/privacy.'],
                  ['Hugging Face Downloads', 'Model downloads are served by Hugging Face; their privacy practices apply to those requests. See https://huggingface.co/privacy.'],
                  ['Data Sharing', 'We do not sell, rent, or monetize your personal information or content. Disclosure occurs only if required by law.'],
                  ['Children\'s Privacy', 'This software is not intended for children under 13.'],
                  ['Policy Changes', 'This policy may be updated as new features are added. New versions will be published on the official website.'],
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
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Vampro Voice Generator's Local workflow runs on your computer and processes text locally. The optional ElevenLabs workflow sends text and selected voice parameters to ElevenLabs using the API key you provide.
                </p>

                <InfoCard title="What the App Does on Your Machine">
                  <ul className="space-y-1.5">
                    {[
                      'Runs a local service on 127.0.0.1:8000 — accessible only locally on your machine',
                      'Processes Local workflow text into audio locally; your Local text and audio never leave the device',
                      'Sends text and selected voice settings to ElevenLabs only when you use the ElevenLabs workflow',
                      'Stores your ElevenLabs API key strictly in Adobe UXP local storage, purgeable anytime via Clear Key',
                      'Network is used only for update checks, model downloads, and user-initiated ElevenLabs API generation',
                      'Diagnostic logs are stored locally in the logs directory with 14-day auto-rotation and never uploaded',
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