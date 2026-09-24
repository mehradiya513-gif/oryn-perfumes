import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#09090b',
        secondary: '#fafafa',
        accent: '#2563eb', // Royal Blue
        surface: '#f4f4f5',
        border: '#e4e4e7',
        muted: '#71717a',
        // Legacy colors to prevent build errors while refactoring
        oatmeal: '#ffffff',
        olive: '#09090b',
        stone: '#71717a',
        sand: '#f4f4f5',
        linen: '#fafafa',
        cream: '#fafafa',
        sable: '#09090b',
        blush: '#71717a',
        mist: '#e4e4e7',
        ink: '#09090b',
      },
      boxShadow: {
        'modern-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'modern-hover': '0 10px 40px -5px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'modern': '0.5rem',
      },
    },
  },
  plugins: [],
}

export default config
