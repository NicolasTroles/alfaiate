import type { ReactNode } from 'react';

/**
 * The site has exactly three button treatments, and the brand brief decides
 * which is which: amber is the action color, so `primary` is the only filled
 * button on the page and it is spent on "Solicitar orçamento" / "Falar com um
 * técnico" and nothing else.
 *
 * Amber sits at 2.03:1 against white, so its label is never white — it is
 * navy, which measures 7.9:1 on #FDA201 and comfortably clears AA. The two
 * outline variants exist because the page alternates white and navy grounds
 * and a single outline color cannot serve both.
 *
 * min-h-[48px] keeps every button past the 44px touch minimum, including the
 * small ones in the header.
 */
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outlineLight' | 'outlineDark';
  icon?: ReactNode;
  external?: boolean;
  className?: string;
  /** Set when the visible label alone would not make the target clear. */
  ariaLabel?: string;
};

const VARIANTS = {
  primary:
    'bg-amber text-navy hover:bg-[#E89201] active:bg-[#D68701] shadow-[0_1px_0_0_rgba(0,31,79,0.16)]',
  outlineLight: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.04]',
  outlineDark: 'border border-chalk/30 text-chalk hover:border-chalk hover:bg-chalk/10',
} as const;

export default function Button({
  href,
  children,
  variant = 'primary',
  icon,
  external = false,
  className = '',
  ariaLabel,
}: ButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={[
        'group inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2.5 rounded-card px-6',
        'font-sans text-[15px] font-semibold leading-none',
        'transition-colors duration-200 ease-smooth',
        VARIANTS[variant],
        className,
      ].join(' ')}
    >
      {children}
      {icon ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 ease-smooth group-hover:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </a>
  );
}
