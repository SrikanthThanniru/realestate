'use client';

import { motion } from 'framer-motion';
import BrandBadge from './BrandBadge';

export default function ArcDivider() {
  return (
    <section
      data-rail-section
      data-rail-dark="false"
      className="relative flex justify-center overflow-hidden bg-bg pt-16"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-sky pb-24 pt-20 text-ink"
        style={{ borderRadius: '50% 50% 0 0 / 18% 18% 0 0' }}
      >
        <svg viewBox="0 0 1000 220" className="mx-auto w-full max-w-4xl px-6">
          <defs>
            <path id="arc-path" d="M 60,200 A 440,440 0 0 1 940,200" fill="none" />
          </defs>
          <text
            className="font-display font-semibold uppercase"
            fontSize="46"
            letterSpacing="2"
            fill="currentColor"
          >
            <textPath href="#arc-path" startOffset="50%" textAnchor="middle">
              Three reasons to choose Aurora
            </textPath>
          </text>
        </svg>

        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.25em] text-ink/70">
            <span>Southern coast</span>
            <BrandBadge dark className="h-9 w-9" />
            <span>Sotogrande</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
