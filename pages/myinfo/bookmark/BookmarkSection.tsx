import { useDropdownStore } from '@stores/dropdownStore';

import DynamicTechBlogComponent from '@components/features/main/dynamicTechBlogComponent';

import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import { useInfiniteMyInfoBookmark } from './api/useInfiniteMyInfoBookmark';
import { MyinfoBookmarkDropdownProps } from './bookmarkType';

export default function BookmarkSection() {
  const { sortOption } = useDropdownStore();

  const myInfoBookmarkData = useInfiniteMyInfoBookmark(
    sortOption as MyinfoBookmarkDropdownProps,
  ) as TechInfiniteDataType;

  return (
    <DynamicTechBlogComponent
      data={myInfoBookmarkData}
      skeletonCnt={10}
      isScroll={true}
      type='myinfo'
    />
  );
}
