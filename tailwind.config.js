const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      serif: ['Philosopher', 'Helvetica', 'sans-serif'],
    },
    colors: {
      black: colors.black,
      white: colors.white,
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      'button-ui': 'var(--button-ui)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
