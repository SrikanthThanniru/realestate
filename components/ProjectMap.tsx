'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Reveal from './Reveal';
import { locations } from './data';

export default function ProjectMap() {
  const mapElRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapElRef.current || mapRef.current) return;

      const map = L.map(mapElRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      });
      mapRef.current = map;

      // Standard OpenStreetMap tiles — free, no key or registration required.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        subdomains: 'abc',
      }).addTo(map);

      const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));

      const markers = locations.map((loc, i) => {
        const icon = L.divIcon({
          className: '',
          html: `
            <div style="
              display:flex;align-items:center;justify-content:center;
              width:34px;height:34px;border-radius:9999px;
              background:#071c1f;border:2px solid #cb3421;
              color:#ffffff;font-family:var(--font-cormorant,Georgia,serif);
              font-weight:700;font-size:15px;
              box-shadow:0 6px 16px -4px rgba(0,0,0,.45);
            ">${i + 1}</div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

        const chips = loc.projectNames
          .map(
            (n) =>
              `<span style="display:inline-block;margin:2px 4px 0 0;padding:2px 8px;border:1px solid #e5e5e6;border-radius:9999px;font-size:11px;color:#5c727d;">${n}</span>`
          )
          .join('');

        marker.bindPopup(
          `<div style="font-family:var(--font-inter,sans-serif);min-width:180px">
            <p style="margin:0 0 4px;font-family:var(--font-cormorant,Georgia,serif);font-size:18px;color:#071c1f;">${loc.name}</p>
            <div style="margin-bottom:8px">${chips}</div>
            <a href="${loc.mapsUrl}" target="_blank" rel="noopener noreferrer"
              style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#071c1f;text-decoration:underline;">
              Get directions →
            </a>
          </div>`,
          { closeButton: false }
        );

        marker.on('click', () => setActive(i));

        return marker;
      });

      markersRef.current = markers;
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    const map = mapRef.current;
    const marker = markersRef.current[i];
    if (!map || !marker) return;
    map.flyTo(marker.getLatLng(), 13, { duration: 0.8 });
    marker.openPopup();
  };

  const current = locations[active];

  return (
    <section
      id="locations"
      data-rail-section
      data-rail-dark="false"
      className="bg-bg px-6 py-24 sm:px-12 lg:px-24"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Where we build</span>
        <h2 className="mt-2 font-display text-[clamp(1.8rem,5vw,3rem)] font-bold uppercase tracking-tight text-ink">
          Our projects across Hyderabad
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Every pin is a real, verified community — pan around the map or step
          through each location below.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-14 max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-line shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
          <div ref={mapElRef} className="h-[440px] w-full sm:h-[520px]" />
        </div>

        {/* Location index — click a number to fly to that pin */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc, i) => (
            <button
              key={loc.name}
              onClick={() => goTo(i)}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-300 ease-smooth ${
                i === active
                  ? 'border-gold bg-ink text-white'
                  : 'border-line bg-transparent text-ink hover:border-gold/60'
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-serif text-xs ${
                  i === active ? 'border-gold text-gold' : 'border-ink/30 text-ink/60'
                }`}
              >
                {i + 1}
              </span>
              <span>
                <span className="block font-serif text-lg leading-tight">{loc.name}</span>
                <span className={`block text-[0.7rem] uppercase tracking-[0.1em] ${
                  i === active ? 'text-white/60' : 'text-muted'
                }`}>
                  {loc.projectNames.length} project{loc.projectNames.length > 1 ? 's' : ''}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {current.projectNames.map((name) => (
              <span key={name} className="rounded-full border border-line px-3 py-1 text-[0.72rem] text-muted">
                {name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo((active - 1 + locations.length) % locations.length)}
              aria-label="Previous location"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors duration-300 ease-smooth hover:border-ink"
            >
              ←
            </button>
            <button
              onClick={() => goTo((active + 1) % locations.length)}
              aria-label="Next location"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors duration-300 ease-smooth hover:border-ink"
            >
              →
            </button>
            <a
              href={current.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.12em] text-ink transition-colors duration-300 ease-smooth hover:bg-ink hover:text-bg"
            >
              Get directions
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
