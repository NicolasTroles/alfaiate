import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Dark family: cool near-black navy, not warm charcoal — this is a
         * survey/instrumentation mood (night rig lights, LED displays), not
         * a construction-site earth tone.
         */
        ink: '#0A0F1C', // dark background
        surface: '#111A2C', // cards on dark
        elevated: '#182238',
        line: '#28334A', // dividers on dark
        silver: '#AAB4C6', // secondary text on dark
        // Fine print on dark. Kept at AA (4.5:1) against both `ink` and the
        // lighter `surface` it also sits on — #6C7890 read as 4.3:1 on ink and
        // failed Lighthouse, so do not darken this back down.
        muted: '#7E8AA3',
        bone: '#F2F4F8', // primary text on dark (cool near-white)

        /* Light family: carries most of the page. Clean and neutral-cool. */
        stone: '#F4F6FA', // light background
        stoneDeep: '#E4E9F1', // cards on light
        stoneLine: '#D3DAE6', // dividers on light
        graphite: '#131722', // primary text on light
        graphiteSoft: '#4C5568', // secondary text on light

        /*
         * Three accents, lifted straight from the AlfaGeo mark: the orange
         * survey-triangle, the blue "alfa" and the green "geo". Each has a
         * light-background pair for AA text contrast (the bright value reads
         * clearly on ink, ~7-8:1, but drops below AA on the light stone
         * background, so light-background text always uses the Deep variant).
         */
        clay: '#E86A12', // orange — primary accent / CTA
        clayDeep: '#A34F0E',
        blue: '#3B62E8', // secondary accent
        blueDeep: '#1D3B9E',
        green: '#1FA968', // tertiary accent
        greenDeep: '#0E7A48',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wide2: '0.28em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        // Single easing curve for the whole site: smooth entrances, no bounce.
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'draw-line': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'draw-line': 'draw-line 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
