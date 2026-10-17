import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ————— ORYN Midnight Navy & Champagne Gold Palette —————
        alabaster: '#0D1B2E',       // master deep navy page ground
        'blush-surface': '#112240', // elevated navy section surface
        'blush-card': '#0F1E35',    // deep navy card ground
        'blush-border': '#1E3A5F', // midnight navy border

        gold: {
          DEFAULT: '#C9A84C',       // luminous champagne gold
          light: '#F0D98F',         // soft warm gold highlight
          dark: '#9E7A2C',          // deep antique gold
          glow: 'rgba(201, 168, 76, 0.28)',
        },
        champagne: {
          DEFAULT: '#E8D5A3',
          light: '#F5EDCD',
          gold: '#C9A84C',
        },
        plum: {
          DEFAULT: '#EAE6FF',       // soft lavender-white primary text
          dark: '#CBD5E8',
          light: '#F0EDF8',
        },

        // ————— Semantic compatibility tokens —————
        obsidian: '#0D1B2E',        // master background (navy)
        noir: '#112240',            // section surface
        'noir-card': '#0F1E35',     // card surfaces
        'noir-border': '#1E3A5F',   // card borders
        pearl: '#EAE6FF',           // primary text / headings
        sand: '#9BAEC8',            // body copy
        smoke: '#6B7FA3',           // muted captions & meta

        charcoal: '#0D1B2E',
        ivory: '#EAE6FF',
        blush: '#112240',
        cream: '#0F1E35',
        beige: '#1E3A5F',
        ink: '#EAE6FF',
        'ink-soft': '#9BAEC8',
        stone: '#6B7FA3',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.42em',
        luxury: '0.24em',
      },
      boxShadow: {
        soft: '0 20px 50px -15px rgba(0, 10, 30, 0.5)',
        gold: '0 8px 30px -4px rgba(201, 168, 76, 0.45)',
        'gold-sm': '0 4px 16px -2px rgba(201, 168, 76, 0.28)',
        card: '0 12px 35px -8px rgba(0, 10, 30, 0.4)',
        glow: '0 0 40px -5px rgba(201, 168, 76, 0.4)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out both',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
