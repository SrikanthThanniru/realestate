'use client';

import Image from 'next/image';

export default function BrandBadge({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const color = dark ? '#071c1f' : '#ffffff';
  const text = 'SRI JAGATHSWAPNA REALTORS • EST. HYDERABAD • ';

  return (
    <div className={`relative h-16 w-16 shrink-0 ${className ?? ''}`}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-spin-slow"
        style={{ color }}
      >
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="8.4" letterSpacing="1.5" fill="currentColor">
          <textPath href="#badge-circle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[22%] overflow-hidden rounded-full">
        <Image
          src="/brand/jagathswapna-logo.png"
          alt="Sri Jagathswapna Realtors"
          fill
          sizes="64px"
          className="object-contain"
        />
      </span>
    </div>
  );
}
