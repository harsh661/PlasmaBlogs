/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#000",
        "darker": "#111",
        "dark-text": "#abafb2",
        "light": "#161c23",
        "light-mode": "#e9ebee",
        "light-mode-text": "#65676B",
        "card": "#161c23",
        "hover": "#101b2f",
        "accent": "#328af1",
        "accent-light": "#29bff7",
        "border": "#333",
        "border-light": "#e5e5e5",
      },
      minHeight: {
        'body': 'calc(100vh - 60px)',
      },
      keyframes: {
        slideup: {
          '0%': {transform: 'translateY(500px)'},
          '100%': {transform: 'translateY(0px)'},
        },
        slidein: {
          '0%': {transform: 'translateX(-200px)', opacity: '0'},
          '100%': {transform: 'translateY(0px)', opacity: '1'},
        },
        slideinSmall: {
          '0%': {transform: 'translateX(200px)', opacity: '0'},
          '100%': {transform: 'translateY(0px)', opacity: '1'},
        }
      },
      animation: {
        'slideUp': 'slideup 300ms',
        'slidein': 'slidein 300ms',
        'slideinSmall': 'slideinSmall 300ms'
      }
    },
  },
  plugins: [],
}
