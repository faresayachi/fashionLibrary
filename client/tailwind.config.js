/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: { DEFAULT: '#C9A96E', light: '#E8D5B0', dark: '#A07840' },
        charcoal: { DEFAULT: '#1C1917', soft: '#2C2825' },
        cream: { DEFAULT: '#F5EFE6', warm: '#FAF7F2' },
        clay: { DEFAULT: '#B07D6B' },
        taupe: { DEFAULT: '#8C7B6E' },
        gold: { DEFAULT: '#D4A853' }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
