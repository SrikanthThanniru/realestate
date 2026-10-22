'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, projectImages, locations } from './data';

type P = (typeof projects)[number];
const Ctx = createContext<(name: string) => void>(() => {});
export const useProjectModal = () => useContext(Ctx);

const num = (s?: string) => (s ? Number(s.replace(/[^\d]/g, '')) : 0);
const gallery = ['/villas/villa-1.png', '/villas/villa-2.png', '/villas/villa-3.png', '/villas/villa-4.png', '/villas/villa-5.png'];

function Modal({ p, onClose }: { p: P; onClose: () => void }) {
  const [img, setImg] = useState(projectImages[p.name]);
  const loc = locations.find((l) => l.name === p.location);
  const growth = p.priceFrom && p.priceNow ? Math.round(((num(p.priceNow) - num(p.priceFrom)) / num(p.priceFrom)) * 100) : null;
  const others = loc?.projectNames.filter((n) => n !== p.name) ?? [];

  const enquire = () => {
    window.dispatchEvent(new CustomEvent('select-project', { detail: p.name }));
    onClose();
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 350);
  };

  const facts: [string, string][] = [
    ['Location', p.location],
    ['Type', p.category],
    ['Status', p.status],
    ...(p.year ? ([['Delivered', p.year]] as [string, string][]) : []),
    ...(p.priceFrom ? ([['Launch price', p.priceFrom]] as [string, string][]) : []),
    ['Current price', p.priceNow ?? 'Launching soon'],
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[400] flex items-end justify-center bg-ink/80 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid max-h-[94svh] w-full max-w-6xl overflow-y-auto rounded-t-[1.75rem] bg-paper sm:rounded-[1.75rem] lg:grid-cols-[1.25fr_1fr] lg:overflow-hidden"
      >
        <button
          autoFocus
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-xl text-ivory transition-transform hover:scale-110"
        >
          ✕
        </button>

        <div className="bg-ink">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[min(70svh,640px)]">
            <AnimatePresence mode="wait">
              <motion.div key={img} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <Image src={img} alt={`${p.name} render`} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" priority />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-2 overflow-x-auto p-3">
            {gallery.map((g) => (
              <button
                key={g}
                onClick={() => setImg(g)}
                aria-label="Show image"
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition ${img === g ? 'ring-brass' : 'ring-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image src={g} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-7 sm:p-10 lg:max-h-[min(70svh,640px)] lg:overflow-y-auto">
          <span className="eyebrow">{p.status}</span>
          <h3 className="mt-3 font-display text-4xl font-light leading-none sm:text-5xl">{p.name}</h3>
          {growth !== null && (
            <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-ivory">
              <span className="text-brass">▲ +{growth}%</span> since launch
            </p>
          )}
          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-paper p-4">
                <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-stone">{k}</dt>
                <dd className="mt-1 font-display text-lg">{v}</dd>
              </div>
            ))}
          </dl>
          {others.length > 0 && (
            <p className="mt-5 text-sm text-stone">
              Also in {p.location}: <span className="text-ink">{others.join(', ')}</span>
            </p>
          )}
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <button onClick={enquire} className="rounded-full bg-brass px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink transition-transform hover:scale-105">
              Enquire about {p.name}
            </button>
            {loc && (
              <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/25 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-ivory">
                Directions
              </a>
            )}
          </div>
          <p className="mt-4 text-[0.68rem] text-stone">Representative imagery. Details are indicative — confirm with our sales team.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const open = useCallback((n: string) => setName(n), []);
  const close = useCallback(() => setName(null), []);
  const p = projects.find((x) => x.name === name);

  useEffect(() => {
    if (!name) return;
    const key = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', key);
    };
  }, [name, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      <AnimatePresence>{p && <Modal key={p.name} p={p} onClose={close} />}</AnimatePresence>
    </Ctx.Provider>
  );
}
