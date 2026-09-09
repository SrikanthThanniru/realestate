import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f6f2e8',
        ink: '#161310',
        muted: '#726a5c',
        line: '#ded4bf',
        accent: '#2a1e12',
        sky: '#ede4cf',
        bloom: '#8a3b2e',
        gold: '#c19a4b',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
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
