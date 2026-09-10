'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Locations', href: '#locations' },
  { label: 'Portfolio', href: '#portfolio' },
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
            : 'border-b border-transparent py-5'
        }`}
      >
        <a href="#hero" aria-label="Sri Jagathswapna Realtors — home">
          <Image
            src="/brand/js-logo.png"
            alt="Sri Jagathswapna Realtors"
            width={220}
            height={185}
            priority
            className="h-12 w-auto sm:h-16"
          />
        </a>

        <div className="flex items-center gap-6 text-ink">
          <nav className="hidden flex-col items-end gap-1 text-right md:flex">
            <a
              href="#projects"
              className="font-serif text-[0.95rem] italic tracking-wide underline decoration-1 underline-offset-4 hover:opacity-70"
            >
              View Our Projects
            </a>
            <a href="tel:+919885447747" className="text-[0.72rem] uppercase tracking-[0.15em] no-underline hover:opacity-70">
              Call Us
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
        </div>
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
