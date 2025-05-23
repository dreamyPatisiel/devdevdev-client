import { useState } from 'react';

import { useRouter } from 'next/router';

import { useCompanyInfoStore } from '@stores/techBlogStore';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

import { useDeleteCompanySubscribe } from '@/api/useDeleteCompanySubscribe';
import { usePostCompanySubscribe } from '@/api/usePostCompanySubscribe';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function SubscribeCard({
  logoImage,
  isSubscribe,
  companyId,
  companyName,
}: {
  logoImage: string;
  isSubscribe: boolean;
  companyId: number;
  companyName: string;
}) {
  const { isMobile } = useMediaQueryContext();

  const { setCompanyInfo } = useCompanyInfoStore();

  const router = useRouter();

  const { mutate: postCompanySubscribeMutate } = usePostCompanySubscribe({
    companyName: companyName,
    companyId: companyId,
  });
  const { mutate: deleteCompanySubscribeMutate } = useDeleteCompanySubscribe({
    companyId: companyId,
  });

  const handleArticleButtonClick = async () => {
    await setCompanyInfo({ id: companyId, name: companyName });
    await router.push(ROUTES.TECH_BLOG);
  };

  const [isClientSubscribe, setIsClientSubscribe] = useState(isSubscribe);

  const handleSubscribeButtonClick = () => {
    if (isClientSubscribe) {
      deleteCompanySubscribeMutate(
        { companyId: companyId },
        {
          onSuccess: () => {
            setIsClientSubscribe(false);
          },
        },
      );
    } else {
      postCompanySubscribeMutate(
        { companyId: companyId },
        {
          onSuccess: () => {
            setIsClientSubscribe(true);
          },
        },
      );
    }
  };

  return (
    <div
      className={`border-gray600 flex flex-col ${isMobile ? 'min-w-[16.35rem]' : 'min-w-[18.025rem]'}`}
    >
      <div
        className={`rounded-t-Radius16 bg-gray700 flex items-center justify-center h-[8rem] ${isMobile ? 'p-[0.17rem]' : 'p-[1rem]'}`}
      >
        {logoImage ? <img src={logoImage} alt='회사 로고' width={160} height={80} /> : <></>}
      </div>

      <div className='rounded-b-Radius16 border border-gray600 border-t-0 p-[1.6rem] flex flex-col gap-[1.6rem] justify-center text-center'>
        {companyName ? (
          <strong className='st2 font-bold'>{companyName}</strong>
        ) : (
          <div className='w-[2.6rem] h-[2.6rem]'></div>
        )}
        <div className='flex flex-col gap-[0.8rem]'>
          <MainButtonV2
            text='아티클 보기'
            color='gray'
            size='small'
            radius='square'
            line={false}
            onClick={handleArticleButtonClick}
            disabled={!companyName || !logoImage}
          />
          <MainButtonV2
            text={isClientSubscribe ? '구독 중' : '구독하기'}
            color='primary'
            line={isClientSubscribe}
            size='small'
            radius='square'
            onClick={handleSubscribeButtonClick}
            disabled={!companyName || !logoImage}
          />
        </div>
      </div>
    </div>
  );
}
