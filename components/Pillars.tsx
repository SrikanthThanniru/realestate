'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { reasons, amenities, smartFeatures } from './data';
import Tilt from './Tilt';

export default function Pillars() {
  const perks = [...amenities, ...smartFeatures];
  return (
    <section className="bg-paper px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1300px]">
        <span className="eyebrow">Our promise</span>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02]">
          Three principles behind <span className="italic text-brassdeep">every foundation.</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group"
            >
              <Tilt className="h-full overflow-hidden rounded-[1.75rem] bg-ink text-ivory">
              <div className="relative h-72 overflow-hidden">
                <Image src={r.img} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover opacity-70 transition-all duration-[1400ms] ease-smooth group-hover:scale-110 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <span className="absolute left-6 top-4 font-display text-7xl font-light text-brass/80">0{i + 1}</span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-3xl font-light">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{r.body}</p>
              </div>
              </Tilt>
            </motion.article>
          ))}
        </div>

        <div className="mt-24 border-t border-ink pt-10">
          <p className="eyebrow mb-8">Included in our communities</p>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
            {perks.map((a, i) => (
              <li key={a} className="group bg-paper p-6 transition-colors duration-500 hover:bg-ink hover:text-ivory">
                <span className="text-xs tabular-nums text-brassdeep">0{i + 1}</span>
                <p className="mt-6 font-display text-xl font-light leading-tight">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
