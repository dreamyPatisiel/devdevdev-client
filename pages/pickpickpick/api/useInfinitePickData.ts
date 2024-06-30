import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getGA } from '@utils/getCookie';

import { defaultDropdownOptions } from '@/constants/DropdownOptionArr';
import { DefaultDropdownProps } from '@/stores/dropdownStore';
import { PageResponse } from '@/types/pageResponse';

import { VIEW_SIZE } from '../constants/pickConstants';
import { GetPickDataProps, PickDataProps } from '../types/pick';

export const getPickData = async ({ pageParam, pickSort }: GetPickDataProps) => {
  const GA = await getGA();

  const res = await axios.get(
    `/devdevdev/api/v1/picks?size=${VIEW_SIZE}&pickId=${pageParam}&pickSort=${pickSort}`,
    {
      headers: { 'Anonymous-Member-Id': GA },
    },
  );

  return res?.data;
};

export const useInfinitePickData = (sortOption: DefaultDropdownProps) => {
  const isValidSortOption = defaultDropdownOptions.includes(sortOption);
  const {
    data: pickData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['pickData', sortOption],

    queryFn: ({ pageParam }) => {
      if (!isValidSortOption) {
        return Promise.resolve({ data: { content: [], last: true } });
      }
      return getPickData({ pageParam, pickSort: sortOption });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage: PageResponse<PickDataProps[]>) => {
      if (lastPage?.data.last) {
        return undefined;
      }

      const lastPickId = lastPage?.data.content[VIEW_SIZE - 1]?.id;
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
