/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Japanese-inspired warm color palette
        primary: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87d',
          400: '#f5934a',
          500: '#f27a2e',
          600: '#e35f1f',
          700: '#bc471c',
          800: '#963a1e',
          900: '#7a321c',
        },
        // Warm cream and beige tones
        cream: {
          50: '#fefcf8',
          100: '#fdf8f0',
          200: '#faf0d8',
          300: '#f5e4b8',
          400: '#eed28e',
          500: '#e5bc6a',
          600: '#d7a34c',
          700: '#b8833d',
          800: '#946835',
          900: '#78552f',
        },
        // Natural wood tones
        wood: {
          50: '#faf6f1',
          100: '#f4ede4',
          200: '#e8d8c8',
          300: '#d6bda3',
          400: '#c19d7a',
          500: '#b0855f',
          600: '#9e6f4e',
          700: '#835a42',
          800: '#6b4a38',
          900: '#583e31',
        },
        // Japanese red (more subtle)
        japanese: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      }
    },
  },
  plugins: [],
}
