/**
 * Single source of truth for the site. Change data here, never inside components.
 *
 * Brand name, owner and phone taken from the public Instagram bio
 * (instagram.com/alfageo_sondagens). Fields marked TODO were not published
 * there and must be validated with AlfaGeo before launch — never invent a
 * street address, opening hours, or testimonial.
 */

export const site = {
  brandName: 'AlfaGeo',
  brandFull: 'AlfaGeo Sondagens',
  tagline: 'Sondagens e investigação geotécnica',
  city: 'Curitiba',
  state: 'PR',

  // Confirmed on the Instagram bio.
  phone: '+55 41 99657-6854',
  phoneLink: '+5541996576854',
  whatsapp: '5541996576854',
  whatsappMessage:
    'Olá! Vim pelo site e gostaria de solicitar um orçamento de sondagem geotécnica.',

  // Confirmed with the client: the crew travels across the whole South
  // region plus São Paulo, not just metro Curitiba — do not narrow this
  // back to a single city.
  areaServed: 'Paraná, Santa Catarina, Rio Grande do Sul e São Paulo',

  // TODO: confirm business hours with the client — not published on Instagram.
  openingHours: [
    { days: 'Segunda a sexta', hours: '08h às 18h' },
    { days: 'Sábado e domingo', hours: 'Plantão sob consulta' },
  ],

  // Empty links are not rendered. Fill in when official profiles are confirmed.
  socialLinks: {
    instagram: 'https://www.instagram.com/alfageo_sondagens/',
    facebook: '',
  },

  seo: {
    title: 'AlfaGeo Sondagens | Sondagem SPT, Rotativa e Laudo Geotécnico no Sul do Brasil',
    description:
      'AlfaGeo Sondagens executa sondagem SPT, sondagem rotativa, poços de inspeção, ensaio de percolação do solo e laudo geológico-geotécnico no Paraná, Santa Catarina, Rio Grande do Sul e São Paulo. Orçamento pelo WhatsApp.',
    url: 'https://www.alfageosondagem.com.br',
  },
} as const;

// Full state names for the JSON-LD areaServed list, matching site.areaServed
// above and the sigla keys in serviceRegion below.
export const areaServedStates = ['Paraná', 'Santa Catarina', 'Rio Grande do Sul', 'São Paulo'];

/**
 * States covered by the map in ServiceMap, keyed by the same two-letter
 * `sigla` used in src/data/brazilMapShapes.ts. A few representative cities
 * per state, shown in the hover/tap tooltip — not an exhaustive service
 * list, just enough to make the coverage feel concrete.
 */
export const serviceRegion = [
  { sigla: 'PR', cities: ['Curitiba', 'Londrina', 'Maringá', 'Cascavel'] },
  { sigla: 'SC', cities: ['Florianópolis', 'Joinville', 'Blumenau', 'Chapecó'] },
  { sigla: 'RS', cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria'] },
  { sigla: 'SP', cities: ['São Paulo', 'Campinas', 'Sorocaba', 'São José dos Campos'] },
] as const;

export const services = [
  {
    icon: 'coreSample' as const,
    title: 'Sondagem SPT',
    description:
      'Sondagem de simples reconhecimento à percussão, conforme NBR 6484, para definir o perfil do solo e a capacidade de carga antes da fundação.',
    photoSrc: '/servico-spt.jpg',
    photoAlt: 'Amostrador SPT sendo cravado no solo durante a sondagem',
    photoGuide:
      'Amostrador SPT sendo cravado, com o tripé montado e o operador manuseando o cabo de aço ou o martelo — a haste de perfuração precisa aparecer entrando no solo.',
    aiPrompt: undefined as string | undefined,
  },
  {
    icon: 'drill' as const,
    title: 'Sondagem rotativa',
    description:
      'Perfuração em rocha e solos de alta resistência, com extração de testemunhos, para investigações mais profundas ou terrenos com matacões.',
    photoSrc: '/servico-rotativa.jpg',
    photoAlt: 'Sonda rotativa em operação com testemunhos de rocha extraídos',
    photoGuide:
      'Sonda rotativa em operação (barrilete e coroa visíveis) ou os testemunhos de rocha cilíndricos organizados na caixa — o que deixa claro que é rocha, não solo.',
    aiPrompt: undefined as string | undefined,
  },
  // Trado and lab tests are common complementary services offered alongside
  // SPT/rotativa by geotechnical providers in this segment (per market
  // research on similar companies) — confirm with AlfaGeo that these are
  // actually part of the service list before publishing.
  {
    icon: 'ruler' as const,
    title: 'Sondagem a trado',
    description:
      'Perfuração manual para reconhecimento raso em terrenos de fácil acesso, indicada para investigações preliminares e obras de menor porte.',
    photoSrc: '/servico-trado.jpg',
    photoAlt: 'Trado manual sendo girado por um técnico durante a perfuração',
    photoGuide:
      'Trado manual (cruzeta, haste e hélice) sendo girado por um técnico, ou o trado retirado do furo com a amostra de solo presa nele — sem tripé, é perfuração manual.',
    aiPrompt: undefined as string | undefined,
  },
  {
    icon: 'layers' as const,
    title: 'Poços de inspeção',
    description:
      'Poços e trincheiras de inspeção visual para reconhecimento raso do solo, complementando os dados da sondagem à percussão.',
    photoSrc: '/servico-poco.jpg',
    photoAlt: 'Poço de inspeção aberto mostrando as camadas de solo expostas',
    photoGuide:
      'Poço ou trincheira já aberta no terreno, com a seção do solo exposta nas paredes bem visível — de preferência com um técnico ao lado para dar escala de profundidade.',
    aiPrompt: undefined as string | undefined,
  },
  {
    icon: 'droplets' as const,
    title: 'Ensaio de percolação do solo',
    description:
      // NBR 13969:1997 (Anexo A) is the Brazilian standard for sizing
      // sumidouros/valas de infiltração — the client's draft text cited the
      // British standard BS 6297:2007, which doesn't apply here.
      'Ensaio de infiltração conforme a NBR 13969, que mede o tempo de rebaixamento da água na cova-teste para dimensionar sumidouros e valas de infiltração e evitar a contaminação do lençol freático.',
    photoSrc: '/servico-percolacao.jpg',
    photoAlt: 'Cova de ensaio de percolação com medição do nível de água',
    photoGuide:
      'Cova do ensaio já escavada e revestida de brita, com a régua/trena marcando o nível da água, ou o técnico anotando a leitura do tempo de rebaixamento.',
    aiPrompt: undefined as string | undefined,
  },
  {
    icon: 'flask' as const,
    title: 'Ensaios de laboratório',
    description:
      'Classificação, umidade e compactação das amostras coletadas em campo, complementando os índices de resistência com a caracterização física do solo.',
    photoSrc: '/servico-ensaios-de-laboratorio.png',
    photoAlt: 'Amostras de solo sendo analisadas em bancada de laboratório',
    photoGuide:
      'Amostras de solo em sacos ou cápsulas identificadas, ou um ensaio de bancada (peneiramento, umidade, compactação) — algo que mostre trabalho de laboratório, não de campo.',
    aiPrompt: undefined as string | undefined,
  },
  {
    icon: 'fileCheck' as const,
    title: 'Laudo geológico-geotécnico',
    description:
      'Relatório técnico assinado por engenheiro responsável, com os resultados de campo e as recomendações para o projeto de fundação.',
    photoSrc: '/servico-laudo-geologico-geotecnico.png',
    photoAlt: 'Boletim de sondagem impresso com o perfil de resistência do solo',
    photoGuide:
      'Boletim de sondagem (prancha com o perfil/gráfico de resistência por profundidade) sobre a mesa, de preferência com régua ou lapiseira ao lado para dar contexto técnico.',
    aiPrompt: undefined as string | undefined,
  },
] as const;

export const process = [
  {
    number: '01',
    title: 'Contato e diagnóstico',
    description:
      'Você conta o tipo de obra, o endereço e a fase do projeto. Definimos juntos qual ensaio atende a necessidade e o prazo.',
  },
  {
    number: '02',
    title: 'Visita técnica e execução',
    description:
      'Equipe e equipamento próprio vão até o terreno e executam a sondagem em campo, seguindo a norma técnica correspondente.',
  },
  {
    number: '03',
    title: 'Análise dos dados',
    description:
      'As amostras e os índices de resistência coletados em campo são organizados e interpretados pela equipe técnica.',
  },
  {
    number: '04',
    title: 'Entrega do laudo',
    description:
      'Laudo geotécnico assinado, pronto para instruir o projeto de fundação junto ao engenheiro ou arquiteto responsável.',
  },
] as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;
