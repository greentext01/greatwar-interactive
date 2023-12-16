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
          300: "#233685",
          200: "#8f9dce"
        },
        'themered': {
          950: "#6e1d1c",
          900: "#721e1e",
          800: "#9a2625",
          700: "#9e1818",
          600: "#e52e2e",
          500: "#c83434",
          200: "#d98181",
          100: "#f4c6c6"
        }
      },
      boxShadow: {
        evenInset: 'inset 0 0 10px 5px rgba(255, 255, 255, 0.2)',
        faintInset: 'inset 0 0 10px 5px rgba(255, 255, 255, 0.15)',
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar")({nocompatible: true})
  ],
}

