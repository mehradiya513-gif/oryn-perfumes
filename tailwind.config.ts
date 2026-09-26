import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light editorial palette
        primary: '#FDFCFA', // warm paper — page background
        surface: '#F6F2EB', // soft sand — alternate sections
        'surface-light': '#EEE8DD',
        accent: '#8A6D4B', // bronze
        'accent-hover': '#6F5738',
        text: '#1C1917', // warm ink
        'text-muted': '#78716C',
        border: '#E4DCD1',
        // Legacy tokens (used by modals & inner pages) remapped to the light theme
        oatmeal: '#FDFCFA',
        olive: '#1C1917',
        stone: '#78716C',
        sand: '#F6F2EB',
        linen: '#FDFCFA',
        cream: '#FDFCFA',
        sable: '#1C1917',
        blush: '#B08968',
        mist: '#EEE8DD',
        ink: '#1C1917',
      },
      boxShadow: {
        'luxury-soft': '0 8px 30px -12px rgba(28, 25, 23, 0.12)',
        'luxury-hover': '0 24px 48px -16px rgba(138, 109, 75, 0.28)',
        'glow': '0 0 24px rgba(138, 109, 75, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #FDFCFA 0%, #F6F2EB 100%)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      borderRadius: {
        'modern': '2px', // sharp editorial edges
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

export default config
