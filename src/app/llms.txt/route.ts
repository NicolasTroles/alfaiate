import { site, services, whatsappUrl } from '@/config/site.config';

const { url } = site.seo;

export function GET() {
  const body = [
    `# ${site.brandFull}`,
    '',
    `> ${site.seo.description}`,
    '',
    `Área de atuação: ${site.areaServed}.`,
    `Contato: [${site.phone} (WhatsApp)](${whatsappUrl})`,
    '',
    '## Serviços',
    '',
    ...services.map(
      (service) => `- [${service.title}](${url}/#servicos): ${service.description}`,
    ),
    '',
    '## Páginas',
    '',
    `- [Página inicial](${url}/): apresentação da AlfaGeo Sondagens, serviços e área de atuação.`,
    `- [Serviços](${url}/#servicos): sondagem SPT, rotativa, trado, poços de inspeção, percolação, ensaios de laboratório e laudo geotécnico.`,
    `- [Como trabalhamos](${url}/#processo): etapas do contato inicial até a entrega do laudo assinado.`,
    `- [Trabalhos](${url}/#trabalhos): registros de obras e sondagens executadas em campo.`,
    `- [Sobre](${url}/#sobre): quem é a AlfaGeo e como a equipe atua.`,
    `- [Contato](${url}/#contato): telefone, WhatsApp e formas de solicitar orçamento.`,
    '',
    '## Opcional',
    '',
    `- [Instagram](${site.socialLinks.instagram}): fotos e vídeos das sondagens em campo.`,
    `- [Sitemap](${url}/sitemap.xml): lista de páginas indexáveis do site.`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
