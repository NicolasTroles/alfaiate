/**
 * Single source of truth for the site. Business data is changed here, never
 * inside a component.
 *
 * SOURCES. Name, address, landline, opening hours and the Google rating all
 * come from the company's Google Business profile (read 2026-09-06). The
 * brand identity — palette, positioning, the equipment categories — comes
 * from the client's brand brief.
 *
 * The client separately confirmed (2026-09-06) that the landline also answers
 * on WhatsApp Business — see the note on `whatsapp` below — that the company
 * has been operating for close to 15 years, and that it has been covered by
 * the press at least once.
 *
 * STILL UNCONFIRMED, and therefore absent from the copy: price, turnaround
 * time, warranty length, manufacturer authorization, and years in business.
 * Anything not on this list of sources does not appear anywhere on the site.
 */

export const site = {
  brandName: 'TV System',
  brandFull: 'TV System Assistência Técnica',
  tagline:
    'Assistência técnica com quase 14 anos em Curitiba, especializada em TVs, micro-ondas e eletrodomésticos.',

  /**
   * "Quase 14 anos", as the client put it — deliberately stored as the
   * approximate figure they gave rather than a founding year, because no
   * founding year was confirmed. Every place this appears in the copy says
   * "quase 14 anos" or "há quase 14 anos"; nothing computes a date from it,
   * and it is not published as schema.org foundingDate.
   *
   * The original brand brief's hard requirement still holds and has not been
   * softened by this: the site must read as an assistência técnica, never as
   * a shop that sells televisions. Longevity and a physical storefront are
   * now the credibility argument; "we repair, we do not sell" is still the
   * positioning argument, and the "o que fazemos / o que não fazemos" sheet
   * still carries it.
   */
  yearsInBusiness: 'quase 14 anos',

  /**
   * The shop also sells used appliances, reconditioned, with a 3-month
   * warranty (client, 2026-09-06).
   *
   * This corrects a claim the site previously made outright — "não vendemos
   * aparelhos" — which came from the original brand brief's line about not
   * being a television shop. Both are true at once, but only if the wording
   * is precise: they do not retail NEW equipment, and repair is the primary
   * business; used units are the fallback for when a repair is not worth it.
   * Nothing on the site may say "não vendemos aparelhos" any more.
   */
  usedAppliances: {
    warranty: '3 meses de garantia',
  },

  // Confirmed: the Google profile categorises the business as a television
  // repair service in Curitiba, Paraná.
  city: 'Curitiba',
  state: 'PR',

  // Confirmed landline. `phoneLink` is the E.164 form (55 + DDD + number)
  // used by the tel: link.
  phone: '(41) 3092-4949',
  phoneLink: '554130924949',

  /**
   * Same digits as the landline above — not a copy-paste slip.
   *
   * WhatsApp Business can be registered on a fixed line (it verifies by voice
   * call instead of SMS), and the client confirmed this number answers on
   * WhatsApp. So one number serves two channels, and the contact list names
   * both while saying they are the same line, rather than looking like a
   * duplicated field.
   *
   * Buttons and links all route through `primaryContact` below, so emptying
   * this field re-points every control at the phone on its own. Prose that
   * names WhatsApp by hand does NOT follow automatically — grep for
   * "WhatsApp" across src/ and sweep the copy too if that ever happens.
   */
  whatsapp: '554130924949',
  whatsappMessage:
    'Olá! Vim pelo site da TV System e gostaria de um orçamento para o conserto do meu aparelho.',

  /**
   * True once the address is verified — it gates the Google Maps embed and
   * the postal address in the JSON-LD. Confirmed against the Google Business
   * profile.
   */
  addressConfirmed: true,

  address: {
    street: 'R. Palmeiras, 273',
    district: 'Água Verde',
    city: 'Curitiba',
    state: 'PR',
    zip: '80620-110',
    mapsQuery:
      'TV System Assistência Técnica, R. Palmeiras, 273 - Água Verde, Curitiba - PR, 80620-110',
  },

  /**
   * Confirmed opening hours. Sunday is closed and is simply omitted from the
   * schema rather than published as a zero-length window.
   */
  openingHours: 'Segunda a sexta, 09h às 18h · Sábado, 09h às 12h',
  openingHoursSchema: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    { days: ['Saturday'], opens: '09:00', closes: '12:00' },
  ],

  /**
   * Google rating, confirmed on the profile. Shown on the page with explicit
   * attribution to Google, and deliberately NOT emitted as schema.org
   * aggregateRating: Google's structured-data policy treats a business
   * marking up its own rating as self-serving, and re-publishing Google's own
   * rating back to Google as markup risks the whole block being ignored. The
   * count is always printed next to the value — a bare "4,5" says much less
   * than "4,5 out of 125".
   */
  googleRating: '4,5',
  googleReviewCount: 125,

  // TODO: confirm with client — no social profiles were listed on Google.
  socialLinks: {
    instagram: '',
    facebook: '',
  },

  seo: {
    title: 'TV System | Assistência Técnica em TV e Eletrodomésticos em Curitiba',
    description:
      'Assistência técnica em Curitiba há quase 14 anos: conserto de TVs LED, LCD e Smart TVs, micro-ondas, fornos elétricos, air fryers e lava-louças. Loja no Água Verde, orçamento pelo WhatsApp.',
    // TODO: confirm with client — replace with the real domain after the
    // first deploy, then redeploy so canonical/OG URLs match production.
    url: 'https://tvsystem.com.br',
  },
} as const;

/**
 * Press coverage.
 *
 * The client says the company has been in the newspaper, but gave no outlet,
 * date, headline or link — and a press credential is exactly the kind of
 * claim that must not be approximated. "Saiu no jornal" with no source is
 * unverifiable puffery; naming a paper we were not told would be worse.
 *
 * So the list ships empty and the section that renders it (Store, in
 * Sections.tsx) is skipped entirely while it is. Add one entry per mention
 * and the section appears, with no other change.
 */
// TODO: confirm with client — outlet name, publication date, headline and a
// link to the article (or a scan/photo of the page for `image`).
export type PressMention = {
  /** Newspaper / site name, e.g. 'Gazeta do Povo'. */
  outlet: string;
  /** Headline or a short description of the piece. */
  headline: string;
  /** Publication date as shown to readers, e.g. 'Março de 2019'. */
  date: string;
  /** Link to the article online. Omit if it was print-only. */
  url?: string;
};

export const press: readonly PressMention[] = [];

/**
 * The equipment categories from the brand brief, verbatim in scope: TVs LED,
 * LCD and Smart, micro-ondas, fornos elétricos, air fryers, lava-louças, plus
 * an open-ended "outros eletrodomésticos" that promises an evaluation rather
 * than a repair — the only honest way to phrase a catch-all category.
 *
 * `span` drives the bento grid in Services.tsx: 'wide' cells take two
 * columns on desktop. The two wide cells are the two categories the brand is
 * named after and the one most people search for, so the grid's emphasis
 * matches the business's.
 */
type Service = {
  id: string;
  icon: 'tv' | 'monitor' | 'microwave' | 'oven' | 'fryer' | 'dishwasher';
  code: string;
  title: string;
  description: string;
  /** Terms shown as small technical chips under the description. */
  tags: readonly string[];
  span: 'wide' | 'normal';
};

export const services: readonly Service[] = [
  {
    id: 'tv',
    icon: 'tv',
    code: 'SVC-01',
    title: 'TVs LED, LCD e Smart TV',
    description:
      'Diagnóstico e conserto de televisores que não ligam, ficam sem imagem, sem som, com tela piscando, listras ou manchas. Reparo em placa de fonte, placa principal e sistema de backlight.',
    tags: ['Não liga', 'Sem imagem', 'Sem som', 'Backlight', 'Placa de fonte'],
    span: 'wide',
  },
  {
    id: 'microondas',
    icon: 'microwave',
    code: 'SVC-02',
    title: 'Micro-ondas',
    description:
      'Aparelhos que não esquentam, não ligam, fazem ruído ou desarmam o disjuntor. Manutenção completa do conjunto de potência e dos comandos.',
    tags: ['Não esquenta', 'Não liga', 'Painel'],
    span: 'normal',
  },
  {
    id: 'forno',
    icon: 'oven',
    code: 'SVC-03',
    title: 'Fornos elétricos',
    description:
      'Resistências, termostatos, temporizadores e comandos. Conserto de fornos que não aquecem ou perdem o controle de temperatura.',
    tags: ['Resistência', 'Termostato', 'Timer'],
    span: 'normal',
  },
  {
    id: 'airfryer',
    icon: 'fryer',
    code: 'SVC-04',
    title: 'Air fryers',
    description:
      'Fritadeiras elétricas sem aquecimento, com painel travado, ventilação falhando ou desligamento durante o uso.',
    tags: ['Sem aquecimento', 'Painel travado', 'Ventilação'],
    span: 'normal',
  },
  {
    id: 'lavaloucas',
    icon: 'dishwasher',
    code: 'SVC-05',
    title: 'Lava-louças',
    description:
      'Máquinas que não iniciam o ciclo, não drenam, apresentam vazamento ou acusam erro no painel. Avaliação da placa de comando e do conjunto hidráulico.',
    tags: ['Não drena', 'Erro no painel', 'Vazamento'],
    span: 'normal',
  },
  {
    id: 'outros',
    icon: 'monitor',
    code: 'SVC-06',
    title: 'Outros eletrônicos e eletrodomésticos',
    description:
      'Seu aparelho não está na lista? Avaliamos caso a caso e respondemos com sinceridade se o conserto vale a pena — inclusive quando a resposta é não.',
    tags: ['Avaliação caso a caso'],
    span: 'normal',
  },
];

/**
 * The four chapters scrubbed by the pinned WebGL diagnostic section. They
 * double as the "como funciona" explanation, so the wording describes the
 * bench process without committing to a deadline or a price.
 */
export const diagnosticSteps = [
  {
    code: '01',
    title: 'Recepção',
    description:
      'Você descreve o defeito pelo WhatsApp ou traz o aparelho até a loja, no Água Verde. Registramos o equipamento, o modelo e o sintoma relatado.',
  },
  {
    code: '02',
    title: 'Diagnóstico',
    description:
      'O aparelho é aberto e testado ponto a ponto até a causa real aparecer. Sintoma parecido nem sempre é o mesmo defeito — por isso ninguém aqui dá orçamento por telefone sem olhar.',
  },
  {
    code: '03',
    title: 'Orçamento',
    description:
      'Explicamos o que foi encontrado, o que precisa ser trocado e quanto custa. O conserto só começa depois da sua aprovação.',
  },
  {
    code: '04',
    title: 'Reparo e teste',
    description:
      'Feito o reparo, o aparelho fica em teste antes de voltar para você — ligado, funcionando e conferido pelo mesmo técnico que abriu.',
  },
] as const;

/**
 * Reasons to choose the bench. Deliberately limited to things that are true
 * of any competent workshop and require no client confirmation — no "20 anos
 * de experiência", no "garantia de 90 dias", no "autorizada Samsung".
 */
export const differentials = [
  {
    icon: 'search' as const,
    title: 'Diagnóstico antes do orçamento',
    description: 'Nada é orçado no escuro. Primeiro descobrimos a causa, depois falamos de preço.',
  },
  {
    icon: 'shield' as const,
    title: 'Aprovação antes do conserto',
    description: 'Nenhum reparo começa sem o seu de acordo sobre o que será feito e quanto custa.',
  },
  {
    icon: 'cpu' as const,
    title: 'Reparo em nível de placa',
    description:
      'Trabalhamos no componente, não só na troca de peça inteira quando ela não é necessária.',
  },
  {
    icon: 'message' as const,
    title: 'Conversa direta com o técnico',
    description: 'Quem explica o defeito é quem abriu o aparelho, em português, sem enrolação.',
  },
];

/**
 * FAQ answers only restate facts already established above (categories, the
 * "not a store" positioning, the case-by-case policy, the diagnose-then-quote
 * process). Nothing here introduces a new claim, so nothing here needs a
 * separate confirmation. Powers both the visible accordion and the FAQPage
 * JSON-LD — one list, two renderings.
 */
export const faqs = [
  {
    question: 'Quais aparelhos a TV System conserta?',
    answer:
      'TVs LED, LCD e Smart TVs, micro-ondas, fornos elétricos, air fryers, lava-louças e outros equipamentos eletrônicos e eletrodomésticos avaliados caso a caso.',
  },
  {
    question: 'Vocês dão orçamento por telefone?',
    answer:
      'Só depois de olhar o aparelho. Sintomas parecidos podem ter causas completamente diferentes, e um valor dito antes do diagnóstico seria um chute. Pelo WhatsApp conseguimos entender o problema e orientar o próximo passo.',
  },
  {
    question: 'O conserto começa antes de eu aprovar?',
    answer:
      'Nunca. Fazemos o diagnóstico, explicamos o que foi encontrado e apresentamos o orçamento. O reparo só é iniciado depois da sua aprovação.',
  },
  {
    question: 'Meu aparelho não está na lista. Vocês avaliam?',
    answer:
      'Sim. Equipamentos fora da lista são avaliados caso a caso, e dizemos com sinceridade quando o conserto não compensa.',
  },
  {
    question: 'Como solicito um orçamento?',
    answer:
      'Chame no WhatsApp (41) 3092-4949 com o modelo do aparelho e uma descrição do defeito — fotos ou um vídeo curto do problema ajudam bastante no diagnóstico inicial. O mesmo número atende por ligação, e você também pode trazer o aparelho até a loja no Água Verde.',
  },
  {
    question: 'Há quanto tempo a TV System funciona?',
    answer:
      'Há quase 14 anos atendendo em Curitiba, com loja física no Água Verde. São 125 avaliações no Google, com nota 4,5.',
  },
  {
    question: 'Onde fica a TV System?',
    answer:
      'Na R. Palmeiras, 273 — Água Verde, Curitiba/PR, CEP 80620-110. Atendemos de segunda a sexta das 09h às 18h e aos sábados das 09h às 12h.',
  },
  {
    question: 'A TV System vende aparelhos?',
    answer:
      'Sim, aparelhos usados — revisados pela nossa equipe e com 3 meses de garantia. Não trabalhamos com a venda de produtos novos: o foco da loja é a assistência técnica, e o aparelho usado costuma ser a alternativa para quando o conserto do seu não compensa.',
  },
] as const;

/** The equipment ticker in the hero — short labels, broadcast-crawl style. */
export const tickerItems = [
  'TV LED',
  'TV LCD',
  'Smart TV',
  'Micro-ondas',
  'Forno elétrico',
  'Air fryer',
  'Lava-louças',
  'Placa de fonte',
  'Backlight',
  'Placa principal',
] as const;

export const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#diagnostico', label: 'Como funciona' },
  { href: '#loja', label: 'A loja' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
] as const;

export const phoneUrl = `tel:+${site.phoneLink}`;

/**
 * null whenever no WhatsApp mobile is configured — see the note on
 * `site.whatsapp`. Components must never build a wa.me URL themselves.
 */
export const whatsappUrl = site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
  : null;

/**
 * Where every "solicitar orçamento" control points, and what it should be
 * called. One helper rather than a conditional in each component, so adding
 * the WhatsApp number later switches the entire site in one place.
 */
export const primaryContact = whatsappUrl
  ? {
      href: whatsappUrl,
      external: true,
      label: 'Solicitar orçamento',
      channel: 'whatsapp' as const,
    }
  : { href: phoneUrl, external: false, label: 'Solicitar orçamento', channel: 'phone' as const };

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&output=embed`;
