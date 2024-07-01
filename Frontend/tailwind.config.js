/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkest: '#253237',
        darker: '#5C6B73',
        lite: '#9DB4C0',
        liter: '#C2DFE3',
        litest: '#E0FBFC',
      }
    },
  },
  plugins: [],
}