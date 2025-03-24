import React from 'react';

import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';
import TextButton from '@components/common/buttons/textButton';

import ArrowRightgreen from '@public/image/arrow-right-thin-Secondary400.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { TechImgBackgroundWrapper } from './techSubComponents';
import { useGetDetailCompanySubscribeData } from '../api/useGetDetailCompanySubscribeData';
import Link from 'next/link';

interface CompanyInfoCardProps {
  companyId: number;
}

export default function CompanyInfoCard({
  companyId
}: CompanyInfoCardProps) {
  const { isMobile } = useMediaQueryContext();

  const containerClass = isMobile ? 'flex flex-col p-[1.6rem]' : 'grid grid-flow-col p-[3.2rem]';
  const headerClass = isMobile ? 'justify-between' : 'justify-center';
  const TechImgBackgroundWrapperClass = isMobile ? 'w-[100%] h-[9.6rem]' : 'w-[16rem] h-[12.8rem]';
  const divClass = isMobile ? '' : 'flex flex-row justify-between';

  const { data: companyDetailData, isPending, isSuccess } = useGetDetailCompanySubscribeData(companyId);
  const { companyCareerUrl, companyDescription, companyName, companyOfficialImageUrl, industry, isSubscribed, techArticleTotalCount } = companyDetailData ?? {};

  const handleSubscribe = () => {
    console.log('구독하기');
  }


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
        text='구독하기' // TODO: 서버 데이터 받으면 구독중 <-> 구독하기
        className={isMobile ? 'flex-1' : ''}
        onClick={handleSubscribe}
      />
    </>
  );

  return (
    <article
      className={cn(`gap-[2.4rem] border border-gray400 rounded-Radius16 ${containerClass}`)}
    >
      <TechImgBackgroundWrapper className={TechImgBackgroundWrapperClass}>
        <img className='w-[10rem]' src={companyOfficialImageUrl ?? ''} alt='기업 이미지' />
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
