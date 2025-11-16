import { useMemo } from 'react';

import { useInfinitePickData } from './useInfinitePickData';
import { usePickSearch } from './usePickSearch';

import { PickDropdownProps } from '@/stores/dropdownStore';

import { isPickSearchEnabled } from '../constants/pickConstants';

export const useUnifiedPickFeed = (
  sortOption: PickDropdownProps,
  submittedKeyword: string,
  size?: number,
) => {
  const isSearchMode = isPickSearchEnabled(submittedKeyword);

  // 기본 피드: 검색 모드일 땐 disabled
  const base = useInfinitePickData(sortOption, size, !isSearchMode);
  const search = usePickSearch(submittedKeyword, size);

  const totalCount = useMemo(() => {
    return (
      (isSearchMode
        ? search.searchData?.pages?.[0]?.data.totalElements
        : base.pickData?.pages?.[0]?.data.totalElements) ?? 0
    );
  }, [isSearchMode, search.searchData, base.pickData]);

  const pages = useMemo(() => {
    return (isSearchMode ? search.searchData?.pages : base.pickData?.pages) ?? [];
  }, [isSearchMode, search.searchData, base.pickData]);

  const status = isSearchMode ? search.status : base.status;
  const isFetchingNextPage = isSearchMode
    ? search.isFetchingNextPage
    : base.isFetchingNextPage;
  const hasNextPage = isSearchMode ? search.hasNextPage : base.hasNextPage;
  const onIntersect = isSearchMode ? search.onIntersect : base.onIntersect;

  return {
    isSearchMode,
    pages,
    totalCount,
    status,
    isFetchingNextPage,
    hasNextPage,
    onIntersect,
  } as const;
};
