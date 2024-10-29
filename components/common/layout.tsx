import { MouseEvent, ReactNode, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import sendIcon from '@public/image/sendIcon.png';

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

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQaForm(false);
      }
    };

    window.addEventListener('keydown', handleEscKeydown);
    return () => window.removeEventListener('keydown', handleEscKeydown);
  }, []);

  const handledbContextMenu = (e: MouseEvent<HTMLElement>) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastTime;

    if (timeDiff < 900) {
      const targetElement = e.target as HTMLElement;
      setShowQaForm(true);
      setQaFormPosition({ x: e.pageX, y: e.pageY });

      setElementInfo({
        pathName: targetElement.baseURI,
        tagName: targetElement.tagName,
        className: targetElement.className,
        id: targetElement.id,
        textContent: targetElement.textContent ?? '',
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
          onClick={() => {
            setShowQaForm(false);
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
          className='absolute bg-white z-50 text-black rounded-[10px] text-[14px] p-[10px] flex flex-col'
          style={{
            left: `${qaFormPosition.x}px`,
            top: `${qaFormPosition.y}px`,
          }}
        >
          <textarea
            name='QaTextArea'
            id='QaTextArea'
            placeholder='QA 내용을 입력해주세요'
            onChange={(e) => setQaText(e.target.value)}
            className='w-[20rem] h-[10rem] rounded-[10px] outline-none resize-none p-[10px]'
          />
          <button
            className='ml-auto'
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
              setShowQaForm(false);
            }}
          >
            <Image src={sendIcon} alt='슬랙으로 QA 전송 아이콘' width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  );
}
