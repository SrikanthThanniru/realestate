'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const hotspots = [
  { top: '30%', left: '27%', label: 'Pergola terrace' },
  { top: '48%', left: '55%', label: 'Saltwater pool' },
  { top: '58%', left: '80%', label: 'Poolside service' },
];

export default function LifestyleShowcase() {
  return (
    <section
      data-rail-section
      data-rail-dark="true"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1622015663084-307d19eabbbf?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/15" />

      {hotspots.map((h, i) => (
        <motion.span
          key={h.label}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.15 }}
          style={{ top: h.top, left: h.left }}
          className="absolute hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:flex"
        >
          <span className="relative flex h-4 w-4 items-center justify-center rounded-full border border-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="absolute -inset-3 rounded-full border border-white/50 animate-ping2" />
          </span>
        </motion.span>
      ))}

      <div className="absolute inset-x-0 bottom-14 flex justify-center sm:bottom-20">
        <motion.a
          href="#apartments"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex h-32 w-32 items-center justify-center rounded-full border border-white/70 text-center text-[0.62rem] font-medium uppercase leading-tight tracking-[0.1em] text-white transition-colors duration-500 hover:bg-white/10 sm:h-40 sm:w-40 sm:text-[0.68rem]"
        >
          <span className="absolute inset-0 rounded-full border border-white/30 transition-transform duration-500 ease-smooth group-hover:scale-105" />
          View available
          <br />
          apartments
        </motion.a>
      </div>
    </section>
  );
}
