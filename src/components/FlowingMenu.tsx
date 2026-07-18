// @ts-nocheck
import { useRef } from 'react';
import { gsap } from 'gsap';

function FlowingMenu({
  items = [],
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff'
}: any) {
  return (
    <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, desc, icon, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst }: any) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeRef.current, { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0);
  };

  return (
    <div
      className="flex-1 relative overflow-hidden text-center group"
      ref={itemRef}
      style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[3vh] md:text-[4vh]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%] flex items-center justify-center px-6 md:px-12 bg-white/10 backdrop-blur-3xl border-y border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
        ref={marqueeRef}
      >
        <div className="flex items-center justify-center gap-6 max-w-4xl w-full" style={{ color: marqueeTextColor }}>
          {icon && <div className="flex-shrink-0 text-[#fff] opacity-90">{icon}</div>}
          <span className="text-base md:text-2xl font-medium leading-relaxed text-left">
            {desc}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
