import { Package, Shield, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import SEO from '../../components/SEO';
import { voiceStudioLicensesMetadata } from '../../seo/metadata';

const SectionBlock = ({ icon: Icon, number, title, children }: { icon: React.ComponentType<{ size?: number; className?: string }>; number: string; title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-emerald-400" />
      </div>
      <h3 className="text-sm font-bold text-white">{number}. {title}</h3>
    </div>
    <div className="ml-10 text-slate-400 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
);

const VoiceStudioLicenses = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SEO {...voiceStudioLicensesMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-emerald-900/30" style={{ background: 'rgba(10,24,18,0.4)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="licenses" className="scroll-mt-40 mb-10 border-b border-emerald-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Open Source Licenses</h1>
                <p className="text-emerald-400 font-semibold text-sm">Vampro Voice Studio for Adobe Premiere Pro</p>
                <p className="text-slate-500 text-sm mt-3">Effective September 20, 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  Vampro Voice Studio is built from strictly permissive open-source components and models.
                </p>
              </div>

              {/* Sections */}
              <SectionBlock icon={Package} number="1" title="Vampro Application Source">
                <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-400 text-sm">
                  <li>Vampro Voice Studio Premiere Pro panel: MIT, Vampro.</li>
                  <li>Adobe UXP React Starter / Host Controllers: Apache-2.0.</li>
                  <li>Vampro Voice Studio Windows companion daemon: MIT, Vampro.</li>
                  <li>Local DSP speaker grouping & frequency fallbacks: MIT, Vampro.</li>
                </ul>
              </SectionBlock>

              <SectionBlock icon={Cpu} number="2" title="Runtime Models & Engine Components">
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-emerald-900/50">
                        <th className="py-3 px-4 text-white font-semibold">Component</th>
                        <th className="py-3 px-4 text-white font-semibold">Purpose</th>
                        <th className="py-3 px-4 text-white font-semibold text-right">License</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-900/20">
                      {[
                        ['Chatterbox GGUF Pack', 'Offline cloned TTS & voice conversion', 'MIT'],
                        ['audio.cpp Native Worker', 'Local GGUF model runner (CPU & Vulkan)', 'Apache-2.0'],
                        ['Denoiser Profiles', 'Spectral noise profiling WAV assets', 'MIT'],
                        ['Spleeter Two-Stem Model', 'Vocal and accompaniment isolation', 'MIT'],
                        ['sherpa-onnx Separator', 'Native runner for neural separation', 'Apache-2.0'],
                        ['ONNX Runtime', 'Deep learning execution engine DLLs', 'MIT / Notice'],
                        ['React & React DOM', 'UXP panel UI rendering', 'MIT'],
                        ['ElevenLabs API Client', 'Optional cloud speech generation', 'Proprietary / BYOK'],
                      ].map(([pkg, purpose, license]) => (
                        <tr key={pkg} className="hover:bg-emerald-900/10 transition-colors">
                          <td className="py-3 px-4 font-mono text-emerald-300 text-xs">{pkg}</td>
                          <td className="py-3 px-4 text-slate-400">{purpose}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-300">
                              {license}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionBlock>

              <SectionBlock icon={ShieldCheck} number="3" title="Permissive-Only Distribution Policy">
                <p>
                  Vampro maintains a strict permissive-only license policy. All runtime components, models, and dependencies must be governed by permissive open-source licenses such as MIT, Apache-2.0, or BSD. Copyleft licenses (GPL, AGPL, LGPL) and non-commercial model weights are excluded from production builds.
                </p>
              </SectionBlock>

              <SectionBlock icon={Shield} number="4" title="Third-Party Platform Rights">
                <p>
                  Adobe Premiere Pro, Adobe UXP, Windows, and GPU hardware drivers (NVIDIA, AMD, Intel) are separate proprietary platforms. The open-source licenses above do not grant rights to those proprietary products.
                </p>
              </SectionBlock>

              <SectionBlock icon={ExternalLink} number="5" title="Upstream References">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    ['Chatterbox', 'https://github.com/resemble-ai/chatterbox'],
                    ['audio.cpp', 'https://github.com/0xShug0/audio.cpp'],
                    ['ggml', 'https://github.com/ggml-org/ggml'],
                    ['sherpa-onnx', 'https://github.com/k2-fsa/sherpa-onnx'],
                    ['ElevenLabs Terms', 'https://elevenlabs.io/terms-of-use'],
                  ].map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-emerald-900/30 bg-emerald-950/20 hover:bg-emerald-900/30 transition-colors text-xs text-slate-300"
                    >
                      <span className="font-semibold text-emerald-400">{name}</span>
                      <ExternalLink size={12} className="text-slate-500" />
                    </a>
                  ))}
                </div>
              </SectionBlock>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceStudioLicenses;
