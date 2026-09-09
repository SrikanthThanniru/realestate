'use client';

import { useEffect, useState } from 'react';

export default function SectionRail() {
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(1);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-rail-section]'));
    setTotal(sections.length);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sections.indexOf(entry.target as HTMLElement);
            if (i !== -1) setIndex(i);
            const isDark = (entry.target as HTMLElement).dataset.railDark === 'true';
            setDark(isDark);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const color = dark ? 'text-white/80' : 'text-ink/70';
  const lineColor = dark ? 'bg-white/30' : 'bg-ink/20';

  return (
    <div
      className={`pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 transition-colors duration-500 lg:flex ${color}`}
    >
      <span className="font-sans text-[0.65rem] tracking-[0.15em]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={`h-24 w-px ${lineColor}`}>
        <span
          className={`block w-px transition-all duration-700 ease-out ${dark ? 'bg-white' : 'bg-ink'}`}
          style={{ height: `${((index + 1) / Math.max(total, 1)) * 100}%` }}
        />
      </span>
      <span className="font-sans text-[0.65rem] tracking-[0.15em]">
        {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}
