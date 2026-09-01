'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const DAY =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80';
const NIGHT =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80';

export default function Hero() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 19 || h < 6) setNight(true);
  }, []);

  const line = {
    hidden: { y: '105%' },
    show: { y: 0 },
  };

  return (
    <section id="hero" className="relative flex h-screen min-h-[600px] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src={DAY} alt="" fill priority className="object-cover" />
        <Image
          src={NIGHT}
          alt=""
          fill
          className={`object-cover transition-opacity duration-[1200ms] ease-smooth ${
            night ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

      <div className="relative z-[2] px-6 sm:px-12 lg:px-24 text-white">
        <motion.h1
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
          className="mb-8 font-serif text-[clamp(2.8rem,9vw,7rem)] leading-[1.05]"
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={line}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              A place
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={line}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              to return to
            </motion.span>
          </span>
        </motion.h1>

        <a
          href="#apartments"
          className="inline-block border border-white px-8 py-4 text-[0.78rem] uppercase tracking-[0.12em] no-underline text-white transition-colors duration-500 ease-smooth hover:bg-white hover:text-ink"
        >
          View available apartments
        </a>
      </div>

      <button
        onClick={() => setNight((v) => !v)}
        className="absolute bottom-12 right-6 z-[3] flex items-center gap-3 text-white sm:right-16"
      >
        <span className="relative h-[22px] w-[46px] rounded-full border border-white/60">
          <span
            className={`absolute left-[2px] top-[2px] h-4 w-4 rounded-full bg-white transition-transform duration-500 ease-smooth ${
              night ? 'translate-x-6' : ''
            }`}
          />
        </span>
        <span className="text-[0.72rem] uppercase tracking-[0.15em]">Day / Night</span>
      </button>

      <div className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.2em] text-white">
        Scroll
        <span className="mx-auto mt-2 block h-10 w-px origin-top animate-scrollLine bg-white" />
      </div>
    </section>
  );
}
