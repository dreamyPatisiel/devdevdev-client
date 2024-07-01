import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { PretendardVariable } from '@/styles/fonts';

import GoToTopButton from './GoToTopButton';
import Toast from './Toast';
import DevGuriError from './error/DevGuriError';
import Footer from './footer/Footer';
import Header from './header';
import MobileHeader from './mobileHeader/mobileHeader';
import { AuthModal } from './modals/modal';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  const { loginStatus } = useLoginStatusStore();
  const { openModal } = useLoginModalStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (
      loginStatus === 'logout' &&
      (pathname.startsWith('/myinfo') || pathname === '/pickposting')
    ) {
      router.push('/');
      openModal();
    }
  }, [loginStatus, pathname]);

  if (pathname === '/loginloading') {
    return <>{children}</>;
  }

  return (
    <>
      {isMobile ? (
        <>
          <MobileHeader />
          <Toast />
          <DevGuriError type='mobile' pathname={pathname} />
        </>
      ) : (
        <div
          className={`${PretendardVariable.className} overflow-x-auto box-border grid grid-rows-[8.5rem,1fr,5vh] h-screen text-white`}
        >
          <Header />
          <AuthModal />
          <QueryErrorBoundary>
            <div className='flex justify-center w-full'>
              <main className='w-full min-w-[1440px] max-w-[1920px]'>
                <Toast />
                {children}
                {pathname !== '/' && <GoToTopButton />}
              </main>
            </div>
            <Footer />
          </QueryErrorBoundary>
        </div>
      )}
    </>
  );
}
