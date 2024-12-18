/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1600px',
      },
    },
  },
  safelist: [
    {
      pattern: /./, // This ensures all Tailwind classes are included
    },
  ],
}
