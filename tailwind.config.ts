import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    colors: {
      ...colors,
      text: "#091615",
      bg: "#fafdfd",
      primary: "#3fc0b8",
      secondary: "#91dfda",
      accent: "#61d7d0",
      text2: "#F7F5FA",
      bg2: "#08040B",
      primary2: "#8436BF",
      secondary2: "#51187C",
      accent2: "#6E15B2",
    },
  },
  plugins: [],
};
export default config;
