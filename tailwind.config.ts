import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * TV System brand palette — handed down by the client's brand brief,
         * not a free design choice. Every value below is one of the seven
         * specified colors or an accessibility-driven variant of one, and the
         * measured WCAG ratio is noted so nobody has to re-derive it:
         *
         *   #001F4F navy      institutional color, headings, dark sections
         *   #005899 signal    gradients, secondary elements, icons, details
         *   #0000FF beam      "small details only" per the brief
         *   #FDA201 amber     CTAs, action icons, attention points
         *   #FFFFFF white     dominant background
         *   #F4F6F8 panel     alternate background
         *   #1E293B ink       secondary body text
         *
         * The brief asks for strong navy/white contrast, so white is the
         * dominant field and navy is spent deliberately: the hero, one pinned
         * diagnostic section, the closing CTA and the footer. Amber is never
         * a background for large areas — it marks actions and little
         * technical ticks, which is what keeps the page from reading as a
         * generic blue-gradient electronics shop.
         */

        // Dark family — navy carries every inverted surface.
        navy: '#001F4F', // 16.04:1 with white
        navyDeep: '#00163A', // footer / gradient floor, 17.86:1 with white
        navyLine: '#12386B', // hairlines on navy (non-text, decorative only)
        navySoft: '#0B2A5C', // raised cards on navy

        // Blue — gradients, icons, technical detail. Passes AA as text on
        // white (7.35:1), so it can label as well as decorate.
        signal: '#005899',
        signalLine: '#CBDDEC', // 1px rules on white, tinted toward the blue
        beam: '#0000FF', // pure blue: subpixel accents and hairline details only

        // Amber — the single action color. FDA201 is 2.03:1 on white, so it
        // is NEVER text on white; amberInk (5.93:1) is the on-white text
        // variant. On navy, FDA201 reaches 7.9:1 and can be used as text.
        amber: '#FDA201',
        amberInk: '#8A5A00',

        // Light family.
        white: '#FFFFFF',
        panel: '#F4F6F8',
        line: '#E3E9EF', // hairlines on white
        ink: '#1E293B', // body text, 14.63:1 on white
        inkMute: '#54637A', // secondary text, 6.1:1 on white / 5.63:1 on panel
        chalk: '#FFFFFF', // text on navy
        chalkMute: '#A8BBD4', // secondary text on navy, 8.19:1
      },
      fontFamily: {
        // Space Grotesk: a modern grotesk with engineered, slightly
        // mechanical terminals — reads "technology" without a gradient in
        // sight. IBM Plex Sans: engineering-heritage body face with solid
        // Portuguese diacritics. IBM Plex Mono: technical annotations only
        // (service codes, HUD labels), never body copy.
        display: ['var(--font-display)', 'Arial', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        hud: '0.18em',
      },
      maxWidth: {
        prose: '64ch',
      },
      borderRadius: {
        // "Bordas levemente arredondadas" — a tight, consistent radius. No
        // pill shapes, nothing softer than 14px anywhere.
        card: '14px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        // A CRT-style horizontal wipe: content resolves top-to-bottom the way
        // a scanline paints a frame. Used instead of the usual fade-up.
        'scan-in': {
          from: { opacity: '0', clipPath: 'inset(0 0 100% 0)' },
          to: { opacity: '1', clipPath: 'inset(0 0 0 0)' },
        },
        ticker: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'blink-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        'scan-in': 'scan-in 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
        ticker: 'ticker 38s linear infinite',
        'blink-dot': 'blink-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
