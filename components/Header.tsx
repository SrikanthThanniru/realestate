'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { navLinks, contact } from './data';
import Magnetic from './Magnetic';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-500 ease-smooth ${
          scrolled || open ? 'bg-ink/85 py-3 backdrop-blur-xl' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="Sri Jagathswapna Realtors — home" className="rounded-lg bg-ivory px-2.5 py-1.5">
            <Image src="/brand/js-logo.png" alt="Sri Jagathswapna Realtors" width={220} height={185} priority className="h-9 w-auto sm:h-11" />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ivory/80 transition-colors hover:text-ivory"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-500 ease-smooth group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Magnetic strength={0.25}>
                <a href="#contact" className="block rounded-full bg-brass px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Book a visit
                </a>
              </Magnetic>
            </div>
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative h-10 w-10 text-ivory lg:hidden"
            >
              <span className={`absolute left-2 h-px w-6 bg-current transition-all duration-300 ${open ? 'top-5 rotate-45' : 'top-3.5'}`} />
              <span className={`absolute left-2 h-px w-6 bg-current transition-all duration-300 ${open ? 'top-5 -rotate-45' : 'top-6'}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[110] flex flex-col justify-center bg-ink px-8 text-ivory transition-[clip-path] duration-700 ease-smooth lg:hidden`}
        style={{ clipPath: open ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-5xl transition-colors hover:text-brass"
            >
              <span className="mr-4 align-super font-sans text-xs text-brass">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="mt-12 text-sm tracking-wide text-ivory/70">
          {contact.phone}
        </a>
      </div>
    </>
  );
}
