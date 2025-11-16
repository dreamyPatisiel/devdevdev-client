import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { pickpickpickDropdownOptions } from '@/constants/DropdownOption';
import { PickDropdownProps } from '@/stores/dropdownStore';
import { PageResponse } from '@/types/pageResponse';

import { PICK_VIEW_SIZE } from '../constants/pickConstants';
import { GetPickDataProps, PickDataProps } from '../types/pick';

export const getPickData = async ({ pageParam, pickSort, size }: GetPickDataProps) => {
  // 아래 endpoint v2에선 기존 v1 포함 isNew,content ,thumbnailImageUrl 3개 필드 추가됨
  const res = await axios.get(
    `/devdevdev/api/v2/picks?size=${size ? size : PICK_VIEW_SIZE}&pickId=${pageParam}&pickSort=${pickSort}`,
  );

  return res?.data;
};

export const useInfinitePickData = (
  sortOption: PickDropdownProps,
  size?: number,
  enabled: boolean = true,
) => {
  const isValidSortOption = pickpickpickDropdownOptions.includes(sortOption);
  const {
    data: pickData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['pickData', sortOption, size],

    queryFn: ({ pageParam }) => {
      if (!isValidSortOption) {
        return Promise.resolve({ data: { content: [], last: true } });
      }
      return getPickData({ pageParam, pickSort: sortOption, size: size });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    enabled,
    getNextPageParam: (lastPage: PageResponse<PickDataProps[]>) => {
      if (lastPage?.data?.last) {
        return undefined;
      }

      const lastPickId = lastPage?.data.content[PICK_VIEW_SIZE - 1]?.id;
      return lastPickId ?? undefined;
    },
  });

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!isFetching && entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  return {
    pickData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
