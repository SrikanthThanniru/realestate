'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { projects, projectImages, type ProjectStatus } from './data';
import { useProjectModal } from './ProjectModal';

const tabs: ('All' | ProjectStatus)[] = ['All', 'On-going', 'Upcoming', 'Completed'];

export default function PortfolioIndex() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('All');
  const [hover, setHover] = useState<string | null>(null);
  const openProject = useProjectModal();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26 });
  const sy = useSpring(my, { stiffness: 220, damping: 26 });

  const list = projects.filter((p) => tab === 'All' || p.status === tab);

  return (
    <section
      id="portfolio"
      className="bg-paper px-5 py-28 sm:px-8 lg:px-12 lg:py-36"
      onMouseMove={(e) => {
        mx.set(e.clientX + 28);
        my.set(e.clientY - 120);
      }}
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">The complete portfolio</span>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-none">
              Every project, <span className="italic text-brassdeep">one index.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full border px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  tab === t ? 'border-ink bg-ink text-ivory' : 'border-line text-stone hover:border-ink hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-14 border-t border-ink">
          {list.map((p, i) => (
            <li
              key={p.name}
              onMouseEnter={() => setHover(p.name)}
              onMouseLeave={() => setHover(null)}
              onClick={() => openProject(p.name)}
              onKeyDown={(e) => e.key === 'Enter' && openProject(p.name)}
              role="button"
              tabIndex={0}
              data-cursor
              data-label="Open"
              className="group grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line py-6 transition-all duration-500 ease-smooth hover:bg-ivory hover:pl-4 sm:grid-cols-[3rem_1.4fr_1fr_1fr_auto] sm:gap-x-6"
            >
              <span className="text-xs tabular-nums text-stone">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-light transition-colors group-hover:text-brassdeep">
                {p.name}
              </h3>
              <span className="hidden text-sm text-stone sm:block">
                {p.location}
                {p.year ? ` · ${p.year}` : ''}
              </span>
              <span className="hidden text-sm sm:block">
                {p.priceNow ? (
                  <>
                    {p.priceFrom && <span className="mr-2 text-stone line-through">{p.priceFrom}</span>}
                    <b className="font-semibold">{p.priceNow}</b>
                  </>
                ) : (
                  <span className="italic text-stone">Launching soon</span>
                )}
              </span>
              <span
                className={`justify-self-end rounded-full px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] ${
                  p.status === 'On-going' ? 'bg-brass text-ink' : p.status === 'Upcoming' ? 'border border-ink' : 'bg-ink text-ivory'
                }`}
              >
                {p.status}
              </span>
              <span className="col-start-2 col-end-4 text-xs text-stone sm:hidden">
                {p.location}
                {p.year ? ` · ${p.year}` : ''} · {p.priceNow ?? 'Launching soon'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following image preview (desktop) */}
      <AnimatePresence>
        {hover && (
          <motion.div
            key="preview"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden h-60 w-80 overflow-hidden rounded-2xl shadow-2xl lg:block"
          >
            <Image src={projectImages[hover]} alt="" fill sizes="320px" className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
