'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Preloader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    const dur = 1700;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = '';
        }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-ink p-6 text-ivory sm:p-10"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-brass">Sri Jagathswapna Realtors</p>
          <div>
            <p className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-none">
              Building Dreams,
              <br />
              <span className="italic text-brass">Creating Legacies.</span>
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-px flex-1 bg-white/15">
              <div className="h-px bg-brass transition-[width] duration-100" style={{ width: `${n}%` }} />
            </div>
            <span className="ml-6 font-display text-6xl tabular-nums leading-none sm:text-8xl">{n}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
