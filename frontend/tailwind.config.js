/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f5',
          100: '#fed7d7',
          500: '#d74622',
          600: '#c13a18',
          700: '#a12f14',
          900: '#7c2d12',
        },
        dark: {
          DEFAULT: '#111e2f',
          light: '#1a2d44',
          lighter: '#223553'
        },
        accent: {
          red: '#dd020f',
          purple: '#76127f',
          blue: '#0c22f1',
          orange: '#d74622'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'spectrum': 'linear-gradient(135deg, #dd020f 0%, #76127f 50%, #0c22f1 100%)',
        'spectrum-light': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
      }
    },
  },
  plugins: [],
}