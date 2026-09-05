'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

const LINKS = [
  { href: '#services', label: 'Serviços' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
];

/**
 * Transparent over the hero, solid once scrolled: the header starts with no
 * fill at all so the dark full-bleed hero photo (public/reparo.png) shows
 * straight through, with the nav text/logo flipped to light so they stay
 * legible against it. Past a small scroll threshold it switches to the
 * frosted light bar (and the logo/text flip back to their normal petrol
 * colors) since every section below the hero is light. `logo.png` itself is
 * petrol+amber on transparent, so the "light" logo is the same file forced
 * white via a CSS filter rather than a second exported asset.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? 'border-floorLine/60 bg-floor/60 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 py-2 sm:px-8"
        aria-label="Navegação principal"
      >
        <a href="#top" aria-label="Início" className="inline-flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={site.brandFull}
            width={2172}
            height={724}
            priority
            className={`h-10 w-auto object-contain transition-[filter] duration-300 sm:h-12 ${
              solid ? '' : 'brightness-0 invert'
            }`}
          />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`label-caps text-[11px] transition-colors duration-200 ${
                  solid ? 'text-ink hover:text-safetyDeep' : 'text-chalk hover:text-safety'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps hidden min-h-11 items-center bg-safety px-6 text-[11px] text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-safety lg:inline-flex"
        >
          Solicitar orçamento
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center transition-colors duration-200 lg:hidden ${
            solid ? 'text-ink' : 'text-chalk'
          }`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-floorLine bg-floor lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="label-caps flex min-h-12 items-center text-xs text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
