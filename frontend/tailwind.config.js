/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0065e1',
          600: '#004db0',
          700: '#003a85',
          800: '#00285a',
          900: '#00142d',
        },
        secondary: {
          50: '#eaecf2',
          100: '#d5dae6',
          200: '#acb4cd',
          300: '#828fb3',
          400: '#59699a',
          500: '#3c4b76',
          600: '#223a66',
          700: '#1a2c4e',
          800: '#111d33',
          900: '#080e19',
        },
        accent: {
          50: '#fbe9ed',
          100: '#f8d4db',
          200: '#f1a9b8',
          300: '#ea7e94',
          400: '#e35371',
          500: '#e12454',
          600: '#c61e4a',
          700: '#95173a',
          800: '#641029',
          900: '#320815',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Inter var', 'sans-serif'],
        display: ['Exo', 'Lexend', 'sans-serif'],
      },
      boxShadow: {
        'neumorphic-inset': 'inset -5px -5px 10px #ffffff, inset 5px 5px 10px rgba(0, 0, 0, 0.1)',
        'neumorphic': '-5px -5px 10px #ffffff, 5px 5px 10px rgba(0, 0, 0, 0.1)',
        'medical': '0 4px 10px rgba(0, 0, 0, 0.1)',
        'medical-hover': '0 10px 20px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
} 