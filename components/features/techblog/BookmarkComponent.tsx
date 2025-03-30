import { useInfiniteMyInfoBookmark } from '@pages/myinfo/bookmark/api/useInfiniteMyInfoBookmark';
import { MyinfoBookmarkDropdownProps } from '@pages/myinfo/bookmark/bookmarkType';

import { useDropdownStore } from '@stores/dropdownStore';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { TechInfiniteDataType } from '@/types/infiniteQueryType';

export default function BookmarkComponent() {
  const { isMobile } = useMediaQueryContext();
  const { sortOption } = useDropdownStore();

  const myInfoBookmarkData = useInfiniteMyInfoBookmark(
    sortOption as MyinfoBookmarkDropdownProps,
  ) as TechInfiniteDataType;

  const hasData =
    myInfoBookmarkData?.techBlogData?.pages[0]?.data.content.length === 0 ? false : true;

  return (
    <div className='flex justify-between items-center'>
      {isMobile ? <></> : <h1 className='h3 font-bold'>북마크</h1>}
      {isMobile ? (
        <div className='ml-auto'>
          <MobileDropdown type='bookmark' />
        </div>
      ) : (
        <Dropdown type='bookmark' disable={!hasData} />
      )}
    </div>
  );
}
