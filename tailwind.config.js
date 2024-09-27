/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

      boxShadow: {
        'light_wide': '0px 6px 12px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}