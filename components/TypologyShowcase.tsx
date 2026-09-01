'use client';

import Image from 'next/image';
import Reveal from './Reveal';

const typologies = [
  {
    name: 'Garden Duplex',
    beds: '2–3',
    area: '97–128 m²',
    blurb: 'Ground and lower level living opening onto a private walled garden.',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Terrace Apartment',
    beds: '3',
    area: '140–176 m²',
    blurb: 'A generous wraparound terrace framed by mature landscaping.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Penthouse Duplex',
    beds: '3–4',
    area: '188–243 m²',
    blurb: 'Two floors crowned with panoramic views and a private rooftop solarium.',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function TypologyShowcase() {
  return (
    <>
      {typologies.map((t) => (
        <section
          key={t.name}
          id={t.name === 'Penthouse Duplex' ? 'apartments' : undefined}
          data-rail-section
          data-rail-dark="false"
          className="relative overflow-hidden bg-bg px-6 py-24 sm:px-12 lg:px-24"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_2fr_1fr]">
            <Reveal className="order-2 flex justify-around gap-8 lg:order-1 lg:flex-col lg:gap-14">
              <div>
                <span className="eyebrow mb-1">Bedrooms</span>
                <p className="font-display text-3xl font-semibold text-ink">{t.beds}</p>
              </div>
              <div>
                <span className="eyebrow mb-1">Area up to</span>
                <p className="font-display text-3xl font-semibold text-ink">{t.area}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative order-1 aspect-[4/3] overflow-hidden lg:order-2">
              <Image src={t.img} alt="" fill className="object-cover" />
            </Reveal>

            <Reveal delay={0.2} className="order-3 text-center lg:text-left">
              <p className="mx-auto max-w-[26ch] text-muted lg:mx-0">{t.blurb}</p>
              <a
                href="#contact"
                className="mt-6 inline-block rounded-full border border-ink px-7 py-3 text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors duration-500 ease-smooth hover:bg-ink hover:text-bg"
              >
                Explore {t.name.split(' ')[0].toLowerCase()}s
              </a>
            </Reveal>
          </div>

          <div className="pointer-events-none mt-4 select-none overflow-hidden text-center">
            <span className="font-display text-[clamp(2.5rem,10vw,7rem)] font-bold uppercase leading-none tracking-tight text-ink/10">
              {t.name}
            </span>
          </div>
        </section>
      ))}
    </>
  );
}
