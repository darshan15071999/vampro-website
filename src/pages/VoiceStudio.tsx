import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronDown,
  Clapperboard,
  Cloud,
  Cpu,
  FileAudio,
  FolderOpen,
  Headphones,
  Layers,
  Menu,
  Mic,
  MoveRight,
  Radio,
  SlidersHorizontal,
  Sparkles,
  Volume2,
  X
} from 'lucide-react';
import SEO from '../components/SEO';
import { voiceStudioMetadata } from '../seo/metadata';
import StudioDemo from '../components/voice-studio/StudioDemo';
import ForestJourney from '../components/voice-studio/ForestJourney';
import { Waveform } from '../components/voice-studio/Waveform';
import { useWaitlist } from '../context/WaitlistContext';
import './VoiceStudio.css';
import './ForestTheme.css';

const navItems = [
  { label: 'Benefits', id: 'benefits' },
  { label: 'How it works', id: 'workflow' },
  { label: 'For creators', id: 'audience' },
  { label: 'Why Studio', id: 'capabilities' },
  { label: 'FAQs', id: 'faq' },
];

const features = [
  { icon: Mic, number: '01', title: 'A voice that is yours.', label: 'CUSTOM VOICE CLONING', body: 'Turn a clean timeline clip, bin asset or imported recording into a reusable voice reference. Name it. Keep it. Bring it into your next story.', tag: 'Your reference. Your identity.', visual: 'voice' },
  { icon: AudioLines, number: '02', title: 'Same performance. New voice.', label: 'SPEECH-TO-SPEECH', body: 'Start with a recorded performance and convert its voice. Work from a clip, uploaded audio or a microphone take, with one place to preview the result.', tag: 'From recorded speech to a new take.', visual: 'convert' },
  { icon: FileAudio, number: '03', title: 'Words into a world.', label: 'TEXT-TO-SPEECH', body: 'Write narration for your documentary, product film or next upload. Generate English speech with a saved voice and keep each take ready for your edit.', tag: 'Written for the screen. Made to be heard.', visual: 'script' },
  { icon: SlidersHorizontal, number: '04', title: 'Let the story come through.', label: 'AUDIO REPAIR & STEMS', body: 'Reduce background noise locally. Split vocals and accompaniment into clear stems, then preview the results before they reach your cut.', tag: 'Clean voice. Clear music. Ready stems.', visual: 'repair' },
  { icon: Clapperboard, number: '05', title: 'Made for the edit.', label: 'TIMELINE HANDOFF', body: 'Import a take to your project bin, insert at the playhead or apply it to the captured source clip. The clip-change workflow preserves the original audio for undo.', tag: 'Stay close to your timeline.', visual: 'timeline' },
  { icon: Layers, number: '06', title: 'Every take. Within reach.', label: 'VOICE LIBRARY & SAVED TAKES', body: 'Preview, name and organize voice references. Keep generated takes with timing information, track queued jobs and cancel work when your direction changes.', tag: 'A little order. A lot more flow.', visual: 'library' },
];

const workflows = [
  { title: 'Bring your voice.', body: 'Select a timeline or bin clip, import a clean recording, or record a performance. Save a voice reference you have permission to use.', icon: Mic },
  { title: 'Shape the take.', body: 'Write a script, convert a performance or repair your audio. Choose local processing or connect your own ElevenLabs account.', icon: SlidersHorizontal },
  { title: 'Keep the edit moving.', body: 'Preview your result, save the take and send it to the bin, playhead or selected source clip in your editing workspace.', icon: Clapperboard },
];

const faqs = [
  { question: 'What is Vampro Voice Studio?', answer: 'Vampro Voice Studio is an offline-first voice and audio toolkit for Windows editing workflows. It brings reusable custom voices, text-to-speech, speech-to-speech, voice previews, clip voice changes, noise removal, vocal/music separation and take management into one workspace, with ElevenLabs connection support.' },
  { question: 'How is Voice Studio different from Vampro Voice Generator?', answer: 'Voice Generator is Vampro’s existing text-to-speech plugin. Voice Studio is a separate product for a broader production workflow: create custom voice references, convert recorded performances, change a clip’s voice, repair audio and manage saved takes. Voice Generator’s downloads, pricing and voice counts do not apply to Voice Studio.' },
  { question: 'Can I clone a voice from an editing timeline?', answer: 'The workflow accepts a selected timeline clip, a project-bin clip or an imported recording as a voice reference. Choose a clean range, name the voice and reuse it for text-to-speech or speech conversion. Use voices you own or have permission to use.' },
  { question: 'Does Voice Studio work offline?', answer: 'The local workflow is designed to process audio on your Windows computer after the companion and model pack are installed. Local voice generation does not use a cloud API. ElevenLabs is a connected online provider that uses your own API key and sends only the jobs you choose.' },
  { question: 'What is the difference between text-to-speech and speech-to-speech?', answer: 'Text-to-speech generates a spoken take from a written script and a selected voice. Speech-to-speech starts with a recording or clip and converts its voice, using the source performance as the input. Both workflows feed the same preview, saved-take and timeline handoff process.' },
  { question: 'Can it remove noise and separate vocals from music?', answer: 'Voice Studio includes local spectral noise reduction and two-stem separation for vocals and accompaniment. The workflow lets you preview cleaner speech, vocal stems and music beds before saving the result into your workspace.' },
  { question: 'What are the system requirements and current limits?', answer: 'Voice Studio targets Windows with the local companion running. The local engine supports NVIDIA, AMD and Intel GPUs with a CPU fallback. Local voice generation is English, processes one source per job up to ten minutes, and outputs mono 24 kHz PCM audio. Retimed or reversed clips are not supported in the direct-source workflow.' },
  { question: 'Is Voice Studio available to download, and what does it cost?', answer: 'Voice Studio is currently in preview as a production studio workflow. Join the waitlist below to get early installer access, rollout notifications, and workflow updates as releases go live.' },
];

function FeatureVisual({ type }: { type: string }) {
  if (type === 'voice') return <div className="vs-feature-visual vs-voice-visual" aria-hidden="true"><div className="vs-voice-orbit"><Mic size={29}/></div><div><span>YOUR VOICE</span><Waveform compact/><small>Reference captured <Check size={10}/></small></div></div>;
  if (type === 'convert') return <div className="vs-feature-visual vs-convert-visual" aria-hidden="true"><div><small>SOURCE</small><Waveform compact variant={1}/></div><MoveRight size={20}/><div><small>NEW VOICE</small><Waveform compact variant={3}/></div></div>;
  if (type === 'script') return <div className="vs-feature-visual vs-script-visual" aria-hidden="true"><span>“Some stories are seen.<br/><em>The best ones are felt.</em>”</span><AudioLines size={32}/></div>;
  if (type === 'repair') return <div className="vs-feature-visual vs-repair-visual" aria-hidden="true"><div><small>VOICE</small><Waveform compact/></div><div><small>MUSIC</small><Waveform compact variant={5}/></div></div>;
  if (type === 'timeline') return <div className="vs-feature-visual vs-timeline-visual" aria-hidden="true"><div><span>V1</span><i>YOUR STORY / SCENE 01</i></div><div><span>A1</span><i><AudioLines size={13}/> Voice Studio · take 03<Check size={12}/></i></div><b/></div>;
  return <div className="vs-feature-visual vs-library-visual" aria-hidden="true">{['Narration · take 03', 'Brand film · take 02', 'Interview · take 01'].map((t,i)=><div key={t}><FileAudio size={14}/><span>{t}</span><small>{i === 0 ? 'LATEST' : 'SAVED'}</small></div>)}</div>;
}

export default function VoiceStudio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cloud, setCloud] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const { openModal, hasJoined } = useWaitlist();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('vs-menu-button')?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal('Voice Studio Header');
  };

  return (
    <div className="vs-page vs-forest-theme">
      <SEO {...voiceStudioMetadata} />
      <a href="#main" className="vs-skip">Skip to content</a>

      {/* Header: Vampro Creative Lab logo on left, plugin logo in middle, navigation buttons on right */}
      <header className="vs-header">
        <div className="vs-header-inner">
          <div className="vs-header-left">
            <Link to="/" className="flex items-center gap-3 cursor-pointer group" title="Vampro Homepage">
              <img
                src="/header.png"
                alt="Vampro Logo"
                className="h-8 w-8 md:h-9 md:w-9 rounded-xl shadow-md object-cover border border-slate-200/20 group-hover:scale-105 transition-transform duration-300"
                decoding="async"
              />
              <span className="font-bank-gothic text-xl tracking-[0.12em] text-white font-bold" style={{ fontWeight: 700 }}>
                VAMPRO
              </span>
              <span className="hidden md:inline-flex items-center justify-center text-[11px] leading-normal uppercase tracking-[0.28em] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-400 bg-white/5 text-indigo-300 border border-indigo-500/20">
                Creative Lab
              </span>
            </Link>
          </div>

          <div className="vs-header-center">
            <a
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="vs-header-product-logo"
              aria-label="Vampro Voice Studio - Back to top"
            >
              <img src="/voice-studio-logo-transparent.png" alt="Vampro Voice Studio" width="1200" height="466" />
            </a>
          </div>

          <div className="vs-header-right">
            <nav className="vs-desktop-nav" aria-label="Main navigation">
              {navItems.map((n) => (
                <a href={`#${n.id}`} key={n.id} aria-current={activeNav === n.id ? 'location' : undefined}>
                  {n.label}
                </a>
              ))}
            </nav>
            <a href="#availability" onClick={handleWaitlistClick} className="vs-header-cta">
              Join Waitlist <ArrowUpRight size={14} />
            </a>
            <button
              className="vs-menu-button vs-icon-button"
              id="vs-menu-button"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="vs-mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="vs-mobile-nav" className="vs-mobile-nav" aria-label="Mobile navigation">
            {navItems.map((n) => (
              <a href={`#${n.id}`} key={n.id} onClick={() => setMenuOpen(false)}>
                {n.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
            <Link to="/docs/plugins/voice-studio" onClick={() => setMenuOpen(false)}>
              Documentation <ArrowUpRight size={16} />
            </Link>
            <a href="#availability" onClick={(e) => { setMenuOpen(false); handleWaitlistClick(e); }}>
              Join Waitlist <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>

      <main id="main">
        <ForestJourney />

        <div className="vs-capability-strip">
          <div className="vs-wrap">
            <span><Mic /> Voice cloning</span>
            <i />
            <span><AudioLines /> Speech to speech</span>
            <i />
            <span><FileAudio /> Text to speech</span>
            <i />
            <span><SlidersHorizontal /> Audio repair</span>
            <i />
            <span><Clapperboard /> Timeline integration</span>
          </div>
        </div>

        <section id="benefits" className="vs-section vs-wrap vs-forest-benefits">
          <div className="vs-section-heading">
            <div>
              <span className="vs-eyebrow">01 / THE CLEARING</span>
              <h2>Raw ideas in.<br /><span>Creative possibilities out.</span></h2>
            </div>
            <p>Vampro Voice Studio brings voice creation and audio tools into your editing workflow. Less file chasing. More room for the story.</p>
          </div>
          <div className="vs-benefit-grid">
            <article>
              <Mic size={23} />
              <h3>Make it your voice.</h3>
              <p>Build custom voice references, turn scripts into narration and transform recorded performances.</p>
            </article>
            <article>
              <Cpu size={23} />
              <h3>Keep it on your machine.</h3>
              <p>Work with installed local models, or choose ElevenLabs with your own account when you need it.</p>
            </article>
            <article>
              <Clapperboard size={23} />
              <h3>Bring it into the edit.</h3>
              <p>Preview the take, send it to a project bin or place it right where your story needs it.</p>
            </article>
          </div>
        </section>

        <section id="workflow" className="vs-section vs-workflow-section">
          <div className="vs-wrap">
            <div className="vs-section-heading">
              <div>
                <span className="vs-eyebrow">02 / HOW IT WORKS</span>
                <h2>From the source.<br /><span>Through the studio.</span></h2>
              </div>
              <p>Voice production should feel like part of editing. Three connected steps keep your ideas moving toward the timeline.</p>
            </div>
            <div className="vs-steps">
              {workflows.map((w, i) => (
                <article key={w.title}>
                  <div className="vs-step-top">
                    <span>0{i + 1}</span>
                    <w.icon size={22} />
                    {i < 2 && <ArrowRight className="vs-step-arrow" size={22} />}
                  </div>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </article>
              ))}
            </div>
            <div className="vs-flow-ribbon">
              <span><FolderOpen size={16} /> Your source</span>
              <MoveRight size={21} />
              <span className="vs-flow-ribbon-studio"><AudioLines size={19} /> Voice Studio</span>
              <MoveRight size={21} />
              <span><AudioLines size={17} /> Your timeline</span>
            </div>
            <div id="studio" className="vs-workflow-demo">
              <div className="vs-workflow-demo-label">
                <span className="vs-eyebrow">EXPLORE THE WORKSPACE</span>
                <p>Play the core tools, from voice previews to cleanup and stem separation.</p>
              </div>
              <StudioDemo />
            </div>
          </div>
        </section>

        <section id="audience" className="vs-section vs-wrap vs-audience">
          <div className="vs-audience-title">
            <span className="vs-eyebrow">03 / WHO IS IT FOR?</span>
            <h2>Different crafts.<br /><span>Same creative instinct.</span></h2>
            <p>For every moment a voice can make the picture mean more.</p>
            <span className="vs-audience-signature"><Headphones size={20} /> MADE FOR YOUR NEXT GREAT TAKE.</span>
          </div>
          <div className="vs-audience-list">
            {[
              { icon: Clapperboard, title: 'Editors & filmmakers', text: 'Explore narration, audition a new voice and keep alternate takes close to your sequence.' },
              { icon: Radio, title: 'Creators & storytellers', text: 'Build a familiar voice for video essays, YouTube series, explainers and independent stories.' },
              { icon: Sparkles, title: 'Agencies & brand teams', text: 'Develop voice references for campaign concepts, product demos and branded content.' },
              { icon: Headphones, title: 'Podcasters & educators', text: 'Shape spoken lessons, clean recordings and organize the takes behind your next episode.' }
            ].map((a, i) => (
              <div className="vs-audience-row" key={a.title}>
                <span className="vs-audience-number">0{i + 1}</span>
                <a.icon size={22} />
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="capabilities" className="vs-section vs-features-section">
          <div className="vs-wrap">
            <div className="vs-section-heading">
              <div>
                <span className="vs-eyebrow">04 / WHY VOICE STUDIO?</span>
                <h2>A studio in the wild.<br /><span>A toolkit for your craft.</span></h2>
              </div>
              <p>From the first reference to the final take, keep the craft in your hands. Built for editors, filmmakers and the people behind the story.</p>
            </div>
            <div className="vs-features">
              {features.map((f) => (
                <article className="vs-feature" key={f.number}>
                  <div className="vs-feature-top">
                    <f.icon size={21} />
                    <span>{f.number}</span>
                  </div>
                  <span className="vs-micro">{f.label}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                  <FeatureVisual type={f.visual} />
                  <span className="vs-feature-tag">{f.tag}</span>
                </article>
              ))}
            </div>
            <p className="vs-feature-note">
              Production-ready tools for voice creation, cleanup, stem separation and saved takes.{' '}
              <a href="#faq">See workflow details <ArrowUpRight size={12} /></a>
            </p>
          </div>
        </section>

        <section id="processing" className="vs-section vs-wrap">
          <div className="vs-engine-panel">
            <div className="vs-engine-copy">
              <span className="vs-eyebrow">YOUR AUDIO. YOUR CHOICE.</span>
              <h2>Keep it local.<br /><span>Or open it up.</span></h2>
              <p>A studio that follows your process. Work with local models on your machine, or bring your ElevenLabs account when your project calls for it.</p>
              <div className="vs-engine-toggle" role="group" aria-label="Processing mode">
                <button aria-pressed={!cloud} onClick={() => setCloud(false)}>
                  <Cpu size={16} /> Local studio
                </button>
                <button aria-pressed={cloud} onClick={() => setCloud(true)}>
                  <Cloud size={16} /> ElevenLabs
                </button>
              </div>
              <div className="vs-engine-details" aria-live="polite">
                <h3>{cloud ? 'Your account. An extended palette.' : 'The work stays on your workstation.'}</h3>
                <p>
                  {cloud
                    ? 'Connect your own API key for ElevenLabs voice generation, speech conversion and instant-clone request workflows. You choose when a job goes online.'
                    : 'Generate with installed local models, keep voices and takes on your computer, and continue creating without a cloud voice API.'}
                </p>
                <ul>
                  {(cloud
                    ? ['Bring your own ElevenLabs API key', 'Selected jobs sent only with your opt-in', 'Provider usage and charges apply separately']
                    : ['Offline processing after model installation', 'Local voice library and saved takes', 'GPU acceleration target, with CPU fallback']
                  ).map((t) => (
                    <li key={t}>
                      <Check size={14} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`vs-engine-art ${cloud ? 'is-cloud' : ''}`}>
              <div className="vs-engine-orbit orbit-one" />
              <div className="vs-engine-orbit orbit-two" />
              <div className="vs-engine-orbit orbit-three" />
              <span className="vs-orbit-node node-one" />
              <span className="vs-orbit-node node-two" />
              <div className="vs-chip">
                <span className="vs-chip-top">VAMPRO ENGINE</span>
                {cloud ? <Cloud size={54} strokeWidth={1} /> : <AudioLines size={54} strokeWidth={1} />}
                <strong>{cloud ? 'CONNECTED' : 'LOCAL'}</strong>
                <small>{cloud ? 'YOUR KEY. YOUR CHOICE.' : 'YOUR MACHINE. YOUR STUDIO.'}</small>
              </div>
              <div className="vs-engine-art-label">
                <span className="vs-status-dot" />
                {cloud ? 'CONNECTED ONLINE WORKFLOW' : 'OFFLINE-FIRST BY DESIGN'}
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started section (check compatibility button removed as requested) */}
        <section id="setup" className="vs-section vs-setup-section">
          <div className="vs-wrap">
            <div className="vs-section-heading">
              <div>
                <span className="vs-eyebrow">05 / GETTING STARTED</span>
                <h2>Find your way<br /><span>into the studio.</span></h2>
              </div>
              <p>Set up the editor panel with a local Windows companion and keep your voice tools close to the timeline.</p>
            </div>
            <div className="vs-steps">
              <article>
                <div className="vs-step-top">
                  <span>01</span>
                  <Layers size={22} />
                </div>
                <h3>Add the editor panel.</h3>
                <p>The panel brings your voice tools into the editing workspace, close to your clips and timeline.</p>
              </article>
              <article>
                <div className="vs-step-top">
                  <span>02</span>
                  <Cpu size={22} />
                </div>
                <h3>Run the local companion.</h3>
                <p>The Windows companion handles local processing, model packs, your voice library and saved takes.</p>
              </article>
              <article>
                <div className="vs-step-top">
                  <span>03</span>
                  <AudioLines size={22} />
                </div>
                <h3>Make your first take.</h3>
                <p>Choose a voice reference and start with a script or a recording. Preview, refine and bring the result into your edit.</p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ section (talk to vampro button removed as requested) */}
        <section id="faq" className="vs-section vs-faq-section">
          <div className="vs-wrap vs-faq-layout">
            <div>
              <span className="vs-eyebrow">06 / FREQUENTLY ASKED QUESTIONS</span>
              <h2>Good questions.<br /><span>Clear answers.</span></h2>
              <p>What the studio does, how it fits your workflow, and how each production tool works.</p>
            </div>
            <div className="vs-faq-list">
              {faqs.map((faq, i) => (
                <details key={faq.question}>
                  <summary>
                    <span className="vs-faq-number">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{faq.question}</h3>
                    <ChevronDown size={17} />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Availability / Waitlist Section */}
        <section id="availability" className="vs-section vs-wrap vs-availability">
          <div className="vs-availability-inner">
            <div className="vs-cta-wave" aria-hidden="true"><Waveform /></div>
            <span className="vs-eyebrow">
              <span className="vs-status-dot" /> COMING SOON · YOUR NEXT TAKE STARTS HERE
            </span>
            <h2>Step out of the noise.<br /><em>Into your studio.</em></h2>
            <p>Vampro Voice Studio gives media teams a focused place to create voices, clean dialogue and prepare stems for the edit.</p>

            <div className="vs-cta-actions">
              {hasJoined ? (
                <button className="vs-button vs-button-primary is-joined cursor-default" disabled>
                  <Check size={16} /> Joined Waitlist
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openModal('Voice Studio Availability')}
                  className="vs-button vs-button-primary cursor-pointer"
                >
                  Join the Waitlist <ArrowUpRight size={16} />
                </button>
              )}
              <Link to="/docs/plugins/voice-studio" className="vs-button vs-button-outline">
                Explore Documentation <ArrowUpRight size={16} />
              </Link>
            </div>
            <span className="vs-availability-note">
              Join the waitlist for closed preview access, installer releases, and product updates.
            </span>
          </div>
        </section>
      </main>

      {/* Footer with official Vampro logo and updated internal routing */}
      <footer className="vs-footer">
        <div className="vs-wrap">
          <div className="vs-footer-top">
            <div>
              <Link to="/" className="flex items-center gap-3 cursor-pointer group" title="Vampro Homepage">
                <img
                  src="/header.png"
                  alt="Vampro Logo"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-xl shadow-md object-cover border border-slate-200/20 group-hover:scale-105 transition-transform duration-300"
                  decoding="async"
                />
                <span className="font-bank-gothic text-xl tracking-[0.12em] text-white font-bold" style={{ fontWeight: 700 }}>
                  VAMPRO
                </span>
                <span className="hidden md:inline-flex items-center justify-center text-[11px] leading-normal uppercase tracking-[0.28em] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-400 bg-white/5 text-indigo-300 border border-indigo-500/20">
                  Creative Lab
                </span>
              </Link>
              <p>At the intersection of<br />creativity and technology.</p>
            </div>
            <div className="vs-footer-product">
              <span className="vs-micro">THE VAMPRO FAMILY</span>
              <Link to="/plugins/voice-generator">Voice Generator <ArrowUpRight size={12} /></Link>
              <Link to="/plugins/universal-paste">Universal Paste <ArrowUpRight size={12} /></Link>
              <span className="vs-footer-current">
                <span className="vs-status-dot" /> Voice Studio <small>STUDIO WORKFLOW</small>
              </span>
            </div>
            <div>
              <span className="vs-micro">EXPLORE</span>
              <Link to="/">The creative lab</Link>
              <Link to="/docs/plugins/voice-studio">Documentation</Link>
              <a href="mailto:support@vampro.in">Contact Vampro</a>
            </div>
            <div className="vs-footer-signal">
              <Volume2 size={18} />
              <span>A NEW FREQUENCY.<br />THE SAME CREATIVE SPIRIT.</span>
            </div>
          </div>
          <div className="vs-footer-bottom">
            <span>© {new Date().getFullYear()} Vampro. All rights reserved.</span>
            <span>
              <Link to="/plugins/voice-studio/privacy">Privacy</Link>
              <Link to="/plugins/voice-studio/terms">Terms</Link>
              <Link to="/plugins/voice-studio/licenses">Licenses</Link>
              <a href="#main">Back to top <ArrowUpRight size={12} /></a>
            </span>
            <span>DESIGNED FOR CREATORS.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
