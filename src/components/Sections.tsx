import {
  ArrowRight,
  Check,
  Cpu,
  Fan,
  Flame,
  Microwave,
  MessageSquare,
  Minus,
  Search,
  ShieldCheck,
  Tv,
  WashingMachine,
} from 'lucide-react';
import Button from '@/components/Button';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { differentials, primaryContact, services, site } from '@/config/site.config';

/**
 * Every section on the white part of the page. They share one structural
 * idea: a mono section marker in the top-left corner and a hairline rule that
 * runs the full width under it, so the page reads like a set of numbered
 * sheets from a service manual rather than a stack of centred hero blocks.
 */

function SectionMarker({ code, label }: { code: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 border-b border-line pb-4 sm:mb-14">
      <span className="hud rounded-[6px] bg-navy px-2 py-1.5 text-chalk">{code}</span>
      <span className="hud text-inkMute">{label}</span>
      <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-amber" />
    </div>
  );
}

const SERVICE_ICONS = {
  tv: Tv,
  monitor: Cpu,
  microwave: Microwave,
  oven: Flame,
  fryer: Fan,
  dishwasher: WashingMachine,
} as const;

const DIFFERENTIAL_ICONS = {
  search: Search,
  shield: ShieldCheck,
  cpu: Cpu,
  message: MessageSquare,
} as const;

/**
 * The positioning section, and the reason it comes before the service list:
 * the brief's hardest requirement is that nobody mistakes this for a shop
 * that sells televisions. So the second thing on the page is a two-column
 * "we do / we don't" sheet that settles the question in about three seconds.
 *
 * The two columns are distinguished by icon and heading, never by color
 * alone — a red/green split would both break the palette and fail for anyone
 * who cannot separate the two hues.
 */
export function Positioning() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionMarker code="01" label="O que é a TV System" />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-navy">
            Não somos loja.
            <span className="mt-1 block text-signal">Somos bancada.</span>
          </h2>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink">
            A {site.brandFull} existe para consertar o aparelho que você já tem. Ninguém aqui
            trabalha vendendo televisor novo — o trabalho é abrir, testar, encontrar a causa do
            defeito e devolver o equipamento funcionando. A bancada fica no Água Verde, em{' '}
            {site.city}.
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-inkMute">
            É por isso que a primeira coisa que fazemos é diagnosticar, e a segunda é te contar
            exatamente o que encontramos. Inclusive quando a conclusão é que o conserto não vale
            a pena.
          </p>

          <div className="mt-9">
            <Button
              href={primaryContact.href}
              external={primaryContact.external}
              variant="outlineLight"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
            >
              Descrever meu problema
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            <div className="bg-white p-7">
              <p className="hud flex items-center gap-2 text-signal">
                <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                O que fazemos
              </p>
              <ul className="mt-5 space-y-3.5">
                {[
                  'Diagnóstico técnico do defeito',
                  'Conserto de TVs, micro-ondas e eletrodomésticos',
                  'Reparo em nível de placa e componente',
                  'Avaliação honesta de quando não compensa',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug text-ink">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                      strokeWidth={2.6}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-panel p-7">
              <p className="hud flex items-center gap-2 text-inkMute">
                <Minus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                O que não fazemos
              </p>
              <ul className="mt-5 space-y-3.5">
                {[
                  'Venda de televisores ou eletrodomésticos',
                  'Venda de peças e componentes avulsos',
                  'Orçamento fechado sem abrir o aparelho',
                  'Conserto iniciado sem a sua aprovação',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug text-inkMute">
                    <Minus
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-inkMute"
                      strokeWidth={2.6}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Services as a bento grid rather than six equal cards. The first cell —
 * televisions, the category the company is named after — takes two columns
 * and two rows and is the only inverted card on the white part of the page,
 * so the grid's emphasis matches the business's without a word of copy
 * saying so.
 */
export function Services() {
  return (
    <section id="servicos" className="bg-panel">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionMarker code="02" label="Serviços" />

        <div className="mb-12 grid gap-8 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-navy lg:col-span-6">
            O que entra na bancada.
          </h2>
          <p className="max-w-prose leading-relaxed text-inkMute lg:col-span-6 lg:pt-2">
            Cada categoria abaixo lista os sintomas mais comuns que chegam aqui. Se o seu defeito
            não estiver na lista, ele provavelmente ainda cabe — fale com a gente e avaliamos o
            seu caso.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon];
            const featured = service.span === 'wide';

            return (
              <Reveal
                as="li"
                key={service.id}
                delay={Math.min(index, 5) * 70}
                className={featured ? 'lg:col-span-2 lg:row-span-2' : ''}
              >
                <article
                  className={[
                    'group relative flex h-full flex-col rounded-card border p-7 transition-all duration-300 ease-smooth sm:p-8',
                    featured
                      ? 'on-navy overflow-hidden border-navy bg-navy'
                      : 'border-line bg-white hover:-translate-y-1 hover:border-signal/45 hover:shadow-[0_12px_32px_-18px_rgba(0,31,79,0.35)]',
                  ].join(' ')}
                >
                  {featured ? (
                    <div aria-hidden="true" className="pixel-grid-dark absolute inset-0" />
                  ) : null}

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={[
                        'flex items-center justify-center rounded-[10px] transition-colors duration-300',
                        featured
                          ? 'h-14 w-14 bg-amber text-navy'
                          : 'h-12 w-12 bg-signal/10 text-signal group-hover:bg-signal group-hover:text-white',
                      ].join(' ')}
                    >
                      <Icon
                        aria-hidden="true"
                        className={featured ? 'h-7 w-7' : 'h-6 w-6'}
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className={`hud ${featured ? 'text-chalkMute' : 'text-inkMute'}`}>
                      {service.code}
                    </span>
                  </div>

                  <h3
                    className={[
                      'relative mt-6 font-display font-bold tracking-[-0.02em]',
                      featured ? 'text-3xl text-chalk sm:text-4xl' : 'text-xl text-navy',
                    ].join(' ')}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={[
                      'relative mt-3 max-w-prose leading-relaxed',
                      featured ? 'text-[17px] text-chalkMute' : 'text-[15px] text-inkMute',
                    ].join(' ')}
                  >
                    {service.description}
                  </p>

                  <ul className="relative mt-6 flex flex-wrap gap-2 pt-1">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className={[
                          'whitespace-nowrap rounded-[6px] px-2.5 py-1.5 font-mono text-[11px]',
                          featured
                            ? 'bg-chalk/10 text-chalk'
                            : 'bg-panel text-inkMute group-hover:bg-signal/10',
                        ].join(' ')}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {featured ? (
                    <div className="relative mt-auto pt-8">
                      <Button
                        href={primaryContact.href}
                        external={primaryContact.external}
                        icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
                      >
                        Orçamento para minha TV
                      </Button>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * The bench itself. A photo slot (still a placeholder — the client has not
 * sent images) paired with the four things that are true of how the work is
 * done here. Nothing in this list is a claim that needs the client to
 * confirm a number.
 */
export function Bench() {
  return (
    <section id="bancada" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionMarker code="03" label="A bancada" />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="overflow-hidden rounded-card">
            <Photo
              alt="Bancada de assistência técnica da TV System com um televisor aberto em manutenção"
              placeholderLabel="Aqui entra uma foto real da bancada, com um aparelho aberto em manutenção."
              prompt="Photograph of a professional electronics repair workbench, a large flat-screen TV opened face-down with its back panel removed, exposed circuit boards and ribbon cables, a soldering iron and a multimeter resting beside it, technician's hands in the frame holding a probe. Clean, organised, modern workshop. Cool deep-navy ambient light (#001F4F) with technical blue accents (#005899) and a single warm amber highlight (#FDA201) from a task lamp. Sharp focus on the board, shallow depth of field, editorial product-photography lighting, no text, no logos, no people's faces. 4:5 vertical framing."
              width={880}
              height={1100}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-navy">
              Quem abre o aparelho é quem te explica.
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
              A diferença entre uma assistência técnica e uma troca de peça no escuro está no
              método. Aqui o equipamento é testado ponto a ponto até a causa real aparecer — e o
              que for encontrado é explicado em português, sem termo inventado para justificar
              valor.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {differentials.map((item, index) => {
              const Icon = DIFFERENTIAL_ICONS[item.icon];
              return (
                <Reveal as="li" key={item.title} delay={index * 80} className="bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-navy text-amber">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-[-0.01em] text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-inkMute">{item.description}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
