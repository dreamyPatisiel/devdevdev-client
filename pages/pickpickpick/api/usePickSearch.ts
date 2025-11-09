import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { PageResponse } from '@/types/pageResponse';

import { PICK_VIEW_SIZE, isPickSearchEnabled } from '../constants/pickConstants';
import { PickDataProps } from '../types/pick';

export interface SearchPageParam {
  pickId: number | string;
  searchScore: number;
}

export interface SearchPickDataProps extends PickDataProps {
  searchScore: number;
}

export const getPickSearchData = async ({
  pageParam,
  keyword,
  size,
}: {
  pageParam: SearchPageParam;
  keyword: string;
  size?: number;
}) => {
  const { pickId, searchScore } = pageParam;

  const res = await axios.get(
    `/devdevdev/api/v2/picks/search?size=${size ? size : PICK_VIEW_SIZE}&pickId=${pickId}&searchScore=${searchScore}&keyword=${encodeURIComponent(
      keyword,
    )}`,
  );

  return res?.data as PageResponse<SearchPickDataProps[]>;
};

export const usePickSearch = (keyword: string, size?: number) => {
  const trimmed = keyword.trim();
  const enabled = isPickSearchEnabled(keyword);
  const INITIAL_CURSOR: SearchPageParam = {
    pickId: '9223372036854775807',
    searchScore: 10,
  };

  const {
    data: searchData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['pickSearch', trimmed, size],
    queryFn: ({ pageParam }) => getPickSearchData({ pageParam, keyword: trimmed, size: size }),
    enabled,
    initialPageParam: INITIAL_CURSOR,
    getNextPageParam: (lastPage: PageResponse<SearchPickDataProps[]>) => {
      if (lastPage?.data?.last) {
        return undefined;
      }

      const content = lastPage?.data?.content ?? [];
      if (!content.length) return undefined;

      const lastItem = content[content.length - 1];
      return {
        pickId: lastItem?.id,
        searchScore: (lastItem as SearchPickDataProps)?.searchScore ?? 0,
      } as SearchPageParam;
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
    searchData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
