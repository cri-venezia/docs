const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aggiungiamo i colori ufficiali
      colors: {
        'cri-red': '#CC0000',
        'cri-white': '#FFFFFF',
      }
    },
  },
  plugins: [
    typography,
  ],
}