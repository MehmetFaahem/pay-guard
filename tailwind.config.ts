import type { Config } from "tailwindcss";
import { theme } from "./app/theme";

export default {
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
        primary: theme.colors.primary,
        gray: theme.colors.gray,
      },
      container: theme.spacing.container,
    },
  },
  plugins: [],
} satisfies Config;
