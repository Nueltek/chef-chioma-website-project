import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary warm earth tones
        'earth': {
          900: '#1A0F0A',  // Deep chocolate
          800: '#2C1810',  // Rich brown
          700: '#3D221A',  // Warm dark
          600: '#5C3425',  // Terracotta dark
          500: '#8B4513',  // Saddle brown
          400: '#A0522D',  // Sienna
          300: '#CD853F',  // Peru
          200: '#DEB887',  // Burlywood
          100: '#F5DEB3',  // Wheat
          50: '#FDF8F0',   // Cream
        },
        // Accent copper/bronze
        'copper': {
          DEFAULT: '#B87333',
          light: '#CD7F32',
          dark: '#8B5A2B',
        },
        // Warm cream backgrounds
        'cream': {
          DEFAULT: '#FDF5E6',
          dark: '#F5E6D3',
          light: '#FFFAF5',
        },
        // Text colors
        'text': {
          primary: '#1A0F0A',
          secondary: '#5C3425',
          muted: '#8B7355',
          light: '#C4A77D',
        },
        // Accent gold for highlights
        'gold': {
          DEFAULT: '#C9A227',
          light: '#D4AF37',
          dark: '#B8860B',
        },
      },
      fontFamily: {
        // Display font - elegant serif
        display: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        // Script font for accents
        script: ['Pinyon Script', 'Dancing Script', 'cursive'],
        // Body font - refined sans
        body: ['Lora', 'Georgia', 'serif'],
        // Sans for UI elements
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'section': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2' }],
        'body-lg': ['1.125rem', { lineHeight: '1.8' }],
        'body': ['1rem', { lineHeight: '1.75' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        'content': '1400px',
        'narrow': '900px',
        'text': '680px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
