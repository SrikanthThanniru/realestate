'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';
import Particles from './Particles';

const ease = [0.16, 1, 0.3, 1] as const;
const START = 2.1; // after the preloader curtain

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease, delay: START + delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mx = useSpring(useMotionValue(900), { stiffness: 90, damping: 20 });
  const my = useSpring(useMotionValue(380), { stiffness: 90, damping: 20 });
  const spot = useMotionTemplate`radial-gradient(460px circle at ${mx}px ${my}px, rgba(212,162,89,.10), rgba(10,14,19,.28) 80%)`;

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="grain relative h-[100svh] min-h-[680px] overflow-hidden bg-ink text-ivory"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src="/villas/villa-1.png" alt="Night view of a Sri Jagathswapna luxury villa community" fill priority sizes="100vw" className="object-cover object-[50%_60%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      <Particles />
      {/* cursor spotlight: darkens everything except a soft pool of light around the pointer */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block" style={{ background: spot }} />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-10 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: START }}
          className="eyebrow eyebrow-light mb-6"
        >
          Gated-community villas &amp; open plots · Hyderabad
        </motion.p>

        <h1 className="font-display text-[clamp(2.8rem,9.5vw,9rem)] font-light leading-[0.95] tracking-tight">
          <Line delay={0}>Building Dreams,</Line>
          <Line delay={0.12}>
            <span className="shimmer italic">Creating</span> Legacies.
          </Line>
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: START + 0.6 }}
            className="max-w-md text-[0.95rem] leading-relaxed text-ivory/75"
          >
            A decade of trust, transparency and timely delivery — over 20 projects and 3,000 units across
            Hyderabad’s fastest-growing corridors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: START + 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#projects" className="block rounded-full bg-brass px-8 py-4 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink">
                Explore projects
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="block rounded-full border border-white/30 px-8 py-4 text-[0.75rem] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white/10">
                Book a site visit
              </a>
            </Magnetic>
            <span className="ml-2 hidden animate-floatY text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 lg:inline">Scroll ↓</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
