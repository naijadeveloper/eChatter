/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        readex: ["var(--global-font)"],
      },
      colors: {
        maingreen: {
          100: "#a7ff83",
          200: "#17b978",
          300: "#086972",
          400: "#071a52",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
