import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        drawLine: 'drawLine 3s ease forwards',
        drawLineInfinite: 'drawLineInfinite 8s linear infinite',
        pulseConstant: 'pulseConstant 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        'floatLine': 'floatLine 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' }
        },
        drawLineInfinite: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '-1000' }
        },
        pulseConstant: {
          '0%': { r: '3', opacity: '0.6' },
          '50%': { r: '5', opacity: '1' },
          '100%': { r: '3', opacity: '0.6' }
        },
        floatLine: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '50%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
