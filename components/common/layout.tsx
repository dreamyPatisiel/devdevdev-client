import { ReactNode } from 'react';

import { useRouter } from 'next/router';

import useIsMobile from '@hooks/useIsMobile';

import { PretendardVariable } from '@/styles/fonts';

import GoToTopButton from './GoToTopButton';
import Toast from './Toast';
import Header from './header';
import { AuthModal } from './modals/modal';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  const isMobile = useIsMobile();

  if (pathname === '/loginloading') {
    return <>{children}</>;
  }

  return (
    <>
      {isMobile ? (
        <div>모바일이다</div>
      ) : (
        <div
          className={`${PretendardVariable.className}  grid grid-rows-[8.5rem,1fr,5vh] h-screen text-white`}
        >
          <Header />
          <main className='w-full'>
            <Toast />
            <AuthModal />
            {children}
            <GoToTopButton />
          </main>
          <footer className='flex justify-center items-center px-5'>devdevdev.co.kr</footer>
        </div>
      )}
    </>
  );
}
