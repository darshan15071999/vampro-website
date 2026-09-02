import { Scale, Package, Shield, ExternalLink, ShieldCheck } from 'lucide-react';
import SEO from '../../components/SEO';
import { universalPasteLicensesMetadata } from '../../seo/metadata';

const SectionBlock = ({ icon: Icon, number, title, children }: { icon: React.ComponentType<{ size?: number; className?: string }>; number: string; title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-indigo-400" />
      </div>
      <h3 className="text-sm font-bold text-white">{number}. {title}</h3>
    </div>
    <div className="ml-10 text-slate-400 text-sm leading-relaxed">{children}</div>
  </div>
);

const UniversalPasteLicenses = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SEO {...universalPasteLicensesMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="licenses" className="scroll-mt-40 mb-10 border-b border-indigo-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Licenses</h1>
                <p className="gradient-blue-text font-semibold text-sm">Vampro Universal Paste</p>
                <p className="text-slate-500 text-sm mt-3">Effective August 19, 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  Vampro Universal Paste is intended to be built from permissively licensed components.
                </p>
              </div>

              {/* Sections */}
              <SectionBlock icon={Package} number="1" title="Application Components">
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Vampro Universal Paste Premiere plugin: MIT, Vampro.</li>
                  <li>Vampro Universal Paste companion app: MIT, Vampro.</li>
                  <li>Shared protocol/types package: MIT, Vampro.</li>
                </ul>
              </SectionBlock>

              <SectionBlock icon={Scale} number="2" title="Direct Third-Party Runtime Dependencies">
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-indigo-900/50">
                        <th className="py-3 px-4 text-white font-semibold">Package</th>
                        <th className="py-3 px-4 text-white font-semibold">Purpose</th>
                        <th className="py-3 px-4 text-white font-semibold text-right">License</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-900/20">
                      {[
                        ['React', 'Plugin UI rendering', 'MIT'],
                        ['React DOM', 'Plugin UI rendering', 'MIT'],
                        ['Electron', 'Local companion shell and desktop APIs', 'MIT'],
                        ['electron-store', 'Companion settings persistence', 'MIT'],
                        ['crypto-js', 'Hashing and utility cryptography', 'MIT'],
                        ['gif-encoder-2', 'GIF generation', 'MIT'],
                        ['got', 'HTTP requests for URL and media workflows', 'MIT'],
                        ['mediainfo.js', 'Media metadata inspection', 'BSD-2-Clause'],
                        ['mp4-muxer', 'MP4 muxing for recordings', 'MIT'],
                        ['omggif', 'GIF parsing and encoding utilities', 'MIT'],
                        ['png-js', 'PNG parsing utilities', 'MIT'],
                        ['uuid', 'Unique identifiers', 'MIT'],
                        ['ws', 'WebSocket communication', 'MIT'],
                        ['youtube-dl-exec', 'Video download command wrapper', 'MIT'],
                        ['yt-dlp-exec', 'Video download command wrapper', 'MIT'],
                      ].map(([pkg, purpose, license]) => (
                        <tr key={pkg} className="hover:bg-indigo-900/10 transition-colors">
                          <td className="py-3 px-4 font-mono text-indigo-300 text-xs">{pkg}</td>
                          <td className="py-3 px-4 text-slate-400">{purpose}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-300">
                              {license}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionBlock>
              
              <SectionBlock icon={ShieldCheck} number="3" title="Build and Development Dependencies">
                Build tooling includes TypeScript, Vite, React plugin tooling, Electron Builder, Adobe Premiere Pro typings, and related TypeScript type packages. These packages are permissively licensed, primarily MIT, Apache-2.0, BSD, or ISC.
              </SectionBlock>

              <SectionBlock icon={Shield} number="4" title="Transitive Dependencies">
                Transitive dependencies are inherited from the direct dependencies above. The repository includes a license audit script that blocks GPL, LGPL, AGPL, and other copyleft licenses from the production dependency tree.
              </SectionBlock>

              <SectionBlock icon={ExternalLink} number="5" title="Binary and Platform Components">
                The companion app is built with Electron, which includes Chromium and Node.js components under permissive open-source licenses. Operating system APIs, Adobe Premiere Pro, and Adobe UXP are external platform components and are not redistributed as part of this app's source license.
              </SectionBlock>

              <SectionBlock icon={Package} number="6" title="Assets">
                The Vampro Universal Paste logo files included with this site and application are Vampro-owned application assets and are not third-party dependencies.
              </SectionBlock>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalPasteLicenses;
