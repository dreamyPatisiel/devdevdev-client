import { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { PretendardVariable } from '@/styles/fonts';

import Header from './header';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  if (pathname === '/loginloading') {
    return <>{children}</>;
  }

  return (
    <div
      className={`${PretendardVariable.className} w-full h-screen flex flex-col items-center text-white`}
    >
      <Header />
      <main className='w-full h-[100vh] overflow-y-scroll scrollbar-hide '>{children}</main>
      <footer className='flex justify-center items-center px-5 h-[5vh]'>devdevdev.co.kr</footer>
    </div>
  );
}
