import { ArrowRight, Clock, MapPin, MessageSquare, Phone, Plus } from 'lucide-react';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import {
  faqs,
  mapsEmbedUrl,
  mapsUrl,
  phoneUrl,
  primaryContact,
  site,
} from '@/config/site.config';

/**
 * FAQ as native <details>/<summary>. No accordion state, no JavaScript, no
 * ARIA to get wrong — the browser already ships a disclosure widget that is
 * keyboard-accessible and announced correctly, and every answer stays in the
 * DOM for crawlers whether or not it is open.
 */
export function Faq() {
  return (
    <section id="duvidas" className="bg-panel">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-10 flex items-center gap-4 border-b border-line pb-4 sm:mb-14">
          <span className="hud rounded-[6px] bg-navy px-2 py-1.5 text-chalk">04</span>
          <span className="hud text-inkMute">Dúvidas frequentes</span>
          <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-amber" />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-navy">
              Perguntas que a gente ouve todo dia.
            </h2>
            <p className="mt-5 max-w-prose leading-relaxed text-inkMute">
              Se a sua não estiver aqui, é só perguntar direto no WhatsApp.
            </p>
            <div className="mt-8">
              <Button
                href={primaryContact.href}
                external={primaryContact.external}
                variant="outlineLight"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
              >
                {primaryContact.channel === 'whatsapp' ? 'Perguntar no WhatsApp' : 'Ligar e perguntar'}
              </Button>
            </div>
          </div>

          <ul className="lg:col-span-8">
            {faqs.map((faq, index) => (
              <Reveal as="li" key={faq.question} delay={Math.min(index, 5) * 60}>
                <details className="group border-b border-line">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
                    <h3 className="font-display text-[17px] font-semibold leading-snug text-navy transition-colors group-hover:text-signal sm:text-lg">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-signal transition-transform duration-300 ease-smooth group-open:rotate-45"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </summary>
                  <p className="max-w-prose pb-6 leading-relaxed text-inkMute">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Contact. Three channels, then the location.
 *
 * The map is only embedded once `site.addressConfirmed` is true: an embed
 * built from a placeholder query would drop a pin on some unrelated business,
 * which is a worse failure than an honest empty state.
 */
export function Contact() {
  // WhatsApp is listed only when a number is configured — see the note on
  // site.whatsapp. Advertising a channel that does not answer is worse than
  // offering one fewer.
  //
  // Here WhatsApp and Telefone show the same digits, because they are the
  // same line. The descriptions say so outright: a visitor who sees one
  // number printed twice with no explanation reads it as a bug.
  const channels = [
    ...(primaryContact.channel === 'whatsapp'
      ? [
          {
            icon: MessageSquare,
            label: 'WhatsApp',
            value: site.phone,
            description:
              'O canal mais rápido. Mande o modelo, o defeito e, se der, uma foto ou vídeo.',
            href: primaryContact.href,
            external: true,
          },
        ]
      : []),
    {
      icon: Phone,
      label: 'Telefone',
      value: site.phone,
      description:
        'O mesmo número atende por ligação, se você preferir falar com um técnico.',
      href: phoneUrl,
      external: false,
    },
    {
      icon: Clock,
      label: 'Atendimento',
      value: site.openingHours,
      description: 'Entradas e retiradas de equipamento dentro desse horário.',
      href: null,
      external: false,
      // Full sentence rather than a phone number: set at body size so it
      // doesn't wrap mid-phrase at display weight.
      compact: true,
    },
  ];

  return (
    <section id="contato" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mb-10 flex items-center gap-4 border-b border-line pb-4 sm:mb-14">
        <span className="hud rounded-[6px] bg-navy px-2 py-1.5 text-chalk">05</span>
        <span className="hud text-inkMute">Contato</span>
        <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-amber" />
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-navy">
            Traga o defeito. A gente encontra a causa.
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
            Descreva o que está acontecendo com o aparelho — marca, modelo e o que ele faz (ou
            deixou de fazer). Fotos e um vídeo curto do problema ajudam bastante no diagnóstico
            inicial. Se preferir, ligue ou traga o equipamento até a loja, no Água Verde.
          </p>

          <ul className="mt-10 space-y-px overflow-hidden rounded-card border border-line bg-line">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const content = (
                <div className="flex gap-4 bg-white p-6 transition-colors duration-200 group-hover:bg-panel">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-signal/10 text-signal">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className="hud text-inkMute">{channel.label}</p>
                    <p
                      className={`mt-1.5 font-display font-bold text-navy ${
                        'compact' in channel ? 'text-[15px] leading-snug' : 'text-lg'
                      }`}
                    >
                      {channel.value}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-inkMute">{channel.description}</p>
                  </div>
                </div>
              );

              return (
                <li key={channel.label} className="group">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="flex h-full flex-col gap-6">
            <div className="flex items-start gap-4 rounded-card border border-line bg-panel p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-navy text-amber">
                <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div>
                <p className="hud text-inkMute">Endereço</p>
                <address className="mt-1.5 not-italic leading-relaxed text-ink">
                  {site.address.street}
                  <br />
                  {site.address.district} — {site.address.city}/{site.address.state}
                </address>
                {site.addressConfirmed ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-signal hover:underline"
                  >
                    Abrir no Google Maps
                    <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
                  </a>
                ) : null}
              </div>
            </div>

            {site.addressConfirmed ? (
              <div className="overflow-hidden rounded-card border border-line">
                <iframe
                  src={mapsEmbedUrl}
                  title={`Localização da ${site.brandFull} no mapa`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[380px] w-full lg:h-full lg:min-h-[420px]"
                />
              </div>
            ) : (
              /* TODO: remove this branch once site.addressConfirmed is true. */
              <div className="pixel-grid flex flex-1 flex-col items-center justify-center gap-3 rounded-card border border-dashed border-signal/35 bg-panel p-10 text-center">
                <MapPin aria-hidden="true" className="h-6 w-6 text-signal" strokeWidth={1.8} />
                <p className="hud text-signal">Mapa pendente</p>
                <p className="max-w-sm text-sm leading-relaxed text-inkMute">
                  O mapa aparece aqui assim que o endereço definitivo da {site.brandName} for
                  confirmado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The closing CTA. The last navy block on the page, and the only place where
 * the amber button sits alone with nothing competing for attention.
 */
export function CtaBand() {
  return (
    <section className="on-navy relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="pixel-grid-dark absolute inset-0" />
      <div aria-hidden="true" className="scanlines absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="hud flex items-center gap-2.5 text-amber">
              <span aria-hidden="true" className="h-px w-8 bg-amber" />
              Próximo passo
            </p>
            <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.03em] text-chalk">
              Descreva o defeito. A gente responde.
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-chalkMute">
              Sem compromisso e sem orçamento no escuro — primeiro entendemos o que está
              acontecendo, depois falamos de conserto.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button
              href={primaryContact.href}
              external={primaryContact.external}
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
            >
              {primaryContact.label}
            </Button>
            <Button href={phoneUrl} variant="outlineDark">
              Ligar agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
