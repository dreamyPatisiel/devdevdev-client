import React from 'react';

import RetryIcon from '@components/svgs/ReplayIcon';

import { DEVGURI_ERR_TEXT } from '@/constants/DevGuriErrorTxtConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { MainButtonV2 } from '../buttons/mainButtonsV2';

export default function GetCompanyListError({
  handleRetryClick,
}: {
  handleRetryClick: () => void;
}) {
  const { isMobile } = useMediaQueryContext();

  return (
    <section
      className={`grid ${isMobile ? 'gap-[2.4rem]' : 'grid-flow-col justify-between items-center'} bg-gray800 p-[2.4rem] rounded-Radius16`}
    >
      <div>
        <p className='st2 font-bold mb-[1rem]'>{DEVGURI_ERR_TEXT.NETWORK_ERR.MAIN_TITLE}</p>
        <p className='p2 font-medium text-gray200'>
          {DEVGURI_ERR_TEXT.NETWORK_ERR.TECHBLOG_COMPANY}
        </p>
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
