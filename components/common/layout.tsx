import { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { PretendardVariable } from '@/styles/fonts';

import Header from './header';
import { AuthModal } from './modals/modal';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  if (pathname === '/loginloading') {
    return <>{children}</>;
  }

  return (
    <div
      className={`${PretendardVariable.className}  grid grid-rows-[8.5rem,1fr,5vh] h-screen text-white`}
    >
      <Header />
      <main className='w-full'>
        <AuthModal />
        {children}
      </main>
      <footer className='flex justify-center items-center px-5'>devdevdev.co.kr</footer>
    </div>
  );
}
