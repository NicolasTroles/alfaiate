/**
 * Single source of truth for the site. Business data is changed here, never
 * inside a component.
 *
 * IMPORTANT — nothing in this file has been confirmed by the client yet. The
 * brief that started this project covered the brand identity (name, palette,
 * positioning, the equipment categories) and nothing else: no phone number,
 * no address, no opening hours, no reviews, no warranty terms, no years in
 * business. Every such field below is an obvious placeholder marked with a
 * TODO, deliberately fake rather than plausibly invented, so it can never be
 * mistaken for real data and published by accident.
 *
 * The copy that reads from this file was written to make no unconfirmed
 * promise: no price, no turnaround time, no warranty length, no
 * manufacturer authorization, no rating.
 */

export const site = {
  brandName: 'TV System',
  brandFull: 'TV System Assistência Técnica',
  // The positioning line the brief is explicit about: this is a repair bench,
  // not a store that sells televisions.
  tagline: 'Assistência técnica especializada em TVs, micro-ondas e eletrodomésticos.',

  // TODO: confirm with client — city and state drive the local SEO copy,
  // the JSON-LD areaServed and the map link.
  city: 'Sua Cidade',
  state: 'UF',

  // TODO: confirm with client — placeholder digits on purpose. `phoneLink`
  // and `whatsapp` are the E.164 form (55 + DDD + number) used by tel: and
  // wa.me links.
  phone: '(00) 00000-0000',
  phoneLink: '5500000000000',
  whatsapp: '5500000000000',
  whatsappMessage:
    'Olá! Vim pelo site da TV System e gostaria de um orçamento para o conserto do meu aparelho.',

  /**
   * Flips to true once the real address is confirmed. While it is false the
   * contact section renders a placeholder panel instead of a Google Maps
   * embed — an embed built from a placeholder query would show some other
   * business's pin, which is worse than showing nothing.
   */
  addressConfirmed: false,

  // TODO: confirm with client — full street address.
  address: {
    street: 'Rua Exemplo, 000',
    district: 'Bairro',
    city: 'Sua Cidade',
    state: 'UF',
    zip: '00000-000',
    mapsQuery: 'TV System Assistência Técnica',
  },

  // TODO: confirm with client — opening hours are shown in the header status
  // strip, the contact block and the JSON-LD.
  openingHours: 'Segunda a sexta, 08h às 18h · Sábado, 08h às 12h',
  openingHoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '12:00' },
  ],

  // TODO: confirm with client — remove any channel the client does not use.
  socialLinks: {
    instagram: '',
    facebook: '',
  },

  seo: {
    title: 'TV System | Assistência Técnica em TV, Micro-ondas e Eletrodomésticos',
    description:
      'Assistência técnica especializada no conserto de TVs LED, LCD e Smart TVs, micro-ondas, fornos elétricos, air fryers e lava-louças. Diagnóstico técnico e orçamento pelo WhatsApp.',
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
      'Você descreve o defeito pelo WhatsApp ou traz o aparelho até a bancada. Registramos o equipamento, o modelo e o sintoma relatado.',
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
      'Chame no WhatsApp com o modelo do aparelho e uma descrição do defeito — fotos ou um vídeo curto do problema ajudam bastante no diagnóstico inicial.',
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

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const phoneUrl = `tel:+${site.phoneLink}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&output=embed`;
