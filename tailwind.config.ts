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
      "3xl": "2000px",
      "4xl": "2500px",
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
          10: "#DFF2DF",
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
          1400:"#13473D",
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
          10: "#D5D7DA",
          50: "#F9F7F5",
          100: "#D8D8D8",
          200: "#F7F7F9",
          300: "#FFE39B",
          400: "#",
          yellow: "#FFEBB9",
          yellow2: "#FFE39B",
          green: "#B5E6B2",
          green2: "#83D57F",
          blue: "#B1F0F7",
          red: "#B42318",
          red2: "#F47F7F",
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
        'shad1': '0px 1px 2px 0px rgba(0, 0, 0, 0.06)', 
        'shad2': '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',  
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
