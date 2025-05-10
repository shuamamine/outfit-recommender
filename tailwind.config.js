/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F8BBD0', // pastel pink
          DEFAULT: '#F48FB1',
          dark: '#F06292',
        },
        secondary: {
          light: '#B3E5FC', // pastel blue
          DEFAULT: '#81D4FA',
          dark: '#4FC3F7',
        },
        accent: {
          light: '#FFE0B2', // pastel orange
          DEFAULT: '#FFCC80',
          dark: '#FFB74D',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1A1A1A',
        },
        surface: {
          light: '#F5F5F5',
          dark: '#2D2D2D',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
} 