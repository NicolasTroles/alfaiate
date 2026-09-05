import { faqs, mapsUrl, services, site, whatsappUrl } from '@/config/site.config';

/**
 * llms.txt — an emerging (not yet officially adopted by any major AI
 * provider) convention for giving AI assistants/crawlers a clean, plain-text
 * summary of the site. Built from site.config.ts, the same single source of
 * truth as the rest of the site, so it can't drift out of sync.
 */
export async function GET() {
  const body = `# ${site.brandFull}

> ${site.tagline}

## Sobre
- Cidade: ${site.city}, ${site.state}
- Endereço: ${site.address.street}, ${site.address.city} - ${site.address.state}
- Telefone: ${site.phone}
- Site: ${site.seo.url}
- Perfil no Google Maps: ${mapsUrl}

## Serviços
${services.map((s) => `- ${s.title}: ${s.description}`).join('\n')}

## Perguntas frequentes
${faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}

## Contato
- WhatsApp: ${whatsappUrl}
- Telefone: ${site.phone}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
