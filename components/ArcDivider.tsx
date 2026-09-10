'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BrandBadge from './BrandBadge';
import Reveal from './Reveal';

const traits = ['Integrity', 'Excellence', 'Trust'];

const reasons = [
  {
    title: 'A Decade of Trust',
    body: 'Over 10 years delivering premier villa communities in and around Hyderabad, founded by visionaries rooted in real estate.',
    icon: (
      <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9.5C8.5 20.5 5 17 5 12V7l7-4Z" />
    ),
  },
  {
    title: 'Proven Delivery',
    body: 'Strategic foresight and meticulous execution — we consistently surpass milestones, setting new benchmarks in quality and reliability.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5l2.2 2.2L15.5 10" />
      </>
    ),
  },
  {
    title: 'Honest Value',
    body: 'Spacious, thoughtfully designed villas finished to a high standard, offered at transparent, honest pricing.',
    icon: (
      <>
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
      </>
    ),
  },
];

export default function ArcDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // The disc scales open as the section scrolls through the viewport
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.25, 0.9, 1.25, 1.6]);
  const discY = useTransform(scrollYProgress, [0, 0.5], ['32vh', '0vh']);
  const contentOpacity = useTransform(scrollYProgress, [0.22, 0.42, 0.78, 0.92], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.22, 0.45], [50, 0]);

  return (
    <>
    <section
      ref={ref}
      data-rail-section
      data-rail-dark="false"
      className="relative h-[220vh] bg-bg"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, y: discY }}
          className="absolute aspect-square w-[130vmax] rounded-full bg-sky"
        />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-x-0 top-0 flex h-full flex-col items-center px-4"
        >
          <svg
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid meet"
            className="mt-[11vh] w-full max-w-5xl"
          >
            <path id="arc-headline" d="M 40,250 A 1500,1500 0 0 1 1160,250" fill="none" />
            <text
              fill="#071c1f"
              fontSize="46"
              letterSpacing="3"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontWeight: 600 }}
            >
              <textPath href="#arc-headline" startOffset="50%" textAnchor="middle">
                WHY CHOOSE SRI JAGATHSWAPNA
              </textPath>
            </text>
          </svg>

          <div className="mt-[26vh] flex items-center gap-5 text-[0.7rem] uppercase tracking-[0.28em] text-ink/60">
            <span>A decade of trust</span>
            <BrandBadge dark className="h-9 w-9" />
            <span>Hyderabad</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Why Choose Us — the answer to the arc's question above */}
    <section data-rail-section data-rail-dark="false" className="bg-bg px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-tight text-ink">
            Sri Jagathswapna&apos;s Realtors Pvt. Ltd.
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
            Infra Projects &amp; Lifestyle Builders
          </p>

          <p className="mt-8 max-w-[26ch] font-serif text-2xl italic leading-snug text-ink/80">
            A decade of trust, built one home at a time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {traits.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="space-y-8">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.1 + i * 0.08} className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {r.icon}
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-1.5 max-w-[52ch] text-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
