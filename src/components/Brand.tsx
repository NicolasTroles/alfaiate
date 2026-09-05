/**
 * Site marks. LogoImage renders the client's actual logo (public/logo.jpg).
 * LogoMark is an SVG homage to the same survey-tripod motif, kept for
 * decorative uses (e.g. SectionDivider) where a raster icon doesn't fit.
 */

type IconProps = {
  className?: string;
};

/** Real client logo (public/logo.png, transparent) — icon shown next to the Wordmark text. */
export function LogoImage({ className }: IconProps) {
  return (
    <img
      src="/logo.png"
      alt="AlfaGeo"
      className={`object-contain ${className ?? ''}`}
    />
  );
}

/** Survey-tripod mark — decorative use only (e.g. SectionDivider). Fixed brand colors. */
export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M32 11 L53 49 H11 Z" stroke="#E86A12" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="32" cy="11" r="3.6" fill="#E86A12" />
      <line
        x1="19"
        y1="49"
        x2="45"
        y2="49"
        stroke="#3B62E8"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Two-tone wordmark, matching the blue "alfa" / green "geo" of the real logo. */
export function Wordmark({ className }: IconProps) {
  return (
    <span className={`font-display font-semibold tracking-tight ${className ?? ''}`}>
      <span className="text-blue">Alfa</span>
      <span className="text-green">Geo</span>
    </span>
  );
}

/** Drill rig silhouette — decorative background element for parallax sections. */
export function RigSilhouette({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 80" fill="none" className={className} aria-hidden="true" focusable="false">
      {/* mast */}
      <rect x="29" y="4" width="6" height="66" fill="currentColor" />
      {/* A-frame legs */}
      <path d="M32 10 6 74h6l22-56-2-8Z" fill="currentColor" />
      <path d="M32 10 58 74h-6L30 18l2-8Z" fill="currentColor" />
      {/* base plate */}
      <rect x="14" y="74" width="36" height="5" fill="currentColor" />
      {/* crossbar */}
      <rect x="20" y="30" width="24" height="4" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/**
 * Minimal outline glyphs for social links. lucide-react dropped brand icons
 * (Instagram, Facebook) in its current major version, so these are drawn
 * directly — simple enough to keep in code instead of adding an icon
 * dependency just for two glyphs.
 */
export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M14.5 21v-7.5h2.5l.4-3H14.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.3c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98V10.5H9v3h2.4V21h3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Section divider: rule + centered mark, instead of a plain straight line. */
export function SectionDivider({
  className,
  tone = 'dark',
}: IconProps & { tone?: 'light' | 'dark' }) {
  const isLight = tone === 'light';
  return (
    <div className={`flex items-center justify-center gap-5 ${className ?? ''}`} aria-hidden="true">
      <span
        className={`h-px w-16 bg-gradient-to-r from-transparent sm:w-24 ${isLight ? 'to-stoneLine' : 'to-line'}`}
      />
      <LogoMark className="h-5 w-5" />
      <span
        className={`h-px w-16 bg-gradient-to-l from-transparent sm:w-24 ${isLight ? 'to-stoneLine' : 'to-line'}`}
      />
    </div>
  );
}
