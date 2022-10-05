/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              light: '#74b2f1',
              primary: '#227093'
          }
      },
  },
  corePlugins: {
      preflight: false,
  },
  plugins: [],
}

