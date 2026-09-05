'use client';

import { ArrowDown, MapPin, ShieldCheck } from 'lucide-react';
import { site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { WhatsAppButton } from './Actions';
import { CircuitWatermark } from './Brand';
import { Magnetic } from './Magnetic';
import { Photo } from './Photo';

/**
 * Full-bleed hero: the real workbench photo (public/reparo.png) fills the
 * whole viewport, darkened under a petrol gradient so the type stays
 * legible. The header rides transparent over this section and only turns
 * solid once scrolled past it (see Header.tsx).
 */
export function Hero() {
  const background = useParallax<HTMLDivElement>(0.12);
  const watermark = useParallax<HTMLDivElement>(0.05);

  return (
    <section id="top" className="relative flex min-h-dvh items-end overflow-hidden bg-charcoal">
      <div
        ref={background.ref}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{ transform: `translate3d(0, ${background.offset}px, 0) scale(1.1)` }}
      >
        <Photo
          src="/reparo.png"
          guide="Foto de fundo, cheia a tela: técnico soldando uma placa-mãe em bancada de reparo, multímetro e ferramentas ao redor."
          aiPrompt="Professional editorial photograph of an electronics repair workbench, shot close: a technician's hands soldering a motherboard, a digital multimeter with probes attached showing a reading, a spool of solder wire and a screwdriver set in the foreground. Warm practical light against a dark background, deep petrol-blue and graphite tones, shallow depth of field, photorealistic, vertical crop, no text, no logos, no visible face."
          alt="Técnico soldando uma placa-mãe em uma bancada de reparo eletrônico, com multímetro e ferramentas"
          aspect="portrait"
          priority
          focus="center"
          variant="backdrop"
          sizes="100vw"
          className="!aspect-auto h-full w-full"
        />
      </div>

      {/* Petrol gradient so headline/body text stay legible over the photo. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-transparent"
        aria-hidden="true"
      />

      {/* Giant faint watermark, drifting slower than the photo for depth. */}
      <div
        ref={watermark.ref}
        className="pointer-events-none absolute -right-16 -top-10 hidden opacity-[0.08] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${watermark.offset}px, 0)` }}
        aria-hidden="true"
      >
        <CircuitWatermark className="h-[26rem] w-auto text-chalk" />
      </div>

      <div id="content" className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8">
        <div className="max-w-xl">
          <p className="label-caps animate-fade-up text-[10px] text-safety sm:text-[11px]">
            {site.brandFull} · {site.city}, {site.state}
          </p>

          <h1
            className="mt-6 animate-fade-up font-display text-[clamp(2.4rem,6.4vw,4.2rem)] font-bold leading-[1.04] tracking-tight text-chalk"
            style={{ animationDelay: '120ms' }}
          >
            Seu equipamento parou. A gente descobre{' '}
            <span className="text-safety">por quê.</span>
          </h1>

          <div
            className="mt-7 h-px w-24 origin-left animate-draw-line bg-safety"
            style={{ animationDelay: '360ms' }}
            aria-hidden="true"
          />

          <p
            className="mt-7 max-w-prose animate-fade-up text-[17px] leading-relaxed text-mist"
            style={{ animationDelay: '260ms' }}
          >
            {site.tagline}
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '400ms' }}
          >
            <Magnetic>
              <WhatsAppButton />
            </Magnetic>
            <a
              href="#services"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-steelLine px-7 text-[13px] label-caps text-chalk transition-all duration-200 ease-smooth hover:border-safety hover:bg-steel"
            >
              Conhecer nossos serviços
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div
            className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-mist"
            style={{ animationDelay: '480ms' }}
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-safety" strokeWidth={1.5} aria-hidden="true" />
              Diagnóstico técnico
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-safety" strokeWidth={1.5} aria-hidden="true" />
              Atendimento em {site.city}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
