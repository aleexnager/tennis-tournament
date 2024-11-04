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
      text: "#F7F5FA",
      bg: "#08040B",
      primary: "#3B82F6",
      secondary: "#9333EA",
      accent: "#6E15B2",
    },
  },
  plugins: [],
};
export default config;
