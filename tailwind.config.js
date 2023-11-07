/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        1: "1px",
        5: "5px",
      },
      height: {
        0.75: "3px",
      },
      rotate: {
        129: "129deg",
        50: "50deg",
        360: "360deg",
      },
      translate: {
        0.25: "1px",
        2.25: "9px",
        3.38: "13.5px",
      },
    },
  },
  plugins: [],
};
