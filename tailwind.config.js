/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#5464FF",
          2: "#7683FF",
          3: "#8793FF",
          4: "#BBC1FF",
          5: "#DDE0FF",
          6: "#EEF0FF",
        },
        dark: {
          1: "#30323D",
          2: "#595B64",
          3: "#6E7077",
          4: "#98999E",
          5: "#C1C2C5",
          6: "#e0e1e2",
        },
        success: "#5FD53B",
        alert: "#FFE048",
        error: {
          1: "#FF2E00",
          2: "#ffc0b3",
        },
        text: "#3D3D3D",
        lightgray: "#EFF3F7",
      },
      fontFamily: {
        dmsans: ['"DMSans", sans-serif'],
        sora: ['"Sora", sans-serif'],
      },
      fontSize: {
        "dm-title": "32px",
        "dm-title2": "24px",
        "dm-text": "16px",
        "sora-title": "32px",
        "sora-title2": "20px",
        "sora-text": "16px",
      },
    },
  },
  plugins: [],
};
