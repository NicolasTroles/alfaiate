'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { phoneUrl, site, whatsappUrl } from '@/config/site.config';

/**
 * Fixed contact bar for phones — WhatsApp is how this kind of business
 * actually gets contacted, so it stays one thumb-reach away for the whole
 * page.
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
      <div className="grid grid-cols-2 gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-card bg-amber font-sans text-[15px] font-semibold text-navy transition-colors active:bg-[#D68701]"
        >
          <MessageSquare aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
          Orçamento
        </a>
        <a
          href={phoneUrl}
          aria-label={`Ligar para ${site.brandFull} no ${site.phone}`}
          className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-card border border-chalk/25 font-sans text-[15px] font-semibold text-chalk transition-colors active:bg-chalk/10"
        >
          <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
          Ligar
        </a>
      </div>
    </div>
  );
}
