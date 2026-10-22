'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DayNight() {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-ink px-5 py-28 text-ivory sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1300px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow eyebrow-light">Day &amp; night</span>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02]">
              Beautiful at <span className="italic text-brass">every hour.</span>
            </h2>
          </div>
          <p className="max-w-sm text-ivory/60">Drag the handle to move from golden daylight into an evening glow.</p>
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mt-12">
        <motion.div
          ref={box}
          variants={{
            hidden: { clipPath: 'inset(0 0 100% 0 round 28px)' },
            show: { clipPath: 'inset(0 0 0% 0 round 28px)', transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] } },
          }}
          data-cursor
          data-label="Drag"
          onPointerDown={(e) => {
            setDragging(true);
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
            move(e.clientX);
          }}
          onPointerMove={(e) => dragging && move(e.clientX)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[1.75rem] sm:aspect-[16/9]"
        >
          <Image src="/villas/villa-1.png" alt="Villa at dusk" fill sizes="(min-width:1300px) 1300px, 100vw" className="object-cover" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src="/villas/villa-2.png" alt="Villa in daylight" fill sizes="(min-width:1300px) 1300px, 100vw" className="object-cover" draggable={false} />
          </div>

          <span className="absolute left-5 top-5 rounded-full bg-ivory/90 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink">Day</span>
          <span className="absolute right-5 top-5 rounded-full bg-ink/80 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brass">Dusk</span>

          <div className="absolute inset-y-0 w-px bg-ivory shadow-[0_0_20px_rgba(0,0,0,.5)]" style={{ left: `${pos}%` }}>
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory bg-ink/70 text-brass backdrop-blur">
              ◀ ▶
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Compare day and dusk view"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            style={{ pointerEvents: 'none' }}
          />
        </motion.div>
        </motion.div>
        <p className="mt-4 text-xs text-ivory/40">Representative renders.</p>
      </div>
    </section>
  );
}
