'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Reveal from './Reveal';
import { stats } from './data';

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}

export default function Stats() {
  return (
    <section
      data-rail-section
      data-rail-dark="true"
      className="bg-ink px-6 py-20 text-white sm:px-12 lg:px-24"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 text-center lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <p className="font-display text-[clamp(2rem,5vw,3.2rem)] font-bold text-gold">
              <Counter value={s.value} />
              {s.suffix}
            </p>
            <p className="mt-2 text-[0.72rem] uppercase tracking-[0.15em] text-white/60">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
