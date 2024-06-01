/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "soft-black": "#121212",
        "dark-gray": "#2C2C2C",
        "mid-gray": "#4A4A4A",
        "light-gray": "#A9A9A9",
      },
    },
  },
  plugins: [],
};
