import React, { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
import DynamicTechBlogComponent from '@components/features/main/dynamicTechBlogComponent';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import MyInfo from '../index.page';
import { useInfiniteMyInfoBookmark } from './api/useInfiniteMyInfoBookmark';
import { MyinfoBookmarkDropdownProps } from './bookmarkType';

export default function BookMark() {
  const bottomDiv = useRef(null);
  const { sortOption } = useDropdownStore();
  const queryClient = useQueryClient();

  const { isMobile } = useMediaQueryContext();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });
  }, []);

  const data = useInfiniteMyInfoBookmark(
    sortOption as MyinfoBookmarkDropdownProps,
  ) as TechInfiniteDataType;

  const isData = data?.techBlogData?.pages[0]?.data.content.length === 0 ? false : true;

  return (
    <MyInfo>
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
          {DynamicTechBlogComponent({
            skeletonCnt: 10,
            isScroll: false,
            bottomDiv: bottomDiv,
            type: 'myinfo',
            data: data,
          })}
          <div ref={bottomDiv} />
        </div>
      </div>
    </MyInfo>
  );
}
