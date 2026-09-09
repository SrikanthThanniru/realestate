'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import { featuredProjects } from './data';
import type { ProjectStatus } from './data';

const statusStyles: Record<ProjectStatus, string> = {
  'On-going': 'border-gold/40 bg-gold/10 text-gold',
  Upcoming: 'border-bloom/40 bg-bloom/10 text-bloom',
  Completed: 'border-ink/25 bg-ink/5 text-ink',
};

export default function ProjectShowcase() {
  return (
    <>
      {featuredProjects.map((p, i) => (
        <section
          key={p.name}
          id={p.status === 'On-going' ? 'projects' : undefined}
          data-rail-section
          data-rail-dark="false"
          className="bg-bg px-6 py-20 sm:px-12 lg:px-24"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <Reveal
              delay={0.1}
              className={`relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-xl ${
                i % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-bg/90 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.15em] text-ink shadow backdrop-blur">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {p.location}
              </span>
            </Reveal>

            {/* Content */}
            <Reveal delay={0.2} className={`text-center lg:text-left ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <span className="font-sans text-[0.7rem] tracking-[0.2em] text-muted">
                  0{i + 1} / {String(featuredProjects.length).padStart(2, '0')}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] ${statusStyles[p.status as ProjectStatus]}`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.02] text-ink">
                {p.name}
              </h3>

              <p className="mt-2 font-display text-xl font-semibold text-gold">{p.price}</p>

              <p className="mx-auto mt-5 max-w-[42ch] text-muted lg:mx-0">{p.blurb}</p>

              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3 text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors duration-500 ease-smooth hover:bg-ink hover:text-bg"
              >
                Enquire about {p.name}
                <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
