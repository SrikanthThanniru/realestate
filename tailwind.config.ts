import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0e13',
        night: '#111820',
        ivory: '#f4efe6',
        paper: '#faf7f1',
        brass: '#d4a259',
        brassdeep: '#9a6f2e',
        stone: '#7d786b',
        line: '#ddd5c4',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: { smooth: 'cubic-bezier(.16,1,.3,1)' },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        pulseRing: {
          '0%': { transform: 'scale(.6)', opacity: '.9' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        floatY: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        floatY: 'floatY 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
