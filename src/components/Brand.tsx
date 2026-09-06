import Image from 'next/image';

/**
 * The TV System mark.
 *
 * The client's real logo has not been supplied yet. Until it lands, this
 * draws a stand-in wordmark in code rather than shipping a broken <img>: a
 * rounded screen glyph holding "TV", a power indicator in amber, and
 * "SYSTEM" set in the display face.
 *
 * TO SWAP IN THE REAL LOGO: drop the file at public/logo.svg (preferred) or
 * public/logo.png and flip LOGO_SRC below to its path. Everything else —
 * sizing, the light/dark variants, the header and footer layouts — already
 * reserves the same box, so nothing shifts when the artwork arrives. The
 * brief requires the logo's own proportions and colors to be respected, so
 * the real file is rendered untouched, never recolored by CSS.
 */
const LOGO_SRC: string | null = null;

type BrandProps = {
  /** 'light' = mark on white. 'dark' = mark on navy. */
  variant?: 'light' | 'dark';
  className?: string;
};

export default function Brand({ variant = 'light', className = '' }: BrandProps) {
  if (LOGO_SRC) {
    return (
      <Image
        src={LOGO_SRC}
        alt="TV System — Assistência Técnica"
        width={168}
        height={40}
        priority
        className={`h-9 w-auto sm:h-10 ${className}`}
      />
    );
  }

  const screenBg = variant === 'dark' ? 'bg-chalk' : 'bg-navy';
  const screenInk = variant === 'dark' ? 'text-navy' : 'text-chalk';
  const wordInk = variant === 'dark' ? 'text-chalk' : 'text-navy';
  const subInk = variant === 'dark' ? 'text-chalkMute' : 'text-inkMute';

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`relative flex h-9 w-11 items-center justify-center rounded-[7px] sm:h-10 sm:w-[3.1rem] ${screenBg}`}
      >
        <span className={`font-display text-[15px] font-bold leading-none tracking-tight sm:text-base ${screenInk}`}>
          TV
        </span>
        {/* Power indicator — the one amber detail in the mark. */}
        <span className="absolute bottom-1 right-1.5 h-1 w-1 rounded-full bg-amber" />
        {/* Scanline texture, barely there. */}
        <span
          className={`scanlines pointer-events-none absolute inset-0 rounded-[7px] ${
            variant === 'dark' ? 'opacity-15' : 'opacity-40'
          }`}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[17px] font-bold tracking-tight sm:text-lg ${wordInk}`}>
          SYSTEM
        </span>
        <span className={`hud mt-1 text-[9px] ${subInk}`}>Assistência técnica</span>
      </span>
    </span>
  );
}
