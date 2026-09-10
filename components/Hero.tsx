'use client';

import { useRef } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

const BUILDING = '/villas/villa-3.jpeg';
const SLATS = 6;

// Long, weighted ease — the "expo.out" feel from findrealestate.com's hero.
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const lineUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EXPO_OUT, delay: 1 + i * 0.1 },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.35 });

  // Once assembled, the whole image slowly pushes in and drifts up as you scroll.
  const imgScale = useTransform(p, [0, 1], [1, 1.18]);
  const imgY = useTransform(p, [0, 1], ['0%', '-12%']);
  const gradeOpacity = useTransform(p, [0.15, 0.7], [0.35, 0.9]);

  // Clouds part outward and thin out.
  const cloudLeftX = useTransform(p, [0, 1], ['0%', '-24%']);
  const cloudRightX = useTransform(p, [0, 1], ['0%', '24%']);
  const cloudOpacity = useTransform(p, [0, 0.5, 0.85], [1, 0.85, 0]);
  const smokeY = useTransform(p, [0, 0.92], ['70%', '0%']);

  // Headline sinks and fades as the image takes the frame.
  const contentY = useTransform(p, [0, 0.4], ['0%', '16%']);
  const contentScale = useTransform(p, [0, 0.4], [1, 0.93]);
  const contentOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Magnetic pull on the primary CTA.
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
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Image stage — assembled on load from sliding slats, then pushes in on scroll */}
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 z-[1]">
          <motion.div
            initial={{ filter: 'blur(14px) brightness(0.7)', scale: 1.12 }}
            animate={{ filter: 'blur(0px) brightness(1)', scale: 1 }}
            transition={{ duration: 1.6, ease: EXPO_OUT, delay: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 flex">
              {Array.from({ length: SLATS }).map((_, i) => (
                <div key={i} className="relative h-full flex-1 overflow-hidden">
                  <motion.div
                    initial={{ y: i % 2 === 0 ? '110%' : '-110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 1.35,
                      ease: EXPO_OUT,
                      delay: 0.12 + i * 0.11,
                    }}
                    className="absolute inset-0 bg-cover bg-no-repeat"
                    style={
                      {
                        backgroundImage: `url(${BUILDING})`,
                        backgroundSize: `${SLATS * 100}% 100%`,
                        backgroundPosition: `${(i / (SLATS - 1)) * 100}% 50%`,
                      } as CSSProperties
                    }
                  />
                  {/* hairline seam that flashes gold, then fades */}
                  {i > 0 && (
                    <motion.span
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 + i * 0.11 }}
                      className="absolute inset-y-0 left-0 w-px bg-gold"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: gradeOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10"
          />
        </motion.div>

        {/* Clouds — rise in on load, part outward on scroll */}
        <motion.div
          style={{ x: cloudLeftX, opacity: cloudOpacity }}
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: '0%', opacity: 0.6 }}
          transition={{ duration: 3, ease: EXPO_OUT, delay: 0.2 }}
          className="pointer-events-none absolute left-[-16%] top-[12%] z-[2] h-52 w-[54vw] rounded-full bg-white/70 blur-3xl"
        />
        <motion.div
          style={{ x: cloudRightX, opacity: cloudOpacity }}
          initial={{ y: '90%', opacity: 0 }}
          animate={{ y: '0%', opacity: 0.5 }}
          transition={{ duration: 4, ease: EXPO_OUT, delay: 0.35 }}
          className="pointer-events-none absolute right-[-14%] top-[4%] z-[2] h-44 w-[44vw] rounded-full bg-white/60 blur-3xl"
        />

        {/* Rising mist into the next section */}
        <motion.div
          style={{ y: smokeY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[20vh] bg-gradient-to-t from-bg to-transparent"
        />

        {/* Headline */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
          className="relative z-[5] mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white sm:px-10"
        >
          <h1 className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,8.5vw,7.5rem)] drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)]">
            {['Find', 'Where You', 'Belong'].map((word, i) => (
              <span key={word} className="block overflow-hidden py-[0.05em]">
                <motion.span custom={i} initial="hidden" animate="show" variants={lineUp} className="block">
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={lineUp}
            className="mt-7 max-w-xl text-[clamp(1rem,1.9vw,1.35rem)] font-medium leading-relaxed text-white/90"
          >
            Gated-community villas and plots across Hyderabad — a decade of delivery.{' '}
            <span className="text-white/60">Built on trust.</span>
          </motion.p>

          <motion.div custom={4} initial="hidden" animate="show" variants={lineUp} className="mt-9">
            <motion.a
              ref={ctaRef}
              href="#projects"
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              style={{ x: springMagnetX, y: springMagnetY }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-semibold text-ink shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-500 ease-smooth hover:shadow-[0_20px_48px_-10px_rgba(0,0,0,0.55)]"
            >
              View Our Projects
              <span aria-hidden className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-[5] flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px origin-top animate-scrollLine bg-current" />
        </motion.div>
      </div>
    </section>
  );
}
