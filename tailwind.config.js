/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        cyan: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        },
      },
      spacing: {
        '4.5': '1.125rem',
      },
    },
  },
  plugins: [],
}
