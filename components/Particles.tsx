'use client';

import { useEffect, useRef } from 'react';

/** Slow drifting golden embers over the night hero. */
export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const N = w < 700 ? 24 : 55;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.12 + Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.15,
      ph: Math.random() * Math.PI * 2,
    }));

    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(t / 1800 + p.ph) * 0.12;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t / 700 + p.ph));
        ctx.beginPath();
        ctx.fillStyle = `rgba(212,162,89,${a})`;
        ctx.shadowColor = 'rgba(212,162,89,.8)';
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
