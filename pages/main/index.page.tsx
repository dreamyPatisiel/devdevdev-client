import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import useIsMobile from '@hooks/useIsMobile';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import MainCardComponent from '@components/features/main/mainCard/MainCardComponent';
import MetaHead from '@components/meta/MetaHead';

import DevLogo from '@public/image/devdevdevLogo.svg';

import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import { useInfiniteTechBlogData } from '../techblog/api/useInfiniteTechBlog';

const DynamicPickComponent = dynamic(
  () => import('@components/features/main/dynamicPickComponent'),
);

const DynamicTechBlogComponent = dynamic(
  () => import('@components/features/main/dynamicTechBlogComponent'),
);

export const MainPageLogo = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-[8rem]'>
      <Image src={DevLogo} width={200} priority alt='devdevdev로고' />
      <h1 className='p1 font-bold mt-[3.2rem]'>힘들고 막힐 때는 댑댑댑</h1>
    </div>
  );
};

export default function Index() {
  const isMobile = useIsMobile();
  const PICK_PATH = '/pickpickpick';
  const TECH_PATH = '/techblog';

  const data = useInfiniteTechBlogData('LATEST') as TechInfiniteDataType;

  const MainSectionStyle = {
    base: 'mb-[12rem] grid gap-[5.6rem] ',
    desktop: 'grid-flow-col max-h-[51.8rem]',
    mobile: 'grid-flow-row h-full',
  };

  return (
    <>
      <MetaHead />
      <div
        className={`w-full h-full ${isMobile ? 'px-[1.6rem] py-[2.4rem]' : 'px-[20.3rem] py-[6.4rem]'} `}
      >
        <MainPageLogo />

        <div className='grid grid-row' style={{ gridTemplateRows: '1fr 1fr' }}>
          <section
            className={`${MainSectionStyle.base} ${isMobile ? MainSectionStyle.mobile : MainSectionStyle.desktop}`}
            style={{
              ...(!isMobile && { gridTemplateColumns: '1fr 1.53fr' }),
            }}
          >
            <MainCardComponent path={PICK_PATH} />
            <div className='relative'>
              <ArrowWithTitle
                title='따끈따끈! 최신 픽픽픽'
                variant='mainTitle'
                iconText='바로가기'
                routeURL={PICK_PATH}
                className='pb-[2.45rem]'
              />
              <QueryErrorBoundary type='section'>
                <DynamicPickComponent />
              </QueryErrorBoundary>
            </div>
          </section>

          <section
            className={`${MainSectionStyle.base} ${isMobile ? MainSectionStyle.mobile : MainSectionStyle.desktop}`}
            style={{
              ...(!isMobile && { gridTemplateColumns: '1fr 1.53fr' }),
            }}
          >
            <MainCardComponent path={TECH_PATH} />
            <div className='relative'>
              <ArrowWithTitle
                title='따끈따끈! 최신 아티클'
                variant='mainTitle'
                iconText='바로가기'
                routeURL={TECH_PATH}
              />
              <QueryErrorBoundary type='section'>
                <DynamicTechBlogComponent data={data} skeletonCnt={2} type='main' />
              </QueryErrorBoundary>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
