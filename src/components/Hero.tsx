import dynamic from 'next/dynamic';
import { ArrowRight, Phone, Star } from 'lucide-react';
import Button from '@/components/Button';
import { mapsUrl, phoneUrl, primaryContact, site, tickerItems } from '@/config/site.config';

// The panel shader is decorative and client-only: it is not part of the
// first paint, and everything on top of it is already legible against the
// navy ground underneath if it never loads at all.
const PanelScene = dynamic(() => import('@/components/PanelScene'), { ssr: false });

/**
 * The hero is a screen. It is framed by viewfinder brackets, backed by the
 * live pixel-lattice shader, and its two halves are deliberately unequal:
 * the headline takes the width it needs, and the remaining column holds a
 * service tag — the paper docket that gets stapled to an appliance when it
 * comes in.
 *
 * That tag does most of the positioning work the brief asks for. Before any
 * copy is read, the page shows an intake form, not a product — which is the
 * fastest way to say "assistência técnica, not a shop that sells TVs".
 */
export default function Hero() {
  return (
    <section
      id="topo"
      className="on-navy relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy pt-[6.5rem]"
    >
      <PanelScene />

      {/* Legibility scrim: the shader is lively, the copy on top of it is not
          allowed to be a contrast gamble. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-navyDeep via-navyDeep/80 to-navy/40"
      />
      <div aria-hidden="true" className="scanlines absolute inset-0 opacity-30" />

      {/* Viewfinder brackets. */}
      <div
        aria-hidden="true"
        className="bracket-frame pointer-events-none absolute inset-4 text-amber/70 sm:inset-7"
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-8 py-10 sm:px-12 lg:px-16">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Headline column. */}
          <div className="lg:col-span-7 xl:col-span-7">
            <h1 className="max-w-[13ch] font-display text-[clamp(2.4rem,6.2vw,4.5rem)] font-bold leading-[0.94] tracking-[-0.03em] text-chalk">
              <span className="hud mb-5 flex items-center gap-2.5 font-normal tracking-hud text-amber">
                <span aria-hidden="true" className="hidden h-px w-8 shrink-0 bg-amber sm:block" />
                Assistência técnica em {site.city} há {site.yearsInBusiness}
              </span>
              Diagnóstico antes do orçamento.
            </h1>

            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-chalkMute sm:text-lg">
              Conserto de{' '}
              <strong className="font-semibold text-chalk">TVs LED, LCD e Smart TVs</strong>,
              micro-ondas, fornos elétricos, air fryers e lava-louças em {site.city}. A{' '}
              {site.brandName} atende há {site.yearsInBusiness} e não vende aparelhos, abre, testa e
              conserta o seu.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={primaryContact.href}
                external={primaryContact.external}
                icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
              >
                {primaryContact.label}
              </Button>
              <Button
                href={phoneUrl}
                variant="outlineDark"
                icon={<Phone className="h-4 w-4" strokeWidth={2.2} />}
              >
                Ligar {site.phone}
              </Button>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-[44px] items-center gap-2.5 text-chalkMute transition-colors hover:text-chalk"
            >
              <Star aria-hidden="true" className="h-4 w-4 fill-amber text-amber" strokeWidth={2} />
              <span className="font-display text-lg font-bold text-chalk">{site.googleRating}</span>
              <span className="text-sm">{site.googleReviewCount} avaliações no Google</span>
            </a>

            {/* Three process facts. Nothing here is a claim about speed, price
                or warranty — only about how the bench works. */}
            <ul className="mt-7 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-3">
              {[
                `Loja física no ${site.address.district}`,
                'Orçamento só após o diagnóstico',
                'Nada é consertado sem aprovação',
              ].map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2.5 text-[13px] leading-snug text-chalkMute"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                  />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* The service tag. */}
          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="w-full max-w-sm -rotate-[1.4deg] rounded-card border border-chalk/15 bg-navySoft/75 p-6 backdrop-blur-md sm:p-7">
              <div className="flex items-center justify-between border-b border-chalk/15 pb-4">
                <p className="hud text-chalk">Ordem de serviço</p>
                <p className="hud text-chalkMute">Nº ————</p>
              </div>

              <dl className="mt-5 space-y-4">
                {[
                  { term: 'Equipamento', value: 'o seu aparelho' },
                  { term: 'Sintoma', value: 'descreva no WhatsApp' },
                  { term: 'Etapa', value: 'aguardando entrada' },
                ].map((row) => (
                  <div key={row.term} className="flex items-baseline gap-3">
                    <dt className="hud shrink-0 text-chalkMute">{row.term}</dt>
                    <dd className="flex flex-1 items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 border-b border-dashed border-chalk/20"
                      />
                      <span className="text-right font-mono text-[13px] text-chalk">
                        {row.value}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center gap-2.5 rounded-[10px] border-l-2 border-amber bg-navyDeep/60 px-4 py-3">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 animate-blink-dot rounded-full bg-amber"
                />
                <p className="text-[13px] font-medium text-chalk">
                  Mande o modelo e o defeito. A gente responde com o próximo passo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast crawl. A television station's ticker, carrying what the
          bench actually works on. */}
      <div
        aria-hidden="true"
        className="relative border-y border-navyLine/70 bg-navyDeep/70 py-3 backdrop-blur-sm"
      >
        <div className="flex w-max animate-ticker">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {tickerItems.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="hud px-6 text-chalkMute">{item}</span>
                  <span className="h-1 w-1 rounded-full bg-amber" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
