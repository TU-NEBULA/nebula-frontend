import baseConfig from "../../tailwind.config.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
    },
  },
};
