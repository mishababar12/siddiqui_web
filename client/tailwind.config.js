/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#C8A35F', light: '#D4B878', dark: '#A88A42' },
        dark: { DEFAULT: '#0A0A0A', light: '#1A1A2E', card: '#111111', border: '#2A2A2A' },
        accent: { DEFAULT: '#E53E3E', light: '#FC5C5C' },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
