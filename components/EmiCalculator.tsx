'use client';

import { useMemo, useState } from 'react';

const inr = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)} L` : `₹${Math.round(n).toLocaleString('en-IN')}`;

function Slider({ label, value, min, max, step, onChange, display }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string;
}) {
  const id = label.replace(/\s/g, '');
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ivory/55">{label}</label>
        <span className="font-display text-2xl">{display}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 w-full accent-[#d4a259]" />
    </div>
  );
}

export default function EmiCalculator() {
  const [loan, setLoan] = useState(6000000);
  const [rate, setRate] = useState(8.75);
  const [years, setYears] = useState(20);

  const r = useMemo(() => {
    const m = rate / 12 / 100;
    const n = years * 12;
    const emi = (loan * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
    const total = emi * n;
    return { emi, total, interest: total - loan, pPct: (loan / total) * 100 };
  }, [loan, rate, years]);

  const R = 70;
  const C = 2 * Math.PI * R;

  return (
    <section id="emi" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-night px-5 py-28 text-ivory sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1300px]">
        <span className="eyebrow eyebrow-light">Loan planner</span>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02]">
          Plan your monthly <span className="italic text-brass">EMI.</span>
        </h2>

        <div className="mt-14 grid gap-10 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-9">
            <Slider label="Loan amount" value={loan} min={1000000} max={30000000} step={100000} onChange={setLoan} display={inr(loan)} />
            <Slider label="Interest rate" value={rate} min={6} max={14} step={0.05} onChange={setRate} display={`${rate.toFixed(2)}%`} />
            <Slider label="Tenure" value={years} min={5} max={30} step={1} onChange={setYears} display={`${years} yrs`} />
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row lg:flex-col xl:flex-row">
            <svg viewBox="0 0 180 180" className="h-44 w-44 shrink-0 -rotate-90" role="img" aria-label="Principal versus interest">
              <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(244,239,230,.12)" strokeWidth="18" />
              <circle
                cx="90" cy="90" r={R} fill="none" stroke="#d4a259" strokeWidth="18" strokeLinecap="butt"
                strokeDasharray={`${(r.pPct / 100) * C} ${C}`}
                style={{ transition: 'stroke-dasharray .6s cubic-bezier(.16,1,.3,1)' }}
              />
            </svg>
            <div className="text-center sm:text-left lg:text-center xl:text-left">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50">Monthly EMI</p>
              <p className="font-display text-5xl font-light text-brass">{inr(r.emi)}</p>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between gap-8"><dt className="text-ivory/60"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-brass" />Principal</dt><dd>{inr(loan)}</dd></div>
                <div className="flex justify-between gap-8"><dt className="text-ivory/60"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-white/20" />Interest</dt><dd>{inr(r.interest)}</dd></div>
                <div className="flex justify-between gap-8 border-t border-white/15 pt-1"><dt className="text-ivory/60">Total payable</dt><dd>{inr(r.total)}</dd></div>
              </dl>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-ivory/40">Illustrative estimate only; actual rates and eligibility depend on your lender.</p>
      </div>
    </section>
  );
}
