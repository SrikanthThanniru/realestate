import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        ink: '#071c1f',
        muted: '#5c727d',
        line: '#e5e5e6',
        accent: '#133236',
        sky: '#f2f6f7',
        bloom: '#e31e24',
        gold: '#cb3421',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.16,1,.3,1)',
      },
      keyframes: {
        drift: {
          from: { transform: 'translateX(-20vw)' },
          to: { transform: 'translateX(120vw)' },
        },
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '40%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        ping2: {
          '0%': { transform: 'scale(.6)', opacity: '.8' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'drift-slow': 'drift 26s linear infinite',
        'drift-slower': 'drift 40s linear infinite',
        marquee: 'marquee 28s linear infinite',
        scrollLine: 'scrollLine 2s cubic-bezier(.16,1,.3,1) infinite',
        ping2: 'ping2 2.4s ease-out infinite',
        'spin-slow': 'spinSlow 22s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
