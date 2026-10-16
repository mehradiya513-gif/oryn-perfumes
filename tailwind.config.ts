import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ————— ORYN Velvet Rose Quartz & Champagne Palette —————
        alabaster: '#FAF6F5', // master velvet rose quartz page ground
        'blush-surface': '#F4ECE9', // elevated blush porcelain section surface
        'blush-card': '#FFFFFF', // crisp elevated card ground
        'blush-border': '#EBDCD7', // delicate rose-quartz border
        
        gold: {
          DEFAULT: '#C5857B', // luminous metallic rose gold
          light: '#F3DFD8',   // soft champagne highlight
          dark: '#9A5850',    // deep warm rose bronze
          glow: 'rgba(197, 133, 123, 0.28)',
        },
        champagne: {
          DEFAULT: '#F5EBE6',
          light: '#FBF5F2',
          gold: '#DFC2A8',
        },
        plum: {
          DEFAULT: '#23171B', // deep velvet espresso-plum noir for typography
          dark: '#1A1014',
          light: '#36242B',
        },
        
        // ————— Semantic compatibility tokens —————
        obsidian: '#FAF6F5', // master background
        noir: '#F4ECE9',     // section surface
        'noir-card': '#FFFFFF', // card surfaces
        'noir-border': '#EBDCD7', // card borders
        pearl: '#23171B',    // primary text / headings
        sand: '#5C484E',     // body copy
        smoke: '#8D767C',    // muted captions & meta
        
        charcoal: '#23171B', 
        ivory: '#FAF6F5',
        blush: '#F7EDE9',    
        cream: '#F4ECE9',    
        beige: '#EFE3DF',    
        ink: '#23171B',      
        'ink-soft': '#5C484E',
        stone: '#8D767C',
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
        soft: '0 20px 50px -15px rgba(92, 53, 62, 0.08)',
        gold: '0 8px 30px -4px rgba(197, 133, 123, 0.35)',
        'gold-sm': '0 4px 16px -2px rgba(197, 133, 123, 0.22)',
        card: '0 12px 35px -8px rgba(92, 53, 62, 0.08)',
        glow: '0 0 35px -5px rgba(197, 133, 123, 0.35)',
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
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out both',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
