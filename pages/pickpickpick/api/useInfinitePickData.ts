import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { baseAPI } from '@/core/baseInstance';

export const getPickData = async ({ pageParam }: { pageParam: number }) => {
  const res = await baseAPI.get(`/pickData?page=${pageParam}`);

  return res.data;
};

export const useInfinitePickData = () => {
  const {
    data: pickData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['pickData'],
    queryFn: getPickData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
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
