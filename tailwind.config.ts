import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/globals.css"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
