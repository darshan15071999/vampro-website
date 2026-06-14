import { useEffect, useRef } from 'react';

const WaveformCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    setSize();
    window.addEventListener('resize', setSize);
    const onMouseMove = (e: globalThis.MouseEvent) => { mouse.current.x = e.clientX / window.innerWidth; };
    window.addEventListener('mousemove', onMouseMove);

    let frame: number;
    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cy = canvas.height / 2;
      const freq = 0.5 + mouse.current.x * 3;
      const amp = 0.3 + mouse.current.x * 0.7;

      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        const a = (30 + layer * 20) * amp;
        const f = (0.02 + layer * 0.008) * freq;
        const spd = 0.015 + layer * 0.005;
        const al = 0.15 + layer * 0.1;
        const yOff = (layer - 1.5) * 40;
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = cy + yOff + Math.sin(x * f + t * spd * (layer % 2 === 0 ? 1 : -1)) * a + Math.sin(x * f * 2.3 + t * spd * 1.5) * a * 0.3;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, `rgba(59,59,255,0)`);
        grad.addColorStop(0.3, `rgba(59,59,255,${al})`);
        grad.addColorStop(0.7, `rgba(129,140,248,${al})`);
        grad.addColorStop(1, `rgba(59,59,255,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5 - layer * 0.3;
        ctx.stroke();
      }
      const bars = 80;
      const barW = canvas.width / bars;
      for (let i = 0; i < bars; i++) {
        const x = i * barW;
        const barH = (Math.sin(i * 0.2 + t * 0.03 * freq) * 0.5 + 0.5) * 80 * amp + Math.sin(i * 0.5 + t * 0.05) * 20 * amp;
        const al = 0.15 + 0.2 * Math.sin(i * 0.3 + t * 0.02);
        ctx.fillStyle = `rgba(99,102,241,${al})`;
        ctx.fillRect(x + 1, cy - barH / 2, barW - 2, barH);
      }
      t++;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', setSize); window.removeEventListener('mousemove', onMouseMove); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />;
};

export default WaveformCanvas;
