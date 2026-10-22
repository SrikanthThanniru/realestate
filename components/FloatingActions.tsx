'use client';

import { useEffect, useState } from 'react';
import { contact } from './data';

export default function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <a
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed bottom-20 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-500 ease-smooth hover:scale-110 md:bottom-6 ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2.05 22l5.44-1.28a9.87 9.87 0 0 0 4.55 1.12h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.11c-.24.68-1.4 1.31-1.93 1.36-.5.05-1.02.24-3.42-.7-2.9-1.15-4.76-4.09-4.9-4.28-.14-.19-1.17-1.56-1.17-2.97 0-1.42.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.75 1.23 1.6 1.99 1.1.98 2.03 1.29 2.31 1.43.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.69-.17 1.37Z" />
        </svg>
      </a>

      <div
        className={`fixed inset-x-0 bottom-0 z-[85] flex bg-ink/95 backdrop-blur transition-transform duration-500 ease-smooth md:hidden ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex-1 py-4 text-center text-sm font-semibold text-ivory">
          Call now
        </a>
        <a href="#contact" className="flex-1 bg-brass py-4 text-center text-sm font-bold text-ink">
          Book a visit
        </a>
      </div>
    </>
  );
}
