'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const DAY =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80';
const NIGHT =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80';

const word = {
  hidden: { y: '105%' },
  show: { y: 0 },
};

export default function Hero() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 19 || h < 6) setNight(true);
  }, []);

  return (
    <section
      id="hero"
      data-rail-section
      data-rail-dark="true"
      className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden"
    >
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/50" />

      <div className="relative z-[2] flex w-full max-w-6xl items-center justify-between px-6 text-white sm:px-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="hidden font-serif text-2xl italic tracking-wide sm:block lg:text-3xl"
        >
          A place
        </motion.span>

        <div className="text-center">
          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
            className="font-display font-bold leading-[0.92] tracking-tight"
          >
            <span className="block overflow-hidden text-[clamp(3rem,10vw,7.5rem)]">
              <motion.span variants={word} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="block">
                AURORA
              </motion.span>
            </span>
            <span className="block overflow-hidden text-[clamp(3rem,10vw,7.5rem)]">
              <motion.span
                variants={word}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                className="block"
              >
                RESIDENCE
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="-mt-3 font-script text-[clamp(2.2rem,6vw,4.5rem)] text-white/95 sm:-mt-5"
          >
            Sotogrande
          </motion.p>

          <button
            onClick={() => setNight((v) => !v)}
            className="mt-4 flex items-center justify-center gap-4 text-[0.68rem] uppercase tracking-[0.2em]"
          >
            <span className={night ? 'text-white/40' : 'text-white'}>By day</span>
            <span className="relative h-px w-14 bg-white/40">
              <span
                className={`absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-white transition-all duration-500 ease-smooth ${
                  night ? 'left-full -translate-x-full' : 'left-0'
                }`}
              />
            </span>
            <span className={night ? 'text-white' : 'text-white/40'}>By night</span>
          </button>
        </div>

        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="hidden font-serif text-2xl italic tracking-wide sm:block lg:text-3xl"
        >
          to return to
        </motion.span>
      </div>
    </section>
  );
}
