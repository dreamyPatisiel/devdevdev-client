import React from 'react';

import Image from 'next/image';
import router from 'next/router';

import RetryIcon from '@components/svgs/ReplayIcon';

import 뎁구리_에러사진 from '@public/image/뎁구리/뎁구리_Error.svg';

import { DEVGURI_ERR_TEXT } from '@/constants/DevGuriErrorTxtConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { MainButtonV2 } from '../buttons/mainButtonsV2';

export default function DevGuriHorizontalError({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  const { isMobile } = useMediaQueryContext();

  const IMAGE_MOBILE_WIDTH = 105;
  const IMAGE_DESKTOP_WIDTH = 113;

  const MOBILE_STYLES = 'flex-col gap-[2.4rem] p-[1.6rem]';
  const DESKTOP_STYLES = 'flex-row items-start justify-between p-[3.2rem]';

  const handleRetryClick = () => {
    resetErrorBoundary();
    router.reload();
  };

  return (
    <section
      className={`flex ${isMobile ? MOBILE_STYLES : DESKTOP_STYLES} border border-gray400 rounded-Radius16 mt-[2.4rem]`}
    >
      <div className={`flex ${isMobile ? 'flex-col gap-[2.4rem]' : 'flex-row gap-[4rem]'}`}>
        <div className='bg-gray700 rounded-Radius16 px-[2.3rem]'>
          <Image
            className='mx-auto'
            src={뎁구리_에러사진}
            alt='뎁구리 에러 사진'
            width={isMobile ? IMAGE_MOBILE_WIDTH : IMAGE_DESKTOP_WIDTH}
          />
        </div>
        <div className='mt-[0.5rem]'>
          <p className='st2 font-bold'>{DEVGURI_ERR_TEXT.NETWORK_ERR.MAIN_TITLE}</p>
          <div className='p2 text-gray200 font-medium mt-[2.1rem]'>
            <p>{DEVGURI_ERR_TEXT.NETWORK_ERR.SUB_TITLE2}</p>
            <p>{DEVGURI_ERR_TEXT.NETWORK_ERR.MAIN_TITLE}</p>
          </div>
        </div>
      </div>

      <MainButtonV2
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
