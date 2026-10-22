'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { t: 'Discover', d: 'Share your budget and preferred location; we shortlist the communities that fit.' },
  { t: 'Visit', d: 'Tour the site with our team and see the plots, villas and amenities first-hand.' },
  { t: 'Verify', d: 'Clear title and transparent paperwork, explained step by step.' },
  { t: 'Handover', d: 'Timely registration and possession, with after-sales support you can rely on.' },
];

const faqs = [
  { q: 'What types of properties do you offer?', a: 'Premium gated-community villas and open plots across Hyderabad’s growth corridors.' },
  { q: 'Where are your projects located?', a: 'Aushapur, Peerzadiguda, Bacharam and Bandaraviryal — see the footprint map above.' },
  { q: 'Can I schedule a site visit?', a: 'Yes. Use the booking form, call us, or message us on WhatsApp and we will arrange a visit.' },
  { q: 'How do I verify pricing and availability?', a: 'Website content is indicative. Please confirm pricing, availability and approvals with our authorised sales team.' },
];

export default function ProcessFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-night px-5 py-28 text-ivory sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1300px]">
        <span className="eyebrow eyebrow-light">How it works</span>
        <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02]">
          From first call to <span className="italic text-brass">front door.</span>
        </h2>

        <ol className="mt-16 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-t border-white/20 pt-6"
            >
              <span className="absolute -top-1.5 left-0 h-3 w-3 rounded-full bg-brass" />
              <span className="font-display text-5xl font-light text-brass">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-light">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">{s.d}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-28 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light">Questions, answered.</h2>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-light"
                >
                  {f.q}
                  <span aria-hidden className={`text-3xl text-brass transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`grid transition-all duration-500 ease-smooth ${open === i ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden text-ivory/65">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
