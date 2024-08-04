/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar': '#181818',
        'navigation': '#181818',
      },
    
    },

  },
  plugins: [],
}