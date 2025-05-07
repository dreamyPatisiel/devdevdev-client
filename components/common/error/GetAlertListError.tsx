import router from 'next/router';

import RetryIcon from '@components/svgs/ReplayIcon';

import { DEVGURI_ERR_TEXT } from '@/constants/DevGuriErrorTxtConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { MainButtonV2 } from '../buttons/mainButtonsV2';

export default function GetAlertListError({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  const { isMobile } = useMediaQueryContext();

  const handleRetryClick = () => {
    resetErrorBoundary();
    router.reload();
  };

  const desktopClass = 'p2 py-[2.4rem] bg-gray800';
  const mobileClass = 'relative top-1/3 st2 pb-[2.4rem] h-full';

  return (
    <section className={`text-gray300 text-center ${isMobile ? mobileClass : desktopClass}`}>
      <p className={`font-medium ${isMobile ? 'mb-[2.4rem]' : 'mb-[1rem]'}`}>
        {DEVGURI_ERR_TEXT.NETWORK_ERR.MAIN_TITLE}
      </p>
      {/* TODO: 추후 버튼 텍스트 크기 조정 필요 */}
      <MainButtonV2
        className='mx-auto'
        color='primary'
        line={false}
        radius='square'
        size='xSmall'
        text={DEVGURI_ERR_TEXT.NETWORK_ERR.BUTTON_TEXT}
        iconPosition='left'
        icon={<RetryIcon />}
        onClick={handleRetryClick}
      />
    </section>
  );
}
