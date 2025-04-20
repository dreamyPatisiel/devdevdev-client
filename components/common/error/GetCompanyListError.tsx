import React from 'react';

import router from 'next/router';

import RetryIcon from '@components/svgs/ReplayIcon';

import { DEVGURI_ERR_TEXT } from '@/constants/DevGuriErrorTxtConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { MainButtonV2 } from '../buttons/mainButtonsV2';

export default function GetCompanyListError({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  const { isMobile } = useMediaQueryContext();

  const handleRetryClick = () => {
    resetErrorBoundary();
    router.reload();
  };

  return (
    <section
      className={`grid ${isMobile ? 'gap-[2.4rem]' : 'grid-flow-col justify-between items-center'} bg-gray800 p-[2.4rem] rounded-Radius16`}
    >
      <div>
        <p className='st2 mb-[1rem]'>잠시 후 다시 시도해주세요</p>
        <p className='p2 text-gray200'>기업 목록을 불러오는데 문제가 발생했어요!</p>
      </div>
      <MainButtonV2
        className=''
        color='primary'
        line={false}
        radius='square'
        size='small'
        text={DEVGURI_ERR_TEXT.NETWORK_ERR.BUTTON_TEXT}
        iconPosition='left'
        icon={<RetryIcon />}
        onClick={handleRetryClick}
      />
    </section>
  );
}
