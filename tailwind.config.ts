import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
        center: true,
        padding: '2rem',
        screens: {
            '2xl': '1400px'
        }
    },
    extend: {
        fontFamily: {
            // "The Cover Font" - Massive, high contrast
            display: ['Playfair Display', 'serif'], 
            // " The Article Font" - Easy to read but elegant
            editorial: ['Libre Baskerville', 'serif'],
            // "The Caption Font" - Clean, modern, Swiss-style
            sans: ['DM Sans', 'sans-serif'],
            handwritten: ['Caveat', 'cursive'],
        },
        letterSpacing: {
            'widest-xl': '0.25em', // For "DECEMBER ISSUE" text
        },
        colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
                DEFAULT: 'hsl(var(--primary))',
                foreground: 'hsl(var(--primary-foreground))'
            },
            magazine: {
                // Refined Gold Palette (More metallic, less yellow)
                gold: '#D4AF37', 
                'gold-dim': '#C5A028',
                'gold-light': '#F1E5AC',
                'paper': '#F9F7F1', // Warm off-white for text blocks
                'black': '#0a0a0a', // Rich black, not #000
                'charcoal': '#1c1c1c',
            }
        },
        backgroundImage: {
            // A subtle noise texture for that "printed paper" feel
            'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
            'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)', // True Metallic
            'night-gradient': 'linear-gradient(to bottom, #050505, #111111)',
        },
        keyframes: {
            'fade-in': {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' }
            },
            'slide-up': {
                '0%': { transform: 'translateY(20px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' }
            }
        },
        animation: {
            'fade-in': 'fade-in 1s ease-out forwards',
            'slide-up': 'slide-up 1s ease-out forwards',
        }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;