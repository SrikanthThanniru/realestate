'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

const pins = [
  { label: 'A', top: '38%', left: '30%' },
  { label: 'B', top: '55%', left: '55%' },
  { label: 'C', top: '32%', left: '72%' },
];

export default function MasterPlan() {
  return (
    <section id="masterplan" className="relative overflow-hidden bg-ink px-6 py-24 text-bg sm:px-12 lg:px-24">
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <span className="absolute top-[20%] h-0.5 w-[120px] rounded bg-white animate-drift-slow" />
        <span className="absolute top-[55%] h-0.5 w-[80px] rounded bg-white animate-drift-slower" />
        <span className="absolute top-[78%] h-0.5 w-[160px] rounded bg-white animate-drift-slow" />
      </div>

      <Reveal className="relative z-[2] mx-auto max-w-5xl text-center">
        <span className="eyebrow text-white/50">Master plan &amp; location</span>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">
          Twenty-eight homes, one shared garden
        </h2>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            className="object-cover"
          />
          {pins.map((p, i) => (
            <motion.span
              key={p.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              style={{ top: p.top, left: p.left }}
              className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-semibold text-ink"
            >
              {p.label}
              <span className="absolute -inset-2 rounded-full border border-white animate-ping2" />
            </motion.span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
