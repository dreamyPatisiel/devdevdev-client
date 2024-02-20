import { ReactNode } from 'react';

import { PretendardVariable } from '@/styles/fonts';

import Header from './header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${PretendardVariable.className} w-full h-screen flex flex-col items-center text-white`}
    >
      <Header />
      <main className='w-[1440px] h-[100vh] scrollbar-hide '>{children}</main>
      <footer className='flex justify-center items-center px-5 h-[5vh]'>devdevdev.co.kr</footer>
    </div>
  );
}
