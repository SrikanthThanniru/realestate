import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LifestyleShowcase from '@/components/LifestyleShowcase';
import ArcDivider from '@/components/ArcDivider';
import SectionRail from '@/components/SectionRail';
import Reveal from '@/components/Reveal';
import Parallax from '@/components/Parallax';
import LocationCarousel from '@/components/LocationCarousel';
import ConceptQuote from '@/components/ConceptQuote';
import RouteMap from '@/components/RouteMap';
import TypologyShowcase from '@/components/TypologyShowcase';
import ContactForm from '@/components/ContactForm';
import { reasons, amenities, smartFeatures } from '@/components/data';

export default function Page() {
  return (
    <main>
      <SectionRail />
      <Header />
      <Hero />
      <LifestyleShowcase />
      <ArcDivider />

      {/* Reasons */}
      <section data-rail-section data-rail-dark="false" className="bg-bg px-6 pb-24 sm:px-12 lg:px-24">
        <div className="grid gap-10 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="group">
              <div className="mb-6 aspect-[4/5] overflow-hidden">
                <Image
                  src={r.img}
                  alt=""
                  width={1000}
                  height={1250}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-2xl">{r.title}</h3>
              <p className="mt-2 max-w-[34ch] text-muted">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <LocationCarousel />

      {/* Full-bleed architecture parallax */}
      <section data-rail-section data-rail-dark="true" className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <Parallax
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80"
          ratio="h-full"
          className="h-full"
        />
      </section>

      <ConceptQuote />
      <RouteMap />
      <TypologyShowcase />

      {/* Amenities marquee */}
      <section data-rail-section data-rail-dark="false" className="overflow-hidden border-y border-line py-16">
        <div className="whitespace-nowrap">
          <div className="inline-flex animate-marquee items-center gap-8 font-serif text-[clamp(1.6rem,4vw,2.8rem)] text-muted">
            {[...amenities, ...amenities, ...amenities, ...amenities].map((a, i) => (
              <span key={i} className="flex items-center gap-8">
                {a} <span>·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Smart home */}
      <section
        data-rail-section
        data-rail-dark="false"
        className="grid items-center gap-8 px-6 py-24 sm:px-12 lg:grid-cols-2 lg:gap-20 lg:px-24"
      >
        <Reveal className="order-2 lg:order-1">
          <Parallax
            src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80"
            ratio="aspect-[4/3]"
          />
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <span className="eyebrow">Smart home</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">Quiet technology</h2>
          <ul className="mt-6">
            {smartFeatures.map((f) => (
              <li key={f} className="border-b border-line py-4 text-muted">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Credits */}
      <Reveal className="grid gap-8 border-t border-line px-6 py-20 sm:px-12 lg:grid-cols-2 lg:px-24">
        <div>
          <span className="eyebrow">Architecture</span>
          <p className="font-serif text-[clamp(1.2rem,2.5vw,1.6rem)]">
            Schiemann Weyers &amp; OCWA Architects
          </p>
        </div>
        <div>
          <span className="eyebrow">Developer</span>
          <p className="font-serif text-[clamp(1.2rem,2.5vw,1.6rem)]">
            Aurora Living S.L. · Completion 2027
          </p>
        </div>
      </Reveal>

      {/* CTA */}
      <section
        id="contact"
        data-rail-section
        data-rail-dark="true"
        className="bg-accent px-6 py-24 text-white sm:px-12 lg:px-24"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">
            Book a private viewing
          </h2>
          <ContactForm />
          <div className="flex flex-wrap justify-center gap-8 text-sm tracking-wide">
            <a href="tel:+34000000000" className="text-white">
              +34 000 000 000
            </a>
            <span>Carretera de la Costa, km 12</span>
          </div>
        </Reveal>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 px-6 py-8 text-[0.78rem] text-muted sm:px-12 lg:px-24">
        <span>© 2026 Aurora Residence</span>
        <nav className="flex gap-6">
          <a href="#" className="text-muted hover:text-ink">Privacy</a>
          <a href="#" className="text-muted hover:text-ink">Terms</a>
          <a href="#" className="text-muted hover:text-ink">Instagram</a>
        </nav>
      </footer>
    </main>
  );
}
