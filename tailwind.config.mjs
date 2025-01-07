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
      },
      fontSize: {
        title: ["1.5rem", { fontWeight: "700" }],
        subtitle: ["1.25rem", { fontWeight: "600" }],
        body: ["1rem", { fontWeight: "500" }],
        label: ["0.875rem", { fontWeight: "500" }],
        description: ["0.75rem", { fontWeight: "400" }],
      },
    },
  },
};
