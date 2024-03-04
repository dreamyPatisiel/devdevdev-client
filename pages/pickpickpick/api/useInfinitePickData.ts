import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { DropdownOptionProps } from '@/stores/dropdownStore';

import { VIEW_SIZE } from '../constants/pickConstants';
import { GetPickDataProps } from '../types/pick';

export const getPickData = async ({ pageParam, pickSort }: GetPickDataProps) => {
  const res = await axios.get(
    `/devdevdev/api/v1/picks?size=${VIEW_SIZE}&pickId=${pageParam}&pickSort=${pickSort}`,
  );

  return res.data;
};

export const useInfinitePickData = (sortOption: DropdownOptionProps) => {
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
    queryFn: ({ pageParam }) => getPickData({ pageParam, pickSort: sortOption }),
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.length === 0) {
        return undefined;
      }

      const lastPickId = lastPage.data.content[VIEW_SIZE]?.id;
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
