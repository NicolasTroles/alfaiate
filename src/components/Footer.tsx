import Image from 'next/image';
import { mapsUrl, site, whatsappUrl } from '@/config/site.config';

const LINKS = [
  { href: '#services', label: 'Serviços' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
  { href: mapsUrl, label: 'Google', external: true },
  { href: whatsappUrl, label: 'WhatsApp', external: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-floorLine bg-floor pb-16 pt-16 text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <Image
            src="/logo.png"
            alt={site.brandFull}
            width={2172}
            height={724}
            className="h-10 w-auto object-contain"
          />

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-end">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="label-caps text-[11px] text-inkSoft transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-floorLine pt-8 text-center text-[13px] text-inkSoft md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {site.brandFull}
          </p>
          <p>
            {site.address.street} — {site.address.city}/{site.address.state}
          </p>
          <a href={`tel:${site.phoneLink}`} className="transition-colors hover:text-ink">
            {site.phone}
          </a>
        </div>

        <div className="mt-6 text-center text-[11px] text-inkSoft/70">
          <p>
            Desenvolvido por Nicolas Troles —{' '}
            <a
              href="https://wa.me/5541999447746"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              Entrar em contato
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
