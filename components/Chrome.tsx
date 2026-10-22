'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Scroll progress bar + a trailing cursor that grows and shows a label over interactive items. */
export default function Chrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  const ring = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [big, setBig] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setFine(true);
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      setBig(!!t.closest('a,button,[data-cursor]'));
      setLabel(t.closest('[data-label]')?.getAttribute('data-label') ?? '');
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const labelled = big && !!label;

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[150] h-[3px] origin-left bg-brass" />
      {fine && (
        <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[450]">
          <div
            className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 ease-smooth ${
              labelled ? 'h-20 w-20 bg-brass' : big ? 'h-16 w-16 bg-brass/15' : 'h-10 w-10'
            }`}
          >
            {labelled ? label : ''}
          </div>
        </div>
      )}
    </>
  );
}
