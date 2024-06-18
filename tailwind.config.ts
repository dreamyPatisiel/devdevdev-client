import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        h1: '3.2rem',
        h2: '2.8rem',
        h3: '2.4rem',
        st1: '2rem',
        st2: '1.8rem',
        p1: '1.6rem',
        p2: '1.4rem',
        c1: '1.2rem',
        c2: '1rem',
      },
      fontWeight: {
        bold: '600',
        medium: '300',
        light: '100',
      },
      lineHeight: {
        h1: '4.8rem',
        h2: '4.2rem',
        h3: '3.6rem',
        st: '2.6rem',
        p1: '2.6rem',
        p2: '2.4rem',
        c1: '1.8rem',
        c2: '1.4rem',
      },
    },
    colors: {
      primary1: 'var(--primary-1)',
      primary2: 'var(--primary-2)',
      primary3: 'var(--primary-3)',
      primary4: 'var(--primary-4)',
      primary5: 'var(--primary-5)',
      point1: 'var(--point-1)',
      point2: 'var(--point-2)',
      point3: 'var(--point-3)',
      gray1: 'var(--gray-1)',
      gray2: 'var(--gray-2)',
      gray3: 'var(--gray-3)',
      gray4: 'var(--gray-4)',
      gray5: 'var(--gray-5)',
      kakaoYellow: '#FEE500',
      black: '#000000',
      white: '#FFFFFF',
      red: '#FF9999',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  darkMode: 'class',
};
export default config;
