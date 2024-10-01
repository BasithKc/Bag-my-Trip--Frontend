/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

      boxShadow: {
        'light_wide': '0px 6px 12px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.04)'
      },
      backgroundImage: {
        "honey_main": "url(/assets/images/honeymoon/honey-main-cut.jpeg)",
        "honey_1": "url(/assets/images/honeymoon/honey-1.jpeg)",
        "honey_2": "url(/assets/images/honeymoon/honey-2.jpeg)",
        "honey_3": "url(/assets/images/honeymoon/honey-3.jpeg)",
        "honey_4": "url(/assets/images/honeymoon/honey-4.png)",

        "kashmir_main": "url(/assets/images/kashmir/kashmir -4.jpg)",
        "kashmir_1": "url(/assets/images/kashmir/kashmir -1.jpg)",
        "kashmir_2": "url(/assets/images/kashmir/kashmir -2.jpg)",
        "kashmir_3": "url(/assets/images/kashmir/kashmir -3.jpg)",
      },
      screens: {
        "xs": "400px",
      }
    },
  },
  plugins: [],
}