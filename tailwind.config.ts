import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        oatmeal: '#F9F8F6',
        olive: '#0A2342',
        stone: '#B4905A',
        sand: '#F2EFE9',
        linen: '#F6F4F0',
        // Preserve legacy handles but map them to the new Jewel tones
        cream: 'rgba(10, 35, 66, 0.05)',
        sable: '#0A2342',
        blush: '#B4905A',
        mist: 'rgba(180, 144, 90, 0.2)',
        ink: '#0A2342',
      },
      boxShadow: {
        soft: '0 15px 45px -10px rgba(10, 35, 66, 0.06)',
        subtle: '0 8px 30px rgba(180, 144, 90, 0.06)',
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
