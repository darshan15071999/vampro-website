import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, CloudRain, Maximize, Minimize, MoveDown, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { stations, stationProgress } from './journeyData';
import type { JourneyScene } from './forestScene';
import { Waveform } from './Waveform';
import './ForestJourney.css';

function StationPanel({ index }: { index: number }) {
  const station = stations[index];
  const [selected, setSelected] = useState(0);
  return <article className="fpv-panel-content" aria-label={`${station.label} station`}>
    <div className="fpv-panel-top"><span>VAMPRO / VOICE STUDIO</span><span>0{index + 1} — 06</span></div>
    <div className="fpv-panel-heading"><span>{station.label}</span><h2>{station.title}</h2><p>{station.text}</p></div>
    <div className={`fpv-panel-display fpv-panel-display-${station.type}`} aria-hidden="true"><span>{station.lines[selected]}</span><Waveform compact variant={index + selected}/><span className="fpv-display-status">{selected === 0 ? 'SOURCE' : selected === 1 ? 'SHAPE' : 'OUTPUT'}<i/></span></div>
    <div className="fpv-panel-steps" role="group" aria-label={`${station.label} workflow`}>{station.lines.map((line, step) => <button key={line} aria-label={line} aria-pressed={selected === step} onClick={() => setSelected(step)}><span>0{step + 1}</span>{['Source', 'Shape', 'Output'][step]}</button>)}</div>
    <div className="fpv-panel-bottom"><small>{station.detail}</small><a href="#capabilities">Explore tools <ArrowUpRight size={13}/></a></div>
  </article>;
}

export default function ForestJourney() {
  const section = useRef<HTMLElement>(null), host = useRef<HTMLDivElement>(null), scene = useRef<JourneyScene | null>(null);
  const intro = useRef<HTMLDivElement>(null), lens = useRef<HTMLDivElement>(null), progressBar = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false), [simple, setSimple] = useState(false);
  const [rain, setRain] = useState(true), [ambient, setAmbient] = useState(false), [stage, setStage] = useState(0), [station, setStation] = useState(-1);
  const [panels, setPanels] = useState<HTMLElement[]>([]);
  const stageRef = useRef(-1), stationRef = useRef(-2), progressRef = useRef(0);
  const reducedRef = useRef(false);
  const ambientRef = useRef<{
    context: AudioContext;
    master: GainNode;
    rainGain: GainNode;
    forestLowGain: GainNode;
    forestHighGain: GainNode;
    studioGain: GainNode;
    sources: AudioScheduledSourceNode[];
  } | null>(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = preference.matches;
    if (preference.matches) setSimple(true);
    const update = () => { reducedRef.current = preference.matches; if (preference.matches) setSimple(true); };
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (simple || failed || !host.current) return;
    let cancelled = false;
    let visibility: IntersectionObserver | undefined;
    const onScroll = () => {
      const element = section.current; if (!element) return;
      const rect = element.getBoundingClientRect();
      const height = element.offsetHeight - window.innerHeight;
      scene.current?.setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(1, height))));
    };
    import('./forestScene').then(({ createForestScene }) => {
      if (cancelled || !host.current) return;
      try {
        scene.current = createForestScene(host.current, progress => {
          progressRef.current = progress;
          updateAmbient(progress);
          if (intro.current) { intro.current.style.opacity = String(Math.max(0, 1 - progress / .105)); intro.current.inert = progress > .08; }
          if (lens.current) lens.current.style.opacity = String(Math.max(0, 1 - (progress - .3) / .1));
          if (progressBar.current) progressBar.current.style.transform = `scaleX(${progress})`;
          const nextStage = progress < .12 ? 0 : progress < .3 ? 1 : progress < .46 ? 2 : 3;
          const nextStation = progress >= .478 && progress < .97 ? Math.max(0, Math.min(5, Math.floor((progress - .478) / .08))) : -1;
          if (nextStage !== stageRef.current) { stageRef.current = nextStage; setStage(nextStage); }
          if (nextStation !== stationRef.current) { stationRef.current = nextStation; setStation(nextStation); }
        }, () => setFailed(true));
        scene.current.setReduced(reducedRef.current);
        setPanels(scene.current.panels); setReady(true); onScroll();
        visibility = new IntersectionObserver(entries => scene.current?.setActive(entries[0].isIntersecting));
        if (section.current) visibility.observe(section.current);
      } catch { setFailed(true); }
    }).catch(() => setFailed(true));
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { cancelled = true; window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); visibility?.disconnect(); scene.current?.dispose(); scene.current = null; setPanels([]); setReady(false); };
  }, [simple, failed]);
  useEffect(() => { scene.current?.setRain(rain); }, [rain, ready]);
  useEffect(() => { if ((simple || failed) && intro.current) intro.current.inert = false; }, [simple, failed]);
  useEffect(() => () => stopAmbient(), []);

  const stopAmbient = () => {
    const session = ambientRef.current;
    if (!session) return;
    session.master.gain.cancelScheduledValues(session.context.currentTime);
    session.master.gain.setTargetAtTime(0, session.context.currentTime, .08);
    window.setTimeout(() => {
      session.sources.forEach(source => { try { source.stop(); } catch { /* already stopped */ } });
      void session.context.close();
    }, 260);
    ambientRef.current = null;
    setAmbient(false);
  };

  const updateAmbient = (progress: number) => {
    const session = ambientRef.current;
    if (!session) return;
    const now = session.context.currentTime;
    const inside = Math.max(0, Math.min(1, (progress - .34) / .18));
    const panelRun = Math.max(0, Math.min(1, (progress - .48) / .42));
    session.rainGain.gain.setTargetAtTime(.36 * (1 - inside) + .035 * inside, now, .16);
    session.forestLowGain.gain.setTargetAtTime(.026 * (1 - inside) + .006 * inside, now, .16);
    session.forestHighGain.gain.setTargetAtTime(.013 * (1 - inside) + .002 * inside, now, .16);
    session.studioGain.gain.setTargetAtTime((.015 + panelRun * .035) * inside, now, .18);
  };

  const startAmbient = () => {
    if (ambientRef.current) return;
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const context = new AudioCtor(), master = context.createGain();
    master.gain.value = 0; master.connect(context.destination);
    const noiseBuffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const samples = noiseBuffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * .42;
    const rainSource = context.createBufferSource(); rainSource.buffer = noiseBuffer; rainSource.loop = true;
    const rainFilter = context.createBiquadFilter(); rainFilter.type = 'highpass'; rainFilter.frequency.value = 850;
    const rainGain = context.createGain(); rainGain.gain.value = .34;
    rainSource.connect(rainFilter).connect(rainGain).connect(master);
    const forestLow = context.createOscillator(); forestLow.type = 'sine'; forestLow.frequency.value = 174;
    const forestLowGain = context.createGain(); forestLowGain.gain.value = .025;
    forestLow.connect(forestLowGain).connect(master);
    const forestHigh = context.createOscillator(); forestHigh.type = 'triangle'; forestHigh.frequency.value = 1180;
    const forestHighGain = context.createGain(); forestHighGain.gain.value = .012;
    forestHigh.connect(forestHighGain).connect(master);
    const studioHum = context.createOscillator(); studioHum.type = 'sine'; studioHum.frequency.value = 92;
    const studioAir = context.createOscillator(); studioAir.type = 'triangle'; studioAir.frequency.value = 246;
    const studioGain = context.createGain(); studioGain.gain.value = 0;
    studioHum.connect(studioGain); studioAir.connect(studioGain); studioGain.connect(master);
    rainSource.start(); forestLow.start(); forestHigh.start(); studioHum.start(); studioAir.start();
    master.gain.setTargetAtTime(.42, context.currentTime, .2);
    ambientRef.current = { context, master, rainGain, forestLowGain, forestHighGain, studioGain, sources: [rainSource, forestLow, forestHigh, studioHum, studioAir] };
    updateAmbient(progressRef.current);
    setAmbient(true);
  };

  const toggleAmbient = () => ambientRef.current ? stopAmbient() : startAmbient();

  const go = (progress: number) => {
    if (!section.current) return;
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const distance = section.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * progress, behavior: reducedRef.current ? 'instant' : 'smooth' });
  };
  const toggleSimple = () => {
    const top = (section.current?.getBoundingClientRect().top || 0) + window.scrollY;
    setSimple(!simple); stageRef.current = -1; stationRef.current = -2; setStage(0); setStation(-1);
    window.scrollTo({ top, behavior: 'instant' });
  };
  const fallback = simple || failed;
  const stageNames = ['Above the canopy', 'Through the wild', 'Enter the studio', 'Find your new frequency'];

  return <section id="journey" ref={section} className={`fpv-journey ${ready ? 'is-ready' : ''} ${fallback ? 'is-simple' : ''}`} aria-label="Forest to studio experience">
    <div className="fpv-viewport">
      <div className="fpv-poster"/>
      <div ref={host} className="fpv-scene"/>
      <div className="fpv-vignette"/>
      <div ref={lens} className={`fpv-lens ${rain && !fallback ? '' : 'is-dry'}`} aria-hidden="true">{Array.from({ length: 19 }, (_, i) => <i key={i} style={{ left: `${(i * 31 + 7) % 100}%`, top: `${(i * 17 + 9) % 93}%`, width: `${4 + i % 5 * 2}px`, height: `${9 + i % 4 * 5}px`, animationDelay: `${-i * 1.4}s` }}/>)}</div>
      <div className="fpv-topline fpv-controls-only"><div><button aria-pressed={ambient} onClick={toggleAmbient} disabled={fallback} aria-label={ambient ? 'Turn forest sound off' : 'Turn forest sound on'}>{ambient ? <Volume2 size={15}/> : <VolumeX size={15}/>}<span>Sound {ambient ? 'on' : 'off'}</span></button><button aria-pressed={rain} onClick={() => setRain(!rain)} disabled={fallback} aria-label={rain ? 'Turn rain off' : 'Turn rain on'}><CloudRain size={15}/><span>Rain {rain ? 'on' : 'off'}</span></button><button onClick={toggleSimple} aria-pressed={simple}>{simple ? <Maximize size={14}/> : <Minimize size={14}/>}<span>{simple ? 'Immersive view' : 'Simple view'}</span></button><a href="#benefits">Skip journey <ArrowUpRight size={13}/></a></div></div>
      <div className="fpv-intro" ref={intro} style={fallback ? { opacity: 1 } : undefined}>
        <span className="fpv-kicker">FROM UNTAMED SOUND TO YOUR NEXT GREAT TAKE</span>
        <h1>Raw sound.<br/><em>Refined by you.</em></h1>
        <p>A world of sound. A studio at its heart.<br/>Clone voices, create narration and clean your audio inside a premium green studio built for your edit.</p>
        {fallback ? <a href="#availability" className="fpv-enter">Explore Voice Studio <ArrowRight size={16}/></a> : <button className="fpv-enter" onClick={() => { startAmbient(); go(.24); }}>Enter the studio <ArrowDown size={17}/></button>}
      </div>
      {!fallback && <>
        <div className={`fpv-location ${stage === 0 || station >= 0 ? 'is-hidden' : ''}`}><span>0{stage + 1} / THE JOURNEY</span><h2>{stageNames[stage]}</h2><p>{stage === 1 ? 'Follow the sound. Find the clearing.' : stage === 2 ? 'The wild outside. Precision within.' : 'Six tools. One creative space.'}</p></div>
        <div className="fpv-scroll-cue"><MoveDown size={17}/><span>{stage < 3 ? 'SCROLL TO EXPLORE' : station < 5 ? 'SCROLL TO THE NEXT STATION' : 'SCROLL TO CONTINUE'}</span></div>
        <div className="fpv-bottom"><div className="fpv-chapter-label"><span>{station >= 0 ? `0${station + 1} / 06` : 'THE JOURNEY'}</span><strong>{station >= 0 ? stations[station].label : stageNames[stage]}</strong></div><nav aria-label="Journey chapters" className="fpv-chapters"><button aria-label="Return to aerial forest" aria-current={stage === 0 ? 'step' : undefined} onClick={() => go(0)}><RotateCcw size={13}/></button><button aria-label="Fly through the forest" aria-current={stage === 1 ? 'step' : undefined} onClick={() => go(.24)}>Forest</button><button aria-label="Enter the studio" aria-current={stage === 2 ? 'step' : undefined} onClick={() => go(.44)}>Studio</button>{stations.map((s, i) => <button key={s.label} aria-label={`Visit ${s.label} panel`} aria-current={station === i ? 'step' : undefined} onClick={() => go(stationProgress(i))}><span>0{i + 1}</span><span className="fpv-chapter-tooltip">{s.label}</span></button>)}<a href="#benefits" aria-label="Continue to page content"><ArrowRight size={15}/></a></nav><span className="fpv-development"><i /> COMING SOON</span></div>
        <div className="fpv-progress"><div ref={progressBar}/></div>
      </>}
      {failed && <span className="fpv-fallback-message">Immersive view is unavailable on this browser. Explore every tool below.</span>}
      {!ready && !fallback && <span className="fpv-loading" role="status">Preparing your studio…</span>}
    </div>
    {panels.map((container, index) => createPortal(<StationPanel index={index}/>, container, `station-${index}`))}
    <noscript><p className="fpv-nojs">Scroll down to explore all Voice Studio features. The immersive journey needs JavaScript.</p></noscript>
  </section>;
}
