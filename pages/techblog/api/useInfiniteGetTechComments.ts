import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { TechBlogCommentsOptions } from '@/constants/DropdownOption';

import { TECH_COMMENT_VIEW_SIZE } from '../constants/techBlogConstants';
import { GetTechCommentsProps, TechBlogCommentsDropdownProps } from '../types/techCommentsType';

export const getTechBlogComments = async ({
  articleId,
  techCommentId,
  size,
  techCommentSort,
}: GetTechCommentsProps) => {
  const queryParams = {
    size: size ? size : TECH_COMMENT_VIEW_SIZE,
    techCommentSort: techCommentSort,
    ...(techCommentId && { techCommentId }),
  };

  const res = await axios.get(`/devdevdev/api/v1/articles/${articleId}/comments`, {
    params: {
      ...queryParams,
    },
  });
  return res.data;
};

export const useInfiniteTechBlogComments = (
  sortOption: TechBlogCommentsDropdownProps,
  articleId: string,
  techCommentId?: string,
  size?: number,
) => {
  const isValidSortOption = TechBlogCommentsOptions.includes(sortOption);

  const {
    data: techBlogComments,
    fetchNextPage, // 다음 페이지의 데이터를 가져옴
    isFetchingNextPage, // 현재 다음 페이지를 가져오는지 여부
    hasNextPage, // 다음 페이지가 있는지
    status, // 쿼리의 상태
    error,
    isFetching, // 데이터를 가지고 오는지 여부
  } = useInfiniteQuery({
    queryKey: ['techBlogComments', sortOption, articleId, techCommentId, size],
    // 데이터를 요청하는데 사용하는 함수
    queryFn: ({ pageParam }) => {
      let techCommentId = '';

      if (pageParam) {
        const parsedParam = JSON.parse(pageParam);
        techCommentId = parsedParam.techCommentId;
      }

      if (!isValidSortOption) {
        return Promise.resolve({ data: { content: [], last: true } });
      }
      return getTechBlogComments({
        articleId: articleId,
        techCommentId: techCommentId,
        techCommentSort: sortOption,
        size: size,
      });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }
      const techCommentId = lastPage.data.content[TECH_COMMENT_VIEW_SIZE - 1]?.techCommentId;
      return JSON.stringify({ techCommentId: techCommentId });
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
    techBlogComments,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
