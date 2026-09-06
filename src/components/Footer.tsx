import { MapPin, Phone } from 'lucide-react';
import Brand from '@/components/Brand';
import { navLinks, phoneUrl, primaryContact, site } from '@/config/site.config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-navy bg-navyDeep">
      <div className="mx-auto max-w-[1400px] px-5 pb-[max(6rem,calc(env(safe-area-inset-bottom)+6rem))] pt-20 sm:px-8 sm:pb-16 sm:pt-24">
        <div className="grid gap-12 border-b border-navyLine/60 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Brand variant="dark" />
            <p className="mt-6 max-w-sm leading-relaxed text-chalkMute">
              {site.tagline} Conserto de TVs LED, LCD e Smart TVs, micro-ondas, fornos elétricos,
              air fryers e lava-louças em {site.city} e região.
            </p>
            <p className="hud mt-6 text-chalk/45">Assistência técnica — não vendemos aparelhos</p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3">
            <p className="hud text-amber">Navegação</p>
            <ul className="mt-5 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-chalkMute transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="hud text-amber">Contato</p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={phoneUrl}
                  className="inline-flex min-h-[44px] items-center gap-3 text-chalk transition-colors hover:text-amber"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3 text-chalkMute">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                <address className="not-italic leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.district} — {site.address.city}/{site.address.state}
                </address>
              </li>
              <li>
                <a
                  href={primaryContact.href}
                  {...(primaryContact.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex min-h-[44px] items-center text-amber transition-colors hover:text-chalk"
                >
                  {primaryContact.channel === 'whatsapp'
                    ? 'Solicitar orçamento pelo WhatsApp'
                    : 'Solicitar orçamento por telefone'}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-chalkMute">{site.openingHours}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="hud text-chalk/40">
            © {year} {site.brandFull}
          </p>
          <p className="hud text-chalk/40">Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
