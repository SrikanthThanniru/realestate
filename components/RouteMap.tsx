'use client';

import { motion } from 'framer-motion';
import BrandBadge from './BrandBadge';

const stops = [
  { name: 'Gibraltar', time: '50 min', x: 60 },
  { name: 'Sotogrande Port', time: '10 min', x: 260 },
  { name: 'Kasa Spa', time: '5 min', x: 460 },
  { name: 'Sotogrande', time: '20 min', x: 660 },
  { name: 'Marbella', time: '35 min', x: 860 },
  { name: 'Málaga Airport', time: '55 min', x: 1020 },
];

const path = 'M 60,60 C 160,120 200,20 260,60 S 400,120 460,60 S 600,20 660,60 S 820,110 860,60 S 980,20 1020,55';

export default function RouteMap() {
  return (
    <section
      data-rail-section
      data-rail-dark="false"
      className="relative overflow-hidden bg-bg px-6 pb-32 pt-24 sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-5xl overflow-x-auto">
        <svg viewBox="0 0 1080 140" className="w-[900px] max-w-none sm:w-full" fill="none">
          <motion.path
            d={path}
            stroke="#1d1c1a"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {stops.map((s, i) => (
            <g key={s.name}>
              <motion.circle
                cx={s.x}
                cy={60 + (i % 2 === 0 ? 0 : 0)}
                r="4"
                fill="#1d1c1a"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              />
              <text
                x={s.x}
                y={30}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0.5"
                fill="#1d1c1a"
              >
                {s.name.toUpperCase()}
              </text>
              <text x={s.x} y={44} textAnchor="middle" fontSize="10" fill="#6f6a62">
                {s.time}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <BrandBadge dark className="mx-auto mt-6 h-10 w-10" />
    </section>
  );
}
