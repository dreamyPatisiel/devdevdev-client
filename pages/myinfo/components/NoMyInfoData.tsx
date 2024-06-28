import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { MainButton } from '@components/common/buttons/mainButtons';

import ArrowLeft from '@public/image/arrow-left-2.svg';

export default function NoMyInfoData({ type }: { type: 'pickpickpick' | 'techblog' }) {
  const router = useRouter();
  const btnText = type === 'pickpickpick' ? '픽픽픽 작성하기' : '기술블로그로 이동하기 ';

  const TITLE_STYLE = 'st2 font-bold';
  const SUBTITLE_STYLE = 'p1 text-gray4 mb-[2.4rem]';

  return (
    <div className='flex flex-col items-center justify-center gap-[2rem]'>
      <p className='text-[5.6rem] mb-[2.4rem] mt-[7.2rem]'>😳</p>

      {type === 'pickpickpick' ? (
        <>
          <p className={TITLE_STYLE}>아직 작성한 픽픽픽이 없어요!</p>
          <p className={SUBTITLE_STYLE}>픽픽픽을 작성하러 가볼까요?</p>
        </>
      ) : (
        <>
          <p className={TITLE_STYLE}>북마크 하신 기술블로그 게시물이 없어요!</p>
          <p className={SUBTITLE_STYLE}>따끈따끈한 게시물들 구경하러 가볼까요?</p>
        </>
      )}

      <MainButton
        text={btnText}
        variant='primary'
        icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
        onClick={() => router.push(`/${type}`)}
      />
    </div>
  );
}
