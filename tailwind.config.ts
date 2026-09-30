import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ORYN editorial palette — warm, tactile, quiet
        ivory: '#f4efe6', // warm paper — page background
        'ivory-deep': '#ece5d8', // alternate sections, deeper tone
        sand: '#e4dccd', // panels, quiet contrast
        ink: '#2a231d', // warm near-black — text & dark sections
        'ink-soft': '#4a4238', // secondary text
        stone: '#8d8272', // tertiary text, captions
        gold: '#a98545', // antique gold — hairlines & small accents only
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        sans: ['Jost', '"Avenir Next"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.42em',
        wide2: '0.28em',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
