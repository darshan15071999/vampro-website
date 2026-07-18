import React, { useRef, useState, useEffect } from 'react';

export default function DOMCircularGallery({ children, bend = 1 }: { children: React.ReactNode[], bend?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const [targetScroll, setTargetScroll] = useState(0);

  // Smooth scroll loop
  useEffect(() => {
    let animationFrameId: number;
    const loop = () => {
      setScroll(s => s + (targetScroll - s) * 0.08);
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetScroll]);

  const handleWheel = (e: React.WheelEvent) => {
    setTargetScroll(s => s + e.deltaY * 0.5);
  };
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startScroll.current = targetScroll;
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    setTargetScroll(startScroll.current - dx * 2);
  };
  
  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  // Duplicate items for infinite scroll illusion
  const renderItems = [...childrenArray, ...childrenArray, ...childrenArray];
  const itemSpacing = 350;
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden cursor-grab active:cursor-grabbing perspective-[1000px] flex items-center justify-center -mt-8"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {renderItems.map((child, i) => {
        const index = i - totalItems;
        let x = (index * itemSpacing) - scroll;
        
        const halfTotal = (totalItems * 3 * itemSpacing) / 2;
        while (x > halfTotal) x -= totalItems * 3 * itemSpacing;
        while (x < -halfTotal) x += totalItems * 3 * itemSpacing;

        const H = 800;
        const B_abs = Math.abs(bend);
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);
        const effectiveX = Math.min(Math.abs(x), H);
        const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
        
        const y = bend > 0 ? arc : -arc;
        const rotateZ = bend > 0 
            ? Math.sign(x) * Math.asin(effectiveX / R) * (180 / Math.PI)
            : -Math.sign(x) * Math.asin(effectiveX / R) * (180 / Math.PI);

        const opacity = 1 - Math.min(1, Math.abs(x) / (H * 1.5));

        return (
          <div 
            key={i}
            className="absolute pointer-events-auto"
            style={{
              transform: `translateX(${x}px) translateY(${y}px) rotateZ(${rotateZ}deg)`,
              width: 300,
              height: 400,
              opacity,
              zIndex: Math.round(100 - Math.abs(x)),
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
