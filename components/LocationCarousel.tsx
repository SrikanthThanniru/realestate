'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';

const slides = [
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
];

export default function LocationCarousel() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % slides.length);
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);

  return (
    <section
      data-rail-section
      data-rail-dark="false"
      className="bg-bg px-6 py-24 text-center sm:px-12 lg:px-24"
    >
      <Reveal>
        <h2 className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-bold uppercase tracking-tight text-ink">
          Real-life location
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-10 max-w-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image src={slides[i]} alt="" fill className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-muted">
          <button onClick={prev} aria-label="Previous" className="transition-opacity hover:opacity-60">
            ←
          </button>
          <span className="text-xs">{String(i + 1).padStart(1, '0')}</span>
          <span className="relative h-px w-32 bg-line">
            <span
              className="absolute inset-y-0 left-0 bg-ink transition-all duration-500 ease-smooth"
              style={{ width: `${((i + 1) / slides.length) * 100}%` }}
            />
          </span>
          <span className="text-xs">{String(slides.length).padStart(1, '0')}</span>
          <button onClick={next} aria-label="Next" className="transition-opacity hover:opacity-60">
            →
          </button>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mx-auto mt-10 max-w-xl text-muted">
        <p>
          Nestled between pristine beaches, championship golf courses and exclusive
          wellness clubs, Aurora Residence offers a rare balance of seclusion and
          seamless access to the finest of the Mediterranean lifestyle.
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-14">
        <p className="text-[0.75rem] uppercase tracking-[0.15em] text-ink/80">
          Designed as a community,
          <br className="sm:hidden" /> not a complex
        </p>
      </Reveal>
    </section>
  );
}
