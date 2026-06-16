import { useEffect, useRef } from 'react';

const TextParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number, char: string, life: number, maxLife: number, targetChar: string }[] = [];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>[]{}";
    const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 250; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          char: getRandomChar(),
          targetChar: getRandomChar(),
          life: Math.random() * 100,
          maxLife: 40 + Math.random() * 80
        });
      }
    };

    initParticles();
    window.addEventListener('resize', initParticles);

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY, active: true }; };
    const onLeave = () => { mouse.current.active = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    let frame: number;
    let tick = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "12px 'Space Grotesk', Orbitron, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (p.life > p.maxLife) {
          p.life = 0;
          p.char = p.targetChar;
          p.targetChar = getRandomChar();
        } else if (p.life % 8 === 0) {
          if (Math.random() > 0.3) p.char = getRandomChar();
        }

        let distToMouse = 9999;
        if (mouse.current.active) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 200) {
            p.x += dx * 0.03;
            p.y += dy * 0.03;
          }
        }

        const opacity = Math.max(0.15, 1 - (distToMouse / 250));
        ctx.fillStyle = `rgba(129, 140, 248, ${Math.min(0.8, opacity)})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      tick++;
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
};

export default TextParticles;
