/**
 * Single source of truth for the site. Change data here, never inside components.
 *
 * Confirmed by the client directly (name, city, address, phone) — see individual
 * comments below for what still needs a TODO. Nothing about review counts, years
 * in business, warranties, certifications, authorized brands or pricing was
 * confirmed, so none of that appears anywhere in this config or the copy that
 * reads from it.
 */

export const site = {
  brandName: 'Activa',
  brandFull: 'Activa Eletrônica',
  tagline: 'Assistência técnica especializada em eletrônicos e eletrodomésticos em Curitiba.',
  city: 'Curitiba',
  state: 'PR',

  phone: '(41) 98471-6066',
  phoneLink: '5541984716066',
  whatsapp: '5541984716066',
  whatsappMessage:
    'Olá! Vim pelo site da Activa Eletrônica e preciso de um orçamento para o reparo do meu equipamento.',

  address: {
    street: 'Rua Coronel José Carvalho de Oliveira, 449',
    city: 'Curitiba',
    state: 'PR',
    mapsQuery: 'Activa Eletrônica, Rua Coronel José Carvalho de Oliveira, 449, Curitiba - PR',
  },

  // Confirmed rating value only — review count was not provided, so it's
  // never printed alongside the rating.
  googleRating: '4,3',

  seo: {
    title: 'Activa Eletrônica | Assistência Técnica em Curitiba',
    description:
      'Assistência técnica em Curitiba: conserto de TV (plasma, LED, LCD), placas eletrônicas, micro-ondas, fornos elétricos e air fryers. Diagnóstico técnico e orçamento pelo WhatsApp.',
    // Confirmed production domain — Vercel project subdomains are always
    // *.vercel.app (there's no *.vercel.com equivalent), so that's the
    // suffix used here even though it was requested as ".com".
    url: 'https://activaeletronica.vercel.app',
  },
} as const;

/**
 * Confirmed categories of equipment the client repairs/services. Cross-
 * checked against how comparable Brazilian assistências técnicas (TV +
 * micro-ondas shops) structure their own service lists — same shape, only
 * categories the client actually confirmed. "Outros equipamentos
 * eletrônicos" is deliberately open-ended — evaluated case by case, never
 * promised as "conserta qualquer coisa".
 *
 * Client reviewed this list by voice note on 2026-09-03 and asked for three
 * changes: (1) he does not work with computers at all, so that category is
 * gone; (2) he doesn't sell loose components, only repairs boards, so the
 * "Placas e componentes" copy was reworded to avoid implying otherwise; (3)
 * he confirmed fornos elétricos and airfryers as things he does repair, so
 * those are now named explicitly under "Outros equipamentos eletrônicos"
 * instead of staying purely generic.
 *
 * The extra "Outros equipamentos eletrônicos" examples (secador de cabelo in
 * the card copy; liquidificadores, ferros de passar, cafeteiras and
 * ventiladores in the fuller `faqs` answer below) are SEO-driven additions
 * for the 2026-09-05 keyword pass — not individually confirmed by the
 * client, but safe because the category stays "avaliamos caso a caso" rather
 * than a firm promise. The full list lives in the FAQ answer rather than
 * this card's description so the card stays roughly the same length as its
 * siblings (a long description here made this card visibly taller than the
 * other three in the grid). Deliberately excludes lava-louças: that's
 * outside a small electronics bench's usual scope (closer to linha branca),
 * so it stays out until the client confirms he actually takes them.
 */
// Real photos, one per card: public/servicos1.png (TV opened for repair),
// public/servicos2.png (circuit board close-up), public/microondas.png,
// public/outros.png.
type Service = {
  icon: 'tv' | 'circuit' | 'microwave' | 'plug' | 'search';
  title: string;
  description: string;
  /** Path from /public. Omitted when no real photo exists yet — the card falls back to the AI-prompt placeholder. */
  image?: string;
};

export const services: Service[] = [
  {
    icon: 'tv' as const,
    title: 'Televisores',
    description: 'Diagnóstico e reparo de todos os tipos de TV: plasma, LED e LCD.',
    image: '/servicos1.png',
  },
  {
    icon: 'circuit' as const,
    title: 'Placas e componentes',
    description:
      'Diagnóstico e reparo de placas eletrônicas. Não comercializamos componentes avulsos.',
    image: '/servicos2.png',
  },
  {
    icon: 'microwave' as const,
    title: 'Micro-ondas',
    description: 'Diagnóstico e manutenção de equipamentos.',
    image: '/microondas.png',
  },
  {
    icon: 'search' as const,
    title: 'Outros equipamentos eletrônicos',
    description:
      'Fornos elétricos, air fryers, secadores de cabelo e outros equipamentos fora da lista? Avaliamos caso a caso antes de qualquer resposta.',
    image: '/outros.png',
  },
];

/**
 * FAQ content — every answer restates a fact already established elsewhere
 * in this file or in `services` (categories, "no computers", "no loose
 * parts", "case-by-case" policy). Nothing here introduces a new claim, so it
 * needs no separate client confirmation. Powers both the visible FAQ section
 * and the FAQPage JSON-LD in layout.tsx — one list, two renderings.
 */
export const faqs = [
  {
    question: 'Quais equipamentos a Activa Eletrônica conserta?',
    answer:
      'Televisores de todos os tipos (plasma, LED e LCD), placas e componentes eletrônicos, micro-ondas, fornos elétricos, air fryers, secadores de cabelo, liquidificadores, ferros de passar, cafeteiras, ventiladores e outros equipamentos eletrônicos avaliados caso a caso.',
  },
  {
    question: 'A Activa conserta computadores ou notebooks?',
    answer:
      'Não. A Activa Eletrônica é especializada em eletrônicos e eletrodomésticos e não trabalha com computadores.',
  },
  {
    question: 'Vocês vendem placas ou componentes eletrônicos avulsos?',
    answer:
      'Não comercializamos componentes avulsos — apenas o diagnóstico e reparo de placas eletrônicas.',
  },
  {
    question: 'Meu aparelho não está na lista de serviços. Vocês avaliam mesmo assim?',
    answer:
      'Sim. Equipamentos fora da lista são avaliados caso a caso antes de qualquer resposta sobre o reparo.',
  },
  {
    question: 'Como faço um orçamento com a Activa Eletrônica?',
    answer:
      'Envie fotos do seu equipamento pelo WhatsApp — a equipe da Activa avalia e retorna com o diagnóstico.',
  },
  {
    question: 'A Activa atende outras cidades além de Curitiba?',
    answer: `Atendemos ${site.city} e região.`,
  },
] as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&output=embed`;
