import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#ffffff',
        accent: '#8c7b64', // Warm Taupe/Gold
        surface: '#f9f8f6', // Alabaster
        border: '#e5e1d8',
        muted: '#737373',
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
        'modern-soft': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
        'modern-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'modern': '0px', // Sharp edges for luxury
      },
    },
  },
  plugins: [],
}

export default config
