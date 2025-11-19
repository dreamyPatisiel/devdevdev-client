import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import DevGuriError from '@components/common/error/DevGuriError';
import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import MainTechBlogSection from '@components/features/main/MainTechBlogSection';
import MainCardComponent from '@components/features/main/mainCard/MainCardComponent';

import DevLogo from '@public/image/devdevdevLogo.svg';

import { META } from '@/constants/metaData';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

const DynamicPickComponent = dynamic(
  () => import('@components/features/main/dynamicPickComponent'),
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
  const { isMobile } = useMediaQueryContext();
  const PICK_PATH = '/pickpickpick';
  const TECH_PATH = '/techblog';

  const MainSectionStyle = {
    base: 'gap-[5.6rem]',
    desktop: 'grid grid-cols-[360px_auto] max-h-[51.8rem] mb-[12rem]',
    mobile: 'flex flex-col',
  };

  return (
    <div
      className={`w-full h-full ${isMobile ? 'px-[1.6rem] py-[2.4rem]' : 'px-[20.3rem] py-[6.4rem]'} `}
    >
      <MainPageLogo />

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-[9.6rem]' : 'grid-rows-2'}`}>
        <section
          className={`${MainSectionStyle.base} ${isMobile ? MainSectionStyle.mobile : MainSectionStyle.desktop}`}
        >
          <MainCardComponent path={PICK_PATH} />
          <div className='relative'>
            <ArrowWithTitle
              title='따끈따끈! 최신 픽픽픽'
              variant='mainTitle'
              iconText='바로가기'
              routeURL={PICK_PATH}
            />
            <QueryErrorBoundary
              fallbackRender={({ handleRetryClick }) => (
                <DevGuriError type='network' handleRetryClick={handleRetryClick} />
              )}
            >
              <DynamicPickComponent />
            </QueryErrorBoundary>
          </div>
        </section>

        <section
          className={`${MainSectionStyle.base} ${isMobile ? MainSectionStyle.mobile : MainSectionStyle.desktop}`}
        >
          <MainCardComponent path={TECH_PATH} />
          <div className='relative'>
            <ArrowWithTitle
              title='따끈따끈! 최신 아티클'
              variant='mainTitle'
              iconText='바로가기'
              routeURL={TECH_PATH}
            />
            <QueryErrorBoundary
              fallbackRender={({ handleRetryClick }) => (
                <DevGuriError type='network' handleRetryClick={handleRetryClick} />
              )}
            >
              <MainTechBlogSection />
            </QueryErrorBoundary>
          </div>
        </section>
      </div>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      meta: META.MAIN,
    },
  };
}
