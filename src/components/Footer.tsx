import { site } from '@/config/site.config';
import { FacebookGlyph, InstagramGlyph, LogoImage } from './Brand';

const developerWhatsappUrl = `https://wa.me/5541999447746?text=${encodeURIComponent(
  'Olá Nicolas! Vi o site da AlfaGeo e queria saber mais sobre criar um site assim.',
)}`;

export function Footer() {
  const year = new Date().getFullYear();
  const hasSocialLinks = site.socialLinks.instagram || site.socialLinks.facebook;

  return (
    <footer className="border-t border-line bg-ink py-16 text-bone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2.5">
            <LogoImage className="h-[54px] w-auto" />
          </div>

          {hasSocialLinks && (
            <div className="flex gap-2">
              {site.socialLinks.instagram && (
                <a
                  href={site.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-12 w-12 place-items-center border border-line text-silver transition-colors hover:border-silver hover:text-bone"
                >
                  <InstagramGlyph className="h-4 w-4" />
                </a>
              )}
              {site.socialLinks.facebook && (
                <a
                  href={site.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-12 w-12 place-items-center border border-line text-silver transition-colors hover:border-silver hover:text-bone"
                >
                  <FacebookGlyph className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 text-center text-[13px] text-muted md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {site.brandFull}
          </p>
          <p>{site.areaServed}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-center text-[12px] text-muted md:justify-start">
          <p>Desenvolvido por Nicolas Troles</p>
          <span aria-hidden="true">·</span>
          <a
            href={developerWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-bone"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </footer>
  );
}
