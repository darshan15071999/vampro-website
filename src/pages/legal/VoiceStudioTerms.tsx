import { FileText, Scale, ShieldCheck, AlertTriangle, Bookmark, Mail, Server, Cpu } from 'lucide-react';
import SEO from '../../components/SEO';
import { voiceStudioTermsMetadata } from '../../seo/metadata';

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

const VoiceStudioTerms = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SEO {...voiceStudioTermsMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-emerald-900/30" style={{ background: 'rgba(10,24,18,0.4)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="terms" className="scroll-mt-40 mb-10 border-b border-emerald-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
                <p className="text-emerald-400 font-semibold text-sm">Vampro Voice Studio for Adobe Premiere Pro</p>
                <p className="text-slate-500 text-sm mt-3">Effective September 20, 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  These terms govern your use of the Vampro Voice Studio Adobe Premiere Pro panel and Windows companion software.
                </p>
              </div>

              {/* Terms Sections */}
              <SectionBlock icon={FileText} number="1" title="Agreement and Eligibility">
                <p>
                  By installing or using Vampro Voice Studio, you agree to these terms. If you represent an organization or production company, you warrant that you are authorized to bind that entity. You must comply with all applicable local, national, and international laws regarding artificial intelligence and voice synthesis.
                </p>
              </SectionBlock>

              <SectionBlock icon={Scale} number="2" title="License to Use the Software">
                <p>
                  The original source code of the software is provided under the MIT License, subject to separate licenses and notices for third-party models and libraries. This license does not grant rights to Adobe Premiere Pro, third-party cloud services, or proprietary trademarks. You are responsible for maintaining a valid Adobe Creative Cloud license.
                </p>
              </SectionBlock>

              <SectionBlock icon={ShieldCheck} number="3" title="Your Recordings, Voices, and Generated Output">
                <p>
                  You retain all ownership rights in media, voice references, and scripts you supply. You warrant that you have obtained all necessary talent releases, moral rights waivers, and authorizations before recording, cloning, converting, or distributing any individual's voice.
                </p>
                <div className="glass-card rounded-lg p-4 border-red-500/20 bg-red-950/20 mt-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300/90 text-xs leading-relaxed">
                      Do not use Voice Studio to impersonate individuals without consent, generate misleading or fraudulent media (deepfakes), violate privacy or publicity rights, or create defamatory or unlawful material.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Voice Studio uses generative AI. You are responsible for auditing all audio takes for accuracy, audio quality, and regulatory compliance before broadcasting or publishing.
                </p>
              </SectionBlock>

              <SectionBlock icon={Cpu} number="4" title="Offline Engine & Optional ElevenLabs Service">
                <p>
                  Offline jobs execute on your machine using local neural models (GGUF/ONNX). You are responsible for local machine security and audio storage.
                </p>
                <p>
                  ElevenLabs is an optional cloud service using a Bring Your Own Key (BYOK) architecture. If chosen, jobs transmit audio directly to ElevenLabs servers. You are responsible for your ElevenLabs account standing, API costs, quota limits, and adherence to ElevenLabs terms of service.
                </p>
              </SectionBlock>

              <SectionBlock icon={Server} number="5" title="Feedback & Local Parameters">
                <p>
                  Feedback submitted in the panel (thumbs up/down) is stored locally and is never used to train or fine-tune foundation models. In offline voice conversion, it merely adjusts a local strength weighting preference.
                </p>
              </SectionBlock>

              <SectionBlock icon={AlertTriangle} number="6" title="Disclaimer of Warranties">
                <p className="uppercase text-xs tracking-wide text-slate-500 leading-relaxed">
                  Vampro Voice Studio is provided "AS IS" without warranties of any kind, express or implied, including merchantability, fitness for a particular editing workflow, or non-infringement. We do not guarantee uninterrupted operation or zero latency.
                </p>
              </SectionBlock>

              <SectionBlock icon={Scale} number="7" title="Limitation of Liability">
                <p className="uppercase text-xs tracking-wide text-slate-500 leading-relaxed">
                  To the maximum extent permitted by law, Vampro and its contributors will not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of project files, deadlines, profits, or voice talent disputes.
                </p>
              </SectionBlock>

              <SectionBlock icon={Bookmark} number="8" title="Updates and Modifications">
                <p>
                  We may release updates to improve compatibility, add audio models, or address platform changes. Continued use of Voice Studio constitutes acceptance of the latest published terms.
                </p>
              </SectionBlock>

              {/* Contact */}
              <div className="border-t border-emerald-900/30 pt-8 mt-4">
                <a href="mailto:support@vampro.in" className="inline-flex items-center gap-3 glass-card rounded-xl px-5 py-3 hover:bg-emerald-900/20 transition-colors">
                  <Mail size={16} className="text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-500">Questions regarding these terms?</p>
                    <p className="text-sm font-bold text-emerald-400">support@vampro.in</p>
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

export default VoiceStudioTerms;
