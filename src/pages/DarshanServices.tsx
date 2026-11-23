import { useMemo, useRef, useState, type PointerEvent } from 'react';
import {
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Code,
  Cpu,
  Film,
  Globe,
  Megaphone,
  PenTool,
  Smartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

type VisualKind =
  | 'orbit'
  | 'timeline'
  | 'grid'
  | 'viewfinder'
  | 'filmstrip'
  | 'browser'
  | 'mobile'
  | 'code'
  | 'rig'
  | 'circuit';

type CyclePhase = 'Ideation' | 'Creation' | 'Execution' | 'Positioning';

interface ServiceItem {
  id: string;
  index: string;
  groupIndex: '01' | '02';
  groupTitle: string;
  icon: LucideIcon;
  title: string;
  description: string;
  visual: VisualKind;
  phases: CyclePhase[];
}

const cyclePhases: CyclePhase[] = ['Ideation', 'Creation', 'Execution', 'Positioning'];

const servicesData: ServiceItem[] = [
  {
    id: 'marketing',
    index: '01',
    groupIndex: '01',
    groupTitle: 'Creative production',
    icon: Megaphone,
    title: 'Marketing services',
    description: 'Campaign concepts, messaging and content planning built around what each audience needs to hear.',
    visual: 'orbit',
    phases: ['Ideation', 'Execution', 'Positioning'],
  },
  {
    id: 'video-editing',
    index: '02',
    groupIndex: '01',
    groupTitle: 'Creative production',
    icon: Film,
    title: 'Video editing',
    description: 'Shaping footage, sound and pacing into stories for social, campaigns and longer formats.',
    visual: 'timeline',
    phases: ['Creation', 'Execution'],
  },
  {
    id: 'design',
    index: '03',
    groupIndex: '01',
    groupTitle: 'Creative production',
    icon: PenTool,
    title: 'Design',
    description: 'Visual direction, campaign graphics and layouts that carry an idea consistently across formats.',
    visual: 'grid',
    phases: ['Ideation', 'Creation', 'Positioning'],
  },
  {
    id: 'shoots',
    index: '04',
    groupIndex: '01',
    groupTitle: 'Creative production',
    icon: Camera,
    title: 'Shoots',
    description: 'Planning and capturing photo and video for brands, people, spaces and live events.',
    visual: 'viewfinder',
    phases: ['Creation', 'Execution'],
  },
  {
    id: 'short-films',
    index: '05',
    groupIndex: '01',
    groupTitle: 'Creative production',
    icon: Clapperboard,
    title: 'Short films',
    description: 'Developing narrative ideas and carrying them through production, editing and the final cut.',
    visual: 'filmstrip',
    phases: ['Ideation', 'Creation', 'Execution'],
  },
  {
    id: 'web-development',
    index: '06',
    groupIndex: '02',
    groupTitle: 'Development & hardware',
    icon: Globe,
    title: 'Web development',
    description: 'Responsive websites, from portfolio and campaign pages to interactive web experiences.',
    visual: 'browser',
    phases: ['Creation', 'Execution', 'Positioning'],
  },
  {
    id: 'app-development',
    index: '07',
    groupIndex: '02',
    groupTitle: 'Development & hardware',
    icon: Smartphone,
    title: 'App development',
    description: 'Turning product ideas into apps with clear interfaces and practical workflows.',
    visual: 'mobile',
    phases: ['Ideation', 'Creation', 'Execution'],
  },
  {
    id: 'custom-software',
    index: '08',
    groupIndex: '02',
    groupTitle: 'Development & hardware',
    icon: Code,
    title: 'Custom software',
    description: 'Building tools around specific needs, including plugins, utilities and workflow automation.',
    visual: 'code',
    phases: ['Ideation', 'Creation', 'Execution'],
  },
  {
    id: 'camera-rigs',
    index: '09',
    groupIndex: '02',
    groupTitle: 'Development & hardware',
    icon: Wrench,
    title: 'Camera rigs',
    description: 'Designing and building camera setups around the movement, mounting and handling a shoot needs.',
    visual: 'rig',
    phases: ['Creation', 'Execution'],
  },
  {
    id: 'electronics',
    index: '10',
    groupIndex: '02',
    groupTitle: 'Development & hardware',
    icon: Cpu,
    title: 'Electronics',
    description: 'Prototyping and assembling electronic systems for custom hardware and creative projects.',
    visual: 'circuit',
    phases: ['Ideation', 'Creation', 'Execution'],
  },
];

const groupFilters = [
  { id: 'all', label: 'All' },
  { id: '01', label: 'Creative production' },
  { id: '02', label: 'Development & hardware' },
] as const;

type FilterId = (typeof groupFilters)[number]['id'];

function ServiceVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'orbit':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <circle cx="160" cy="85" r="24" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
          <circle cx="160" cy="85" r="48" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="4 4" />
          <circle cx="160" cy="85" r="72" stroke="currentColor" strokeOpacity="0.16" />
          <circle cx="160" cy="85" r="5" fill="currentColor" />
          <g className="darshan-svg-orbit">
            <circle cx="208" cy="85" r="4.5" fill="currentColor" />
            <circle cx="122" cy="52" r="3.5" fill="#f6f4ec" fillOpacity="0.85" />
            <circle cx="195" cy="144" r="3" fill="currentColor" fillOpacity="0.7" />
          </g>
          <path d="M56 128 L108 104 L160 85 L220 56 L266 38" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
        </svg>
      );
    case 'timeline':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <line x1="24" y1="36" x2="296" y2="36" stroke="currentColor" strokeOpacity="0.2" />
          <rect x="30" y="48" width="76" height="20" rx="4" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeOpacity="0.55" />
          <rect x="114" y="48" width="118" height="20" rx="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="240" y="48" width="50" height="20" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.45" />
          <rect x="52" y="78" width="104" height="18" rx="4" fill="#f6f4ec" fillOpacity="0.09" stroke="#f6f4ec" strokeOpacity="0.3" />
          <rect x="164" y="78" width="116" height="18" rx="4" fill="currentColor" fillOpacity="0.26" stroke="currentColor" strokeOpacity="0.6" />
          <path d="M32 124 Q52 104 72 124 T112 124 T152 124 T192 124 T232 124 T272 124 T292 124" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />
          <g className="darshan-svg-playhead">
            <line x1="140" y1="26" x2="140" y2="144" stroke="currentColor" strokeWidth="1.6" />
            <polygon points="134,26 146,26 140,35" fill="currentColor" />
          </g>
        </svg>
      );
    case 'grid':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <rect x="54" y="26" width="212" height="118" rx="6" stroke="currentColor" strokeOpacity="0.26" />
          <line x1="125" y1="26" x2="125" y2="144" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 4" />
          <line x1="195" y1="26" x2="195" y2="144" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 4" />
          <path d="M74 124 C112 42, 208 42, 246 124" stroke="currentColor" strokeWidth="1.6" className="darshan-svg-draw" />
          <line x1="74" y1="124" x2="118" y2="46" stroke="#f6f4ec" strokeOpacity="0.4" strokeDasharray="2 3" />
          <line x1="246" y1="124" x2="202" y2="46" stroke="#f6f4ec" strokeOpacity="0.4" strokeDasharray="2 3" />
          <circle cx="118" cy="46" r="4" fill="#f6f4ec" />
          <circle cx="202" cy="46" r="4" fill="#f6f4ec" />
          <rect x="70" y="120" width="8" height="8" fill="currentColor" />
          <rect x="242" y="120" width="8" height="8" fill="currentColor" />
          <circle cx="160" cy="62" r="5" fill="currentColor" />
        </svg>
      );
    case 'viewfinder':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <path d="M44 50 V32 H64 M276 50 V32 H256 M44 120 V138 H64 M276 120 V138 H256" stroke="currentColor" strokeWidth="1.8" />
          <line x1="120" y1="32" x2="120" y2="138" stroke="currentColor" strokeOpacity="0.16" />
          <line x1="200" y1="32" x2="200" y2="138" stroke="currentColor" strokeOpacity="0.16" />
          <line x1="44" y1="68" x2="276" y2="68" stroke="currentColor" strokeOpacity="0.16" />
          <line x1="44" y1="102" x2="276" y2="102" stroke="currentColor" strokeOpacity="0.16" />
          <g className="darshan-svg-pulse">
            <rect x="134" y="61" width="52" height="48" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="160" y1="77" x2="160" y2="93" stroke="currentColor" strokeWidth="1.2" />
            <line x1="152" y1="85" x2="168" y2="85" stroke="currentColor" strokeWidth="1.2" />
          </g>
          <circle cx="62" cy="46" r="3.5" fill="currentColor" />
        </svg>
      );
    case 'filmstrip':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <rect x="26" y="34" width="268" height="102" rx="6" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="44" y="52" width="68" height="66" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.3" />
          <rect x="126" y="48" width="84" height="74" rx="4" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.5" />
          <rect x="224" y="52" width="52" height="66" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.3" />
          <polygon points="161,76 161,94 176,85" fill="currentColor" />
          {[38, 66, 94, 122, 150, 178, 206, 234, 262].map((x) => (
            <g key={x}>
              <rect x={x} y="39" width="12" height="6" rx="1.5" fill="currentColor" fillOpacity="0.35" />
              <rect x={x} y="125" width="12" height="6" rx="1.5" fill="currentColor" fillOpacity="0.35" />
            </g>
          ))}
        </svg>
      );
    case 'browser':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <rect x="42" y="26" width="236" height="118" rx="8" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.3" />
          <line x1="42" y1="48" x2="278" y2="48" stroke="currentColor" strokeOpacity="0.25" />
          <circle cx="58" cy="37" r="3" fill="currentColor" />
          <circle cx="70" cy="37" r="3" fill="currentColor" fillOpacity="0.5" />
          <circle cx="82" cy="37" r="3" fill="currentColor" fillOpacity="0.28" />
          <rect x="58" y="60" width="92" height="36" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.5" />
          <rect x="160" y="60" width="102" height="70" rx="4" fill="#f6f4ec" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.32" />
          <rect x="58" y="104" width="92" height="26" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.28" />
        </svg>
      );
    case 'mobile':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <rect x="114" y="20" width="92" height="130" rx="14" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
          <rect x="146" y="28" width="28" height="4" rx="2" fill="currentColor" fillOpacity="0.4" />
          <rect x="126" y="42" width="68" height="32" rx="5" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeOpacity="0.5" />
          <rect x="126" y="82" width="31" height="28" rx="4" fill="#f6f4ec" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.3" />
          <rect x="163" y="82" width="31" height="28" rx="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="126" y="118" width="68" height="18" rx="4" fill="currentColor" fillOpacity="0.16" />
          <path d="M56 76 H102 M218 94 H264" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 4" />
          <circle cx="56" cy="76" r="4" fill="currentColor" />
          <circle cx="264" cy="94" r="4" fill="currentColor" />
        </svg>
      );
    case 'code':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <rect x="34" y="54" width="66" height="40" rx="6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.5" />
          <rect x="128" y="34" width="66" height="40" rx="6" fill="currentColor" fillOpacity="0.24" stroke="currentColor" strokeWidth="1.4" />
          <rect x="128" y="96" width="66" height="40" rx="6" fill="#f6f4ec" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="222" y="64" width="66" height="40" rx="6" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.5" />
          <path d="M100 74 C114 74, 114 54, 128 54 M100 74 C114 74, 114 116, 128 116 M194 54 C208 54, 208 84, 222 84 M194 116 C208 116, 208 84, 222 84" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.4" />
          <circle cx="100" cy="74" r="3" fill="currentColor" />
          <circle cx="222" cy="84" r="3" fill="currentColor" />
        </svg>
      );
    case 'rig':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <rect x="92" y="42" width="136" height="86" rx="10" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
          <rect x="124" y="58" width="72" height="54" rx="6" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="160" cy="85" r="18" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="160" cy="85" r="7" fill="currentColor" fillOpacity="0.45" />
          <line x1="68" y1="62" x2="68" y2="112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="252" y1="62" x2="252" y2="112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="85" x2="92" y2="85" stroke="currentColor" strokeWidth="1.5" />
          <line x1="228" y1="85" x2="252" y2="85" stroke="currentColor" strokeWidth="1.5" />
          <line x1="128" y1="28" x2="192" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="144" y1="28" x2="144" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <line x1="176" y1="28" x2="176" y2="42" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'circuit':
      return (
        <svg className="darshan-stage-svg" viewBox="0 0 320 170" fill="none" aria-hidden="true">
          <rect x="124" y="50" width="72" height="70" rx="8" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.5" />
          <rect x="142" y="68" width="36" height="34" rx="4" stroke="currentColor" strokeOpacity="0.55" />
          <path d="M52 60 H92 L106 72 H124 M44 96 H102 L114 85 H124 M58 124 H96 L114 106 H124" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
          <path d="M196 68 H222 L238 52 H272 M196 86 H266 M196 106 H224 L242 122 H276" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
          <circle cx="52" cy="60" r="3.5" fill="currentColor" />
          <circle cx="44" cy="96" r="3.5" fill="currentColor" />
          <circle cx="272" cy="52" r="3.5" fill="currentColor" />
          <circle cx="276" cy="122" r="3.5" fill="currentColor" />
        </svg>
      );
  }
}

export default function DarshanServices() {
  const [filter, setFilter] = useState<FilterId>('all');
  const [activeId, setActiveId] = useState<string>(servicesData[0].id);
  const stageRef = useRef<HTMLDivElement>(null);

  const visibleServices = useMemo(
    () => (filter === 'all' ? servicesData : servicesData.filter((s) => s.groupIndex === filter)),
    [filter]
  );

  const activeService = useMemo(
    () => visibleServices.find((s) => s.id === activeId) ?? visibleServices[0],
    [visibleServices, activeId]
  );

  const activePos = visibleServices.findIndex((s) => s.id === activeService.id);
  const ActiveIcon = activeService.icon;

  const groupedVisible = useMemo(() => {
    const groups: { groupIndex: '01' | '02'; title: string; items: ServiceItem[] }[] = [];
    for (const item of visibleServices) {
      let group = groups.find((g) => g.groupIndex === item.groupIndex);
      if (!group) {
        group = { groupIndex: item.groupIndex, title: item.groupTitle, items: [] };
        groups.push(group);
      }
      group.items.push(item);
    }
    return groups;
  }, [visibleServices]);

  function handleFilterChange(nextFilter: FilterId) {
    setFilter(nextFilter);
    const matching = nextFilter === 'all' ? servicesData : servicesData.filter((s) => s.groupIndex === nextFilter);
    if (!matching.some((s) => s.id === activeId) && matching.length > 0) {
      setActiveId(matching[0].id);
    }
  }

  function stepService(delta: number) {
    const nextIndex = (activePos + delta + visibleServices.length) % visibleServices.length;
    setActiveId(visibleServices[nextIndex].id);
  }

  function handleCardGlow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  function handleStagePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;
    stageRef.current.style.setProperty('--mx', `${x}px`);
    stageRef.current.style.setProperty('--my', `${y}px`);
    stageRef.current.style.setProperty('--rx', `${(-ny * 5).toFixed(2)}deg`);
    stageRef.current.style.setProperty('--ry', `${(nx * 6).toFixed(2)}deg`);
  }

  function handleStagePointerLeave() {
    if (!stageRef.current) return;
    stageRef.current.style.setProperty('--rx', '0deg');
    stageRef.current.style.setProperty('--ry', '0deg');
  }

  return (
    <section className="darshan-services" id="darshan-services" aria-labelledby="darshan-services-title" data-reveal>
      <div className="darshan-container">
        <div className="darshan-services-header">
          <h2 id="darshan-services-title">What I do</h2>
          <div className="darshan-service-filters" role="group" aria-label="Filter capabilities">
            {groupFilters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => handleFilterChange(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="darshan-services-console">
          <div className="darshan-services-columns">
            {groupedVisible.map((group) => (
              <div
                className="darshan-service-deck"
                key={group.groupIndex}
                onPointerMove={handleCardGlow}
              >
                <div className="darshan-service-deck-head">
                  <span className="darshan-group-index">{group.groupIndex}</span>
                  <h3>{group.title}</h3>
                </div>
                <ul className="darshan-service-cards">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.id === activeService.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="darshan-service-card"
                          aria-pressed={isActive}
                          onMouseEnter={() => setActiveId(item.id)}
                          onFocus={() => setActiveId(item.id)}
                          onClick={() => setActiveId(item.id)}
                        >
                          <span className="darshan-service-icon" aria-hidden="true">
                            <Icon size={19} strokeWidth={1.8} />
                          </span>
                          <span className="darshan-service-card-copy">
                            <span className="darshan-service-card-title">{item.title}</span>
                            <span className="darshan-service-card-desc">{item.description}</span>
                          </span>
                          <ArrowUpRight className="darshan-service-arrow" size={16} aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <aside
            className="darshan-service-stage"
            ref={stageRef}
            aria-live="polite"
            onPointerMove={handleStagePointerMove}
            onPointerLeave={handleStagePointerLeave}
          >
            <div className="darshan-service-stage-top">
              <span className="darshan-service-stage-pill">
                <span>{activeService.groupIndex}</span> {activeService.groupTitle}
              </span>
              <span className="darshan-service-stage-counter">
                {String(activePos + 1).padStart(2, '0')} / {String(visibleServices.length).padStart(2, '0')}
              </span>
            </div>

            <div className="darshan-service-stage-visual" key={activeService.id}>
              <ServiceVisual kind={activeService.visual} />
              <span className="darshan-service-stage-badge" aria-hidden="true">
                <ActiveIcon size={24} strokeWidth={1.75} />
              </span>
            </div>

            <div className="darshan-service-stage-body" key={`${activeService.id}-body`}>
              <h3>{activeService.title}</h3>
              <p>{activeService.description}</p>
            </div>

            <div className="darshan-service-cycle" aria-label="Full cycle coverage">
              {cyclePhases.map((phase) => (
                <span
                  key={phase}
                  className="darshan-cycle-chip"
                  data-active={activeService.phases.includes(phase)}
                >
                  {phase}
                </span>
              ))}
            </div>

            <div className="darshan-service-stage-footer">
              <div className="darshan-service-pips" role="group" aria-label="Jump to capability">
                {visibleServices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="darshan-service-pip"
                    aria-label={item.title}
                    aria-pressed={item.id === activeService.id}
                    onClick={() => setActiveId(item.id)}
                  />
                ))}
              </div>
              <div className="darshan-service-nav">
                <button type="button" onClick={() => stepService(-1)} aria-label="Previous capability">
                  <ChevronLeft size={17} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => stepService(1)} aria-label="Next capability">
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
