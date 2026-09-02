import { FileText, Scale, ShieldCheck, Download, AlertTriangle, Bookmark, Mail, Server } from 'lucide-react';
import SEO from '../../components/SEO';
import { universalPasteTermsMetadata } from '../../seo/metadata';

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

const UniversalPasteTerms = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SEO {...universalPasteTermsMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="terms" className="scroll-mt-40 mb-10 border-b border-indigo-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Use</h1>
                <p className="gradient-blue-text font-semibold text-sm">Vampro Universal Paste</p>
                <p className="text-slate-500 text-sm mt-3">Effective August 19, 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  These terms govern use of Vampro Universal Paste, including the Adobe Premiere Pro plugin and local companion app.
                </p>
              </div>

              {/* Terms Sections */}
              <SectionBlock icon={FileText} number="1" title="Use of the App">
                Vampro Universal Paste helps users paste clipboard content, capture screenshots and screen recordings, import supported URLs, and organize media for use in Premiere Pro. You may use the app only in compliance with applicable laws, platform rules, Adobe terms, website terms, and content licenses.
              </SectionBlock>

              <SectionBlock icon={ShieldCheck} number="2" title="Content Rights">
                <p className="mb-2">You are responsible for the content you capture, download, import, paste, edit, or place into a Premiere Pro project.</p>
                <div className="glass-card rounded-lg p-4 border-red-500/15 mt-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300/80 text-xs">
                      Do not use Vampro Universal Paste to copy, download, record, or distribute content unless you have the right to do so.
                    </p>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock icon={Server} number="3" title="Local Companion App">
                Some workflows require the local companion app. The companion app may access clipboard data, screen capture sources, local files, project folders, URLs you provide, and generated media files so requested workflows can run.
              </SectionBlock>
              
              <SectionBlock icon={Download} number="4" title="Third-Party Services">
                URL import and video download features may depend on third-party websites, browsers, media services, operating system APIs, and network availability. Vampro does not control those services and cannot guarantee that any specific website, browser tab, window, media source, or download will remain available or compatible.
              </SectionBlock>

              <SectionBlock icon={AlertTriangle} number="5" title="No Warranty">
                <p className="uppercase text-xs tracking-wide text-slate-500 leading-relaxed">
                  Vampro Universal Paste is provided as-is, without warranties of any kind. The app may fail, produce unexpected output, or be affected by Adobe, operating system, browser, website, or media-service changes. Review generated files and timeline inserts before relying on them.
                </p>
              </SectionBlock>

              <SectionBlock icon={Scale} number="6" title="Limitation of Liability">
                <p className="uppercase text-xs tracking-wide text-slate-500 leading-relaxed">
                  To the maximum extent permitted by law, Vampro is not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, projects, profits, or business opportunities arising from use of the app.
                </p>
              </SectionBlock>

              <SectionBlock icon={Bookmark} number="7" title="Updates">
                The app may be updated to improve workflows, compatibility, performance, security, or licensing posture. Continued use after an update means you accept the updated terms shipped with that version.
              </SectionBlock>

              {/* Contact */}
              <div className="border-t border-indigo-900/30 pt-8 mt-4">
                <a href="mailto:support@vampro.in" className="inline-flex items-center gap-3 glass-card rounded-xl px-5 py-3 hover:bg-indigo-900/20 transition-colors">
                  <Mail size={16} className="text-indigo-400" />
                  <div>
                    <p className="text-xs text-slate-500">Questions about these terms?</p>
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

export default UniversalPasteTerms;
