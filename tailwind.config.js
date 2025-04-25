/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#023047",
        light: {
          100: "#8ECAE6",
          200: "#219EBC",
        },
      },
    },
  },
  plugins: [],
};
