'use client';

import { motion } from 'framer-motion';

const letter = {
  hidden: { y: '115%', rotate: 6 },
  show: (d: number) => ({ y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: d } }),
};

/** Letter-by-letter masked reveal. The in-view trigger sits on the (unclipped) wrapper. */
export default function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  let n = 0;
  return (
    <motion.span
      className={`inline-block ${className}`}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {text.split(' ').map((w, wi) => (
        <span key={wi} aria-hidden className="mr-[0.22em] inline-block overflow-hidden whitespace-nowrap pb-[0.1em] align-bottom">
          {Array.from(w).map((c, ci) => (
            <motion.span key={ci} className="inline-block" variants={letter} custom={delay + n++ * 0.025}>
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
