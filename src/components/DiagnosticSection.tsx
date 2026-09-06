'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import { diagnosticSteps, whatsappUrl } from '@/config/site.config';

const SignalScene = dynamic(() => import('@/components/SignalScene'), { ssr: false });

/**
 * The one pinned section on the page — a broken picture being repaired while
 * you scroll through the four stages of the bench process.
 *
 * The construction is deliberately the boring, accessible one rather than a
 * clever one: the canvas is a `sticky` layer, and the four chapters are four
 * ordinary full-height blocks scrolling over it. Nothing is opacity-swapped
 * and nothing is removed from the flow, which means the reading order is the
 * real order, every chapter is present for a screen reader and for a crawler,
 * and the section degrades cleanly in all three failure modes that matter:
 *
 *   - no JavaScript      → the four chapters scroll over a plain navy ground
 *   - no WebGL           → same
 *   - reduced motion     → the shader paints one static repaired frame and
 *                          the chapters scroll normally (see SignalScene)
 *
 * The HUD in the corners is the only part driven by live scroll progress, and
 * it is decorative — aria-hidden, carrying no information that the chapter
 * text does not already state.
 */
export default function DiagnosticSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  // SignalScene calls this at most once per 1% of progress, and it is
  // memoised so the effect that owns the render loop never re-runs.
  const handleProgress = useCallback((value: number) => setProgress(value), []);

  const activeIndex = Math.min(
    diagnosticSteps.length - 1,
    Math.floor(progress * diagnosticSteps.length),
  );
  // "Signal quality" reads as the repair completing. It is a restatement of
  // scroll position, nothing more.
  const signalPercent = Math.round(progress * 100);
  // Past this point the shader has settled on the repaired picture, so the
  // status line stops claiming a diagnosis is still running.
  const locked = progress > 0.9;

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      className="on-navy relative bg-navy"
      aria-labelledby="diagnostico-titulo"
    >
      {/* Sticky canvas layer. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-signal-canvas className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <SignalScene sectionRef={sectionRef} onProgress={handleProgress} />

        {/* Readability scrim over the shader — heaviest on the side the
            chapter cards sit on. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navyDeep via-navyDeep/45 to-navyDeep/70"
        />

        {/* HUD. Decorative: the same information is in the chapter text. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-between px-5 py-24 sm:px-8 sm:py-28">
            <div className="flex items-start justify-between gap-6">
              <p
                className={`hud flex items-center gap-2.5 ${locked ? 'text-chalk' : 'text-amber'}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    locked ? 'bg-chalk' : 'animate-blink-dot bg-amber'
                  }`}
                />
                {locked ? 'Sinal estável' : 'Diagnóstico em andamento'}
              </p>
              <p className="hud text-right text-chalkMute">
                Sinal
                <span className="mt-1 block font-mono text-2xl tracking-normal text-chalk">
                  {String(signalPercent).padStart(3, '0')}%
                </span>
              </p>
            </div>

            <div>
              <div className="mb-4 h-px w-full bg-chalk/15">
                <div
                  className="h-px bg-amber transition-[width] duration-150 ease-linear"
                  style={{ width: `${signalPercent}%` }}
                />
              </div>
              <ol className="flex flex-wrap gap-x-6 gap-y-2">
                {diagnosticSteps.map((step, index) => (
                  <li
                    key={step.code}
                    className={`hud transition-colors duration-300 ${
                      index === activeIndex ? 'text-amber' : 'text-chalk/35'
                    }`}
                  >
                    {step.code} {step.title}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters, scrolling over the sticky canvas. */}
      <div className="relative -mt-[100svh]">
        <h2 id="diagnostico-titulo" className="sr-only">
          Como funciona o diagnóstico e o conserto na TV System
        </h2>

        {diagnosticSteps.map((step, index) => (
          <div
            key={step.code}
            className={`flex min-h-[100svh] items-center px-5 py-28 sm:px-8 ${
              index % 2 === 1 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="mx-auto w-full max-w-[1400px]">
              <div
                className={`w-full max-w-lg rounded-card border border-chalk/15 bg-navyDeep/80 p-8 backdrop-blur-md sm:p-10 ${
                  index % 2 === 1 ? 'ml-auto' : ''
                }`}
              >
                <p className="hud flex items-center gap-3 text-amber">
                  <span className="font-mono text-4xl leading-none tracking-normal">
                    {step.code}
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-amber/60" />
                  Etapa
                </p>
                <h3 className="mt-6 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-chalk">
                  {step.title}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed text-chalkMute">
                  {step.description}
                </p>

                {index === diagnosticSteps.length - 1 ? (
                  <div className="mt-8">
                    <Button
                      href={whatsappUrl}
                      external
                      icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
                    >
                      Começar pela etapa 01
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
