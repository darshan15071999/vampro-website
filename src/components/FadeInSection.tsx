import { useState, useEffect, useRef, type ReactNode } from 'react';

type FadeInProps = { children: ReactNode; delay?: string; className?: string } & React.HTMLAttributes<HTMLDivElement>;

const FadeInSection = ({ children, delay = '0ms', className = '', ...props }: FadeInProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setVisible(true); if (domRef.current) obs.unobserve(domRef.current); }
    }, { threshold: 0.06 });
    const ref = domRef.current;
    if (ref) obs.observe(ref);
    return () => { if (ref) obs.unobserve(ref); };
  }, []);
  return (
    <div ref={domRef} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: delay }} {...props}>
      {children}
    </div>
  );
};

export default FadeInSection;
