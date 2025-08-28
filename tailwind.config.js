/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': 'var(--color-neon-cyan)',
        'neon-pink': 'var(--color-neon-pink)',
        'neon-purple': 'var(--color-neon-purple)',
      }
    },
  },
  plugins: [],
}
