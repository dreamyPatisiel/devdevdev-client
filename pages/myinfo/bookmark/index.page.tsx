import React, { useRef } from 'react';

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

  const data = useInfiniteMyInfoBookmark(
    sortOption as MyinfoBookmarkDropdownProps,
  ) as TechInfiniteDataType;

  return (
    <MyInfo>
      <div className='flex flex-col gap-10 pb-40'>
        <div className='flex justify-between items-center'>
          <h1 className='h3 font-bold'>북마크</h1>
          <Dropdown type='bookmark' />
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
