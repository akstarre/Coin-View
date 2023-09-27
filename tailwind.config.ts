import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple-highlight": "#6161D6",
        "purple-border": "#7878FA",
        "dark-purple": "#1E1932",
        "black-purple": "#13121A",
        "grey-purple-1": "#191925",
        "grey-purple-2": "#232336",
        "grey-text": "#D1D1D1",
        "green-change": "#01F1E3",
        "red-change": "#FE2264",
      },
    },
  },
  plugins: [],
};
export default config;
