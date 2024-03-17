import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { DropdownOptionProps } from '@/stores/dropdownStore';

import { TECH_VIEW_SIZE } from '../constants/techBlogConstants';
import { GetTechBlogProps, TechTotalData } from '../types/techBlogType';

export const getTechBlogData = async ({ elasticId, pickSort }: GetTechBlogProps) => {
  console.log(elasticId);
  console.log(pickSort);
  const queryParams = {
    size: TECH_VIEW_SIZE,
    techArticleSort: pickSort,
    ...(elasticId && { elasticId }),
  };

  const res = await axios.get(`/devdevdev/api/v1/articles?`, {
    params: {
      ...queryParams,
    },
  });
  return res.data;
};

export const useInfiniteTechBlogData = (sortOption: DropdownOptionProps) => {
  const {
    data: techBlogData,
    fetchNextPage, // 다음 페이지의 데이터를 가져옴
    isFetchingNextPage, // 현재 다음 페이지를 가져오는지 여부
    hasNextPage, // 다음 페이지가 있는지
    status, // 쿼리의 상태
    error,
    isFetching, // 데이터를 가지고 오는지 여부
  } = useInfiniteQuery({
    queryKey: ['techBlogData', sortOption],
    // 데이터를 요청하는데 사용하는 함수
    queryFn: ({ pageParam }) => getTechBlogData({ elasticId: pageParam, pickSort: sortOption }),
    initialPageParam: '',
    // 다음 페이지를 가져오기 위한 파라미터 추출 함수
    // lastPage는 이전페이지에서 반환된 데이터를 받아 다음페이지에 필요한 파라미터를 추출한 데이터

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data.last) {
        return undefined;
      }
      const elasticId = lastPage.data.content?.elasticId;
      return elasticId;
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