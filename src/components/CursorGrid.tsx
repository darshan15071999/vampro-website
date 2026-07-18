import { useEffect, useRef } from 'react';

export default function CursorGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const { pageX, pageY } = ev;
      containerRef.current.style.setProperty('--mouse-x', `${pageX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${pageY}px`);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        maskImage: 'radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)',
        WebkitMaskImage: 'radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)',
      }}
    >
      <div className="absolute inset-0 bp-grid-highlight" />
    </div>
  );
}
