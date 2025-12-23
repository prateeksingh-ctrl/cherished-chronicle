import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        // "Instrument Serif" is the new high-end editorial font
        serif: ['"Instrument Serif"', 'serif'],
        // "Geist" or "Inter" for clean readability
        sans: ['"Inter"', 'sans-serif'],
        hand: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        magazine: {
          paper: '#FDFBF7', // A warm, expensive paper feel (not harsh white)
          ink: '#1A1A1A',   // Soft charcoal (easier on eyes than black)
          gold: '#C6A87C',  // Muted, antique gold (not yellow)
          rose: '#E5D4D0',  // Very subtle blush for backgrounds
          accent: '#D94838', // International Red (for small "Love" details)
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;