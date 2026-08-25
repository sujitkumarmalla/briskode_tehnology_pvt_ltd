/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
