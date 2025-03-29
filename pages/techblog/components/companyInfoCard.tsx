import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@utils/mergeStyle';

import { useLoginStatusStore } from '@stores/loginStore';
import { useCompanyIdStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';
import TextButton from '@components/common/buttons/textButton';

import ArrowRightgreen from '@public/image/arrow-right-thin-Secondary400.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useDeleteCompanySubscribe } from '../api/useDeleteCompanySubscribe';
import { useGetDetailCompanySubscribeData } from '../api/useGetDetailCompanySubscribeData';
import { usePostCompanySubscribe } from '../api/usePostCompanySubscribe';
import { TechImgBackgroundWrapper } from './techSubComponents';

interface CompanyInfoCardProps {
  companyId: number;
}

export default function CompanyInfoCard({ companyId }: CompanyInfoCardProps) {
  const { isMobile } = useMediaQueryContext();

  const containerClass = isMobile ? 'flex flex-col p-[1.6rem]' : 'grid grid-flow-col p-[3.2rem]';
  const headerClass = isMobile ? 'justify-between' : 'justify-center';
  const TechImgBackgroundWrapperClass = isMobile ? 'w-[100%] h-[9.6rem]' : 'w-[16rem] h-[12.8rem]';
  const divClass = isMobile ? '' : 'flex flex-row justify-between';

  // 비회원 제어
  const { loginStatus } = useLoginStatusStore();
  const { setToastVisible } = useToastVisibleStore();

  const { setCompanyId } = useCompanyIdStore();

  // 기업 상세 데이터 조회
  const {
    data: companyDetailData,
    isPending,
    isSuccess,
  } = useGetDetailCompanySubscribeData(companyId);
  const {
    companyCareerUrl,
    companyDescription,
    companyName,
    companyOfficialImageUrl,
    industry,
    isSubscribed,
    techArticleTotalCount,
  } = companyDetailData ?? {};

  const { mutate: postCompanySubscribe } = usePostCompanySubscribe({
    companyName: companyName ?? '',
    companyId: companyId,
  });

  const { mutate: deleteCompanySubscribe } = useDeleteCompanySubscribe({ companyId });

  /** 구독하기 */
  const handleSubscribe = () => {
    if (loginStatus !== 'login') {
      setToastVisible({ message: '비회원은 현재 해당 기능을 이용할 수 없습니다.', type: 'error' });
      return;
    }

    postCompanySubscribe({
      companyId: companyId,
    });
  };

  /** 구독취소 */
  const handleUnsubscribe = () => {
    deleteCompanySubscribe({
      companyId: companyId,
    });
  };

  const renderButtons = () => (
    <>
      <Link href={companyCareerUrl ?? ''} target='_blank'>
        <MainButtonV2
          color='primary'
          line
          size={isMobile ? 'medium' : 'small'}
          radius='square'
          text='채용정보 보러가기'
          className={isMobile ? 'flex-1' : ''}
        />
      </Link>
      <MainButtonV2
        color='primary'
        line={false}
        size={isMobile ? 'medium' : 'small'}
        radius='square'
        text={isSubscribed ? '구독중' : '구독하기'}
        className={isMobile ? 'flex-1' : ''}
        onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
      />
    </>
  );

  return (
    <article
      className={cn(`gap-[2.4rem] border border-gray400 rounded-Radius16 ${containerClass}`)}
    >
      <TechImgBackgroundWrapper className={TechImgBackgroundWrapperClass}>
        <img className='w-[13rem]' src={companyOfficialImageUrl ?? ''} alt='기업 이미지' />
      </TechImgBackgroundWrapper>

      <div className='flex flex-col gap-[1.6rem]'>
        <div className={`${divClass}`}>
          <header className={cn(`flex flex-row gap-[0.8rem] items-center ${headerClass}`)}>
            <h2 className={`${isMobile ? 'p1' : 'st2'} text-gray50`}>
              {companyName}
              <span className={`${isMobile ? 'p2' : 'p1'} ml-[0.8rem] text-gray100`}>
                {industry}
              </span>
            </h2>
            <TextButton
              buttonContent={`아티클 ${techArticleTotalCount}개`}
              color='secondary'
              fontWeight='Regular'
              line='false'
              size='small'
              rightIcon={<Image src={ArrowRightgreen} alt='오른쪽 화살표 아이콘' />}
              onClick={() => {
                setCompanyId(companyId);
              }}
            />
          </header>

          {!isMobile && <nav className='flex flex-row gap-[0.8rem]'>{renderButtons()}</nav>}
        </div>
        <section className={`${isMobile ? 'c1' : 'p2'} text-gray200`}>{companyDescription}</section>

        {isMobile && (
          <nav className='flex flex-row gap-[0.8rem] mb-[0.8rem]'>{renderButtons()}</nav>
        )}
      </div>
    </article>
  );
}
