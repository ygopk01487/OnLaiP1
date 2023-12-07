/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        progress: "progress 2s linear forwards",
      },
      keyframes: {
        progress: {
          "100%": { right: "100%" },
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
