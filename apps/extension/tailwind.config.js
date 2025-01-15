import baseConfig from "../../tailwind.config.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "../../packages/ui/**/*.tsx"],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
      hightlight: "#CC3300",
    },
  },
};
