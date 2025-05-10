/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        black1: "#18181B",
        black2: "#121313",
        black3: "#111111",
        gray1: "#F8F9FA",
        gray2: "#F9FAFB",
        gray3: "#F1F1F1",
        gray4: "#F2F2F2",
        gray5: "#D6D6D6",
        gray6: "#C2C5CA",
        gray7: "#AFB4BA",
        gray8: "#454746",
        white: "#FFFFFF",
        kakao: "#FEE500",
        highlight: "#CC3300",
      },
      fontSize: {
        notification: ["1.5rem", { fontWeight: "600" }],
        description: ["1rem", { fontWeight: "500" }],
        title: ["0.75rem", { fontWeight: "600" }],
        text: ["0.625rem", { fontWeight: "400" }],
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
        keyword: "44px",
        body: "calc(100dvh - 14.5625rem)",
      },
      maxHeight: {
        dropdown: "133px",
      },
    },
  },
};
