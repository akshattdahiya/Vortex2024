/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/*.html",
    "./docs/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat : ['Montserrat'],
        opensans : ['Open Sans'],
        helvetica : ['Helvetica'],
        integral : ['Integral'],
        },

      overscrollBehavior: ['responsive']
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

