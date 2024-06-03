import React from 'react';

import Image from 'next/image';

import paper from '@public/image/paper.svg';
import replay from '@public/image/replay-arrow.svg';
import 뎁구리_에러사진 from '@public/image/뎁구리/뎁구리_Error.png';

import { DEVGURI_ERR_TEXT } from '@/constants/DevGuriErrorTxtConstants';

import { MainButton } from '../buttons/mainButtons';

type ErrorText = {
  MAIN_TITLE: string;
  SUB_TITLE1: string;
  SUB_TITLE2?: string;
};

// TODO: network에러 컴포넌트도 같이 사용
export default function DevGuriError({
  type,
  pathname,
}: {
  type: 'mobile' | 'network';
  pathname: string;
}) {
  const errorText: ErrorText =
    type === 'mobile' ? DEVGURI_ERR_TEXT.MOBILE : DEVGURI_ERR_TEXT.NETWORK_ERR;
  const mainTitle = errorText.MAIN_TITLE;
  const subTitle1 = errorText.SUB_TITLE1;
  const subTitle2 = type === 'mobile' ? errorText.SUB_TITLE2 : '';

  const paperIcon = <Image src={paper} alt='링크복사 아이콘' />;
  const replayIcon = <Image src={replay} alt='재요청 아이콘' />;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`devdevdev.co.kr${pathname}`);
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[3.2rem]'>
      <Image src={뎁구리_에러사진} alt='뎁구리 에러사진' />
      <p className='st2 font-bold'>{mainTitle}</p>
      <div className='flex flex-col justify-center items-center font-medium'>
        <p className='st2 text-gray4'>{subTitle1}</p>
        {subTitle2 && <p className='st2 text-gray4'>{subTitle2}</p>}
      </div>
      <MainButton
        variant='primary'
        text='링크 복사하기'
        icon={type === 'mobile' ? paperIcon : replayIcon}
        onClick={type === 'mobile' ? handleCopyLink : undefined}
      />
    </div>
  );
}
