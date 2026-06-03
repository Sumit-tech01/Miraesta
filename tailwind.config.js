/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#6e6e6e',
        border: '#e5e5e5',
        surface: '#f5f5f5',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', '14px'],
        'xs': ['12px', '16px'],
        'sm': ['13px', '18px'],
        'base': ['14px', '20px'],
        'lg': ['16px', '24px'],
        'xl': ['18px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '36px'],
        '4xl': ['36px', '44px'],
        '5xl': ['48px', '56px'],
        '6xl': ['60px', '68px'],
      },
      letterSpacing: {
        'tight': '0.02em',
        'normal': '0.04em',
        'wide': '0.08em',
        'wider': '0.12em',
        'widest': '0.2em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '100': '25rem',
        '120': '30rem',
      },
      maxWidth: {
        'site': '1440px',
      },
      height: {
        'hero': '85vh',
        'navbar': '70px',
        'topbar': '30px',
      },
      transitionDuration: {
        '250': '250ms',
      },
      aspectRatio: {
        'product': '3 / 4',
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
