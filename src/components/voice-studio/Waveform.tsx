import type { CSSProperties } from 'react';

export function Waveform({ compact = false, active = false, variant = 0 }: { compact?: boolean; active?: boolean; variant?: number }) {
  const count = compact ? 46 : 80;
  return <div className={`vs-waveform ${active ? 'is-active' : ''}`} aria-hidden="true">
    {Array.from({ length: count }, (_, i) => {
      const envelope = Math.sin(Math.PI * i / count);
      const height = 8 + envelope * (18 + Math.abs(Math.sin(i * 1.93 + variant) * Math.cos(i * .31)) * 76);
      return <i key={i} style={{ height: `${height}%`, '--delay': `${-(i % 12) * .12}s` } as CSSProperties} />;
    })}
  </div>;
}

export function SoundSculpture({ paused }: { paused: boolean }) {
  return <div className={`vs-sculpture ${paused ? 'is-paused' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 620 520" fill="none">
      <defs>
        <linearGradient id="vs-ribbon" x1="170" y1="60" x2="440" y2="480" gradientUnits="userSpaceOnUse"><stop stopColor="#3b7555"/><stop offset=".28" stopColor="#bdfbd2"/><stop offset=".5" stopColor="#66d28c"/><stop offset=".78" stopColor="#126b39"/><stop offset="1" stopColor="#c7ffbf"/></linearGradient>
        <radialGradient id="vs-halo"><stop stopColor="#46cf78" stopOpacity=".16"/><stop offset="1" stopColor="#46cf78" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="310" cy="270" rx="285" ry="240" fill="url(#vs-halo)"/>
      <g className="vs-ribbon-group">
        {Array.from({ length: 57 }, (_, i) => {
          const t = i / 56;
          const x = 65 + t * 490;
          const swell = Math.pow(Math.sin(t * Math.PI), .65);
          const bend = Math.sin(t * Math.PI * 2 + .4) * 43;
          const height = 22 + swell * (95 + 78 * Math.pow(Math.sin(t * Math.PI * 2.6), 2));
          return <path key={i} d={`M ${x.toFixed(2)} ${(260 - height + bend).toFixed(2)} C ${(x-34*swell).toFixed(2)} ${(240-height/2+bend).toFixed(2)}, ${(x+42*swell).toFixed(2)} ${(280+height/2+bend).toFixed(2)}, ${x.toFixed(2)} ${(260+height+bend).toFixed(2)}`} stroke="url(#vs-ribbon)" strokeWidth={2.5} strokeLinecap="round" opacity={.45 + swell * .55} />;
        })}
      </g>
      <path d="M35 270H585" stroke="#8df4ad" strokeOpacity=".1" strokeDasharray="2 7"/>
      <circle cx="310" cy="270" r="222" stroke="#67ab7d" strokeOpacity=".1"/>
      <path d="M310 25V44M310 492V510M54 270H73M548 270H566" stroke="#72b288" strokeOpacity=".5"/>
    </svg>
  </div>;
}
