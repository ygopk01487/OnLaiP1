/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        progress: "progress 2s linear forwards",
        slideDown: "slideDown 0.7s",
        menuMiniTop: "menuMiniTop 0.5s",
        menuMiniDown: "menuMiniDown 0.5s",
      },
      keyframes: {
        progress: {
          "100%": { right: "100%" },
        },
        slideDown: {
          "0%": { opacity: "0", top: "-14%" },
          "100%": { opacity: "0.9", top: "0%" },
        },
        menuMiniTop: {
          "0%": { transform: "translateY(13%)" },
          "100%": { transform: "translateY(0%)" },
        },
        menuMiniDown: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(13%)" },
        },
      },
      colors: {
        blackRgba: "rgba(0,0,0,0.4)",
        blackRgb: "rgb(0,0,0)",
      },
    },
  },
  plugins: [],
};
