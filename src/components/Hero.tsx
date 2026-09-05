'use client';

import { ChevronDown } from 'lucide-react';
import { site } from '@/config/site.config';
import { useScrollProgress } from '@/lib/useParallax';
import { PhoneButton, WhatsAppButton } from './Actions';

/**
 * Depth (m) / blow-count (N-SPT) points for three illustrative borehole
 * lines — a stand-in for real client borehole logs until they're provided.
 * Each line stays monotonically increasing (deeper strata resist more,
 * which is what makes it read as a plausible soil profile rather than a
 * random squiggle), except SP-03, which flatlines at 45 blows from 14 m on:
 * that's how a real SPT log shows refusal (matacão or rocha), not a typo.
 *
 * `range` is the [start, end] slice of the container's 0–1 scroll progress
 * over which that line draws in — staggered and overlapping, so the three
 * cascade in one after another instead of drawing in lockstep.
 */
const BOREHOLES: ReadonlyArray<{
  id: string;
  color: string;
  range: readonly [number, number];
  points: ReadonlyArray<{ depth: number; blows: number }>;
}> = [
  {
    id: 'SP-01',
    color: '#E86A12',
    range: [0, 0.5],
    points: [
      { depth: 0, blows: 4 },
      { depth: 2, blows: 6 },
      { depth: 4, blows: 9 },
      { depth: 6, blows: 14 },
      { depth: 8, blows: 18 },
      { depth: 10, blows: 22 },
      { depth: 12, blows: 28 },
      { depth: 14, blows: 33 },
      { depth: 16, blows: 38 },
      { depth: 18, blows: 42 },
    ],
  },
  {
    id: 'SP-02',
    color: '#3B62E8',
    range: [0.2, 0.75],
    points: [
      { depth: 0, blows: 3 },
      { depth: 2, blows: 5 },
      { depth: 4, blows: 7 },
      { depth: 6, blows: 11 },
      { depth: 8, blows: 15 },
      { depth: 10, blows: 19 },
      { depth: 12, blows: 24 },
      { depth: 14, blows: 29 },
      { depth: 16, blows: 34 },
      { depth: 18, blows: 39 },
    ],
  },
  {
    id: 'SP-03',
    color: '#1FA968',
    range: [0.45, 1],
    points: [
      { depth: 0, blows: 5 },
      { depth: 2, blows: 8 },
      { depth: 4, blows: 13 },
      { depth: 6, blows: 19 },
      { depth: 8, blows: 26 },
      { depth: 10, blows: 33 },
      { depth: 12, blows: 40 },
      { depth: 14, blows: 45 },
      { depth: 16, blows: 45 },
      { depth: 18, blows: 45 },
    ],
  },
];

const CHART_X = [40, 260] as const; // px range for 0-50 blows
const CHART_Y = [20, 360] as const; // px range for 0-18 m
const MAX_BLOWS = 50;
const MAX_DEPTH = 18;

function toX(blows: number) {
  return CHART_X[0] + (blows / MAX_BLOWS) * (CHART_X[1] - CHART_X[0]);
}
function toY(depth: number) {
  return CHART_Y[0] + (depth / MAX_DEPTH) * (CHART_Y[1] - CHART_Y[0]);
}

/** Maps the chart's overall 0–1 scroll progress onto one line's [start, end] slice. */
function segmentProgress(progress: number, [start, end]: readonly [number, number]) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

/**
 * Illustrative SPT depth-vs-resistance chart, comparing three boreholes from
 * the same site — a stand-in for real client borehole logs until they're
 * provided. Each line draws in as the hero scrolls by and retracts scrolling
 * back up (via `pathLength`, so no manual path-length math), staggered so
 * they cascade rather than animate in lockstep.
 */
function SoilProfileChart() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const depthTicks = [0, 4, 8, 12, 16];

  return (
    <div
      ref={ref}
      className="relative border border-line bg-surface p-6 sm:p-8"
      aria-hidden="true"
    >
      <p className="font-mono text-[10px] uppercase tracking-wide2 text-muted">
        Perfil ilustrativo · Comparativo de furos SPT
      </p>

      <svg viewBox="0 0 300 400" className="mt-5 w-full" fill="none">
        {/* Depth gridlines + labels. */}
        {depthTicks.map((d) => (
          <g key={d}>
            <line
              x1={CHART_X[0] - 4}
              x2={CHART_X[1]}
              y1={toY(d)}
              y2={toY(d)}
              stroke="#28334A"
              strokeWidth={1}
            />
            <text
              x={CHART_X[0] - 10}
              y={toY(d) + 3}
              textAnchor="end"
              className="fill-muted font-mono text-[9px]"
            >
              {d}m
            </text>
          </g>
        ))}

        {/* Baseline + axis label. */}
        <line
          x1={CHART_X[0]}
          x2={CHART_X[0]}
          y1={CHART_Y[0]}
          y2={CHART_Y[1]}
          stroke="#28334A"
          strokeWidth={1}
        />
        <text x={CHART_X[0]} y={392} className="fill-muted font-mono text-[9px]">
          N golpes (SPT) →
        </text>

        {/* One resistance line per borehole, each drawing over its own slice
            of the scroll range so they cascade in rather than together. */}
        {BOREHOLES.map((hole) => {
          const segment = segmentProgress(progress, hole.range);
          const linePoints = hole.points.map((p) => `${toX(p.blows)},${toY(p.depth)}`).join(' ');
          return (
            <g key={hole.id}>
              <polyline
                points={linePoints}
                stroke={hole.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={100 * (1 - segment)}
              />
              {hole.points.map((p, i) => {
                const reached = segment >= i / (hole.points.length - 1) - 0.02;
                return (
                  <circle
                    key={p.depth}
                    cx={toX(p.blows)}
                    cy={toY(p.depth)}
                    r={3}
                    fill="#0A0F1C"
                    stroke={hole.color}
                    strokeWidth={2}
                    opacity={reached ? 1 : 0}
                    className="transition-opacity duration-300"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
        {BOREHOLES.map((hole) => (
          <div key={hole.id} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: hole.color }}
            />
            <span className="font-mono text-[10px] uppercase tracking-wide text-silver">
              {hole.id}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        SP-03 atinge refusão (45 golpes) a partir de 14 m — reta final indica matacão ou rocha.
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div
        id="content"
        className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-12"
      >
        <div className="max-w-2xl">
          <p className="animate-fade-up text-[10px] uppercase tracking-wide2 text-silver sm:text-[11px]">
            {site.brandFull} · {site.city}, {site.state}
          </p>

          <h1
            className="mt-7 animate-fade-up font-display text-[clamp(2.4rem,6.5vw,4.4rem)] font-semibold leading-[1.02] text-bone"
            style={{ animationDelay: '120ms' }}
          >
            O solo que sustenta
            <br />
            <span className="text-clay">o seu projeto</span>
            <br />
            começa por aqui.
          </h1>

          <div
            className="mt-8 h-px w-24 origin-left animate-draw-line bg-clay"
            style={{ animationDelay: '360ms' }}
            aria-hidden="true"
          />

          <p
            className="mt-8 max-w-prose animate-fade-up text-[17px] leading-relaxed text-silver"
            style={{ animationDelay: '260ms' }}
          >
            Sondagem SPT, rotativa e laudo geológico-geotécnico em todo o Sul do Brasil e em São
            Paulo. Equipamento próprio e dados confiáveis para o seu projeto de fundação.
          </p>

          <div
            className="mt-11 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '400ms' }}
          >
            <WhatsAppButton />
            <PhoneButton className="hidden sm:inline-flex" />
          </div>
        </div>

        <SoilProfileChart />
      </div>

      <a
        href="#sobre"
        aria-label="Ver mais"
        className="relative mt-16 hidden w-full text-clay transition-colors hover:text-bone md:flex md:justify-center"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1.5} />
      </a>
    </section>
  );
}
