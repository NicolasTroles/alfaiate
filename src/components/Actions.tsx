'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { phoneUrl, primaryContact, site } from '@/config/site.config';

/**
 * Fixed contact bar for phones — this business is reached by phone (and by
 * WhatsApp, once a mobile is configured), so contact stays one thumb-reach
 * away for the whole page.
 *
 * It only appears after the hero has scrolled past: while the hero is on
 * screen its own two buttons are already doing this job, and a duplicate bar
 * over them would just eat screen. The bar is hidden from lg upward, where
 * the header CTA is permanently visible instead.
 *
 * Both targets are 56px tall and the bar pads for the home indicator via
 * env(safe-area-inset-bottom).
 */
export default function Actions() {
  const [visible, setVisible] = useState(false);
  const hasWhatsapp = primaryContact.channel === 'whatsapp';

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-navyLine/70 bg-navyDeep/95 backdrop-blur-md transition-[transform,visibility] duration-300 ease-smooth lg:hidden ${
        visible ? 'translate-y-0' : 'invisible translate-y-full'
      }`}
      // Hidden from assistive tech while off-screen, and `invisible` takes
      // its two links out of the tab order — a bar sitting below the fold
      // must not be focusable.
      aria-hidden={!visible}
    >
      {/* With WhatsApp configured this is a two-up bar. Without it, both
          buttons would dial the same landline, so it collapses to one
          full-width target instead of a fake choice. */}
      <div
        className={`grid gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${
          hasWhatsapp ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {hasWhatsapp ? (
          <a
            href={primaryContact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-card bg-amber font-sans text-[15px] font-semibold text-navy transition-colors active:bg-[#D68701]"
          >
            <MessageSquare aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
            Orçamento
          </a>
        ) : null}
        <a
          href={phoneUrl}
          aria-label={`Ligar para ${site.brandFull} no ${site.phone}`}
          className={`flex min-h-[56px] items-center justify-center gap-2.5 rounded-card font-sans text-[15px] font-semibold transition-colors ${
            hasWhatsapp
              ? 'border border-chalk/25 text-chalk active:bg-chalk/10'
              : 'bg-amber text-navy active:bg-[#D68701]'
          }`}
        >
          <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
          {hasWhatsapp ? 'Ligar' : `Ligar ${site.phone}`}
        </a>
      </div>
    </div>
  );
}
