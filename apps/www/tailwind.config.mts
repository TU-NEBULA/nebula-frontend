import type { Config } from "tailwindcss";

import baseConfig from "../../tailwind.config.mjs";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.tsx",
  ],
  theme: {
    extend: {
      ...baseConfig.theme?.extend,
      colors: {
        ...baseConfig.theme?.extend?.colors,
        blue1: "#336cec",
        blue2: "#2C66E7",
        blue3: "#1E59DC",
      },
      height: {
        graph: "442px",
      },
      fontSize: {
        ...baseConfig.theme?.extend?.fontSize,
        "landing-title": ["10rem", { fontWeight: "bold" }],
        "landing-sub-title": ["5rem", { fontWeight: "bold" }],
      },
      minWidth: {
        login: "21.5rem",
      },
      maxWidth: {
        ...baseConfig.theme?.extend?.maxWidth,
        "with-header": "90rem",
      },
    },
  },
} satisfies Config;
