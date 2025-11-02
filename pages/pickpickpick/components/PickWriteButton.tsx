import Link from 'next/link';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';
import MobileMainButton from '@components/common/buttons/mobileMainButton';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

// 픽픽픽 작성하기 버튼 컴포넌트 모바일,웹

export const MobileWriteButton = () => {
  const { isMobile } = useMediaQueryContext();
  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal, setDescription } = useLoginModalStore();
  const { POSTING } = ROUTES.PICKPICKPICK;

  const handleWriteClick = () => {
    openLoginModal();
    setDescription('댑댑이가 되면 픽픽픽을 작성할 수 있어요 🥳');
  };

  if (!isMobile) return null;

  return (
    <>
      {loginStatus === 'login' ? (
        <Link href={POSTING}>
          <MobileMainButton text='작성하기' />
        </Link>
      ) : (
        <MobileMainButton text='작성하기' onClick={handleWriteClick} />
      )}
    </>
  );
};

export const WebWriteButton = () => {
  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal, setDescription } = useLoginModalStore();
  const { POSTING } = ROUTES.PICKPICKPICK;
  const { isMobile } = useMediaQueryContext();

  const handleWriteClick = () => {
    openLoginModal();
    setDescription('댑댑이가 되면 픽픽픽을 작성할 수 있어요 🥳');
  };

  return (
    <>
      {!isMobile && (
        <div className='flex items-baseline gap-[2rem]'>
          {loginStatus === 'login' ? (
            <Link href={POSTING}>
              <MainButtonV2
                text='작성하기'
                color='primary'
                line={false}
                size='medium'
                radius='square'
                status='on'
              />
            </Link>
          ) : (
            <MainButtonV2
              text='작성하기'
              color='primary'
              line={false}
              size='medium'
              radius='square'
              status='on'
              onClick={handleWriteClick}
            />
          )}
        </div>
      )}
    </>
  );
};
