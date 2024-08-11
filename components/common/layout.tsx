import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { ROUTES } from '@/constants/routes';
import { PretendardVariable } from '@/styles/fonts';

import GoToTopButton from './GoToTopButton';
import Toast from './Toast';
import Footer from './footer/Footer';
import Header from './header/header';
import MobileHeader from './header/mobileHeader';
import { AuthModal } from './modals/modal';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  const { loginStatus } = useLoginStatusStore();
  const { openModal } = useLoginModalStore();

  const isMobile = useIsMobile();
  const isShowMobile = isMobile && pathname === ROUTES.MAIN;

  useEffect(() => {
    if (
      loginStatus === 'logout' &&
      (pathname.startsWith('/myinfo') || pathname === '/pickposting')
    ) {
      router.push(ROUTES.MAIN);
      openModal();
    }
  }, [loginStatus, pathname]);

  if (pathname === '/loginloading') {
    return <>{children}</>;
  }

  return (
    <div className={`${PretendardVariable.className} text-white w-full min-h-screen relative`}>
      {isMobile ? <MobileHeader /> : <Header />}
      <AuthModal />
      <QueryErrorBoundary>
        <main className='w-full'>
          <Toast />
          {children}
          {pathname !== ROUTES.MAIN && <GoToTopButton />}
        </main>
        {(isShowMobile || !isMobile) && <Footer />}
      </QueryErrorBoundary>
    </div>
  );
}
