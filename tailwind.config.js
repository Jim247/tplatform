/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif'],
        heading: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        highlight: 'var(--highlight)',
      },
    },
  },
  plugins: [],
};
