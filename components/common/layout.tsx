import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import { useAlertSSE } from '@hooks/useAlertSSE';
import useBodyScrollLock from '@hooks/useBodyScrollLock';
import { useQaForm } from '@hooks/useQaForm';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { PretendardVariable } from '@/styles/fonts';

import GoToTopButton from './GoToTopButton';
import QaForm from './QaForm';
import Toast from './Toast';
import Footer from './footer/Footer';
import FullPopup from './fullPopup/fullPopup';
import Header from './header/header';
import MobileHeader from './header/mobileHeader';
import MobileTopBottomButton from './mobile/mobileTopBottomButton';
import { AuthModal } from './modals/modal';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  const { isMobile } = useMediaQueryContext();

  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal } = useLoginModalStore();

  const { MAIN, PICKPICKPICK } = ROUTES;
  const isShowMobile = isMobile && pathname === MAIN;

  const {
    showQaForm,
    qaFormPosition,
    setQaText,
    setShowQaForm,
    handledbContextMenu,
    sendQaToSlack,
  } = useQaForm();

  useAlertSSE();

  useEffect(() => {
    if (
      loginStatus === 'logout' &&
      (pathname.startsWith('/myinfo') || pathname === PICKPICKPICK.POSTING)
    ) {
      router.push(MAIN);
      openLoginModal();
    }
  }, [loginStatus, pathname]);

  useBodyScrollLock();

  if (pathname === '/loginloading') {
    return <>{children}</>;
  }

  return (
    <div className={`${PretendardVariable.className} text-white min-w-[34rem] w-full min-h-screen`}>
      {isMobile ? <MobileHeader /> : <Header />}
      <AuthModal />
      <QueryErrorBoundary>
        {isMobile && <FullPopup />}
        <main
          className='w-full mt-[4rem] mb-[8rem] max-w-[192rem] mx-auto'
          onContextMenu={handledbContextMenu}
          onClick={() => setShowQaForm(false)}
        >
          <Toast />
          {isMobile ? <MobileTopBottomButton /> : <></>}
          {children}
          {pathname !== MAIN && !isMobile && <GoToTopButton />}
        </main>
        {(isShowMobile || !isMobile) && <Footer />}
      </QueryErrorBoundary>

      {showQaForm && (
        <QaForm
          qaFormPosition={qaFormPosition}
          setQaText={setQaText}
          sendQaToSlack={sendQaToSlack}
        />
      )}
    </div>
  );
}
