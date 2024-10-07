import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "478px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-button": "linear-gradient(90deg, #DAF5DE 0%, #E0F9A8 100%)",
        "gradient-button-dark":
          "linear-gradient(90deg, #2C685D 0%, #174038 100%)",
      },
      borderRadius: {
        "200": "200px",
      },
      colors: {
        primary: {
          50: "#F1F7F6",
          100: "#00Df81",
          200: "#00DF81",
          300: "#2CC295",
          400: "#03624C",
          500: "#032221",
          600: "#2C4F48",
          700: "#13473D",
          800: "#DAF5DE",
          900: "#648981",
          1000: "#17342E",
          1100: "#E0F9A8",
          1200: "#174038",
          1300:"#2C685D",
        },
        secondary: {
          50: "#A0FCD6",
          100: "#",
          200: "#",
          300: "#",
          400: "#",
          500: "#",
        },
        dark: {
          50: "#",
          100: "#",
          200: "#",
          300: "#666666",
          400: "#",
          500: "#",
        },
        neutral: {
          50: "#EEEEEE",
        },
        bgColor: {
          50: "#F9F7F5",
          100: "#D8D8D8",
          200: "#F7F7F9",
          300: "#FFE39B",
          400: "#",
          yellow: "#FFEBB9",
          red: "#B42318",
          green: "#B5E6B2",
        },
      },
      fontSize: {
        "32px": "32px",
      },
      width: {
        "480": "480px",
      },
      boxShadow: {
        light: "0px 1px 2px 0px #0000000D",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus"],
    },
  },
};
export default config;
