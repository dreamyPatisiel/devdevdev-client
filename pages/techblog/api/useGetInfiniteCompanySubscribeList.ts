import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { COMPANY_SUBSCRIBE_VIEW_SIZE } from '../constants/techBlogConstants';
import { GetCompanySubscribeProps } from '../types/techCompanySubscribeType';

// 필요한 상수 및 타입을 정의합니다.

export const getCompanySubscribeList = async ({ companyId, size }: GetCompanySubscribeProps) => {
  const queryParams = {
    size: size ? size : COMPANY_SUBSCRIBE_VIEW_SIZE,
    ...(companyId && { companyId }),
  };

  const res = await axios.get('/devdevdev/api/v1/subscriptions/companies?', {
    params: {
      ...queryParams,
    },
  });
  return res.data;
};

export const useInfiniteCompanySubscribeList = (companyId?: number, size?: number) => {
  const {
    data: companySubscribeList,
    fetchNextPage, // 다음 페이지의 데이터를 가져옴
    isFetchingNextPage, // 현재 다음 페이지를 가져오는지 여부
    hasNextPage, // 다음 페이지가 있는지
    status, // 쿼리의 상태
    error,
    isFetching, // 데이터를 가지고 오는지 여부
  } = useInfiniteQuery({
    queryKey: ['companySubscribeList', companyId, size],
    // 데이터를 요청하는데 사용하는 함수
    queryFn: ({ pageParam }) => {
      return getCompanySubscribeList({
        companyId: companyId,
        size: size,
      });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }
      const companyId = lastPage.data.content[COMPANY_SUBSCRIBE_VIEW_SIZE - 1]?.companyId;
      return JSON.stringify({ companyId: companyId });
    },
  });

  const onNextButtonClick = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  return {
    companySubscribeList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onNextButtonClick,
  };
};
