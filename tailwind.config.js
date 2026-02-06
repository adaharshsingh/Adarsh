/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  safelist: [
    { pattern: /^delay-\d+/ },
    { pattern: /^w-\[/ },
    { pattern: /^h-\[/ },
    { pattern: /^blur-\[/ },
    { pattern: /^-top-/ },
    { pattern: /^-left-/ },
  ],
  plugins: [],
}

