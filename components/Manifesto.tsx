'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useInView, useScroll, useTransform } from 'framer-motion';
import { stats } from './data';

const text =
  'We don’t just sell land and villas. We build communities where families grow, investments flourish and promises are kept — with transparency in every document and timeliness in every handover.';
const words = text.split(' ');

function Word({ w, p, range }: { w: string; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {w}
    </motion.span>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      setN(Math.round((1 - Math.pow(1 - t, 4)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString('en-IN')}</span>;
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  return (
    <section id="about" className="bg-paper px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1300px]">
        <span className="eyebrow">Who we are</span>
        <p ref={ref} className="mt-8 font-display text-[clamp(1.7rem,4.2vw,3.6rem)] font-light leading-[1.18] text-ink">
          {words.map((w, i) => (
            <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, Math.min(1, (i + 3) / words.length)]} />
          ))}
        </p>

        <div className="mt-24 grid grid-cols-2 gap-y-12 border-t border-line pt-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-line pl-6">
              <p className="font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-none text-ink">
                <Counter value={s.value} />
                <span className="text-brassdeep">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
