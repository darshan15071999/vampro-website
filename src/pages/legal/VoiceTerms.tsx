import { FileText, Scale, ShieldCheck, Mic, RefreshCw, AlertTriangle, Bookmark, Mail } from 'lucide-react';
import SEO from '../../components/SEO';
import { termsMetadata } from '../../seo/metadata';

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

const Terms = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SEO {...termsMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="terms" className="scroll-mt-40 mb-10 border-b border-indigo-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Use</h1>
                <p className="gradient-blue-text font-semibold text-sm">Vampro Voice Generator Text-to-Speech</p>
                <p className="text-slate-500 text-sm mt-3">Last Updated: September 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  By installing or using Vampro Voice Generator ("the app"), you agree to these terms. Please read them carefully before use.
                </p>
              </div>

              {/* Terms Sections */}
              <SectionBlock icon={FileText} number="1" title="License Grant">
                You are granted a limited, non-exclusive, non-transferable, revocable license to install and use the Software for creating audio within Adobe Premiere Pro. The app includes open-source components licensed under their own terms (see Third-Party Notices and Licenses), which continue to govern those components.
              </SectionBlock>

              <SectionBlock icon={Mic} number="2" title="Voice Models & Cloud Engine Services">
                <p className="mb-3">
                  The app provides two distinct speech generation architectures:
                </p>
                <div className="space-y-3 mb-3">
                  <div className="glass-card rounded-lg p-4 border-indigo-500/15">
                    <p className="text-white font-medium text-xs mb-1">Local Open-Source Engine:</p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      Uses open-source voice models, including <span className="text-indigo-300 font-medium">Kokoro-82M (Apache-2.0)</span>, <span className="text-indigo-300 font-medium">DeepPhonemizer (MIT)</span>, <span className="text-indigo-300 font-medium">OpenPhonemizer (BSD-3-Clause-Clear)</span>, and <span className="text-indigo-300 font-medium">inflect (MIT)</span>. The Apache-2.0 model permits commercial use of generated audio.
                    </p>
                  </div>
                  <div className="glass-card rounded-lg p-4 border-cyan-500/15">
                    <p className="text-cyan-300 font-medium text-xs mb-1">ElevenLabs Cloud API Engine:</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Allows you to connect your own ElevenLabs account via API key to generate audio through ElevenLabs' services. Your use of ElevenLabs models, voice cloning, and generated audio is governed by ElevenLabs' Terms of Service, Acceptable Use Policy, and your account subscription tier.
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  You are responsible for ensuring your use complies with all applicable component licenses and third-party terms.
                </p>
              </SectionBlock>

              <SectionBlock icon={Scale} number="3" title="Permitted Use">
                Generate voiceovers for personal and commercial projects including educational, entertainment, commercial, broadcast, and business content. You may use the app for narration, tutorials, explainer audio, podcast production, and spoken content creation within Adobe Premiere Pro.
              </SectionBlock>

              <SectionBlock icon={ShieldCheck} number="4" title="Restrictions & Ethical Voice Use">
                <p className="mb-2">Do not reverse engineer, decompile, redistribute, sublicense, or circumvent security mechanisms of the Software.</p>
                <div className="glass-card rounded-lg p-4 border-red-500/15 mt-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300/90 text-xs font-semibold">
                      Strict Prohibition on Deceptive Audio & Non-Consensual Voice Cloning:
                    </p>
                  </div>
                  <p className="text-red-200/80 text-xs leading-relaxed pl-6">
                    Do not use the app, local models, or connected ElevenLabs API to create deceptive "deepfake" audio, to clone the voice of any person without their explicit written consent, to impersonate real individuals or public figures, to defraud, harass, defame, or deceive, or for any unlawful or malicious purpose.
                  </p>
                </div>
              </SectionBlock>

              <SectionBlock icon={FileText} number="5" title="Generated Content, User Responsibility & API Keys">
                <p className="mb-2">
                  You are solely responsible for the text you submit, the audio you generate, and any third-party credentials you input into the app.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-400 list-disc pl-5">
                  <li>You warrant that you possess all necessary rights and clearances to the scripts, text, and voice identities you process.</li>
                  <li>When using ElevenLabs, you are responsible for maintaining the confidentiality of your API key and for all character quota consumption or fees billed by ElevenLabs.</li>
                  <li>Ownership of generated content remains with you, subject to applicable intellectual property laws and third-party platform terms.</li>
                </ul>
              </SectionBlock>

              <SectionBlock icon={RefreshCw} number="6" title="Updates & Automatic Downloads">
                <p className="mb-3">
                  The app periodically checks for, and may automatically download and install, updates and new voice models from <span className="text-indigo-300 font-medium">vampro.in</span> and <span className="text-indigo-300 font-medium">Hugging Face</span>. By using the app with default settings you consent to these checks and downloads.
                </p>
                <div className="glass-card rounded-lg p-3 border-indigo-500/15">
                  <p className="text-xs text-slate-500">
                    <span className="text-white font-medium">Opt-out:</span> You may disable all network activity by setting the environment variable <code className="text-indigo-300 bg-black/30 px-1.5 py-0.5 rounded text-xs">VAMPRO_FORCE_OFFLINE=1</code> (Local workflow only).
                  </p>
                </div>
              </SectionBlock>

              <SectionBlock icon={FileText} number="7" title="Third-Party Services & Open-Source Software">
                The app includes open-source components governed by their respective permissive licenses (Apache-2.0, MIT, BSD-3-Clause) and enables optional direct integration with ElevenLabs via official API endpoints. Vampro is an independent developer and is not affiliated with, sponsored by, or endorsed by Adobe Inc. or ElevenLabs Inc.
              </SectionBlock>

              <SectionBlock icon={AlertTriangle} number="8" title="Disclaimer of Warranties">
                <p className="uppercase text-xs tracking-wide text-slate-500 leading-relaxed">
                  The app is provided "as is", without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
              </SectionBlock>

              <SectionBlock icon={Scale} number="9" title="Limitation of Liability">
                <p className="uppercase text-xs tracking-wide text-slate-500 leading-relaxed">
                  To the maximum extent permitted by law, the publisher shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the app.
                </p>
              </SectionBlock>

              <SectionBlock icon={FileText} number="10" title="Termination">
                These terms remain effective until terminated. Violations may result in immediate suspension of your access to the Software.
              </SectionBlock>

              <SectionBlock icon={Bookmark} number="11" title="Intellectual Property & Trademarks">
                <p>Software, branding, and logos remain the property of Vampro.</p>
                <p className="text-slate-500 text-xs mt-2">
                  Adobe® and Premiere Pro® are trademarks of Adobe Inc. Vampro Voice Generator is an independent product, not affiliated with or endorsed by Adobe.
                </p>
              </SectionBlock>

              <SectionBlock icon={Scale} number="12" title="Governing Law">
                These terms are governed by the laws in the jurisdiction of the Software publisher. Any disputes shall be resolved in the courts of that jurisdiction.
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

export default Terms;