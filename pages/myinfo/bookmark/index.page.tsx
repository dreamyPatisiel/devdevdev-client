import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import DynamicTechBlogComponent from '@components/features/main/dynamicTechBlogComponent';

import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import MyInfo from '../index.page';
import { useInfiniteMyInfoBookmark } from './api/useInfiniteMyInfoBookmark';
import { MyinfoBookmarkDropdownProps } from './bookmarkType';

export default function BookMark() {
  const queryClient = useQueryClient();
  const { sortOption } = useDropdownStore();

  const myInfoBookmarkData = useInfiniteMyInfoBookmark(
    sortOption as MyinfoBookmarkDropdownProps,
  ) as TechInfiniteDataType;

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });
  }, []);

  return (
    <MyInfo>
      <DynamicTechBlogComponent
        data={myInfoBookmarkData}
        skeletonCnt={10}
        isScroll={true}
        type='myinfo'
      />
    </MyInfo>
  );
}
