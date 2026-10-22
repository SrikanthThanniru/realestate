'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contact, projects } from './data';
import SplitText from './SplitText';

const input =
  'w-full border-0 border-b border-white/25 bg-transparent px-0 py-4 text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-brass';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [project, setProject] = useState('');

  useEffect(() => {
    const on = (e: Event) => {
      setProject((e as CustomEvent<string>).detail);
      setSent(false);
    };
    window.addEventListener('select-project', on);
    return () => window.removeEventListener('select-project', on);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      `Hello ${contact.companyLong}, I'd like to book a site visit.`,
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      f.get('project') ? `Interested in: ${f.get('project')}` : '',
      f.get('date') ? `Preferred date: ${f.get('date')}` : '',
      f.get('note') ? `Note: ${f.get('note')}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink px-5 py-28 text-ivory sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1300px]">
        <span className="eyebrow eyebrow-light">Let’s talk</span>
        <h2 className="mt-5 font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[0.95]">
          <SplitText text="Your legacy" />
          <br />
          <SplitText text="starts here." className="italic text-brass" delay={0.3} />
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            {[
              ['Call', contact.phone, `tel:${contact.phone.replace(/\s/g, '')}`],
              ['Email', contact.email, `mailto:${contact.email}`],
              ['Visit', contact.address, undefined],
            ].map(([k, v, href]) => (
              <div key={k as string} className="border-b border-white/15 pb-6">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-brass">{k}</p>
                {href ? (
                  <a href={href as string} className="mt-2 block font-display text-2xl font-light transition-colors hover:text-brass sm:text-3xl">
                    {v}
                  </a>
                ) : (
                  <p className="mt-2 font-display text-2xl font-light sm:text-3xl">{v}</p>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
                  <p className="font-display text-4xl font-light text-brass">Thank you.</p>
                  <p className="mx-auto mt-4 max-w-sm text-ivory/70">
                    Your request is ready in WhatsApp — press send and our team will reach out within one business day.
                  </p>
                  <button onClick={() => setSent(false)} className="mt-8 text-xs uppercase tracking-[0.2em] underline underline-offset-4">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="grid gap-2 sm:grid-cols-2 sm:gap-x-8">
                  <label className="sr-only" htmlFor="name">Full name</label>
                  <input id="name" name="name" required placeholder="Full name" className={input} />
                  <label className="sr-only" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" required placeholder="Phone number" className={input} />
                  <label className="sr-only" htmlFor="project">Project</label>
                  <select id="project" name="project" value={project} onChange={(e) => setProject(e.target.value)} className={`${input} [&>option]:text-ink`}>
                    <option value="">Interested in…</option>
                    {projects.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} — {p.location}
                      </option>
                    ))}
                  </select>
                  <label className="sr-only" htmlFor="date">Preferred date</label>
                  <input id="date" name="date" type="date" className={`${input} [color-scheme:dark]`} />
                  <label className="sr-only" htmlFor="note">Message</label>
                  <textarea id="note" name="note" rows={3} placeholder="Anything we should know?" className={`${input} sm:col-span-2`} />
                  <button
                    type="submit"
                    className="mt-6 rounded-full bg-brass px-8 py-5 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-ink transition-transform duration-300 ease-smooth hover:scale-[1.02] sm:col-span-2"
                  >
                    Request a site visit →
                  </button>
                  <p className="mt-3 text-xs text-ivory/45 sm:col-span-2">
                    Submitting opens WhatsApp with your details pre-filled. We never share your information.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-32 max-w-[1300px] border-t border-white/15 pt-10">
        <p aria-hidden className="outline-text font-display text-[clamp(2.5rem,10vw,9rem)] font-light leading-none text-ivory/30">
          Jagathswapna
        </p>
        <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-ivory/50 md:flex-row">
          <span>© {new Date().getFullYear()} {contact.companyLong}</span>
          <span className="max-w-xl">
            Content is indicative and for general information. Please verify pricing, availability and approvals with
            our authorised sales team before booking.
          </span>
        </div>
      </footer>
    </section>
  );
}
