/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkgray: '#242424', // Add your custom color
      },
    },
  },
  plugins: [],
}

