import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ORYN floral & soft palette — rose, pearl, soft grays
        ivory: '#fdfbfb', // pearl white — page background
        'ivory-deep': '#f5efef', // soft blush — alternate sections
        sand: '#ebdada', // rose quartz — panels, contrast
        ink: '#2d2929', // deep charcoal — text & dark sections
        'ink-soft': '#574f4f', // soft charcoal — secondary text
        stone: '#8a7f7f', // warm gray — tertiary text, captions
        gold: '#c97f8b', // dusty rose / rose gold — accents and links
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        sans: ['"Work Sans"', '"Avenir Next"', 'system-ui', 'sans-serif'],
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
