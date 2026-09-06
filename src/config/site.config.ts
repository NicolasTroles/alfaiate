/**
 * Single source of truth for the site. Business data is changed here, never
 * inside a component.
 *
 * SOURCES. Name, address, landline, opening hours and the Google rating all
 * come from the company's Google Business profile (read 2026-09-06). The
 * brand identity — palette, positioning, the equipment categories — comes
 * from the client's brand brief.
 *
 * STILL UNCONFIRMED, and therefore still absent from the copy: any WhatsApp
 * number (the profile lists only a landline, which cannot receive WhatsApp),
 * price, turnaround time, warranty length, manufacturer authorization, and
 * years in business. Anything not on this list of sources does not appear
 * anywhere on the site.
 */

export const site = {
  brandName: 'TV System',
  brandFull: 'TV System Assistência Técnica',
  // The positioning line the brief is explicit about: this is a repair bench,
  // not a store that sells televisions.
  tagline: 'Assistência técnica especializada em TVs, micro-ondas e eletrodomésticos.',

  // Confirmed: the Google profile categorises the business as a television
  // repair service in Curitiba, Paraná.
  city: 'Curitiba',
  state: 'PR',

  // Confirmed landline. `phoneLink` is the E.164 form (55 + DDD + number)
  // used by the tel: link.
  phone: '(41) 3092-4949',
  phoneLink: '554130924949',

  /**
   * WhatsApp is NOT configured, on purpose.
   *
   * The only number the client publishes is the landline above, and a
   * landline cannot receive WhatsApp — pointing wa.me at 554130924949 would
   * produce a dead chat for every visitor who taps the main CTA. Until a real
   * mobile is confirmed, `whatsappUrl` below is null and every contact
   * control falls back to the phone. Setting this to the E.164 mobile is the
   * only change needed to switch the whole site back to WhatsApp-first.
   */
  // TODO: confirm with client — WhatsApp mobile in E.164 form, e.g. '5541999999999'.
  whatsapp: '',
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
    mapsQuery: 'TV System Assistência Técnica, R. Palmeiras, 273 - Água Verde, Curitiba - PR, 80620-110',
  },

  /**
   * Confirmed opening hours. Sunday is closed and is simply omitted from the
   * schema rather than published as a zero-length window.
   */
  openingHours: 'Segunda a sexta, 09h às 18h · Sábado, 09h às 12h',
  openingHoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
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
      'Assistência técnica em Curitiba: conserto de TVs LED, LCD e Smart TVs, micro-ondas, fornos elétricos, air fryers e lava-louças. Diagnóstico antes do orçamento, no Água Verde.',
    // TODO: confirm with client — replace with the real domain after the
    // first deploy, then redeploy so canonical/OG URLs match production.
    url: 'https://tvsystem.com.br',
  },
} as const;

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
      'Você liga descrevendo o defeito ou traz o aparelho até a bancada. Registramos o equipamento, o modelo e o sintoma relatado.',
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
    description: 'Trabalhamos no componente, não só na troca de peça inteira quando ela não é necessária.',
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
    question: 'A TV System vende televisores?',
    answer:
      'Não. A TV System é uma assistência técnica: fazemos manutenção e conserto de aparelhos. Não somos uma loja e não vendemos televisores nem eletrodomésticos.',
  },
  {
    question: 'Quais aparelhos a TV System conserta?',
    answer:
      'TVs LED, LCD e Smart TVs, micro-ondas, fornos elétricos, air fryers, lava-louças e outros equipamentos eletrônicos e eletrodomésticos avaliados caso a caso.',
  },
  {
    question: 'Vocês dão orçamento por telefone?',
    answer:
      'Só depois de olhar o aparelho. Sintomas parecidos podem ter causas completamente diferentes, e um valor dito antes do diagnóstico seria um chute. Por telefone conseguimos entender o problema e orientar o próximo passo.',
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
      'Ligue para (41) 3092-4949 com o modelo do aparelho e uma descrição do defeito em mãos, ou traga o equipamento até a loja no Água Verde. O orçamento é fechado depois do diagnóstico.',
  },
  {
    question: 'Onde fica a TV System?',
    answer:
      'Na R. Palmeiras, 273 — Água Verde, Curitiba/PR, CEP 80620-110. Atendemos de segunda a sexta das 09h às 18h e aos sábados das 09h às 12h.',
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
  { href: '#bancada', label: 'A bancada' },
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
  ? { href: whatsappUrl, external: true, label: 'Solicitar orçamento', channel: 'whatsapp' as const }
  : { href: phoneUrl, external: false, label: 'Solicitar orçamento', channel: 'phone' as const };

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&output=embed`;
