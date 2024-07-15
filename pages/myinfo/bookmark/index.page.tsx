import React, { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import { Dropdown } from '@components/common/dropdown';
import DynamicTechBlogComponent from '@components/features/main/dynamicTechBlogComponent';

import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import MyInfo from '../index.page';
import { useInfiniteMyInfoBookmark } from './api/useInfiniteMyInfoBookmark';
import { MyinfoBookmarkDropdownProps } from './bookmarkType';

export default function BookMark() {
  const bottomDiv = useRef(null);
  const { sortOption } = useDropdownStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    // TODO: 기술블로그쪽도 invalidateQueries를 설정해주면서 로직을 변경해야함 (2차?!)
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
          <h1 className='h3 font-bold'>북마크</h1>
          <Dropdown type='bookmark' disable={!isData} />
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
