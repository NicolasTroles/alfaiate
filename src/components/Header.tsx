'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import Brand from '@/components/Brand';
import Button from '@/components/Button';
import { navLinks, phoneUrl, site, whatsappUrl } from '@/config/site.config';

/**
 * Two stacked bars, borrowed from the on-screen status line of a service
 * menu: a thin navy strip carrying hours and phone, and the navigation
 * itself on white.
 *
 * The strip is only there at the top of the page. Once you scroll it slides
 * away and the nav bar tightens and picks up a border — the header ends up
 * smaller the further down you are, which is the opposite of the usual
 * "header grows a shadow" move and keeps more of the page visible.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile panel covers the page, so background scrolling is frozen while
  // it is open and Escape closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Status strip — hidden once scrolling starts. */}
      <div
        className={`on-navy overflow-hidden bg-navy transition-[height,opacity] duration-300 ease-smooth ${
          scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'
        }`}
      >
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
          <p className="hud flex items-center gap-2 text-chalkMute">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-blink-dot rounded-full bg-amber" />
            <span className="hidden sm:inline">Bancada aberta</span>
            <span className="hidden text-chalk/40 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="normal-case tracking-normal">{site.openingHours}</span>
          </p>
          <a
            href={phoneUrl}
            className="hud hidden items-center gap-1.5 text-chalk transition-colors hover:text-amber sm:flex"
          >
            <Phone aria-hidden="true" className="h-3 w-3" strokeWidth={2.2} />
            <span className="tracking-normal">{site.phone}</span>
          </a>
        </div>
      </div>

      {/* Navigation. */}
      <div
        className={`border-b bg-white/95 backdrop-blur-md transition-[border-color,height] duration-300 ease-smooth ${
          scrolled ? 'border-line' : 'border-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 transition-[height] duration-300 ease-smooth sm:px-8 ${
            scrolled ? 'h-16' : 'h-[4.5rem]'
          }`}
        >
          <a href="#topo" className="shrink-0 rounded-sm" aria-label="TV System — início">
            <Brand />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center rounded-sm px-3.5 text-[15px] font-medium text-ink transition-colors duration-200 hover:text-signal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={whatsappUrl}
              external
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
              className="hidden sm:inline-flex"
            >
              Solicitar orçamento
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-card border border-line text-navy transition-colors hover:bg-panel lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="on-navy fixed inset-0 z-50 bg-navy lg:hidden"
      >
        <div className="pixel-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="relative flex h-full flex-col">
          <div className="flex h-[4.5rem] items-center justify-between px-5">
            <Brand variant="dark" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-card border border-chalk/25 text-chalk transition-colors hover:bg-chalk/10"
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>

          <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-5 pt-6">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href} className="border-b border-navyLine/60">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[64px] items-center gap-4 text-2xl font-semibold text-chalk transition-colors hover:text-amber"
                  >
                    <span className="hud text-amber">{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
            <Button
              href={whatsappUrl}
              external
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
              className="w-full"
            >
              Solicitar orçamento
            </Button>
            <Button href={phoneUrl} variant="outlineDark" className="w-full">
              Ligar {site.phone}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
