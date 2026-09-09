'use client';

import Reveal from './Reveal';
import { projects, type ProjectStatus } from './data';

const order: ProjectStatus[] = ['On-going', 'Upcoming', 'Completed'];

const statusStyle: Record<ProjectStatus, string> = {
  'On-going': 'border-gold/40 bg-gold/10 text-gold',
  Upcoming: 'border-bloom/40 bg-bloom/10 text-bloom',
  Completed: 'border-ink/25 bg-ink/5 text-ink',
};

const statusDot: Record<ProjectStatus, string> = {
  'On-going': 'bg-gold',
  Upcoming: 'bg-bloom',
  Completed: 'bg-ink',
};

export default function ProjectPortfolio() {
  return (
    <section
      id="portfolio"
      data-rail-section
      data-rail-dark="false"
      className="bg-bg px-6 py-24 sm:px-12 lg:px-24"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Full portfolio</span>
        <h2 className="mt-2 font-display text-[clamp(1.8rem,5vw,3rem)] font-bold uppercase tracking-tight text-ink">
          Every project, at a glance
        </h2>

        {/* Summary counts — the whole portfolio in one glance before the detail below */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {order.map((status) => {
            const count = projects.filter((p) => p.status === status).length;
            if (!count) return null;
            return (
              <span
                key={status}
                className={`rounded-full border px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.14em] ${statusStyle[status]}`}
              >
                {count} {status}
              </span>
            );
          })}
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-4xl">
        {order.map((status) => {
          const items = projects.filter((p) => p.status === status);
          if (!items.length) return null;

          return (
            <div key={status} className="mb-12 last:mb-0">
              <Reveal>
                <h3 className="mb-4 flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.2em] text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
                  {status} ({items.length})
                </h3>
              </Reveal>
              <div className="divide-y divide-line border-y border-line">
                {items.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.05}>
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg px-3 py-4 transition-colors duration-300 hover:bg-line/20 sm:-mx-3">
                      <div>
                        <p className="font-serif text-lg text-ink">{p.name}</p>
                        <p className="text-sm text-muted">
                          {p.location}
                          {p.year ? ` · ${p.year}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {p.priceFrom && p.priceNow ? (
                          <span className="flex items-center gap-1.5 text-sm">
                            <span className="text-muted line-through decoration-muted/50">{p.priceFrom}</span>
                            <span aria-hidden className="text-gold">
                              →
                            </span>
                            <span className="font-semibold text-ink">{p.priceNow}</span>
                          </span>
                        ) : p.priceNow ? (
                          <span className="text-sm font-semibold text-ink">{p.priceNow}</span>
                        ) : (
                          <span className="text-sm italic text-muted">Launching soon</span>
                        )}
                        <span
                          className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] ${statusStyle[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
