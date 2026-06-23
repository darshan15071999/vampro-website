import { FileText, Scale, ShieldCheck, Mic, RefreshCw, AlertTriangle, Bookmark, Mail } from 'lucide-react';

const SectionBlock = ({ icon: Icon, number, title, children }: { icon: React.ElementType; number: string; title: string; children: React.ReactNode }) => (
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
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="terms" className="scroll-mt-40 mb-10 border-b border-indigo-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Use</h1>
                <p className="gradient-blue-text font-semibold text-sm">Vampro Voice Generator Text-to-Speech</p>
                <p className="text-slate-500 text-sm mt-3">Last Updated: June 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  By installing or using Vampro Voice Generator ("the app"), you agree to these terms. Please read them carefully before use.
                </p>
              </div>

              {/* Terms Sections */}
              <SectionBlock icon={FileText} number="1" title="License Grant">
                You are granted a limited, non-exclusive, non-transferable, revocable license to install and use the Software for creating audio within Adobe Premiere Pro. The app includes open-source components licensed under their own terms (see Third-Party Notices), which continue to govern those components.
              </SectionBlock>

              <SectionBlock icon={Mic} number="2" title="Open-Source Models & Components">
                <p className="mb-3">
                  The app uses open-source voice models, including <span className="text-indigo-300 font-medium">Kokoro-82M (Apache-2.0)</span>, and open-source text-processing components. The Apache-2.0 model permits commercial use of generated audio.
                </p>
                <div className="glass-card rounded-lg p-4 border-indigo-500/15">
                  <p className="text-xs text-slate-500 mb-2">Key components include:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ['Kokoro-82M', 'Apache-2.0'],
                      ['DeepPhonemizer', 'MIT'],
                      ['OpenPhonemizer', 'BSD-3-Clause-Clear'],
                      ['inflect', 'MIT'],
                    ].map(([name, license]) => (
                      <span key={name} className="text-xs bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-full">
                        {name} <span className="text-slate-500">({license})</span>
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-3">
                  You are responsible for ensuring your use complies with all applicable component licenses. Generated audio usage is subject to the licenses of the underlying models.
                </p>
              </SectionBlock>

              <SectionBlock icon={Scale} number="3" title="Permitted Use">
                Generate voiceovers for personal and commercial projects including educational, entertainment, and business content. You may use the app for narration, tutorials, explainer audio, and spoken content creation within Adobe Premiere Pro.
              </SectionBlock>

              <SectionBlock icon={ShieldCheck} number="4" title="Restrictions">
                <p className="mb-2">Do not reverse engineer, decompile, redistribute, sublicense, or circumvent security mechanisms of the Software.</p>
                <div className="glass-card rounded-lg p-4 border-red-500/15 mt-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300/80 text-xs">
                      Do not use the app to create deceptive "deepfake" audio, to impersonate real individuals, to deceive, or for any unlawful purpose. Do not use the app to violate any person's rights.
                    </p>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock icon={FileText} number="5" title="Generated Content & User Responsibility">
                You are responsible for the text you submit and the audio you generate, including ensuring you have the rights to the input text. Ownership of generated content remains with you, subject to applicable laws, third-party rights, and the licenses of the underlying open-source components.
              </SectionBlock>

              <SectionBlock icon={RefreshCw} number="6" title="Updates & Automatic Downloads">
                <p className="mb-3">
                  The app periodically checks for, and may automatically download and install, updates and new voice models from <span className="text-indigo-300 font-medium">vampro.in</span> and <span className="text-indigo-300 font-medium">Hugging Face</span>. By using the app with default settings you consent to these checks and downloads. Some updates may be required for compatibility.
                </p>
                <div className="glass-card rounded-lg p-3 border-indigo-500/15">
                  <p className="text-xs text-slate-500">
                    <span className="text-white font-medium">Opt-out:</span> You may disable all network activity by setting the environment variable <code className="text-indigo-300 bg-black/30 px-1.5 py-0.5 rounded text-xs">VAMPRO_FORCE_OFFLINE=1</code>
                  </p>
                </div>
              </SectionBlock>

              <SectionBlock icon={FileText} number="7" title="Third-Party Software">
                The app includes open-source components governed by their respective licenses, including Apache-2.0, MIT, and BSD-3-Clause. A complete list of third-party components and their licenses is available in the Third-Party Notices documentation and on the Licenses page.
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