'use client';

import { Clock, MapPin, Phone } from 'lucide-react';
import { site } from '@/config/site.config';
import { WhatsAppButton } from './Actions';
import { Reveal } from './Reveal';
import { ServiceMap } from './ServiceMap';

/**
 * Contact section.
 *
 * AlfaGeo is a field-service business — the crew travels to the client's
 * site, there's no walk-in office — so this leads with the service area and
 * WhatsApp instead of a street address, unlike a storefront business. The
 * decorative column shows an interactive coverage map (all four states the
 * crew actually serves) instead of a literal street-address map, since
 * there's no single public office to pin. Swap in a real address block here
 * if the client confirms a public office later.
 */
export function Contact() {
  return (
    <section id="contato" className="bg-stone text-graphite">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Info column */}
        <div className="px-5 py-24 sm:px-8 sm:py-32 lg:pr-16">
          <Reveal>
            <p className="text-[10px] uppercase tracking-wide2 text-clayDeep">Contato</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.6vw,3.1rem)] font-semibold leading-[1.1] text-graphite">
              Fale sobre o
              <br />
              seu terreno.
            </h2>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-graphiteSoft">
              Envie o endereço da obra e o tipo de projeto pelo WhatsApp. Retornamos com um
              orçamento e o prazo para a visita técnica.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 space-y-8">
              <div className="flex gap-5">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-clayDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-[10px] uppercase tracking-wide2 text-graphiteSoft">
                    Área de atendimento
                  </h3>
                  <p className="mt-3 leading-relaxed text-graphite">{site.areaServed}</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-clayDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-[10px] uppercase tracking-wide2 text-graphiteSoft">
                    Telefone
                  </h3>
                  <a
                    href={`tel:${site.phoneLink}`}
                    className="mt-3 inline-flex min-h-11 items-center font-display text-2xl text-graphite transition-colors hover:text-clayDeep"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-clayDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="w-full">
                  <h3 className="text-[10px] uppercase tracking-wide2 text-graphiteSoft">
                    Horário
                  </h3>
                  <dl className="mt-3 space-y-2.5">
                    {site.openingHours.map((h) => (
                      <div key={h.days} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-6">
                        <dt className="text-graphiteSoft sm:whitespace-nowrap">{h.days}</dt>
                        <dd className="tabular-nums text-graphite sm:whitespace-nowrap">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12">
              <WhatsAppButton className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        {/* Decorative column: interactive coverage map instead of a street address. */}
        <div className="relative min-h-[26rem] overflow-hidden border-t border-stoneLine bg-ink lg:min-h-full lg:border-l lg:border-t-0">
          <ServiceMap />
        </div>
      </div>
    </section>
  );
}
