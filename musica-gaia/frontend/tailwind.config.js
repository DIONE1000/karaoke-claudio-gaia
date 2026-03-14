/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gaia-red": "#4c0519",
        "gaia-purple": "#1e1b4b",
      },
    },
  },
  plugins: [],
};
