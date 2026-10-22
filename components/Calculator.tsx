'use client';

import { useEffect, useMemo, useState } from 'react';
import { animate, useMotionValue, useTransform, motion } from 'framer-motion';
import { projects } from './data';

const NOW = new Date().getFullYear();
const num = (s: string) => Number(s.replace(/[^\d]/g, ''));

const eligible = projects
  .filter((p) => p.priceFrom && p.priceNow && p.year)
  .map((p) => {
    const from = num(p.priceFrom!);
    const now = num(p.priceNow!);
    const years = Math.max(1, NOW - Number(p.year));
    return { name: p.name, location: p.location, year: Number(p.year), from, now, years, cagr: Math.pow(now / from, 1 / years) - 1 };
  });

const inr = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(1)} L` : `₹${Math.round(n).toLocaleString('en-IN')}`;

function Money({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, inr);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span className={className}>{text}</motion.span>;
}

export default function Calculator() {
  const [name, setName] = useState(eligible[0].name);
  const [size, setSize] = useState(2000);
  const p = eligible.find((e) => e.name === name)!;

  const r = useMemo(() => {
    const atLaunch = size * p.from;
    const today = size * p.now;
    const future = (y: number) => today * Math.pow(1 + p.cagr, y);
    const series = [atLaunch, today, future(1), future(2), future(3)];
    return { atLaunch, today, gain: today - atLaunch, f3: future(3), series };
  }, [p, size]);

  // simple SVG line chart
  const W = 520, H = 180, pad = 16;
  const max = Math.max(...r.series), min = Math.min(...r.series);
  const pts = r.series.map((v, i) => [pad + (i / 4) * (W - pad * 2), H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2)] as const);
  const line = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0]},${q[1]}`).join(' ');
  const labels = [`${p.year}`, `${NOW}`, `${NOW + 1}`, `${NOW + 2}`, `${NOW + 3}`];

  return (
    <section id="calculator" className="bg-paper px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1300px]">
        <span className="eyebrow">Investment calculator</span>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02]">
          See what your home could be <span className="italic text-brassdeep">worth.</span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <div className="rounded-[1.75rem] border border-line bg-ivory p-7 sm:p-10">
            <label htmlFor="proj" className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone">Community</label>
            <div className="mt-3 flex flex-wrap gap-2" id="proj" role="group">
              {eligible.map((e) => (
                <button
                  key={e.name}
                  onClick={() => setName(e.name)}
                  aria-pressed={e.name === name}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${e.name === name ? 'border-ink bg-ink text-ivory' : 'border-line hover:border-ink'}`}
                >
                  {e.name}
                </button>
              ))}
            </div>

            <div className="mt-10 flex items-baseline justify-between">
              <label htmlFor="size" className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone">Built-up area</label>
              <span className="font-display text-3xl">{size.toLocaleString('en-IN')} <span className="text-base text-stone">sq ft</span></span>
            </div>
            <input
              id="size"
              type="range"
              min={1000}
              max={5000}
              step={100}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mt-4 w-full accent-[#9a6f2e]"
            />
            <div className="mt-1 flex justify-between text-xs text-stone"><span>1,000</span><span>5,000</span></div>

            <p className="mt-10 border-t border-line pt-5 text-xs leading-relaxed text-stone">
              Illustrative only. Values multiply area by the project&apos;s price per sq ft. The 3-year outlook extends this
              community&apos;s own past annual growth ({(p.cagr * 100).toFixed(1)}%/yr) and is not a guarantee of returns.
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-ink p-7 text-ivory sm:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50">At launch ({p.year})</p>
                <Money value={r.atLaunch} className="mt-2 block font-display text-3xl font-light" />
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50">Today</p>
                <Money value={r.today} className="mt-2 block font-display text-3xl font-light" />
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-brass">Gain so far</p>
                <Money value={r.gain} className="mt-2 block font-display text-3xl font-light text-brass" />
              </div>
            </div>

            <svg viewBox={`0 0 ${W} ${H + 24}`} className="mt-10 h-auto w-full" role="img" aria-label="Value over time">
              <path d={`${line} L${pts[4][0]},${H - pad} L${pts[0][0]},${H - pad} Z`} fill="rgba(212,162,89,.12)" />
              <path d={line} fill="none" stroke="#d4a259" strokeWidth="2.5" />
              {pts.map((q, i) => (
                <g key={i}>
                  <circle cx={q[0]} cy={q[1]} r={i === 1 ? 7 : 4.5} fill={i > 1 ? '#0a0e13' : '#d4a259'} stroke="#d4a259" strokeWidth="2" />
                  <text x={q[0]} y={H + 14} textAnchor="middle" fontSize="12" fill="rgba(244,239,230,.55)">{labels[i]}</text>
                </g>
              ))}
            </svg>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50">Illustrative value in 3 years</p>
                <Money value={r.f3} className="font-display text-4xl font-light" />
              </div>
              <a href="#contact" className="rounded-full bg-brass px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink transition-transform hover:scale-105">
                Talk to an advisor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
