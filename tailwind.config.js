/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // 1. Point Tailwind to your files so it can generate styles
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. Connect the font variable from layout.tsx
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      // 3. Define your custom brand colors
      colors: {
        brand: {
          lime: "#D2F34C", // Your main accent color
          hover: "#bce038", // The darker hover shade
        },
      },
    },
  },
  plugins: [],
}