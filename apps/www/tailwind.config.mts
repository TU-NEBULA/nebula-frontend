import type { Config } from "tailwindcss";

import baseConfig from "../../tailwind.config.mjs";

export default {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      ...baseConfig.theme?.extend,
    },
  },
} satisfies Config;
