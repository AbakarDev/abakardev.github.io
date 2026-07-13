/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Mode sombre via la classe 'dark' sur <html>
  darkMode: 'class',
  theme: {
    extend: {
      // Palette de couleurs premium indigo/violet
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          DEFAULT: 'hsl(280, 85%, 65%)',
          hover:   'hsl(280, 85%, 55%)',
        },
        dark: {
          bg:     '#06060f',
          soft:   '#0f0f1f',
          card:   'rgba(15, 15, 35, 0.7)',
          border: 'rgba(139, 92, 246, 0.15)',
        },
      },
      // Familles de polices (chargées dans index.html)
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
      // Animations
      keyframes: {
        'float-blob': {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(-100px, 50px) scale(1.2)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.6', transform: 'scale(1.3)' },
        },
        morph: {
          '0%':   { borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' },
          '33%':  { borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' },
          '66%':  { borderRadius: '40% 60% 30% 70% / 70% 30% 60% 40%' },
          '100%': { borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%':      { transform: 'translateX(-50%) translateY(8px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-blob': 'float-blob 20s infinite alternate',
        'pulse-dot':  'pulse-dot 1.8s ease-in-out infinite',
        'morph':      'morph 15s ease-in-out infinite alternate',
        'rotate':     'rotate 20s linear infinite',
        'bounce-scroll': 'bounce 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards',
        'shimmer':    'shimmer 2s linear infinite',
      },
      // Ombres personnalisées
      boxShadow: {
        'primary-sm': '0 2px 8px rgba(99, 102, 241, 0.06)',
        'primary-md': '0 8px 30px rgba(99, 102, 241, 0.08)',
        'primary-lg': '0 20px 50px rgba(99, 102, 241, 0.12)',
        'primary-xl': '0 30px 60px rgba(99, 102, 241, 0.2)',
      },
      // Durées de transition
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Espacement
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Taille max
      maxWidth: {
        '8xl': '88rem',
      },
      // Rayons de bordure
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
