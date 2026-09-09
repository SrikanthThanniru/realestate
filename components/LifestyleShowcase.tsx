'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const hotspots = [
  { top: '30%', left: '27%', label: 'Pergola terrace', side: 'right' as const },
  { top: '48%', left: '55%', label: 'Saltwater pool', side: 'right' as const },
  { top: '58%', left: '80%', label: 'Poolside service', side: 'left' as const },
];

export default function LifestyleShowcase() {
  return (
    <section
      data-rail-section
      data-rail-dark="true"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=80"
        alt="Poolside lifestyle amenities"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-ink/30" />

      {/* Heading — gives the scene a name instead of dropping straight into unlabeled hotspots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 top-12 z-10 max-w-xs text-white sm:left-12 sm:top-16 lg:left-24"
      >
        <span className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-6 bg-gold/60" />
          The Lifestyle
        </span>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold leading-[1.05]">
          Every detail, designed for living well
        </h2>
        <p className="mt-3 text-sm text-white/75">
          Hover the markers to explore what makes each space part of the everyday retreat.
        </p>
      </motion.div>

      {hotspots.map((h, i) => (
        <motion.div
          key={h.label}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.15 }}
          style={{ top: h.top, left: h.left }}
          className="group absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center sm:flex"
        >
          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="absolute -inset-3 rounded-full border border-white/50 animate-ping2" />
          </span>

          <span
            className={`pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-ink/80 px-4 py-2 text-[0.68rem] uppercase tracking-[0.1em] text-white opacity-0 backdrop-blur-sm transition-all duration-300 ease-smooth group-hover:opacity-100 ${
              h.side === 'right'
                ? 'left-full ml-3 -translate-x-1 group-hover:translate-x-0'
                : 'right-full mr-3 translate-x-1 group-hover:translate-x-0'
            }`}
          >
            {h.label}
          </span>
        </motion.div>
      ))}

      <div className="absolute inset-x-0 bottom-14 flex justify-center sm:bottom-20">
        <motion.a
          href="#projects"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex h-32 w-32 items-center justify-center rounded-full border border-white/70 text-center text-[0.62rem] font-medium uppercase leading-tight tracking-[0.1em] text-white transition-colors duration-500 hover:bg-white/10 sm:h-40 sm:w-40 sm:text-[0.68rem]"
        >
          <span className="absolute inset-0 rounded-full border border-white/30 transition-transform duration-500 ease-smooth group-hover:scale-105" />
          View our
          <br />
          projects
        </motion.a>
      </div>
    </section>
  );
}
