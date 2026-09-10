'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BrandBadge from './BrandBadge';
import { nearby } from './data';

const stops = nearby.map((n, i) => ({
  name: n.name,
  time: n.time,
  x: 60 + i * 192,
}));

const path =
  'M 60,60 C 160,120 200,20 260,60 S 400,120 460,60 S 600,20 660,60 S 820,110 860,60 S 980,20 1020,55';

function Bloom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="55"
          rx="16"
          ry="42"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
    </svg>
  );
}

export default function LocationSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Map panel slides in from the right, over the concept, then holds.
  const panelX = useTransform(scrollYProgress, [0.05, 0.55], ['100%', '0%']);
  const conceptOpacity = useTransform(scrollYProgress, [0.1, 0.5], [1, 0.25]);
  const conceptX = useTransform(scrollYProgress, [0, 0.55], ['0%', '-8%']);

  return (
    <section
      ref={ref}
      data-rail-section
      data-rail-dark="false"
      className="relative h-[240vh] bg-bg"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Concept (07) ── */}
        <motion.div
          style={{ opacity: conceptOpacity, x: conceptX }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-12"
        >
          <Bloom className="pointer-events-none absolute -left-16 -top-10 h-56 w-56 text-bloom/25 sm:h-72 sm:w-72" />
          <Bloom className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rotate-45 text-bloom/25 sm:h-72 sm:w-72" />

          <span className="eyebrow">The concept</span>
          <h2 className="max-w-4xl font-display text-[clamp(1.5rem,4vw,2.8rem)] font-bold uppercase leading-tight tracking-tight text-ink">
            Sri Jagathswapna Realtors builds gated-community villas and premium
            plots across Hyderabad, designed around security, comfort and
            lasting value
          </h2>
          <p className="mx-auto mt-7 max-w-md text-muted">
            A decade of delivery across Aushapur, Peerzadiguda and Bandaraviryal —
            combining contemporary villa design with dependable construction and
            a customer-first approach.
          </p>
          <BrandBadge dark className="mx-auto mt-8 h-10 w-10" />
        </motion.div>

        {/* ── Map panel (08) — slides in from the right ── */}
        <motion.div
          style={{ x: panelX }}
          className="absolute inset-0 flex flex-col items-center justify-center border-l border-line bg-bg px-6 shadow-[-30px_0_60px_-20px_rgba(0,0,0,0.15)] sm:px-12"
        >
          <span className="mb-10 text-[0.7rem] uppercase tracking-[0.25em] text-muted">
            Real-life location
          </span>

          <div className="w-full max-w-5xl overflow-x-auto">
            <svg viewBox="0 0 1080 140" className="mx-auto w-[820px] max-w-none sm:w-full" fill="none">
              <path d={path} stroke="#071c1f" strokeWidth="1.5" />
              {stops.map((s) => (
                <g key={s.name}>
                  <circle cx={s.x} cy={60} r="4" fill="#071c1f" />
                  <text
                    x={s.x}
                    y={28}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="600"
                    letterSpacing="0.5"
                    fill="#071c1f"
                  >
                    {s.name.toUpperCase()}
                  </text>
                  <text x={s.x} y={44} textAnchor="middle" fontSize="11" fill="#5c727d">
                    {s.time}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <BrandBadge dark className="mx-auto mt-10 h-10 w-10" />
        </motion.div>
      </div>
    </section>
  );
}
