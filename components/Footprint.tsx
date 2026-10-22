'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { locations, projects, nearby } from './data';

const W = 800;
const H = 520;
const lats = locations.map((l) => l.lat);
const lngs = locations.map((l) => l.lng);
const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];

const pts = locations.map((l) => ({
  ...l,
  x: 190 + ((l.lng - minLng) / (maxLng - minLng)) * 540,
  y: 80 + ((maxLat - l.lat) / (maxLat - minLat)) * 360,
}));
const city = { x: 50, y: 250 };

export default function Footprint() {
  const [active, setActive] = useState(pts[0].name);
  const sel = pts.find((p) => p.name === active)!;

  return (
    <section id="footprint" className="grain relative overflow-hidden bg-ink px-5 py-28 text-ivory sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div className="relative rounded-[2rem] border border-white/10 bg-night p-2 sm:p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Schematic map of project locations east of Hyderabad">
            {[70, 140, 210, 280, 350, 420, 490, 560, 630, 700].map((r) => (
              <circle key={r} cx={city.x} cy={city.y} r={r} fill="none" stroke="rgba(244,239,230,.07)" />
            ))}
            <text x={city.x} y={city.y - 14} fill="#d4a259" fontSize="12" letterSpacing="3">CITY</text>
            <circle cx={city.x} cy={city.y} r="5" fill="#d4a259" />

            {pts.map((p) => (
              <motion.path
                key={p.name + 'l'}
                d={`M${city.x},${city.y} Q${(city.x + p.x) / 2},${Math.min(city.y, p.y) - 70} ${p.x},${p.y}`}
                fill="none"
                stroke={p.name === active ? '#d4a259' : 'rgba(244,239,230,.22)'}
                strokeWidth={p.name === active ? 1.6 : 1}
                strokeDasharray="5 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />
            ))}

            {pts.map((p) => {
              const on = p.name === active;
              return (
                <g key={p.name} onClick={() => setActive(p.name)} onMouseEnter={() => setActive(p.name)} className="cursor-pointer" tabIndex={0} role="button" aria-label={p.name} onKeyDown={(e) => e.key === 'Enter' && setActive(p.name)}>
                  {on && <circle cx={p.x} cy={p.y} r="12" fill="#d4a259" className="animate-pulseRing" style={{ transformOrigin: `${p.x}px ${p.y}px` }} />}
                  <circle cx={p.x} cy={p.y} r={on ? 11 : 8} fill={on ? '#d4a259' : '#f4efe6'} stroke="#0a0e13" strokeWidth="3" />
                  <text x={p.x} y={p.y + 30} textAnchor="middle" fontSize="14" fill={on ? '#d4a259' : '#f4efe6'} fontWeight="600">
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="px-4 pb-2 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/40">Schematic — not to scale</p>
        </div>

        <div>
          <span className="eyebrow eyebrow-light">Our footprint</span>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02]">
            Rooted where <span className="italic text-brass">Hyderabad grows.</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={sel.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="font-display text-3xl font-light">{sel.name}</h3>
              <ul className="mt-4 space-y-2">
                {sel.projectNames.map((n) => {
                  const pr = projects.find((p) => p.name === n);
                  return (
                    <li key={n} className="flex items-center justify-between border-b border-white/10 pb-2 text-sm">
                      <span>{n}</span>
                      <span className="text-brass">{pr?.status}</span>
                    </li>
                  );
                })}
              </ul>
              <a href={sel.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-brass">
                Get directions →
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {nearby.map((n) => (
              <div key={n.name} className="rounded-xl border border-white/10 p-3">
                <p className="font-display text-xl text-brass">{n.time}</p>
                <p className="mt-1 text-[0.7rem] leading-snug text-ivory/60">{n.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
