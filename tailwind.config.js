/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        system: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        body: "16px",
      },
      colors: {
        beige: "#F5DDCB",
        darkred: "#BD7678",
        coral: "#DB9186",
      },
      spacing: {
        "h-120": "30rem",
        "h-144": "36rem",
      },
    },
  },
  plugins: [],
};
