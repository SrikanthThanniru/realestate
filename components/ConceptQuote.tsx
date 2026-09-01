'use client';

import Reveal from './Reveal';
import BrandBadge from './BrandBadge';

function Bloom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="55"
          rx="16"
          ry="42"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
    </svg>
  );
}

export default function ConceptQuote() {
  return (
    <section
      data-rail-section
      data-rail-dark="false"
      className="relative overflow-hidden bg-bg px-6 py-28 text-center sm:px-12 lg:px-24"
    >
      <Bloom className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 text-bloom/25 sm:h-72 sm:w-72" />
      <Bloom className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rotate-45 text-bloom/25 sm:h-72 sm:w-72" />

      <Reveal className="relative z-10 mx-auto max-w-4xl">
        <span className="eyebrow">The concept</span>
        <h2 className="font-display text-[clamp(1.6rem,4.2vw,2.9rem)] font-bold uppercase leading-tight tracking-tight text-ink">
          Aurora Residence is a boutique gated community of only twenty-eight
          residences, designed around privacy, wellbeing and timeless
          Mediterranean living
        </h2>

        <p className="mx-auto mt-8 max-w-md text-muted">
          Inspired by the golden era of the southern coast, the project combines
          contemporary architecture with warm materials, natural landscaping and
          carefully curated spaces.
        </p>

        <BrandBadge dark className="mx-auto mt-10 h-10 w-10" />
      </Reveal>
    </section>
  );
}
