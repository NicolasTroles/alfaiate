'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

/**
 * Scroll reveal, done as a CRT scanline wipe rather than the usual fade-up:
 * content is clipped from the bottom and unclipped downward, so it paints in
 * the way a frame is drawn. Same idea as the pixel lattice and the signal
 * section — the motion vocabulary of a display, not a generic website.
 *
 * IntersectionObserver rather than a scroll listener, and it unobserves on
 * first entry so nothing re-runs on the way back up.
 *
 * The element is always fully present in the DOM — only clip and opacity
 * animate — so crawlers get the complete page. `prefers-reduced-motion`
 * shows it immediately, and the <noscript> rule in layout.tsx un-hides every
 * [data-reveal] when JavaScript never runs at all.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  /** Stagger in ms. Keep groups to ~6 children so the last one isn't laggy. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = as as ElementType;

  return (
    <Component
      ref={ref}
      data-reveal=""
      className={`${shown ? 'animate-scan-in' : 'opacity-0'} ${className}`}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
