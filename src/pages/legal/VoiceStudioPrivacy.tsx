import { ShieldCheck, HardDrive, EyeOff, Bookmark, Mail, Sliders, KeyRound } from 'lucide-react';
import SEO from '../../components/SEO';
import { voiceStudioPrivacyMetadata } from '../../seo/metadata';

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

const VoiceStudioPrivacy = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <SEO {...voiceStudioPrivacyMetadata} />
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-emerald-900/30" style={{ background: 'rgba(10,24,18,0.4)' }}>
            <div className="text-slate-300">

              {/* Header */}
              <div id="privacy" className="scroll-mt-40 mb-10 border-b border-emerald-900/30 pb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
                <p className="text-emerald-400 font-semibold text-sm">Vampro Voice Studio for Adobe Premiere Pro</p>
                <p className="text-slate-500 text-sm mt-3">Effective September 20, 2026</p>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  Vampro Voice Studio is designed around local-first privacy, giving video editors zero-latency local speech generation, voice cloning, and audio stems without mandatory cloud transmission.
                </p>
              </div>

              {/* Sections */}
              <SectionBlock icon={HardDrive} number="1" title="What Stays on Your Computer">
                <p>
                  Voice Studio is designed to process offline jobs entirely on your local machine. By default, imported audio, audio extracted from video, voice references, generated takes, separated stems, speaker samples, job records, settings, and feedback are stored on your Windows computer under <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">%LOCALAPPDATA%\Vampro\VoiceStudio</code>.
                </p>
                <p>
                  The local database is <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">studio.db</code>; media is stored in subfolders such as <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">audio</code>, <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">voices</code>, <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">results</code>, <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">stems</code>, and <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">premiere-media</code>.
                </p>
                <p>
                  When you select media from Premiere, the companion reads the selected source media and extracts the audio needed for processing. It does not upload your Premiere project files or raw video. Generated audio placed on your timeline is preserved in <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">premiere-media</code> so Premiere can locate it persistently.
                </p>
              </SectionBlock>

              <SectionBlock icon={EyeOff} number="2" title="Zero Telemetry & Tracking">
                <p>
                  Voice Studio contains no Vampro user account tracking, advertising networks, analytics scripts, or telemetry. The local companion binds exclusively to your local machine (localhost) to communicate with the Premiere Pro panel. Local feedback and offline media are never uploaded to Vampro servers.
                </p>
              </SectionBlock>

              <SectionBlock icon={KeyRound} number="3" title="When You Choose ElevenLabs (Optional BYOK)">
                <p>
                  ElevenLabs integration is strictly optional. For any cloud generation, voice cloning, or speech-to-speech task, the panel prompts for explicit user authorization before sending data. If confirmed, requests are transmitted directly to <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">api.elevenlabs.io</code> over secure HTTPS:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li>Text-to-speech transmits your script and selected voice ID.</li>
                  <li>Speech-to-speech transmits the chosen audio excerpt and target voice ID.</li>
                  <li>Creating a cloud clone transmits the designated audio sample and label.</li>
                </ul>
                <p>
                  Your ElevenLabs API key is encrypted and stored locally using the Windows Data Protection API (DPAPI via <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">CryptProtectData</code>). You can click <strong>Remove</strong> inside the panel at any time to purge the stored key.
                </p>
              </SectionBlock>

              <SectionBlock icon={Sliders} number="4" title="Feedback and Local Adaptation">
                <p>
                  Feedback ratings (thumbs up/down) submitted for takes, speaker tags, and stems remain in your local database. Feedback does not train or fine-tune neural weights. For offline voice conversion, positive feedback simply adjusts a local voice-strength weighting coefficient for future jobs.
                </p>
              </SectionBlock>

              <SectionBlock icon={HardDrive} number="5" title="Data Retention and Complete Deletion">
                <p>
                  Local records and audio files remain until you delete them via the panel or wipe the data directory. Using the <strong>Clear</strong> button in the panel removes local entries and associated generated audio files.
                </p>
                <p>
                  To completely remove all Voice Studio data, close the companion and delete <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-xs font-mono">%LOCALAPPDATA%\Vampro\VoiceStudio</code>.
                </p>
              </SectionBlock>

              <SectionBlock icon={ShieldCheck} number="6" title="User Responsibilities">
                <p>
                  You are responsible for ensuring that all voice recordings, personal audio, and media provided to Voice Studio have appropriate consent, releases, and intellectual property authorizations. Voice samples may identify individuals and may be regulated under biometric and privacy legislation.
                </p>
              </SectionBlock>

              <SectionBlock icon={Bookmark} number="7" title="Updates to this Policy">
                <p>
                  This policy may be revised to reflect product updates, model capabilities, or legal requirements. Updates will be published on the Vampro website with an updated effective date.
                </p>
              </SectionBlock>

              {/* Contact */}
              <div className="border-t border-emerald-900/30 pt-8 mt-4">
                <a href="mailto:support@vampro.in" className="inline-flex items-center gap-3 glass-card rounded-xl px-5 py-3 hover:bg-emerald-900/20 transition-colors">
                  <Mail size={16} className="text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-500">Questions about Voice Studio privacy?</p>
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

export default VoiceStudioPrivacy;
