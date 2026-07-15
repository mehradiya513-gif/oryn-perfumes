import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        oatmeal: '#FDFBF9',
        olive: '#3D302B',
        stone: '#D2B4A4',
        sand: '#F5EBE6',
        linen: '#FAF6F3',
        // Preserve legacy handles but map them to the new Rose Gold & Cashmere luxury colors
        cream: 'rgba(61, 48, 43, 0.05)',
        sable: '#3D302B',
        blush: '#D2B4A4',
        mist: 'rgba(210, 180, 164, 0.2)',
        ink: '#3D302B',
      },
      boxShadow: {
        soft: '0 15px 45px -10px rgba(61, 48, 43, 0.06)',
        subtle: '0 8px 30px rgba(210, 180, 164, 0.06)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
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
