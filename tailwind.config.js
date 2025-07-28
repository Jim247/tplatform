/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        highlight: {
          DEFAULT: 'rgb(var(--highlight) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
