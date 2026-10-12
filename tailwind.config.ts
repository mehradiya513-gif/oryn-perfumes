import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ————— ORYN quiet-luxury palette (per design brief) —————
        charcoal: '#0E0E0E', // deep charcoal/black — header, footer, hero overlay
        ivory: '#F7F2EA', // warm ivory — the page ground
        gold: '#C8A45D', // muted gold — accents, dividers, badges
        blush: '#EFDCD4', // soft blush — highlights and gentle sections
        cream: '#F2EBDC', // warm cream — alternate section grounds
        beige: '#EAE1CE', // light beige — image panels
        // ————— Ink & text —————
        ink: '#0E0E0E', // same as charcoal; kept as existing code references `ink`/`ink-soft`
        'ink-soft': '#5C5649', // warm taupe — secondary text (AA on ivory)
        stone: '#8A8175', // muted stone — captions, meta — use at ≥15px only
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.38em',
      },
      boxShadow: {
        soft: '0 24px 70px -30px rgba(14, 14, 14, 0.35)',
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
