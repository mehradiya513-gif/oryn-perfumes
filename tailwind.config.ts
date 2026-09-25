import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#050505',
        surface: '#111111',
        'surface-light': '#1A1A1A',
        accent: '#C4A47C', // Muted champagne gold
        'accent-hover': '#E0C39C',
        text: '#F2F0EB',
        'text-muted': '#9CA3AF',
        border: '#2A2A2A',
        // Legacy colors to prevent build errors
        oatmeal: '#ffffff',
        olive: '#1a1a1a',
        stone: '#737373',
        sand: '#f9f8f6',
        linen: '#ffffff',
        cream: '#ffffff',
        sable: '#1a1a1a',
        blush: '#737373',
        mist: '#e5e1d8',
        ink: '#1a1a1a',
      },
      boxShadow: {
        'luxury-soft': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        'luxury-hover': '0 20px 40px -5px rgba(196, 164, 124, 0.15)',
        'glow': '0 0 20px rgba(196, 164, 124, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #050505 0%, #111111 100%)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      borderRadius: {
        'modern': '4px', // Slight rounding for a premium feel
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
