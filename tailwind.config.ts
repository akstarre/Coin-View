import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "d-purple-highlight": "#3C3C82",
        "d-purple-border": "#6161D6",
        "d-dark-purple": "#1E1932",
        "d-black-purple": "#13121A",
        "d-grey-purple-1": "#191925",
        "d-grey-purple-2": "#232336",
        "d-grey-purple-border": "#232336",
        "d-grey-text": "#D1D1D1",
        "d-price-chart": "#191934",
        "d-volume-chart": "#1F1934",
        "l-dark-purple-background": "#353574",
        "l-light-purple-background": "#EBEBFF",
        "l-light-grey-background": "#F2F5F9",
        "l-light-purple-highlight": "#B0B0F0",
        "l-light-purple-border": "#7878FF",
        "green-change": "#01F1E3",
        "red-change": "#FE2264",
        "bit-orange": "#CE7200",
        "eth-blue": "#5F75C9",
        "teth-green": "#00E49C",
        "dodge-orange": "#FFA800",
        "bin-yello": "#F5EB00",
        "card-blue": "#5590FF",
        "usd-green": "#00F2E6",
        "bit-red": "#FF5433",
        "lit-blue": "#3E82D5",
      },
      spacing: {
        "basis-16": "16%",
        "basis-25": "25%",
        "basis-33": "33%",
        "basis-50": "50%",
        "basis-75": "75%",
      },
      boxShadow: {
        light: "3px 6px 15px rgba(119, 119, 255, 0.35)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
  plugins: [],
};
export default config;
