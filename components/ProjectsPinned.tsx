'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, projectImages, type ProjectStatus } from './data';
import { useProjectModal } from './ProjectModal';

const featured = ['Spanesta', 'Spalena WavOn', 'Sparkle Heaven', 'Sparrows Vipasa', 'Spalena', 'Sparrows Flivora']
  .map((n) => projects.find((p) => p.name === n)!)
  .filter(Boolean);

const tone: Record<ProjectStatus, string> = {
  'On-going': 'bg-brass text-ink',
  Upcoming: 'bg-ivory text-ink',
  Completed: 'bg-ink/70 text-ivory backdrop-blur',
};

function Card({ p, i }: { p: (typeof featured)[number]; i: number }) {
  const open = useProjectModal();
  return (
    <article
      onClick={() => open(p.name)}
      onKeyDown={(e) => e.key === 'Enter' && open(p.name)}
      role="button"
      tabIndex={0}
      data-cursor
      data-label="View"
      className="group relative cursor-pointer h-[68vh] min-h-[440px] w-[min(82vw,560px)] shrink-0 snap-center overflow-hidden rounded-[1.75rem] bg-night lg:w-[min(36vw,560px)]">
      <Image
        src={projectImages[p.name]}
        alt={`${p.name}, ${p.location}`}
        fill
        sizes="(min-width:1024px) 36vw, 82vw"
        className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <span className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] ${tone[p.status]}`}>
        {p.status}
      </span>
      <span className="absolute right-6 top-4 font-display text-6xl font-light text-ivory/30">0{i + 1}</span>
      <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-brass">
          {p.location} · {p.category}
        </p>
        <h3 className="mt-2 font-display text-4xl font-light">{p.name}</h3>
        <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4 text-sm">
          <span className="text-ivory/70">{p.priceNow ? `From ${p.priceNow}` : 'Launching soon'}</span>
          <span className="font-semibold text-brass transition-transform duration-300 group-hover:translate-x-1">
            View details →
          </span>
        </div>
      </div>
    </article>
  );
}

function Heading() {
  return (
    <div className="shrink-0 pr-6 lg:w-[min(30vw,460px)]">
      <span className="eyebrow eyebrow-light">Featured communities</span>
      <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] text-ivory">
        Spaces designed for <span className="italic text-brass">living well.</span>
      </h2>
      <p className="mt-6 max-w-sm text-ivory/65">
        From delivered landmarks to launches in progress — scroll to walk through our flagship communities.
      </p>
    </div>
  );
}

export default function ProjectsPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80));
    };
    measure();
    const t = setTimeout(measure, 600);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="projects" className="bg-night text-ivory">
      {/* Desktop: pinned horizontal journey */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `calc(100vh + ${dist}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex items-center gap-8 pl-12 pr-24 xl:pl-[6vw]">
            <Heading />
            {featured.map((p, i) => (
              <Card key={p.name} p={p} i={i} />
            ))}
          </motion.div>
          <div className="absolute inset-x-12 bottom-10 h-px bg-white/15 xl:inset-x-[6vw]">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-brass" />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: native snap scroller */}
      <div className="px-5 py-20 sm:px-8 lg:hidden">
        <Heading />
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8">
          {featured.map((p, i) => (
            <Card key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
