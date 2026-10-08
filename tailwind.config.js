/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF7F0",
        sand: "#EFE6D6",
        clay: "#C56B3E",
        claydark: "#A8542E",
        sage: "#7C8B6F",
        sagedark: "#5E6C53",
        ink: "#2E2A26",
        muted: "#6B6358",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        serif: ['"Fraunces"', "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(46,42,38,0.04), 0 8px 24px -16px rgba(46,42,38,0.18)",
      },
    },
  },
  plugins: [],
};