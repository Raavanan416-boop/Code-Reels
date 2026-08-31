/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d9ff',
          300: '#a5bcff',
          400: '#8098ff',
          500: '#6366f1',   // primary indigo
          600: '#5254e0',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          400: '#a78bfa',   // violet
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        surface: {
          50:  '#f8fafc',
          100: '#1a1b2e',   // card bg
          200: '#16213e',   // sidebar
          300: '#0f3460',   // header / deep
          900: '#0a0a14',   // page bg
          950: '#06060f',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #22d3ee 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.05) 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top left, #312e81 0%, #0a0a14 60%)',
      },
      animation: {
        'fade-in':   'fadeIn 0.3s ease-out',
        'slide-up':  'slideUp 0.35s ease-out',
        'slide-in':  'slideIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':     'float 6s ease-in-out infinite',
        'glow':      'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 },              '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        slideIn: { '0%': { transform: 'translateX(100%)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
        float:   { '0%,100%': { transform: 'translateY(0)' },  '50%': { transform: 'translateY(-10px)' } },
        glow:    { '0%': { boxShadow: '0 0 5px #6366f1' },    '100%': { boxShadow: '0 0 20px #8b5cf6, 0 0 40px #6366f1' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'brand':      '0 4px 24px rgba(99,102,241,0.3)',
        'card':       '0 8px 32px rgba(0,0,0,0.4)',
        'glass':      '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'inner-glow': 'inset 0 0 20px rgba(99,102,241,0.1)',
      },
    },
  },
  plugins: [],
}
