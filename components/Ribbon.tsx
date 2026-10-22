'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

const items = ['Gated Villas', 'Open Plots', 'Aushapur', 'Peerzadiguda', 'Bacharam', 'Bandaraviryal', 'Since 2015'];

/** Auto-scrolling marquee that speeds up, reverses and skews with page scroll velocity. */
export default function Ribbon() {
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const dir = useRef(1);

  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const skewX = useTransform(vel, [-2500, 0, 2500], [14, 0, -14]);

  useAnimationFrame((_, delta) => {
    const w = (track.current?.scrollWidth ?? 0) / 2;
    if (!w) return;
    const v = vel.get();
    if (v < -20) dir.current = -1;
    else if (v > 20) dir.current = 1;
    const speed = 0.06 * (1 + Math.min(Math.abs(v) / 300, 8));
    let nx = x.get() - dir.current * speed * delta;
    if (nx <= -w) nx += w;
    if (nx > 0) nx -= w;
    x.set(nx);
  });

  const row = [...items, ...items];
  const set = (k: string) =>
    row.map((t, i) => (
      <span key={k + i} className="flex items-center gap-12 pr-12">
        <span className={i % 2 ? 'outline-text' : ''}>{t}</span>
        <span className="text-brass">✦</span>
      </span>
    ));

  return (
    <div aria-hidden className="overflow-hidden border-y border-white/10 bg-ink py-6 text-ivory">
      <motion.div style={{ skewX }} className="will-change-transform">
        <motion.div ref={track} style={{ x }} className="flex w-max whitespace-nowrap font-display text-[clamp(1.8rem,4vw,3.4rem)] font-light">
          {set('a')}
          {set('b')}
        </motion.div>
      </motion.div>
    </div>
  );
}
