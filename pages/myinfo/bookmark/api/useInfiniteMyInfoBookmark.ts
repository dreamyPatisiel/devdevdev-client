import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  GetMyinfoBookmarkProps,
  MyinfoBookmarkDropdownProps,
} from '@pages/myinfo/bookmark/bookmarkType';

import { TECH_VIEW_SIZE } from '../../../techblog/constants/techBlogConstants';

export const getTechBlogData = async ({ techArticleId, bookmarkSort }: GetMyinfoBookmarkProps) => {
  const queryParams = {
    size: TECH_VIEW_SIZE,
    bookmarkSort: bookmarkSort,
    ...(techArticleId && { techArticleId }),
  };

  const res = await axios.get(`/devdevdev/api/v1/mypage/bookmarks?`, {
    params: {
      ...queryParams,
    },
  });
  return res?.data;
};

export const useInfiniteMyInfoBookmark = (sortOption: MyinfoBookmarkDropdownProps) => {
  const {
    data: techBlogData,
    fetchNextPage, // 다음 페이지의 데이터를 가져옴
    isFetchingNextPage, // 현재 다음 페이지를 가져오는지 여부
    hasNextPage, // 다음 페이지가 있는지
    status, // 쿼리의 상태
    error,
    isFetching, // 데이터를 가지고 오는지 여부
  } = useInfiniteQuery({
    queryKey: ['techBlogBookmark', sortOption],
    // 데이터를 요청하는데 사용하는 함수
    queryFn: ({ pageParam }) =>
      getTechBlogData({
        techArticleId: pageParam,
        bookmarkSort: sortOption,
      }),
    initialPageParam: '',
    // 다음 페이지를 가져오기 위한 파라미터 추출 함수
    // lastPage는 이전페이지에서 반환된 데이터를 받아 다음페이지에 필요한 파라미터를 추출한 데이터

    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }
      const techArticleId = lastPage.data.content[TECH_VIEW_SIZE - 1]?.id;
      return techArticleId;
    },
    staleTime: 0,
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
    techBlogData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
