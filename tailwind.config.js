/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        georama: ['Georama', 'sans-serif'],
        roboto: ['Roboto Mono', 'monospace'],
      },
      screens: {
        '3xl': '1920px',
      },
      width: {
        'xl': '36rem',      // 576px
        '2xl': '42rem',     // 672px
        '3xl': '48rem',     // 768px
        '4xl': '56rem',     // 896px
        'md': '28rem',      // 448px
      },
      inset: {
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '5/12': '41.666667%',
        '7/12': '58.333333%',
      },
    },
  },
  plugins: [],
}

