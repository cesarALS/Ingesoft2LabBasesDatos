/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Scan files in the 'pages' directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan files in the 'components' directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
