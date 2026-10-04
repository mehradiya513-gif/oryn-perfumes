import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ————— ORYN soft palette —————
        ivory: '#F8F4ED', // warm ivory — the page ground
        cream: '#F2EBDC', // soft cream — alternate sections
        beige: '#EAE1CE', // light beige — panels, image grounds
        blush: '#ECDDD4', // muted dusty blush — one quiet section
        lavender: '#E7E3EB', // extremely subtle — reserved for fine accents
        sand: '#EAE1CE', // legacy alias of beige (admin + drawer)
        // ————— Ink —————
        ink: '#26221B', // deep warm charcoal — text, footer
        'ink-soft': '#6E6456', // warm taupe — secondary text
        stone: '#9C9284', // muted stone — captions, meta
        gold: '#A5814E', // muted antique gold — small accents only
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.38em',
      },
      boxShadow: {
        soft: '0 24px 70px -30px rgba(38, 34, 27, 0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
