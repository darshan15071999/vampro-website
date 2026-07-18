import React, { useRef, useState, useEffect } from 'react';

export default function LazyCanvas({ children, height = '100%', pointerEvents = 'none' }: { children: React.ReactNode, height?: string | number, pointerEvents?: 'none' | 'auto' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '200px 0px 200px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full" style={{ height, pointerEvents }}>
      {isVisible ? children : null}
    </div>
  );
}
