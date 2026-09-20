import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownToLine, AudioLines, Check, ChevronDown, FileAudio, FileText, Mic, Music, Pause, Play, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Waveform } from './Waveform';

type Mode = {
  label: string;
  icon: LucideIcon;
  hint: string;
  done: string;
  file: string;
  kind: 'clone' | 'voice' | 'script' | 'convert' | 'noise' | 'stems';
  control: string;
  low: string;
  high: string;
  defaultValue: number;
};

type AudioSession = {
  context: AudioContext;
  sources: AudioScheduledSourceNode[];
  timeout: number;
};

const modes: Mode[] = [
  { label: 'Voice cloning', icon: Mic, hint: 'Start with a clean reference and shape it into a reusable studio voice.', done: 'Voice reference ready', file: 'Narrator - custom voice', kind: 'clone', control: 'Clone match', low: 'Original reference', high: 'Studio voice', defaultValue: 72 },
  { label: 'Voice preview', icon: Play, hint: 'Audition a polished local voice before you build a take.', done: 'Voice preview ready', file: 'Studio voice - preview.wav', kind: 'voice', control: 'Delivery tone', low: 'Warm', high: 'Bright', defaultValue: 58 },
  { label: 'Text to speech', icon: FileText, hint: 'Turn a script into a clean spoken take for the edit.', done: 'Voiceover take ready', file: 'Brand film - narration.wav', kind: 'script', control: 'Read energy', low: 'Calm', high: 'Directed', defaultValue: 62 },
  { label: 'Speech to speech', icon: AudioLines, hint: 'Keep the performance and reshape the voice.', done: 'Converted take ready', file: 'Interview - new voice.wav', kind: 'convert', control: 'Voice transfer', low: 'Source voice', high: 'Target voice', defaultValue: 68 },
  { label: 'Noise reduction', icon: SlidersHorizontal, hint: 'Pull background noise down while keeping the speaker present.', done: 'Cleaned take ready', file: 'Interview - noise reduced.wav', kind: 'noise', control: 'Noise cleanup', low: 'Raw room', high: 'Clean studio', defaultValue: 74 },
  { label: 'Vocal separation', icon: Music, hint: 'Separate voice and music so each stem can be reviewed clearly.', done: 'Voice and music stems ready', file: 'Song - vocal and music stems', kind: 'stems', control: 'Stem focus', low: 'Music bed', high: 'Vocal stem', defaultValue: 64 },
];

export default function StudioDemo() {
  const [mode, setMode] = useState(0);
  const [stage, setStage] = useState<'idle' | 'playing' | 'ready' | 'inserted'>('idle');
  const [script, setScript] = useState('Every great story begins with a voice. Make yours unforgettable.');
  const [voice, setVoice] = useState('Studio narrator');
  const [source, setSource] = useState('Timeline clip');
  const [settings, setSettings] = useState(() => modes.map(mode => mode.defaultValue));
  const audio = useRef<AudioSession | null>(null);
  const item = modes[mode];
  const value = settings[mode];

  const stopAudio = () => {
    const session = audio.current;
    if (!session) return;
    clearTimeout(session.timeout);
    session.sources.forEach(source => { try { source.stop(); } catch { /* source already stopped */ } });
    void session.context.close();
    audio.current = null;
    setStage(current => current === 'playing' ? 'ready' : current);
  };

  const reset = () => { stopAudio(); setStage('idle'); };
  useEffect(() => () => stopAudio(), []);

  const setCurrentValue = (next: number) => {
    setSettings(values => values.map((entry, index) => index === mode ? next : entry));
    if (stage !== 'playing') setStage('idle');
  };

  const createNoise = (context: AudioContext, seconds: number) => {
    const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    const source = context.createBufferSource();
    source.buffer = buffer;
    return source;
  };

  const playPreview = async () => {
    if (audio.current) { stopAudio(); return; }
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const context = new AudioCtor(), master = context.createGain();
    master.gain.value = .78;
    master.connect(context.destination);
    const sources: AudioScheduledSourceNode[] = [];
    const amount = value / 100;
    try {
      const response = await fetch('/forest-demo.wav');
      const buffer = await context.decodeAudioData(await response.arrayBuffer());
      const makeVoice = (gainValue: number, rate = 1, filterFrequency = 3600) => {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = rate;
        const filter = context.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = filterFrequency;
        const gain = context.createGain();
        gain.gain.value = gainValue;
        source.connect(filter).connect(gain).connect(master);
        source.start();
        sources.push(source);
      };
      if (item.kind === 'noise') {
        makeVoice(.72, 1, 2600 + amount * 3600);
        const noise = createNoise(context, 4);
        const noiseFilter = context.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 520;
        const noiseGain = context.createGain();
        noiseGain.gain.value = Math.max(.025, (1 - amount) * .32);
        noise.connect(noiseFilter).connect(noiseGain).connect(master);
        noise.start();
        sources.push(noise);
      } else if (item.kind === 'stems') {
        makeVoice(.22 + amount * .62, 1, 4200);
        [164.81, 220, 277.18].forEach((frequency, index) => {
          const osc = context.createOscillator();
          osc.type = index === 0 ? 'sine' : 'triangle';
          osc.frequency.value = frequency;
          const gain = context.createGain();
          gain.gain.value = (1 - amount) * (index === 0 ? .13 : .055);
          osc.connect(gain).connect(master);
          osc.start();
          sources.push(osc);
        });
      } else if (item.kind === 'clone' || item.kind === 'convert') {
        makeVoice((1 - amount) * .42, .98, 2600);
        makeVoice(.3 + amount * .48, 1 + amount * .055, 3600 + amount * 2500);
      } else {
        makeVoice(.75, .94 + amount * .12, 3000 + amount * 3200);
      }
      setStage('playing');
      const timeout = window.setTimeout(() => {
        const session = audio.current;
        if (!session) return;
        audio.current = null;
        session.sources.forEach(source => { try { source.stop(); } catch { /* ended naturally */ } });
        void session.context.close();
        setStage('ready');
      }, 3600);
      audio.current = { context, sources, timeout };
    } catch {
      void context.close();
      setStage('idle');
    }
  };

  const selectMode = (index: number) => {
    stopAudio();
    setStage('idle');
    setMode(index);
  };

  const sourceName = item.kind === 'stems' ? 'Song mix - original.wav' : source === 'Microphone take' ? 'Performance - microphone take' : 'Interview - original audio';
  const targetLabel = item.kind === 'clone' ? 'VOICE LIBRARY' : item.kind === 'stems' ? 'STEM PREVIEW' : 'EDITING TIMELINE';

  return <div className="vs-console">
    <div className="vs-console-top"><div><span className="vs-console-logo"><AudioLines size={19}/></span><strong>Voice Studio</strong><span className="vs-console-tag">Workflow preview</span></div><span className="vs-online"><i/> Local workspace</span></div>
    <div className="vs-console-body">
      <div className="vs-console-sidebar"><span className="vs-micro">Your studio</span>
        <div className="vs-demo-tabs" role="tablist" aria-label="Explore Voice Studio workflows" aria-orientation="vertical">
          {modes.map((m, index) => <button key={m.label} role="tab" id={`vs-tab-${index}`} aria-selected={mode === index} aria-controls="vs-demo-panel" tabIndex={mode === index ? 0 : -1} onKeyDown={e => {
            let next = index;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % modes.length;
            else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index + modes.length - 1) % modes.length;
            else if (e.key === 'Home') next = 0;
            else if (e.key === 'End') next = modes.length - 1;
            else return;
            e.preventDefault(); selectMode(next); document.getElementById(`vs-tab-${next}`)?.focus();
          }} onClick={() => selectMode(index)}><m.icon size={17}/><span>{m.label}</span>{mode === index && <i/>}</button>)}
        </div>
        <div className="vs-sidebar-foot"><span className="vs-micro">Creative control</span><p>One workspace.<br/>Every part of your voice.</p><div className="vs-mini-meter">{Array.from({length:20}, (_,i)=><i key={i} style={{opacity:i > 14 ? .15 : 1}}/>)}</div></div>
      </div>
      <div className="vs-demo-main" role="tabpanel" id="vs-demo-panel" aria-labelledby={`vs-tab-${mode}`}>
        <div className="vs-demo-heading"><div><span className="vs-micro">0{mode + 1} / Create</span><h3>{item.label}</h3><p>{item.hint}</p></div><button className="vs-icon-button" aria-label="Reset workflow preview" onClick={reset}><RotateCcw size={16}/></button></div>
        <div className="vs-demo-inputs">
          {item.kind === 'script' ? <label className="vs-script-label"><span>Your script <small>{script.length}/500</small></span><textarea maxLength={500} value={script} onChange={e => { reset(); setScript(e.target.value); }} aria-label="Preview script"/><span className="vs-script-foot">English <FileText size={12}/></span></label> : <div className="vs-source-input"><div className="vs-source-select"><label htmlFor="vs-source">Reference source</label><select id="vs-source" value={source} onChange={e => {reset();setSource(e.target.value);}}><option>Timeline clip</option><option>Project bin</option><option>Imported recording</option>{item.kind === 'convert' && <option>Microphone take</option>}</select></div><div className="vs-source-file"><FileAudio size={22}/><div><strong>{sourceName}</strong><span>Playable source - 00:08</span></div><Waveform compact active={stage === 'playing'} variant={mode}/></div></div>}
          <div className="vs-voice-setting"><label htmlFor={item.kind === 'noise' || item.kind === 'stems' ? undefined : 'vs-voice'}>{item.kind === 'noise' ? 'Processing' : item.kind === 'stems' ? 'Stem target' : 'Voice profile'}</label><div className="vs-voice-select"><div className="vs-avatar"><AudioLines size={19}/></div>{item.kind === 'noise' ? <div><strong>Local noise reduction</strong><span>Spectral cleanup preview</span></div> : item.kind === 'stems' ? <div><strong>Vocals + music</strong><span>Two-stem separation</span></div> : <div><select id="vs-voice" value={voice} onChange={e=>{reset();setVoice(e.target.value);}}><option>Studio narrator</option><option>Documentary voice</option><option>Brand voice</option></select><span>Local voice profile</span></div>}{item.kind !== 'noise' && item.kind !== 'stems' && <ChevronDown size={13}/>}</div></div>
        </div>
        <div className="vs-process-strip">
          <div className="vs-slider-head"><span>{item.control}</span><strong>{value}%</strong></div>
          <input type="range" min="0" max="100" value={value} aria-label={item.control} onChange={e => setCurrentValue(Number(e.target.value))}/>
          <div className="vs-slider-scale"><span>{item.low}</span><span>{item.high}</span></div>
        </div>
        <div className={`vs-take ${stage !== 'idle' ? 'vs-take-active' : ''}`}><button className="vs-preview-play" onClick={() => void playPreview()} aria-label={stage === 'playing' ? 'Stop audio preview' : `Play ${item.label} audio preview`}>{stage === 'playing' ? <Pause size={15}/> : <Play size={15}/>}<span>{stage === 'playing' ? 'Stop' : 'Play'}</span></button><div className="vs-take-content"><div role="status" aria-live="polite"><span>{stage === 'idle' ? 'Move the slider, then play the preview' : stage === 'playing' ? 'Playing live preview...' : item.done}</span><small>{stage === 'idle' ? 'READY' : stage === 'playing' ? 'AUDIO' : 'PREVIEW READY'}</small></div><Waveform compact active={stage === 'playing'} variant={mode}/></div></div>
        <div className="vs-demo-bottom"><span><span className="vs-status-dot"/> Playable local audio preview</span><button disabled={stage === 'idle' || stage === 'playing'} className="vs-text-button" onClick={()=>setStage('inserted')}>{stage === 'inserted' ? <Check size={14}/> : <ArrowDownToLine size={14}/>} {stage === 'inserted' ? (item.kind === 'clone' ? 'Saved to library' : 'Saved to workspace') : (item.kind === 'clone' ? 'Add to library' : 'Send to workspace')}</button></div>
      </div>
    </div>
    <div className="vs-demo-timeline"><div className="vs-timeline-label"><AudioLines size={15}/><span>{targetLabel}</span></div><div className="vs-timeline-tracks"><div className="vs-time-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span></div><div className="vs-timeline-clip"><span>A1</span><div className={stage === 'inserted' ? 'is-inserted' : ''}>{stage === 'inserted' ? <><AudioLines size={13}/>{item.kind === 'clone' ? voice + ' - custom voice' : item.file}<Waveform compact/></> : <span>Your {item.kind === 'clone' ? 'voice reference' : item.kind === 'stems' ? 'stems' : 'finished take'} belongs here.</span>}</div></div><i className="vs-playhead"/></div></div>
  </div>;
}
