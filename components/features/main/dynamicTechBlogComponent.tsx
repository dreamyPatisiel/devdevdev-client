import React from 'react';

import dynamic from 'next/dynamic';

import NoMyInfoData from '@pages/myinfo/components/NoMyInfoData';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useObserver } from '@hooks/useObserver';

import {
  MainTechSkeletonList,
  MobileTechSkeletonList,
} from '@components/common/skeleton/techBlogSkeleton';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import BookmarkComponent from '../techblog/BookmarkComponent';
import DesktopMainTechCard from '../techblog/desktopMainTechCard';
import GradientDiv from './gradientDiv';

const DynamicTechCard = dynamic(() => import('@/pages/techblog/components/TechCard'));

export default function DynamicTechBlogComponent({
  data,
  skeletonCnt,
  isScroll = true,
  type = 'main',
}: {
  data: TechInfiniteDataType;
  skeletonCnt: number;
  isScroll?: boolean;
  type?: 'main' | 'myinfo';
}) {
  const { isMobile } = useMediaQueryContext();

  const bottomDiv = React.useRef(null);

  const { techBlogData, isFetchingNextPage, hasNextPage, status, onIntersect } = data;

  const SCROLL_CLASS = isMobile ? '' : 'relative overflow-y-scroll scrollbar-hide max-h-[47rem]';

  useObserver({
    target: bottomDiv,
    onIntersect,
  });

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        if (isMobile) {
          return <MobileTechSkeletonList itemsInRows={skeletonCnt} />;
        } else {
          return <MainTechSkeletonList itemsInRows={skeletonCnt} />;
        }

      default:
        if (type === 'myinfo' && techBlogData?.pages[0].data.content.length === 0)
          return <NoMyInfoData type='noMyTech' />;
        return (
          <>
            <div className={isScroll ? SCROLL_CLASS : ''}>
              {techBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data.content.map((data: TechCardProps) => (
                    <React.Fragment key={data.id}>
                      {isMobile ? (
                        <DynamicTechCard techData={data} type={type} />
                      ) : (
                        <DesktopMainTechCard techData={data} type={type} />
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {!isMobile && isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <MainTechSkeletonList itemsInRows={skeletonCnt} />
              </div>
            )}
            {!isMobile && type === 'main' && <GradientDiv />}
          </>
        );
    }
  };

  return (
    <>
      {type === 'main' ? (
        <>{getStatusComponent()}</>
      ) : (
        <div className='flex flex-col gap-[2.4rem] pb-40'>
          <BookmarkComponent />
          <div>
            {getStatusComponent()}
            <div ref={bottomDiv} />
          </div>
        </div>
      )}
    </>
  );
}
