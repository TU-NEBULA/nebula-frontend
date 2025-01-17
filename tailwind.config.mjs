/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        black: "#111111",
        grey1: "#E9E9E9",
        grey2: "#C9C9C9",
        grey3: "#A9A9A9",
        grey4: "#898989",
        grey5: "#696969",
        white: "#FFFFFF",
        kakao: "#FEE500",
        hightlight: "#CC3300",
      },
      fontSize: {
        title: ["1.5rem", { fontWeight: "700" }],
        subtitle: ["1.25rem", { fontWeight: "600" }],
        label: ["1rem", { fontWeight: "500" }],
        body: ["0.875rem", { fontWeight: "400" }],
        description: ["0.75rem", { fontWeight: "400" }],
      },
      screens: {
        sm: "380px",
      },
      minWidth: {
        sidebar: "360px",
      },
      maxWidth: {
        sidebar: "500px",
      },
      minHeight: {
        keyword: "46px",
      },
      maxHeight: {
        dropdown: "133px",
      },
    },
  },
};
