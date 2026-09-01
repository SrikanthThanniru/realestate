'use client';

import { useEffect, useState } from 'react';
import BrandBadge from './BrandBadge';

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
            ? 'border-b border-line bg-bg/90 py-3 text-ink backdrop-blur-md'
            : 'border-b border-transparent py-5 text-white mix-blend-difference'
        }`}
      >
        <a href="#hero" aria-label="Aurora Residence — home">
          <BrandBadge dark={scrolled} className="h-11 w-11 sm:h-14 sm:w-14" />
        </a>

        <nav className="hidden flex-col items-end gap-1 text-right md:flex">
          <a
            href="#apartments"
            className="font-serif text-[0.95rem] italic tracking-wide underline decoration-1 underline-offset-4 hover:opacity-70"
          >
            Select an Apartment
          </a>
          <a href="#contact" className="text-[0.72rem] uppercase tracking-[0.15em] no-underline hover:opacity-70">
            Book a Call
          </a>
          <a href="#contact" className="text-[0.72rem] uppercase tracking-[0.15em] no-underline hover:opacity-70">
            Contact
          </a>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] md:hidden"
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
        className="fixed inset-0 z-[90] flex items-center justify-center bg-ink transition-[clip-path] duration-700 ease-smooth"
        style={{ clipPath: open ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}
      >
        <nav className="flex flex-col gap-1">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group font-serif text-4xl text-bg no-underline opacity-50 transition-all duration-300 ease-smooth hover:translate-x-3 hover:opacity-100 sm:text-6xl"
              style={{
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <span className="mr-4 align-super font-sans text-xs opacity-60">
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
