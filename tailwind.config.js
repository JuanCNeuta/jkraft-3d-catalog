/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0e27',
        secondary: '#1a1f3a',
        accent: '#00ff88',
        highlight: '#ff006e',
      },
      fontFamily: {
        display: ['Space Mono', 'monospace'],
        body: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
