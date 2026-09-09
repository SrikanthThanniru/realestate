'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const fields = [
  { name: 'name', label: 'Full name', type: 'text' },
  { name: 'email', label: 'Email address', type: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
];

function Field({
  name,
  label,
  type,
  required,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 rounded transition-all duration-300 ease-smooth ${
          active
            ? '-top-2 bg-accent px-1 text-[0.68rem] tracking-wide text-white/90'
            : 'top-1/2 left-5 -translate-y-1/2 text-[0.9rem] text-white/55'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-white/25 bg-white/[0.06] px-5 py-4 text-[0.95rem] text-white outline-none backdrop-blur-sm transition-colors duration-300 ease-smooth placeholder-transparent focus:border-white/80 focus:bg-white/[0.1]"
      />
    </div>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative mx-auto my-12 max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <path
                  d="M1 8L8 15L21 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
            <p className="font-serif text-2xl text-white">Thank you</p>
            <p className="max-w-xs text-sm text-white/70">
              We&rsquo;ve received your request — our team will call you within one
              business day to arrange the viewing.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-2 text-[0.75rem] uppercase tracking-[0.12em] text-white/70 underline underline-offset-4 transition-colors hover:text-white"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-5"
          >
            <Field name="name" label="Full name" type="text" required />
            <Field name="email" label="Email address" type="email" required />
            <Field name="phone" label="Phone number" type="tel" />

            <button
              type="submit"
              className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-white bg-white px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-accent transition-transform duration-300 ease-smooth hover:scale-[1.01] active:scale-[0.99]"
            >
              Request a call
              <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                →
              </span>
            </button>

            <p className="text-center text-[0.72rem] leading-relaxed text-white/50">
              By submitting, you agree to be contacted by Sri Jagathswapna Realtors.
              We never share your details.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
