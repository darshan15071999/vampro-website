import { useEffect, useRef } from 'react';

const FullPageParticles = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    setSize();
    window.addEventListener('resize', setSize);

    type P = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number; pulse: number; pulseSpeed: number };
    const particles: P[] = [];
    const COUNT = 120;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -0.1 - Math.random() * 0.3,
        size: 0.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.6,
        hue: 220 + Math.random() * 60,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    const onMouseMove = (e: globalThis.MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouseMove);

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      const scrollFade = Math.max(0.05, 1 - (window.scrollY / 800));

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const pulseSize = p.size * (0.8 + Math.sin(p.pulse) * 0.2);
        const finalOpacity = p.opacity * scrollFade;

        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${finalOpacity})`;
          ctx.shadowBlur = pulseSize * 2;
          ctx.shadowColor = `hsla(${p.hue}, 80%, 70%, ${finalOpacity})`;
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 70%, 40%, ${finalOpacity * 0.7})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      if (mouse.current.x > 0 && scrollFade > 0.1) {
        const grad = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 200);
        if (isDark) {
          grad.addColorStop(0, `rgba(99,102,241,${0.08 * scrollFade})`);
          grad.addColorStop(0.5, `rgba(99,102,241,${0.02 * scrollFade})`);
        } else {
          grad.addColorStop(0, `rgba(59,59,255,${0.05 * scrollFade})`);
          grad.addColorStop(0.5, `rgba(59,59,255,${0.01 * scrollFade})`);
        }
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', setSize); window.removeEventListener('mousemove', onMouseMove); };
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 50 }} />;
};

export default FullPageParticles;
