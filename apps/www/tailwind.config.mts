import type { Config } from "tailwindcss";

import baseConfig from "../../tailwind.config.mjs";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.tsx",
  ],
  theme: {
    extend: {
      ...baseConfig.theme?.extend,
      fontSize: {
        ...baseConfig.theme?.extend.fontSize,
        "landing-title": ["10rem", { fontWeight: "bold" }],
        "landing-sub-title": ["5rem", { fontWeight: "bold" }],
      },
      minWidth: {
        login: "21.5rem",
      },
    },
  },
} satisfies Config;
