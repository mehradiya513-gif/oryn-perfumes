import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ————— ORYN Pure Black & Champagne Gold Palette —————
        alabaster: '#0A0A0A',       // master deep black page ground
        'blush-surface': '#121212', // elevated black section surface
        'blush-card': '#161616',    // deep black card ground
        'blush-border': '#262626', // sleek black border

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
          DEFAULT: '#F5F2EB',       // warm luxury ivory primary text
          dark: '#D4CEBF',
          light: '#FAF7F2',
        },

        // ————— Semantic compatibility tokens —————
        obsidian: '#0A0A0A',        // master background (black)
        noir: '#121212',            // section surface
        'noir-card': '#161616',     // card surfaces
        'noir-border': '#262626',   // card borders
        pearl: '#F5F2EB',           // primary text / headings
        sand: '#A8A29E',            // body copy
        smoke: '#78716C',           // muted captions & meta

        charcoal: '#0A0A0A',
        ivory: '#F5F2EB',
        blush: '#121212',
        cream: '#161616',
        beige: '#262626',
        ink: '#F5F2EB',
        'ink-soft': '#A8A29E',
        stone: '#78716C',
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
        soft: '0 20px 50px -15px rgba(0, 0, 0, 0.7)',
        gold: '0 8px 30px -4px rgba(201, 168, 76, 0.45)',
        'gold-sm': '0 4px 16px -2px rgba(201, 168, 76, 0.28)',
        card: '0 12px 35px -8px rgba(0, 0, 0, 0.6)',
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
