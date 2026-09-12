import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        oatmeal: '#FDFBFB',
        olive: '#13402E',
        stone: '#C89E99',
        sand: '#F4EBEA',
        linen: '#FAF5F5',
        // Preserve legacy handles but map them to the new Jewel tones
        cream: 'rgba(19, 64, 46, 0.05)',
        sable: '#13402E',
        blush: '#C89E99',
        mist: 'rgba(200, 158, 153, 0.2)',
        ink: '#13402E',
      },
      boxShadow: {
        soft: '0 15px 45px -10px rgba(19, 64, 46, 0.06)',
        subtle: '0 8px 30px rgba(200, 158, 153, 0.06)',
      },
      fontFamily: {
        serif: ['"Merriweather"', 'Georgia', 'serif'],
        sans: ['"Lato"', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', 'monospace'],
      },
      borderRadius: {
        'wabi-1': '1rem',
        'wabi-2': '1.5rem',
        'wabi-3': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
