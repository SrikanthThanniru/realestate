'use client';

import { motion } from 'framer-motion';
import { projects } from './data';

const num = (s: string) => Number(s.replace(/[^\d]/g, ''));
const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const rows = projects
  .filter((p) => p.priceFrom && p.priceNow)
  .map((p) => {
    const from = num(p.priceFrom!);
    const now = num(p.priceNow!);
    return { name: p.name, location: p.location, from, now, growth: Math.round(((now - from) / from) * 100) };
  })
  .sort((a, b) => b.growth - a.growth);

const top = rows[0];

export default function Appreciation() {
  return (
    <section id="growth" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-ivory px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">Proven appreciation</span>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02]">
              Homes that <span className="italic text-brassdeep">grow</span> after you move in.
            </h2>
            <p className="mt-8 font-display text-[clamp(5rem,12vw,9rem)] font-light leading-none text-ink">
              +{top.growth}
              <span className="text-brassdeep">%</span>
            </p>
            <p className="mt-2 text-sm text-stone">
              at {top.name} — {fmt(top.from)} → {fmt(top.now)} per sq ft
            </p>
          </div>

          <div className="space-y-8">
            {rows.map((r, i) => (
              <div key={r.name}>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-light">
                    {r.name} <span className="font-sans text-xs uppercase tracking-[0.18em] text-stone">{r.location}</span>
                  </h3>
                  <span className="font-display text-2xl text-brassdeep">+{r.growth}%</span>
                </div>
                <div className="relative h-14 overflow-hidden rounded-xl bg-ink">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-xl bg-brass"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(r.from / Math.max(...rows.map((x) => x.now))) * 100}%` }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  />
                  <div className="relative flex h-full items-center justify-between px-4 text-xs font-semibold">
                    <span className="text-ink">Launch {fmt(r.from)}</span>
                    <span className="text-ivory">Today {fmt(r.now)}</span>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-stone">Price per sq ft. Figures are indicative — please confirm with our sales team.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
