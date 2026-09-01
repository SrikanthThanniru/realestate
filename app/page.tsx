import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Parallax from '@/components/Parallax';
import MasterPlan from '@/components/MasterPlan';
import ContactForm from '@/components/ContactForm';
import { reasons, apartments, amenities, smartFeatures } from '@/components/data';

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />

      {/* Refrain */}
      <Reveal className="px-6 py-24 text-center sm:py-40 sm:px-24">
        <p className="font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[1.2]">
          Designed as a community,
          <br />
          <em className="text-muted">not a complex.</em>
        </p>
      </Reveal>

      {/* Reasons */}
      <section className="px-6 pb-24 sm:px-12 lg:px-24">
        <Reveal className="mb-14">
          <span className="eyebrow">Three reasons</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">Why Aurora</h2>
        </Reveal>
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

      {/* Concept */}
      <section className="grid items-center gap-8 px-6 py-24 sm:px-12 lg:grid-cols-2 lg:gap-20 lg:px-24">
        <Reveal>
          <span className="eyebrow">The concept</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">
            Between the town and the coast
          </h2>
          <p className="my-6 max-w-[42ch] text-muted">
            Aurora sits on a quiet ridge with open views to the water. The plan keeps
            cars to the edges and gives the centre back to gardens, paths and light.
          </p>
          <a
            href="#masterplan"
            className="inline-block border border-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.12em] no-underline text-ink transition-colors duration-500 ease-smooth hover:bg-ink hover:text-bg"
          >
            See the master plan
          </a>
        </Reveal>
        <Reveal>
          <Parallax src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80" />
        </Reveal>
      </section>

      <MasterPlan />

      {/* Apartments */}
      <section id="apartments" className="px-6 py-24 sm:px-12 lg:px-24">
        <Reveal className="mb-12">
          <span className="eyebrow">Typologies</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)]">Choose your home</h2>
        </Reveal>
        <div>
          {apartments.map((a, i) => (
            <Reveal
              key={a.title}
              className={`grid items-center gap-6 border-t border-line py-10 lg:grid-cols-2 lg:gap-16 ${
                i === apartments.length - 1 ? 'border-b' : ''
              }`}
            >
              <div
                className={`group aspect-[16/10] overflow-hidden ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={a.img}
                  alt=""
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl">{a.title}</h3>
                <p className="my-2 text-muted">{a.meta}</p>
                <a
                  href="#contact"
                  className="border-b border-ink pb-1 text-[0.8rem] uppercase tracking-[0.12em] no-underline text-ink"
                >
                  Enquire →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Amenities marquee */}
      <section className="overflow-hidden border-y border-line py-16">
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
      <section className="grid items-center gap-8 px-6 py-24 sm:px-12 lg:grid-cols-2 lg:gap-20 lg:px-24">
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
      <section id="contact" className="bg-accent px-6 py-24 text-white sm:px-12 lg:px-24">
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
