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
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
