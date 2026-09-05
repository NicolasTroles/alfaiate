'use client';

import {
  Drill,
  Droplets,
  FileCheck,
  FlaskConical,
  Layers,
  Ruler,
  TestTube2,
} from 'lucide-react';
import { process, services, site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { RigSilhouette } from './Brand';
import {
  FieldCrewIllustration,
  LandscapeStripIllustration,
  ReportIllustration,
  RigStandingIllustration,
  SamplerCloseupIllustration,
  SoilSamplesIllustration,
  SptOperatorIllustration,
  TransportIllustration,
} from './Illustrations';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const ICONS = {
  coreSample: TestTube2,
  drill: Drill,
  ruler: Ruler,
  layers: Layers,
  droplets: Droplets,
  flask: FlaskConical,
  fileCheck: FileCheck,
} as const;

/**
 * The three brand accents (orange / blue / green, from the AlfaGeo mark),
 * cycled across list items instead of one accent repeated — a direct,
 * literal "follow the AlfaGeo colors" rather than a single-accent palette.
 * Written as full literal class strings (not template-interpolated) so
 * Tailwind's static build-time scan picks them up.
 */
const ACCENT_ICON = ['text-clayDeep', 'text-blueDeep', 'text-greenDeep'] as const;
const ACCENT_NUMBER = ['text-clay/60', 'text-blue/60', 'text-green/60'] as const;
const ACCENT_HOVER_BORDER = ['hover:border-clay/50', 'hover:border-blue/50', 'hover:border-green/50'] as const;

/**
 * Standard section heading.
 * `tone` swaps text colors for light vs. dark sections — the page alternates
 * between the two background families.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  tone?: 'light' | 'dark';
}) {
  const isLight = tone === 'light';
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`text-[10px] uppercase tracking-wide2 ${isLight ? 'text-clayDeep' : 'text-clay'}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-5 font-display text-[clamp(1.9rem,4.6vw,3.1rem)] font-semibold leading-[1.1] ${
          isLight ? 'text-graphite' : 'text-bone'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-prose text-[17px] leading-relaxed ${
            isLight ? 'text-graphiteSoft' : 'text-silver'
          } ${center ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Section 2 — LIGHT. Who we are, with photos of the crew at work. */
export function About() {
  const mark = useParallax<HTMLDivElement>(0.12);

  return (
    <section id="sobre" className="relative overflow-hidden bg-stone py-28 text-graphite sm:py-36">
      {/* Watermark of the rig silhouette, drifting slowly in the background. */}
      <div
        ref={mark.ref}
        className="pointer-events-none absolute -right-24 top-0 hidden opacity-[0.06] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${mark.offset}px, 0)` }}
        aria-hidden="true"
      >
        <RigSilhouette className="h-[42rem] w-auto text-graphite" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Sobre a AlfaGeo"
              title="Dado de campo confiável, antes do projeto sair do papel."
              description="Toda fundação começa com uma pergunta: o que tem embaixo do terreno? A AlfaGeo responde essa pergunta com sondagem SPT, rotativa e ensaios complementares, seguindo as normas técnicas da ABNT, para que engenheiros e arquitetos projetem com segurança."
            />
            <div className="mt-10 space-y-6 border-l-2 border-clay/50 pl-7">
              <p className="max-w-prose leading-relaxed text-graphiteSoft">
                Baseada em {site.city}, {site.state}, a equipe da {site.brandName} atende obras em
                todo o Paraná, Santa Catarina, Rio Grande do Sul e São Paulo, com equipamento
                próprio e atendimento direto — do primeiro contato à entrega do laudo assinado.
              </p>
              <p className="max-w-prose leading-relaxed text-graphiteSoft">
                {/* TODO: confirm years of experience / team size with the client before publishing a number. */}
                O objetivo é simples: dado de campo preciso, entregue no prazo combinado, para que a
                fundação seja dimensionada com o solo real — não com uma estimativa.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <Photo
                src="/dados1.jpg"
                guide="Detalhe da equipe operando o amostrador SPT durante a cravação, com o tripé e o cabo de aço em primeiro plano."
                illustration={<SptOperatorIllustration tone="light" />}
                alt="Equipe da AlfaGeo operando o tripé de sondagem SPT no cabo de aço"
                aspect="tall"
                tone="light"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="mt-10"
              />
              <Photo
                src="/dados2.jpg"
                guide="Amostras de solo (testemunhos) organizadas em caixas, prontas para classificação."
                illustration={<SoilSamplesIllustration tone="light" />}
                alt="Testemunhos de solo organizados em caixas para classificação"
                aspect="tall"
                tone="light"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Section 3 — LIGHT. Services. */
export function Services() {
  return (
    <section
      id="servicos"
      className="border-t border-stoneLine bg-stone py-28 text-graphite sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Serviços" title="O que a AlfaGeo executa em campo." center />
        </Reveal>

        {/* Bento grid: the first service (the flagship SPT test) spans two
            columns, the rest fall into an even grid — asymmetric on purpose. */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            const accent = i % 3;
            return (
              <Reveal
                key={service.title}
                delay={i * 70}
                className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <article
                  className={`group h-full border border-stoneLine bg-stoneDeep transition-all duration-300 hover:-translate-y-1 hover:bg-stone ${ACCENT_HOVER_BORDER[accent]}`}
                >
                  {/* photoSrc is only set on services with a matching photo in
                      /public already — the rest (see site.config.ts) fall
                      back to the plain "Foto aqui" guide since Photo has no
                      illustration to show while the file is missing. */}
                  <Photo
                    src={service.photoSrc}
                    aiPrompt={service.aiPrompt}
                    alt={service.photoAlt}
                    guide={service.photoGuide}
                    aspect="landscape"
                    tone="light"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="p-9 sm:p-11">
                    <Icon className={`h-6 w-6 ${ACCENT_ICON[accent]}`} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-7 font-display text-2xl text-graphite">{service.title}</h3>
                    <p className="mt-4 max-w-prose leading-relaxed text-graphiteSoft">
                      {service.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Section 4 — DARK. Field gallery: the dark background makes the photos pop. */
export function Gallery() {
  return (
    <section id="trabalhos" className="bg-ink py-28 text-bone sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Trabalhos"
            title="Sondagens executadas em campo."
            description="Fotos de referência do tipo de registro que a AlfaGeo vai gerar em cada visita técnica, até termos um ensaio fotográfico próprio."
            tone="dark"
          />
        </Reveal>

        {/* Asymmetric grid: more interesting than a uniform one. */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <Photo
              src="/galeria1.jpg"
              guide="Foto vertical em destaque: equipamento de sondagem montado, tripé completo, em pé no terreno."
              illustration={<RigStandingIllustration />}
              alt="Tripé de sondagem SPT montado em campo, sob céu aberto"
              aspect="tall"
              className="h-full"
            />
          </Reveal>
          <Reveal delay={80}>
            <Photo
              src="/galeria2.jpg"
              guide="Detalhe do amostrador SPT sendo extraído do solo, com marcas de profundidade visíveis."
              illustration={<SamplerCloseupIllustration />}
              alt="Caixa de testemunhos com etiquetas de profundidade de cada amostra"
              aspect="square"
            />
          </Reveal>
          <Reveal delay={160}>
            <Photo
              src="/galeria3.jpg"
              guide="Equipe técnica trabalhando em conjunto durante a sondagem, com equipamentos de segurança."
              illustration={<FieldCrewIllustration />}
              alt="Equipe da AlfaGeo trabalhando em conjunto em obra de contenção de talude"
              aspect="square"
            />
          </Reveal>
          <Reveal delay={240}>
            <Photo
              src="/galeria4.jpg"
              guide="Equipamento de sondagem sendo transportado ou montado em um veículo utilitário."
              illustration={<TransportIllustration />}
              alt="Caminhonete da AlfaGeo Sondagens com o equipamento de sondagem na carreta"
              aspect="landscape"
            />
          </Reveal>
          <Reveal delay={320}>
            <Photo
              src="/galeria5.png"
              guide="Laudo técnico impresso sobre uma mesa, ao lado de um capacete de segurança."
              illustration={<ReportIllustration />}
              alt="Ilustração de um laudo geotécnico com gráfico de perfil de solo, pronto para entrega"
              aspect="landscape"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Section 5 — DARK photo strip, then LIGHT process steps. */
export function Process() {
  const strip = useParallax<HTMLDivElement>(0.22);

  return (
    <section id="processo">
      {/* Parallax photo strip: transition between dark and light. */}
      <div className="relative h-[45vh] overflow-hidden bg-ink sm:h-[60vh]">
        <div
          ref={strip.ref}
          className="absolute inset-0 scale-125 will-change-transform"
          style={{ transform: `translate3d(0, ${strip.offset}px, 0) scale(1.25)` }}
        >
          <Photo
            src="/banner2.png"
            guide="Foto larga e atmosférica do canteiro de obras ou paisagem próxima a Curitiba, servindo de respiro entre seções."
            illustration={<LandscapeStripIllustration />}
            alt="Ilustração topográfica de um canteiro de obras com equipamento de sondagem ao fundo"
            aspect="landscape"
            sizes="100vw"
            className="!aspect-auto h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
      </div>

      <div className="bg-stone text-graphite">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Como funciona"
              title="Do primeiro contato ao laudo assinado."
              description="Quatro etapas, com prazo combinado desde o início."
              center
            />
          </Reveal>

          <ol className="mt-16 grid gap-px border border-stoneLine bg-stoneLine md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <li className="h-full bg-stone p-9">
                  <span
                    className={`font-mono text-5xl ${ACCENT_NUMBER[i % 3]}`}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-graphite">{step.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-graphiteSoft">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
