import { ShieldCheck, HardDrive, Globe, EyeOff, Bookmark, Mail } from 'lucide-react';
import SEO from '../../components/SEO';
import { universalPastePrivacyMetadata } from '../../seo/metadata';

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

const UniversalPastePrivacy = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SEO {...universalPastePrivacyMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="privacy" className="scroll-mt-40 mb-10 border-b border-indigo-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
                <p className="gradient-blue-text font-semibold text-sm">Vampro Universal Paste</p>
                <p className="text-slate-500 text-sm mt-3">Effective August 19, 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  Vampro Universal Paste is designed around local processing for clipboard, capture, and media import workflows.
                </p>
              </div>

              {/* Sections */}
              <SectionBlock icon={HardDrive} number="1" title="Data Processed Locally">
                Vampro Universal Paste may process clipboard text, images, GIFs, URLs, media references, screenshots, screen recordings, local project paths, generated asset paths, media metadata, and app preferences on your machine.
              </SectionBlock>

              <SectionBlock icon={Globe} number="2" title="Network Use">
                The app may make network requests when you use URL-based import or video download features. These requests are made to the URL or media service you provide so the companion app can fetch metadata, previews, or downloadable media.
              </SectionBlock>
              
              <SectionBlock icon={EyeOff} number="3" title="No Advertising Tracking">
                <p>Vampro Universal Paste does not intentionally sell personal data, run advertising tracking, or send clipboard and capture content to Vampro-operated cloud services as part of the local plugin workflow.</p>
              </SectionBlock>

              <SectionBlock icon={HardDrive} number="4" title="Local Storage">
                The plugin uses Adobe UXP local storage for lightweight preferences. The companion app uses local application storage for settings. Captured or imported media may be saved into local project asset folders.
              </SectionBlock>

              <SectionBlock icon={ShieldCheck} number="5" title="User Responsibility">
                You are responsible for ensuring that content you capture, download, import, paste, or edit is content you are allowed to use. Website, browser, operating system, Adobe, and third-party platform permissions may affect what the app can access.
              </SectionBlock>

              <SectionBlock icon={Bookmark} number="6" title="Changes">
                This policy may be updated as the app changes. Updated versions should be shipped with the application or made available through the app distribution channel.
              </SectionBlock>

              {/* Contact */}
              <div className="border-t border-indigo-900/30 pt-8 mt-4">
                <a href="mailto:support@vampro.in" className="inline-flex items-center gap-3 glass-card rounded-xl px-5 py-3 hover:bg-indigo-900/20 transition-colors">
                  <Mail size={16} className="text-indigo-400" />
                  <div>
                    <p className="text-xs text-slate-500">Questions about this privacy policy?</p>
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

export default UniversalPastePrivacy;
