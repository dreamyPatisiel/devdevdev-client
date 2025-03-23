import React from 'react';

import dynamic from 'next/dynamic';

import { useInfiniteMyInfoBookmark } from '@pages/myinfo/bookmark/api/useInfiniteMyInfoBookmark';
import { MyinfoBookmarkDropdownProps } from '@pages/myinfo/bookmark/bookmarkType';
import NoMyInfoData from '@pages/myinfo/components/NoMyInfoData';
import { useInfiniteTechBlogData } from '@pages/techblog/api/useInfiniteTechBlog';
import {
  MOBILE_MAIN_TECH_VIEW_SIZE,
  TECH_VIEW_SIZE,
} from '@pages/techblog/constants/techBlogConstants';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useDropdownStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';

import { useObserver } from '@hooks/useObserver';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
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

  type = 'main',
}: {
  skeletonCnt: number;
  isScroll?: boolean;
  type?: 'main' | 'myinfo';
}) {
  const { isMobile } = useMediaQueryContext();
  const { sortOption } = useDropdownStore();
  const { loginStatus } = useLoginStatusStore();

  const VIEW_SIZE = isMobile ? MOBILE_MAIN_TECH_VIEW_SIZE : TECH_VIEW_SIZE;

  const bottomDiv = React.useRef(null);

  const myInfoBookmarkData =
    loginStatus === 'login'
      ? (useInfiniteMyInfoBookmark(
          sortOption as MyinfoBookmarkDropdownProps,
        ) as TechInfiniteDataType)
      : undefined;

  const isData =
    myInfoBookmarkData?.techBlogData?.pages[0]?.data.content.length === 0 ? false : true;

  const techblogData = useInfiniteTechBlogData(
    'LATEST',
    undefined,
    undefined,
    VIEW_SIZE,
  ) as TechInfiniteDataType;

  const data = type === 'main' ? techblogData : myInfoBookmarkData;

  const {
    techBlogData = { pages: [] },
    isFetchingNextPage = false,
    hasNextPage = false,
    status = 'idle',
    onIntersect = () => {},
  } = data || {};

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

  return (
    <>
      {type === 'main' ? (
        <>{getStatusComponent()}</>
      ) : (
        <div className='flex flex-col gap-[2.4rem] pb-40'>
          <div className='flex justify-between items-center'>
            {isMobile ? <></> : <h1 className='h3 font-bold'>북마크</h1>}
            {isMobile ? (
              <div className='ml-auto'>
                <MobileDropdown type='bookmark' />
              </div>
            ) : (
              <Dropdown type='bookmark' disable={!isData} />
            )}
          </div>
          <div>
            {getStatusComponent()}
            <div ref={bottomDiv} />
          </div>
        </div>
      )}
    </>
  );
}
