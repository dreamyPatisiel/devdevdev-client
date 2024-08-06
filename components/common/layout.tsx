import { ReactNode, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { PretendardVariable } from '@/styles/fonts';

import GoToTopButton from './GoToTopButton';
import Toast from './Toast';
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

  const scrollContainerRef = useRef(null);

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
      <div
        ref={scrollContainerRef}
        className={`${PretendardVariable.className} w-screen h-screen text-white`}
      >
        {isMobile ? <MobileHeader /> : <Header />}
        <AuthModal />
        <QueryErrorBoundary>
          <main className='flex w-full'>
            {/* <main className='w-full'> */}
            <Toast />
            {children}
            {pathname !== '/' && <GoToTopButton scrollContainerRef={scrollContainerRef} />}
            {/* </main> */}
          </main>
          <Footer />
        </QueryErrorBoundary>
      </div>
    </>
  );
}
