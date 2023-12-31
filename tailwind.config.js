/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        lights: {
          "0%": {
            color: "hsl(230, 40%, 80%)",
            textShadow: [
              "0 0 1em hsla(320, 100%, 50%, 0.2)",
              "0 0 0.125em hsla(320, 100%, 60%, 0.3)",
              "-1em -0.125em 0.5em hsla(40, 100%, 60%, 0)",
              "1em 0.125em 0.5em hsla(200, 100%, 60%, 0)",
            ],
          },
          "30%": {
            color: "hsl(230, 80%, 90%);",
            textShadow: [
              "0 0 1em hsla(320, 100%, 50%, 0.5)",
              "0 0 0.125em hsla(320, 100%, 60%, 0.5)",
              "-0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2)",
              "0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4)",
            ],
          },
          "40%": {
            color: "hsl(230, 100%, 95%)",
            textShadow: [
              "0 0 1em hsla(320, 100%, 50%, 0.5)",
              "0 0 0.125em hsla(320, 100%, 90%, 0.5)",
              "-0.25em -0.125em 0.125em hsla(40, 100%, 60%, 0.2)",
              "0.25em 0.125em 0.125em hsla(200, 100%, 60%, 0.4)",
            ],
          },
          "70%": {
            color: "hsl(230, 80%, 90%)",
            textShadow: [
              "0 0 1em hsla(320, 100%, 50%, 0.5)",
              "0 0 0.125em hsla(320, 100%, 60%, 0.5)",
              "0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2)",
              "-0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4)",
            ],
          },
          "100%": {
            color: "hsl(230, 40%, 80%)",
            textShadow: [
              "0 0 1em hsla(320, 100%, 50%, 0.2)",
              "0 0 0.125em hsla(320, 100%, 60%, 0.3)",
              "1em -0.125em 0.5em hsla(40, 100%, 60%, 0)",
              "-1em 0.125em 0.5em hsla(200, 100%, 60%, 0)",
            ],
          },
        },
      },

      fontFamily: {
        vollkorn: ["vollkorn", "sans-serif"],
      },

      animation: {
        light: "lights 5s 750ms linear infinite",
      },

      maxWidth: {
        72: "288px",
        100: "400px",
      },

      fontSize: {
        5.5: "22px",
        8: "32px",
      },

      screens: {
        xxs: "380px",
        xs: "620px",
        "790PX": "790px",
      },

      letterSpacing: {
        1: "1px",
        5: "5px",
      },

      padding: {
        0.25: "1px",
      },

      margin: {
        1.5: "6px",
      },

      width: {
        4.5: "18px",
      },

      height: {
        0.75: "3px",
        4.5: "18px",
      },

      rotate: {
        129: "129deg",
        50: "50deg",
        360: "360deg",
      },

      translate: {
        0.25: "1px",
        0.5: "2px",
        2.25: "9px",
        3.38: "13.5px",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
