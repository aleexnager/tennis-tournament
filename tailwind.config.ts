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
      text: "#07050A",
      bg: "#F8F4FB",
      primary: "#8E40C9",
      secondary: "#BC83E7",
      accent: "#A64DEA",
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
