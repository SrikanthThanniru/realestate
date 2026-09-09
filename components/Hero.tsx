'use client';

import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

const BUILDING =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80';

const lineUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 + i * 0.09 },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Headline content fades and lifts away early, clearing the stage for the photo.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.26], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-8%']);
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);

  // The photo panel expands from a framed card into a full-bleed screen —
  // it visibly "arrives" as the content clears out of its way.
  const frameInset = useTransform(scrollYProgress, [0, 0.9], ['4%', '0%']);
  const frameHeight = useTransform(scrollYProgress, [0, 0.9], ['42vh', '100vh']);
  const frameRadius = useTransform(scrollYProgress, [0, 0.9], ['1.75rem', '0rem']);
  const frameShadow = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  // Clouds part outward, then dissolve before the photo fills the frame.
  const cloudLeftX = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']);
  const cloudRightX = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const cloudOpacity = useTransform(scrollYProgress, [0, 0.45, 0.6], [1, 1, 0]);
  const smokeY = useTransform(scrollYProgress, [0, 1], ['70%', '0%']);

  // Scroll cue fades the instant the user engages.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // Magnetic pull on the primary CTA — it leans gently toward the cursor.
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springMagnetX = useSpring(magnetX, { stiffness: 200, damping: 15 });
  const springMagnetY = useSpring(magnetY, { stiffness: 200, damping: 15 });

  const handleCtaMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const rect = ctaRef.current?.getBoundingClientRect();
    if (!rect) return;
    magnetX.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    magnetY.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleCtaLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-rail-section
      data-rail-dark="true"
      className="relative h-[230vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-sky via-sky/70 to-bg">
        {/* Ambient drifting cloud wisps against the plain sky gradient */}
        <motion.div style={{ opacity: cloudOpacity }} className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute left-0 top-[10%] h-24 w-[30vw] animate-drift-slow rounded-full bg-white/40 blur-3xl" />
          <span className="absolute left-0 top-[26%] h-20 w-[22vw] animate-drift-slower rounded-full bg-white/30 blur-2xl" />
        </motion.div>

        {/* Photo panel — starts as a framed card, expands edge-to-edge as you scroll */}
        <motion.div
          style={{
            left: frameInset,
            right: frameInset,
            height: frameHeight,
            borderRadius: frameRadius,
            boxShadow: useTransform(frameShadow, (v) => `0 30px 60px -20px rgba(22,19,16,${0.35 * v})`),
          }}
          className="absolute bottom-0 z-[1] origin-bottom overflow-hidden"
        >
          <motion.div style={{ scale: photoScale }} className="absolute inset-0">
            <Image
              src={BUILDING}
              alt="A Jagathswapna Realtors residence"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
        </motion.div>

        {/* Ambient clouds parting outward, dissolving before the photo fills the frame */}
        <motion.span
          style={{ x: cloudLeftX, opacity: cloudOpacity }}
          className="pointer-events-none absolute left-[-10%] top-[16%] z-[3] h-40 w-[46vw] rounded-full bg-white/70 blur-3xl"
        />
        <motion.span
          style={{ x: cloudRightX, opacity: cloudOpacity }}
          className="pointer-events-none absolute right-[-8%] top-[8%] z-[3] h-32 w-[36vw] rounded-full bg-white/60 blur-3xl"
        />
        <motion.span
          style={{ opacity: cloudOpacity }}
          className="pointer-events-none absolute left-[8%] top-[36%] z-[3] h-20 w-[20vw] animate-drift-slower rounded-full bg-white/50 blur-2xl"
        />

        {/* Rising mist transitioning into the next section */}
        <motion.div
          style={{ y: smokeY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[26vh] bg-gradient-to-t from-bg via-bg/70 to-transparent"
        />

        {/* Headline content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
          className="relative z-[5] flex h-full w-full flex-col items-center px-6 pt-[10vh] text-center text-ink sm:px-12"
        >
          <motion.span
            custom={0}
            initial="hidden"
            animate="show"
            variants={lineUp}
            className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold"
          >
            <span className="h-px w-6 bg-gold/50" />
            Luxury Residences · Hyderabad
            <span className="h-px w-6 bg-gold/50" />
          </motion.span>

          <h1 className="font-display font-bold leading-[0.92] tracking-tight">
            <span className="block overflow-hidden text-[clamp(2.3rem,7.5vw,5.2rem)]">
              <motion.span custom={1} initial="hidden" animate="show" variants={lineUp} className="block">
                Sri Jagathswapna&apos;s
              </motion.span>
            </span>
            <span className="block overflow-hidden text-[clamp(2.3rem,7.5vw,5.2rem)]">
              <motion.span
                custom={2}
                initial="hidden"
                animate="show"
                variants={lineUp}
                className="block italic text-gold"
              >
                Realtors
              </motion.span>
            </span>
          </h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={lineUp}
            className="mt-5 max-w-xl text-[clamp(0.95rem,1.8vw,1.2rem)] text-muted"
          >
            Building Dreams, Creating Legacies.{' '}
            <span className="text-ink">A decade of real estate excellence in Hyderabad.</span>
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={lineUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
          >
            <motion.a
              ref={ctaRef}
              href="#projects"
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              style={{ x: springMagnetX, y: springMagnetY }}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-white shadow-[0_14px_30px_-12px_rgba(22,19,16,0.5)] transition-shadow duration-500 ease-smooth hover:shadow-[0_18px_36px_-10px_rgba(22,19,16,0.55)]"
            >
              View Our Projects
              <span aria-hidden className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                →
              </span>
            </motion.a>

            <a
              href="tel:+919885447747"
              className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 98854 47747
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-[5] flex flex-col items-center gap-2 text-ink/50"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px origin-top animate-scrollLine bg-current" />
        </motion.div>
      </div>
    </section>
  );
}
