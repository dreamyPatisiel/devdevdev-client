import { PretendardVariable } from '@/styles/fonts';
import { ReactNode } from 'react';
import Header from './header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={PretendardVariable.className}>
      <Header />
      <main className='w-full h-[100vh]'>{children}</main>
      <footer className='text-white fixed bottom-0 w-full text-center px-5'>devdevdev.co.kr</footer>
    </div>
  );
}
