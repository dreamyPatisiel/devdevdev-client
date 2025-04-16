import React from 'react';

import { useRouter } from 'next/router';

import { useCompanyIdStore } from '@stores/techBlogStore';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function SubscribeCard({
  logoImage,
  company,
  isSubscribe,
  id,
}: {
  logoImage: string;
  company: string;
  isSubscribe: boolean;
  id: number;
}) {
  const { isMobile } = useMediaQueryContext();

  const { setCompanyId } = useCompanyIdStore();

  const router = useRouter();

  return (
    <div
      className={`border-gray600 flex flex-col ${isMobile ? 'min-w-[16.35rem]' : 'min-w-[18.025rem]'}`}
    >
      <div
        className={`rounded-t-Radius16 bg-gray700 flex items-center justify-center h-[8rem] ${isMobile ? 'p-[3.175rem]' : 'p-[4.013rem]'}`}
      >
        <img src={logoImage} alt='회사 로고' width={100} height={100} />
      </div>

      <div className='rounded-b-Radius16 border border-gray600 border-t-0 p-[1.6rem] flex flex-col gap-[1.6rem] justify-center text-center'>
        <strong className='st2 font-bold'>{company}</strong>
        <div className='flex flex-col gap-[0.8rem]'>
          <MainButtonV2
            text='아티클 보기'
            color='gray'
            size='small'
            radius='square'
            line={false}
            onClick={async () => {
              await setCompanyId(id);
              await router.push(ROUTES.TECH_BLOG);
            }}
          />
          <MainButtonV2
            text={isSubscribe ? '구독 중' : '구독하기'}
            color='primary'
            line={isSubscribe}
            size='small'
            radius='square'
          />
        </div>
      </div>
    </div>
  );
}
