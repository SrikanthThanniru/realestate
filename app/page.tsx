import Image from 'next/image';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LifestyleShowcase from '@/components/LifestyleShowcase';
import ArcDivider from '@/components/ArcDivider';
import SectionRail from '@/components/SectionRail';
import Reveal from '@/components/Reveal';
import Parallax from '@/components/Parallax';
import LocationCarousel from '@/components/LocationCarousel';
import LocationSequence from '@/components/LocationSequence';
import ProjectShowcase from '@/components/ProjectShowcase';
import ProjectMap from '@/components/ProjectMap';
import ProjectPortfolio from '@/components/ProjectPortfolio';
import Stats from '@/components/Stats';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { reasons, amenities, smartFeatures, contact } from '@/components/data';

export default function Page() {
  return (
    <main>
      <Preloader />
      <SectionRail />
      <Header />
      <Hero />
      <Stats />
      <LifestyleShowcase />
      <ArcDivider />

      {/* Mission / Vision / Trust */}
      <section data-rail-section data-rail-dark="false" className="bg-sky px-6 pb-24 pt-4 sm:px-12 lg:px-24">
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
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
          ratio="h-full"
          className="h-full"
        />
      </section>

      <LocationSequence />
      <ProjectShowcase />
      <ProjectMap />
      <ProjectPortfolio />

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

      {/* Smart features */}
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
          <span className="eyebrow">Built in</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">Modern, dependable homes</h2>
          <ul className="mt-6">
            {smartFeatures.map((f) => (
              <li key={f} className="border-b border-line py-4 text-muted">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CTA */}
      <section
        id="contact"
        data-rail-section
        data-rail-dark="true"
        className="bg-accent px-6 py-24 text-white sm:px-12 lg:px-24"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">
            Book a site visit
          </h2>
          <ContactForm />
          <div className="flex flex-wrap justify-center gap-8 text-sm tracking-wide">
            <a href={`tel:+${contact.whatsapp}`} className="text-white">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="text-white">
              {contact.email}
            </a>
            <span>{contact.address}</span>
          </div>
        </Reveal>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 px-6 py-8 text-[0.78rem] text-muted sm:px-12 lg:px-24">
        <span>© {new Date().getFullYear()} {contact.companyLong}</span>
        <nav className="flex gap-6">
          <a href="#" className="text-muted hover:text-ink">Privacy</a>
          <a href="#" className="text-muted hover:text-ink">Terms</a>
          <a href="#" className="text-muted hover:text-ink">Instagram</a>
        </nav>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
