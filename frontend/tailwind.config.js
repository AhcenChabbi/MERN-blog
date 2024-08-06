/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBlue: "#111827",
        redError: "#ed1e48",
        "code-bg": "#0D0D0D",
        comment: "#616161",
        variable: "#F98181",
        "number-meta": "#FBBC88",
        "string-symbol-bullet": "#B9F18D",
        "title-section": "#FAF594",
        "keyword-tag": "#70CFF8",
      },
      fontFamily: {
        jetbrains: ["JetBrainsMono", "monospace"],
      },
      fontSize: {
        code: "0.8rem",
      },
      borderRadius: {
        code: "0.5rem",
      },
      spacing: {
        code: "0.75rem",
        "code-x": "1rem",
      },
    },
  },
  plugins: [],
};
