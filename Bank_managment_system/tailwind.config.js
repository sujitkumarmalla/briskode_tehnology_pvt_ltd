/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apex: {
          primary: '#1478F2',
          dark: '#0D5FC4',
          sidebar: '#0968D7',
          light: '#EAF4FF',
          bg: '#EBF0F5',
          card: '#FFFFFF',
          textMain: '#0F172A',
          textSub: '#475569',
          border: '#D1D5DB',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444'
        },
        dimgrey: {
          300: '#A3A3A3',
          400: '#8E8E8E',
          500: '#6E6E6E',
          600: '#545454',
          700: '#3A3A3A'
        },
        lightgreen: {
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A'
        },
        slate: {
          950: '#0B1120',
          900: '#0F172A',
          850: '#141E33',
          800: '#1E293B',
          700: '#334155'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
