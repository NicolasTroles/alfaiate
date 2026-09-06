'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// three.js is ~140KB gzipped across two chunks — more than the rest of the
// page combined. It stays out of the initial download entirely; `sceneReady`
// below decides when it's actually fetched.
const CircuitScene = dynamic(() => import('./CircuitScene').then((mod) => mod.CircuitScene), {
  ssr: false,
});

/**
 * Pins a full-viewport WebGL circuit board for the height of this section
 * (260vh) and drives its "connecting" animation from how far the user has
 * scrolled through that range — not the whole page. Progress lives in a ref,
 * not React state, so scrolling never triggers a re-render; only the
 * uniforms inside CircuitScene's render loop change.
 *
 * The section itself renders on the server: only the canvas is client-only.
 * It used to be the other way around — page.tsx pulled this whole component
 * in with ssr:false — which meant the heading and copy below never appeared
 * in the served HTML.
 */
export function CircuitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      progressRef.current = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 1;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /**
   * Two gates before three.js is fetched, and both matter.
   *
   * The `load` wait is the one that fixes the Lighthouse numbers: mounting
   * this on first render kicked off the import during hydration, so parsing
   * and executing three.js sat on the main thread while the browser still
   * owed us a first paint. The header logo — the LCP element — finished
   * downloading in ~400ms and then waited ~2s for the thread to free up.
   *
   * The IntersectionObserver is the one that would be enough on its own if
   * the geometry were friendlier, but it isn't: the hero above is min-h-dvh
   * and this section is 260vh, so any useful rootMargin already intersects
   * the viewport on load. Hence gating on `load` first, then arming the
   * observer — by then the critical path is done and an early fetch is free.
   */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let observer: IntersectionObserver | undefined;

    const arm = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setSceneReady(true);
          observer?.disconnect();
        },
        // Enough lead time to fetch and compile before the canvas is on
        // screen, without reaching up past the hero on load.
        { rootMargin: '200px 0px' },
      );
      observer.observe(el);
    };

    if (document.readyState === 'complete') {
      arm();
    } else {
      window.addEventListener('load', arm, { once: true });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener('load', arm);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '260vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        {sceneReady && <CircuitScene progressRef={progressRef} />}
        <div className="relative z-10 mx-auto flex h-full max-w-2xl items-center justify-center px-5 text-center sm:px-8">

          {/* Plain rectangle, partial opacity — no mask, no border. */}
          <div className="bg-charcoal/85 px-7 py-10 backdrop-blur-md sm:px-14 sm:py-14">
            <p className="label-caps text-[11px] text-safety">Diagnóstico em tempo real</p>
            <h2 className="mt-4 font-display text-[clamp(1.4rem,3.4vw,2.2rem)] font-bold leading-[1.25] text-chalk">
              Eletrônica exige diagnóstico. Venha fazer um orçamento.
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-[14px] leading-relaxed text-mist">
              Antes de trocar qualquer peça, a Activa testa o circuito até encontrar a origem
              real da falha, é isso que evita retrabalho e ajuda a decidir entre reparar ou
              substituir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
