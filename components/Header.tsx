'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Apartments', href: '#apartments' },
  { label: 'Booking', href: '#contact' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 sm:px-8 lg:px-12 transition-all duration-500 ease-smooth ${
          scrolled
            ? 'border-b border-line bg-bg/90 py-4 text-ink backdrop-blur-md'
            : 'border-b border-transparent py-6 text-white mix-blend-difference'
        }`}
      >
        <a href="#hero" className="font-serif text-[1.1rem] tracking-[0.2em] no-underline text-inherit">
          AURORA<span className="ml-2 opacity-60">RESIDENCE</span>
        </a>

        <nav className="hidden md:flex gap-8">
          {['Select an Apartment', 'Book a Call', 'Contact'].map((l) => (
            <a
              key={l}
              href="#contact"
              className="group relative text-[0.82rem] tracking-wide no-underline text-inherit"
            >
              {l}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-500 ease-smooth group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px]"
        >
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ease-smooth ${
              open ? 'translate-y-[3px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ease-smooth ${
              open ? '-translate-y-[3px] -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      <div
        className="fixed inset-0 z-[90] bg-ink flex items-center justify-center transition-[clip-path] duration-700 ease-smooth"
        style={{ clipPath: open ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}
      >
        <nav className="flex flex-col gap-1">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group font-serif text-4xl sm:text-6xl text-bg no-underline opacity-50 transition-all duration-300 ease-smooth hover:opacity-100 hover:translate-x-3"
              style={{
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <span className="align-super text-xs mr-4 opacity-60 font-sans">
                0{i + 1}
              </span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
