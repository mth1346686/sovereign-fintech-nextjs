/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fin: {
          gold: '#FFD700',
          amber: '#F59E0B',
          cyan: '#00F0FF',
          emerald: '#10B981',
          violet: '#8B5CF6',
          rose: '#F43F5E',
        },
        bg: {
          deep: '#030712',
          card: 'rgba(15, 23, 42, 0.75)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Cairo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        arabic: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
