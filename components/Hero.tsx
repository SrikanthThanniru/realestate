'use client';

import { useRef } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

const BUILDING = '/villas/villa-4.jpeg';

// Long, weighted "expo.out" settle — matches findrealestate.com's hero eases.
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// Puffy cloud silhouette from layered radial gradients.
const cloudBg =
  'radial-gradient(circle at 16% 66%,#fff 20%,transparent 21%),' +
  'radial-gradient(circle at 34% 44%,#fff 27%,transparent 28%),' +
  'radial-gradient(circle at 52% 40%,#fff 30%,transparent 31%),' +
  'radial-gradient(circle at 70% 50%,#fff 26%,transparent 27%),' +
  'radial-gradient(circle at 86% 64%,#fff 18%,transparent 19%),' +
  'radial-gradient(circle at 50% 82%,#fff 40%,transparent 41%)';

const cloud = (s: CSSProperties): CSSProperties => ({
  backgroundImage: cloudBg,
  backgroundRepeat: 'no-repeat',
  filter: 'blur(7px)',
  ...s,
});

const lineUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EXPO_OUT, delay: 0.4 + i * 0.09 },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.4 });

  // Villa stays in frame the whole time — the clouds rising past it do the
  // reveal — and is fully clear well before the scroll ends.
  const villaY = useTransform(p, [0, 0.5], ['14%', '0%']);
  const villaScale = useTransform(p, [0, 0.6], [1.12, 1]);
  const villaBlur = useTransform(p, [0, 0.26], [4, 0]);
  const villaBright = useTransform(p, [0, 0.3], [0.86, 1]);
  const villaFilter = useTransform(
    [villaBlur, villaBright],
    ([b, br]: number[]) => `blur(${b}px) brightness(${br})`,
  );
  const gradeOpacity = useTransform(p, [0.8, 1], [0, 0.08]);

  // Cloud layers rise up the frame at different speeds, parting slightly.
  const fgY = useTransform(p, [0, 0.5], ['12%', '-110%']);
  const fgLX = useTransform(p, [0, 0.6], ['0%', '-16%']);
  const fgRX = useTransform(p, [0, 0.6], ['0%', '16%']);
  const fgOpacity = useTransform(p, [0, 0.34, 0.5], [1, 1, 0]);
  const midY = useTransform(p, [0, 0.52], ['24%', '-85%']);
  const midOpacity = useTransform(p, [0, 0.32, 0.5], [1, 0.85, 0]);
  const wispY = useTransform(p, [0, 0.55], ['42%', '-55%']);
  const wispOpacity = useTransform(p, [0, 0.28, 0.46], [0.65, 0.35, 0]);
  const bloomOpacity = useTransform(p, [0.12, 0.32, 0.55], [0, 0.6, 0]);
  const smokeOpacity = useTransform(p, [0, 0.8, 1], [0, 0, 1]);

  // Headline sinks and fades as the villa clears the clouds.
  const contentY = useTransform(p, [0, 0.34], ['0%', '-16%']);
  const contentScale = useTransform(p, [0, 0.34], [1, 0.94]);
  const contentOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

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
      className="relative h-[240vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-sky via-sky/55 to-bg">
        {/* Villa — always framed; the clouds rising past it are the reveal */}
        <motion.div
          style={{ y: villaY, scale: villaScale, filter: villaFilter }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EXPO_OUT, delay: 0.2 }}
          className="absolute inset-0 z-[1]"
        >
          <div className="absolute inset-0">
            <Image
              src={BUILDING}
              alt="A Jagathswapna Realtors residence"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <motion.div
            style={{ opacity: gradeOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
          />
        </motion.div>

        {/* Light bloom where the villa breaks through the clouds */}
        <motion.div
          style={{ opacity: bloomOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[26%] z-[2] h-[45%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9),transparent_68%)]"
        />

        {/* Background wisps — slowest */}
        <motion.div style={{ y: wispY, opacity: wispOpacity }} className="pointer-events-none absolute inset-0 z-[2]">
          <span className="absolute" style={cloud({ left: '4%', top: '52%', width: '38vw', height: '20vw', opacity: 0.55 })} />
          <span className="absolute" style={cloud({ right: '2%', top: '40%', width: '34vw', height: '18vw', opacity: 0.5 })} />
        </motion.div>

        {/* Mid clouds */}
        <motion.div style={{ y: midY, opacity: midOpacity }} className="pointer-events-none absolute inset-0 z-[3]">
          <span className="absolute" style={cloud({ left: '-6%', top: '58%', width: '52vw', height: '26vw', opacity: 0.9 })} />
          <span className="absolute" style={cloud({ right: '-4%', top: '66%', width: '48vw', height: '24vw', opacity: 0.85 })} />
        </motion.div>

        {/* Foreground cloud bank — biggest, rises fastest, parts outward */}
        <motion.div style={{ y: fgY, opacity: fgOpacity }} className="pointer-events-none absolute inset-0 z-[4]">
          <motion.span style={{ x: fgLX, ...cloud({ left: '-16%', top: '64%', width: '72vw', height: '34vw', opacity: 1 }) }} className="absolute" />
          <motion.span style={{ x: fgRX, ...cloud({ right: '-14%', top: '72%', width: '66vw', height: '32vw', opacity: 1 }) }} className="absolute" />
          <motion.span style={{ x: fgLX, ...cloud({ left: '18%', top: '82%', width: '58vw', height: '30vw', opacity: 1 }) }} className="absolute" />
        </motion.div>

        {/* Mist blending into the next section — only near the very end */}
        <motion.div
          style={{ opacity: smokeOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[12vh] bg-gradient-to-t from-bg to-transparent"
        />

        {/* Headline */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
          className="relative z-[6] mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-ink sm:px-10"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9),transparent_60%)]" />

          <h1 className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,8.5vw,7.5rem)] drop-shadow-[0_2px_22px_rgba(255,255,255,0.75)]">
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
            className="mt-7 max-w-xl text-[clamp(1rem,1.9vw,1.35rem)] font-medium leading-relaxed text-ink"
          >
            Gated-community villas and plots across Hyderabad — a decade of delivery.{' '}
            <span className="text-muted">Built on trust.</span>
          </motion.p>

          <motion.div custom={4} initial="hidden" animate="show" variants={lineUp} className="mt-9">
            <motion.a
              ref={ctaRef}
              href="#projects"
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              style={{ x: springMagnetX, y: springMagnetY }}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-9 py-4 text-sm font-semibold text-white shadow-[0_16px_38px_-14px_rgba(7,28,31,0.55)] transition-shadow duration-500 ease-smooth hover:shadow-[0_20px_44px_-12px_rgba(7,28,31,0.6)]"
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
          className="pointer-events-none absolute inset-x-0 bottom-6 z-[6] flex flex-col items-center gap-2 text-ink/50"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px origin-top animate-scrollLine bg-current" />
        </motion.div>
      </div>
    </section>
  );
}
