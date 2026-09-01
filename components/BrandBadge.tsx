'use client';

export default function BrandBadge({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const color = dark ? '#1d1c1a' : '#ffffff';
  const text = 'AURORA RESIDENCE • AURORA RESIDENCE • ';

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
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ color }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 7 16 8 16 12C16 16 12 17 12 22C12 17 8 16 8 12C8 8 12 7 12 2Z"
            fill="currentColor"
          />
          <path
            d="M2 12C7 12 8 8 12 8C16 8 17 12 22 12C17 12 16 16 12 16C8 16 7 12 2 12Z"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      </span>
    </div>
  );
}
