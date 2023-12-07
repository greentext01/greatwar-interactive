/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'themeblue': {
          900: "#060c29",
          500: "#182555",
          200: "#8f9dce"
        },
        'themered': {
          900: "#721e1e",
          800: "#9a2625",
          600: "#e52e2e",
          500: "#c83434",
          200: "#d98181",
          100: "#f4c6c6"
        }
      }
    },
  },
  plugins: [],
}

