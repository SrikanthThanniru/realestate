'use client';

import { useMemo, useRef } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

const BUILDING = '/villas/villa-3.jpeg';
const COLS = 8;
const ROWS = 5;

// Long, weighted "expo.out" settle.
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const lineUp = {
  hidden: { opacity: 0, y: 42, filter: 'blur(7px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EXPO_OUT, delay: 1.35 + i * 0.1 },
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

  const imgScale = useTransform(p, [0, 1], [1, 1.16]);
  const imgY = useTransform(p, [0, 1], ['0%', '-10%']);
  const gradeOpacity = useTransform(p, [0.12, 0.7], [0.3, 0.92]);

  const wispLeftX = useTransform(p, [0, 1], ['0%', '-32%']);
  const wispRightX = useTransform(p, [0, 1], ['0%', '32%']);
  const wispOpacity = useTransform(p, [0, 0.5, 0.85], [1, 0.7, 0]);
  const smokeY = useTransform(p, [0, 0.92], ['70%', '0%']);

  const contentY = useTransform(p, [0, 0.4], ['0%', '16%']);
  const contentScale = useTransform(p, [0, 0.4], [1, 0.93]);
  const contentOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Tiles ripple in from the centre outward.
  const tiles = useMemo(() => {
    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const maxD = Math.hypot(cx, cy);
    const out: { col: number; row: number; delay: number }[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const d = Math.hypot(col - cx, row - cy) / maxD;
        const jitter = (((col * 7 + row * 13) % 5) - 2) * 0.02;
        out.push({ col, row, delay: 0.2 + d * 0.85 + jitter });
      }
    }
    return out;
  }, []);

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
        {/* Image stage — assembled on load from a centre-out ripple of tiles */}
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 z-[1]">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EXPO_OUT, delay: 1 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              }}
            >
              {tiles.map(({ col, row, delay }) => (
                <div key={`${col}-${row}`} className="relative overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.45, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: EXPO_OUT, delay }}
                    className="absolute inset-0 bg-cover bg-no-repeat"
                    style={
                      {
                        backgroundImage: `url(${BUILDING})`,
                        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                        backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
                      } as CSSProperties
                    }
                  />
                  <motion.span
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: delay + 0.15 }}
                    className="pointer-events-none absolute inset-0 border border-gold/50"
                  />
                </div>
              ))}
            </div>

            <motion.div
              style={{ opacity: gradeOpacity }}
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/5"
            />
          </motion.div>

          {/* Diagonal scan sweeping across as the tiles land */}
          <motion.div
            initial={{ x: '-140%', opacity: 0 }}
            animate={{ x: '150%', opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.9 }}
            className="pointer-events-none absolute inset-y-[-20%] z-[2] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        </motion.div>

        {/* Ambient wisps drifting in, then parting outward on scroll */}
        <motion.span
          style={{ x: wispLeftX, opacity: wispOpacity }}
          initial={{ y: '40%', opacity: 0 }}
          animate={{ y: '0%', opacity: 0.4 }}
          transition={{ duration: 3.4, ease: EXPO_OUT, delay: 1.1 }}
          className="pointer-events-none absolute left-[-14%] top-[36%] z-[4] h-40 w-[46vw] rounded-full bg-white/55 blur-[60px]"
        />
        <motion.span
          style={{ x: wispRightX, opacity: wispOpacity }}
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: '0%', opacity: 0.32 }}
          transition={{ duration: 4, ease: EXPO_OUT, delay: 1.3 }}
          className="pointer-events-none absolute right-[-12%] top-[16%] z-[4] h-36 w-[40vw] rounded-full bg-white/45 blur-[60px]"
        />

        {/* Rising mist into the next section */}
        <motion.div
          style={{ y: smokeY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[20vh] bg-gradient-to-t from-bg to-transparent"
        />

        {/* Headline */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
          className="relative z-[5] mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white sm:px-10"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(7,28,31,0.55),transparent_62%)]" />

          <h1 className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,8.5vw,7.5rem)] drop-shadow-[0_6px_30px_rgba(0,0,0,0.45)]">
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
