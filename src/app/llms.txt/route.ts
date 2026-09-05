import { site, services } from '@/config/site.config';

export function GET() {
  const body = [
    `# ${site.brandFull}`,
    '',
    site.seo.description,
    '',
    `Área de atuação: ${site.areaServed}.`,
    `Contato: ${site.phone} (WhatsApp).`,
    `Site: ${site.seo.url}`,
    '',
    '## Serviços',
    ...services.map((service) => `- ${service.title}: ${service.description}`),
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
