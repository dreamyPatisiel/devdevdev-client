import React from 'react';

import dynamic from 'next/dynamic';

import NoMyInfoData from '@pages/myinfo/components/NoMyInfoData';
import { useInfiniteTechBlogData } from '@pages/techblog/api/useInfiniteTechBlog';
import {
  MOBILE_MAIN_TECH_VIEW_SIZE,
  TECH_VIEW_SIZE,
} from '@pages/techblog/constants/techBlogConstants';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useObserver } from '@hooks/useObserver';

import {
  MainTechSkeletonList,
  MobileTechSkeletonList,
} from '@components/common/skeleton/techBlogSkeleton';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import DesktopMainTechCard from '../techblog/desktopMainTechCard';
import GradientDiv from './gradientDiv';

const DynamicTechCard = dynamic(() => import('@/pages/techblog/components/techCard'));

export default function DynamicTechBlogComponent({
  skeletonCnt,
  isScroll = true,
  bottomDiv,
  type = 'main',
  // data,
}: {
  skeletonCnt: number;
  isScroll?: boolean;
  bottomDiv?: React.MutableRefObject<null>;
  type: 'main' | 'myinfo';
  data?: TechInfiniteDataType; //FIXME: 추후에 수정 필요
}) {
  const { isMobile } = useMediaQueryContext();

  const VIEW_SIZE = isMobile ? MOBILE_MAIN_TECH_VIEW_SIZE : TECH_VIEW_SIZE;

  const data = useInfiniteTechBlogData(
    'LATEST',
    undefined,
    undefined,
    VIEW_SIZE,
  ) as TechInfiniteDataType;

  const { techBlogData, isFetchingNextPage, hasNextPage, status, onIntersect } = data;

  const SCROLL_CLASS = isMobile ? '' : 'relative overflow-y-scroll scrollbar-hide max-h-[50rem]';

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

  return <>{getStatusComponent()}</>;
}
