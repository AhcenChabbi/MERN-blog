/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBlue: "rgb(15, 23, 42)",
        lightBlueSky: "rgb(56, 189, 248)",
        lightGrey: "rgb(148, 163, 184)",
        lightmediumGrey: "rgb(180, 180, 180)",

        whiteSmoke: "rgb(242,242,242)",
        blueSky: "rgb(14, 165, 233)",
        darkGrey: "rgb(51, 65, 85)",
        darkMediumGrey: "rgb(66, 74, 94)",
      },
    },
  },
  plugins: [],
};
