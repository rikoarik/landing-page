import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F3EE',
          light: '#FAF8F5',
          warm: '#F0ECE4',
        },
        ink: {
          DEFAULT: '#202B2A',
          muted: '#4A5755',
          faint: '#7A8886',
        },
        forest: {
          DEFAULT: '#286457',
          hover: '#1F4F45',
          soft: '#EAF1EF',
        },
        dusty: {
          DEFAULT: '#7795A0',
          light: '#E2E9EC',
          dark: '#58747E',
        },
        stone: {
          DEFAULT: '#E7E4DC',
          light: '#EFECE5',
          dark: '#D5D1C6',
        },
        burnt: {
          DEFAULT: '#C76E4D',
          hover: '#B05E3F',
          soft: '#FBF0EB',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      lineHeight: {
        tightest: '1.05',
        tighter: '1.15',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};

export default config;
