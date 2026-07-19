// Shared wireframe/blueprint SVG primitives for the homepage scenes.
// Everything is monochrome, thin-stroked, and drawn to be animated
// (paths use pathLength=1 so stroke draws scrub cleanly from 1 → 0).

export const CornerMarks = ({ inset = 10, size = 14, className = '' }: { inset?: number; size?: number; className?: string }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} style={{ padding: inset }}>
    <span className="absolute border-t border-l border-[var(--bp-accent)]/50" style={{ top: inset, left: inset, width: size, height: size }} />
    <span className="absolute border-t border-r border-[var(--bp-accent)]/50" style={{ top: inset, right: inset, width: size, height: size }} />
    <span className="absolute border-b border-l border-[var(--bp-accent)]/50" style={{ bottom: inset, left: inset, width: size, height: size }} />
    <span className="absolute border-b border-r border-[var(--bp-accent)]/50" style={{ bottom: inset, right: inset, width: size, height: size }} />
  </span>
);

// Crosshair registration mark, like on printed proofs
export const RegMark = ({ x, y, r = 7 }: { x: number; y: number; r?: number }) => (
  <g className="bp-stroke-dim">
    <circle cx={x} cy={y} r={r} />
    <line x1={x - r * 1.6} y1={y} x2={x + r * 1.6} y2={y} />
    <line x1={x} y1={y - r * 1.6} x2={x} y2={y + r * 1.6} />
  </g>
);

// A drawable line/path: starts undrawn, animate strokeDashoffset 1 → 0
export const DrawPath = ({ d, dim = false, dataAnim }: { d: string; dim?: boolean; dataAnim?: string }) => (
  <path
    d={d}
    pathLength={1}
    className={dim ? 'bp-stroke-dim' : 'bp-stroke'}
    style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
    data-anim={dataAnim}
  />
);

// Simple sketch motifs for storyboard frames — deliberately naive line drawings
const sketches: Record<string, React.ReactNode> = {
  mountains: (
    <>
      <polyline points="4,44 22,20 34,34 46,14 60,44" className="bp-stroke" />
      <circle cx="50" cy="12" r="4" className="bp-stroke-dim" />
    </>
  ),
  figure: (
    <>
      <circle cx="32" cy="16" r="6" className="bp-stroke" />
      <line x1="32" y1="22" x2="32" y2="36" className="bp-stroke" />
      <polyline points="22,30 32,26 42,30" className="bp-stroke" />
      <polyline points="26,46 32,36 38,46" className="bp-stroke" />
    </>
  ),
  camera: (
    <>
      <rect x="14" y="18" width="26" height="18" rx="2" className="bp-stroke" />
      <polygon points="40,22 52,16 52,38 40,32" className="bp-stroke" />
      <circle cx="22" cy="27" r="4" className="bp-stroke-dim" />
    </>
  ),
  screen: (
    <>
      <rect x="10" y="14" width="44" height="26" rx="2" className="bp-stroke" />
      <line x1="10" y1="46" x2="54" y2="46" className="bp-stroke-dim" />
      <polygon points="28,22 38,27 28,32" className="bp-stroke" />
    </>
  ),
  wave: (
    <>
      <polyline points="6,28 14,18 22,36 30,14 38,40 46,20 58,28" className="bp-stroke" />
    </>
  ),
  grid: (
    <>
      <rect x="12" y="12" width="40" height="30" className="bp-stroke" />
      <line x1="32" y1="12" x2="32" y2="42" className="bp-stroke-dim" />
      <line x1="12" y1="27" x2="52" y2="27" className="bp-stroke-dim" />
    </>
  )
};

export type SketchKind = keyof typeof sketches;

// A storyboard frame: numbered, thin border, sketch inside
export const SketchFrame = ({ n, kind, label, dataAnim }: { n: string; kind: SketchKind; label?: string; dataAnim?: string }) => (
  <div data-anim={dataAnim} className="bp-card relative p-2 flex flex-col gap-1">
    <div className="flex items-center justify-between px-1">
      <span className="bp-label">FR {n}</span>
      {label && <span className="bp-label text-[var(--bp-accent)]/40">{label}</span>}
    </div>
    <svg viewBox="0 0 64 52" className="w-full" aria-hidden="true">
      {sketches[kind]}
    </svg>
  </div>
);

// Audio waveform made of vertical bars (heights deterministic, not random —
// nothing on a blueprint is accidental)
export const WaveformBars = ({ bars = 48, height = 56, dataAnim }: { bars?: number; height?: number; dataAnim?: string }) => {
  const mid = height / 2;
  return (
    <svg viewBox={`0 0 ${bars * 6} ${height}`} className="w-full" preserveAspectRatio="none" aria-hidden="true" data-anim={dataAnim}>
      {Array.from({ length: bars }, (_, i) => {
        const h = (Math.sin(i * 0.9) * 0.35 + Math.sin(i * 0.37 + 1.2) * 0.4 + 0.85) * mid * 0.8 + 3;
        return (
          <line
            key={i}
            x1={i * 6 + 3}
            x2={i * 6 + 3}
            y1={mid - h / 2}
            y2={mid + h / 2}
            className="bp-stroke"
            data-anim="wave-bar"
          />
        );
      })}
    </svg>
  );
};

// Blueprint dimension line with end ticks:  |———— label ————|
export const DimLine = ({ label, className = '' }: { label?: string; className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
    <span className="w-px h-3 bg-[var(--bp-accent)]/40" />
    <span className="flex-1 h-px bg-[var(--bp-accent)]/25" />
    {label && <span className="bp-label whitespace-nowrap">{label}</span>}
    <span className="flex-1 h-px bg-[var(--bp-accent)]/25" />
    <span className="w-px h-3 bg-[var(--bp-accent)]/40" />
  </div>
);
