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
        'floatLine': 'float 6s ease-in-out infinite',
        'float1': 'float 10s ease-in-out infinite',
        'float2': 'float 12s ease-in-out infinite',
        'float3': 'float 14s ease-in-out infinite',
        'float4': 'float 16s ease-in-out infinite',
        'float-slow': 'floatSlow 15s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'drawMobileLine1': 'drawMobileLine 4s ease-out infinite',
        'drawMobileLine2': 'drawMobileLine 4s ease-out infinite 2s',
        'moveLeft': 'moveLeft 15s linear infinite',
        'moveRight': 'moveRight 15s linear infinite',
        'moveUp': 'moveUp 20s linear infinite',
        'moveDown': 'moveDown 20s linear infinite',
        'moveSlowly': 'moveSlowly 10s ease-in-out infinite',
        'shootingStarLeft': 'shootingStarLeft 3s linear infinite',
        'shootingStarRight': 'shootingStarRight 3s linear infinite',
        'shootingStarUp': 'shootingStarUp 3s linear infinite',
        'shootingStarDown': 'shootingStarDown 3s linear infinite',
        'shootingStarDiagonal': 'shootingStarDiagonal 3s linear infinite',
        'pulseGlow': 'pulseGlow 2s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
        'reverse-spin': 'reverse-spin 25s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delay-1': 'float 3s ease-in-out infinite 1s',
        'float-delay-2': 'float 3s ease-in-out infinite 2s',
        'float-delay-3': 'float 3s ease-in-out infinite 3s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        drawLine: {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '0' }
        },
        drawLineInfinite: {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '-1000' }
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
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        drawMobileLine: {
          '0%': { strokeDashoffset: '1000' },
          '40%': { strokeDashoffset: '0' },
          '60%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-1000' }
        },
        moveLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        moveRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        moveUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        moveDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        moveSlowly: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10%, 10%)' }
        },
        shootingStarLeft: {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' }
        },
        shootingStarRight: {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
            '100%': { transform: 'translateX(100%)', opacity: '0' }
        },
        shootingStarUp: {
            '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' }
        },
        shootingStarDown: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' }
        },
        shootingStarDiagonal: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' }
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.5)', opacity: '1' }
        },
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        },
        floatSlow: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(20px, -15px) rotate(5deg)' },
          '50%': { transform: 'translate(-10px, -25px) rotate(-5deg)' },
          '75%': { transform: 'translate(-25px, -10px) rotate(3deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' }
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
