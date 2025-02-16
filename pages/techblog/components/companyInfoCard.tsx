import React from 'react';

import Image from 'next/image';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';
import TextButton from '@components/common/buttons/textButton';

import ArrowLeftgreen from '@public/image/techblog/angle-right-point1.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { ImgWrapper, TechContent } from './techSubComponents';

export default function CompanyInfoCard({
  ImgElement,
  companyName,
  industry,
  articleCount,
  description,
}: {
  ImgElement: React.ReactElement;
  companyName: string;
  industry: string;
  articleCount: number;
  description: string;
}) {
  const { isMobile } = useMediaQueryContext();

  return (
    <article className='w-full grid grid-flow-col gap-[2.4rem] border border-gray400 rounded-Radius16 p-[3.2rem]'>
      <ImgWrapper className='w-[16rem] h-[12.8rem]'>{ImgElement}</ImgWrapper>

      <div className='flex flex-col gap-[1.6rem]'>
        <div className='flex flex-row justify-between'>
          <header className='flex flex-row items-center justify-center gap-[0.8rem]'>
            <h2 className='st2 text-gray50'>
              {companyName} <span className='p1 text-gray100'>{industry}</span>
            </h2>
            <TextButton
              buttonContent={`${articleCount}개`}
              color='secondary'
              fontWeight='Regular'
              line='false'
              size='small'
              rightIcon={<Image src={ArrowLeftgreen} alt='오른쪽 화살표 아이콘' />}
            />
          </header>

          <nav className='flex flex-row gap-[0.8rem]'>
            <MainButtonV2
              color='primary'
              line
              size='small'
              radius='square'
              text='채용정보 보러가기'
            />
            <MainButtonV2
              color='primary'
              line={false}
              size='small'
              radius='square'
              text='구독하기'
            />
          </nav>
        </div>
        <TechContent
          content={description}
          maxLines={isMobile ? 4 : 3}
          className={isMobile ? '' : 'mr-[4rem]'}
        />
      </div>
    </article>
  );
}
