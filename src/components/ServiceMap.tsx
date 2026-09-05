'use client';

import { useState } from 'react';
import { BRAZIL_MAP_VIEWBOX, BRAZIL_STATE_SHAPES } from '@/data/brazilMapShapes';
import { serviceRegion } from '@/config/site.config';

const CITY_LOOKUP: Record<string, ReadonlyArray<string>> = Object.fromEntries(
  serviceRegion.map((r) => [r.sigla, r.cities]),
);

/**
 * Interactive coverage map: full Brazil silhouette in a neutral dark tone,
 * with the four states AlfaGeo actually serves lifted out in the brand
 * accent. Hover/focus on a served state brightens it and opens a caption
 * with a few reference cities; tap does the same on touch devices, since
 * there's no hover there.
 */
export function ServiceMap() {
  const [activeSigla, setActiveSigla] = useState<string | null>(null);

  const active = activeSigla ? BRAZIL_STATE_SHAPES[activeSigla] : null;
  const activeCities = activeSigla ? CITY_LOOKUP[activeSigla] : undefined;

  return (
    <div className="relative flex h-full flex-col justify-center px-6 py-12 sm:px-10">
      <svg
        viewBox={BRAZIL_MAP_VIEWBOX}
        className="w-full max-w-md mx-auto"
        role="img"
        aria-label={`Mapa do Brasil com destaque para os estados atendidos: ${serviceRegion
          .map((r) => BRAZIL_STATE_SHAPES[r.sigla].name)
          .join(', ')}`}
      >
        {Object.entries(BRAZIL_STATE_SHAPES).map(([sigla, shape]) => {
          if (!shape.target) {
            return (
              <path
                key={sigla}
                d={shape.d}
                className="fill-line"
                stroke="#0A0F1C"
                strokeWidth={1}
              />
            );
          }

          const isActive = activeSigla === sigla;
          return (
            <path
              key={sigla}
              d={shape.d}
              tabIndex={0}
              role="button"
              aria-label={`${shape.name}: atendemos toda a região`}
              onMouseEnter={() => setActiveSigla(sigla)}
              onMouseLeave={() => setActiveSigla((cur) => (cur === sigla ? null : cur))}
              onFocus={() => setActiveSigla(sigla)}
              onBlur={() => setActiveSigla((cur) => (cur === sigla ? null : cur))}
              onClick={() => setActiveSigla(sigla)}
              stroke="#0A0F1C"
              strokeWidth={1}
              className={`cursor-pointer outline-none transition-colors duration-200 ${
                isActive ? 'fill-clay' : 'fill-clayDeep'
              }`}
            />
          );
        })}

        {serviceRegion.map(({ sigla }) => {
          const shape = BRAZIL_STATE_SHAPES[sigla];
          return (
            <text
              key={sigla}
              x={shape.labelX}
              y={shape.labelY}
              textAnchor="middle"
              className="pointer-events-none select-none fill-ink font-mono text-[13px] font-medium"
            >
              {sigla}
            </text>
          );
        })}
      </svg>

      {/* Fixed-height caption so the map doesn't jump when a state is hovered. */}
      <div className="mx-auto mt-8 min-h-[4.5rem] w-full max-w-md text-center">
        {active ? (
          <>
            <p className="font-display text-lg text-bone">{active.name}</p>
            {activeCities && (
              <p className="mt-1.5 text-[13px] leading-relaxed text-silver">
                {activeCities.join(' · ')}
              </p>
            )}
          </>
        ) : (
          <p className="text-[13px] leading-relaxed text-silver">
            <span className="hidden [@media(hover:hover)]:inline">Passe o mouse</span>
            <span className="[@media(hover:hover)]:hidden">Toque</span> em um estado para ver as
            cidades de referência.
          </p>
        )}
      </div>
    </div>
  );
}
