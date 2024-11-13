import baseConfig from "../../tailwind.config.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
    },
  },
};
