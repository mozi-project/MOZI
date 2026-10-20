/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: '#034a78',
          mid: '#0e7490',
          aqua: '#06b6d4',
          light: '#38bdf8',
          foam: '#bae6fd',
          surface: '#e0f2fe',
        },
        bubble: {
          pink: '#f472b6',
          coral: '#fb7185',
          softpink: '#fbcfe8',
          purple: '#c084fc',
          lavender: '#e9d5ff',
          mint: '#2dd4bf',
          gold: '#facc15',
          pearl: '#f8fafc',
        }
      },
      fontFamily: {
        bubble: ['Fredoka', 'Quicksand', 'Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'swim-left': 'swimLeft 18s linear infinite',
        'swim-right': 'swimRight 14s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bubble-wobble': 'bubbleWobble 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pop': 'pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        swimLeft: {
          '0%': { transform: 'translateX(110vw) scaleX(1)' },
          '100%': { transform: 'translateX(-20vw) scaleX(1)' },
        },
        swimRight: {
          '0%': { transform: 'translateX(-20vw) scaleX(-1)' },
          '100%': { transform: 'translateX(110vw) scaleX(-1)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.6))' },
          '50%': { transform: 'scale(1.04)', filter: 'drop-shadow(0 0 24px rgba(244, 114, 182, 0.8))' },
        },
        bubbleWobble: {
          '0%, 100%': { transform: 'scale(1) translateY(0px)' },
          '33%': { transform: 'scale(1.03, 0.97) translateY(-6px)' },
          '66%': { transform: 'scale(0.97, 1.03) translateY(3px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.8' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
