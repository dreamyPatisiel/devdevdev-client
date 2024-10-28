import { MouseEvent, ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { usePostQaToSlack } from '@/api/usePostQaToSlack';
import { ROUTES } from '@/constants/routes';
import { PretendardVariable } from '@/styles/fonts';

import GoToTopButton from './GoToTopButton';
import Toast from './Toast';
import Footer from './footer/Footer';
import Header from './header/header';
import MobileHeader from './header/mobileHeader';
import MobileTopBottomButton from './mobile/mobileTopBottomButton';
import { AuthModal } from './modals/modal';

export default function Layout({ children }: { children: ReactNode }) {
  const [showQaForm, setShowQaForm] = useState(false);
  const [lastTime, setLastTime] = useState(0);
  const [qaFormPosition, setQaFormPosition] = useState({ x: 0, y: 0 });
  const [qaText, setQaText] = useState('');
  const [elementInfo, setElementInfo] = useState({
    pathName: '',
    tagName: '',
    className: '',
    id: '',
    textContent: '',
  });

  const { mutate: qaToslackMutate } = usePostQaToSlack();

  const router = useRouter();
  const { pathname } = router;
  const { loginStatus } = useLoginStatusStore();
  const { openModal } = useLoginModalStore();

  const { MAIN, PICKPICKPICK } = ROUTES;
  const isMobile = useIsMobile();
  const isShowMobile = isMobile && pathname === MAIN;

  useEffect(() => {
    if (
      loginStatus === 'logout' &&
      (pathname.startsWith('/myinfo') || pathname === PICKPICKPICK.POSTING)
    ) {
      router.push(MAIN);
      openModal();
    }
  }, [loginStatus, pathname]);

  const handledbContextMenu = (e: MouseEvent<HTMLElement>) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastTime;

    if (timeDiff < 900) {
      const targetElement = e.target as HTMLElement;
      setShowQaForm(true);
      setQaFormPosition({ x: e.pageX, y: e.pageY });

      setElementInfo({
        pathName: targetElement.baseURI,
        tagName: targetElement.tagName, // 태그 이름
        className: targetElement.className, // 클래스 이름
        id: targetElement.id, // ID
        textContent: targetElement.textContent ?? '', // 텍스트 내용
      });
    }

    setLastTime(currentTime);
  };

  if (pathname === '/loginloading') {
    return <>{children}</>;
  }

  return (
    <div className={`${PretendardVariable.className} text-white min-w-[34rem] w-full min-h-screen`}>
      {isMobile ? <MobileHeader /> : <Header />}
      <AuthModal />
      <QueryErrorBoundary>
        <main
          className='w-full mt-[4rem] mb-[8rem] max-w-[192rem] mx-auto'
          onContextMenu={handledbContextMenu}
          // onKeyDown={handledbContextMenu}
          // 단축키로 만들기 [QA]
          onClick={() => {
            setShowQaForm(false);
            setQaFormPosition({ x: 0, y: 0 });
          }}
        >
          <Toast />
          {isMobile ? <MobileTopBottomButton /> : <></>}
          {children}
          {pathname !== MAIN && !isMobile && <GoToTopButton />}
        </main>
        {(isShowMobile || !isMobile) && <Footer />}
      </QueryErrorBoundary>

      {showQaForm && (
        <div
          className='absolute bg-white z-50 text-black'
          style={{
            left: `${qaFormPosition.x}px`,
            top: `${qaFormPosition.y}px`,
          }}
        >
          <textarea
            name=''
            id=''
            placeholder='내용을 입력하세요'
            onChange={(e) => setQaText(e.target.value)}
          ></textarea>
          <button
            onClick={() => {
              qaToslackMutate(
                {
                  qaText,
                  elementInfo,
                },
                {
                  onSuccess: () => {
                    setShowQaForm(false);
                  },
                },
              );
            }}
          >
            submit
          </button>
        </div>
      )}
    </div>
  );
}
