import React from 'react';

import Image from 'next/image';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

export default function SubscribeCard({
  logoImage,
  company,
}: {
  logoImage: string;
  company: string;
}) {
  return (
    <div className='border-gray600 flex flex-col max-w-[18.025rem]'>
      <div className='rounded-t-Radius16 bg-gray700 p-[4.013rem] flex items-center justify-center h-[8rem]'>
        <Image src={logoImage} alt='회사 로고' width={100} height={100} />
      </div>

      <div className='rounded-b-Radius16 border border-gray600 border-t-0 p-[1.6rem] flex flex-col gap-[1.6rem] justify-center text-center'>
        <b className='st2 font-bold'>{company}</b>
        <div className='flex flex-col gap-[0.8rem]'>
          <MainButtonV2
            text='아티클 보기'
            color='gray'
            size='small'
            radius='square'
            line={false}
            status='on'
          />
          <MainButtonV2 text='구독 중' color='primary' size='small' radius='square' line={true} />
        </div>
      </div>
    </div>
  );
}
