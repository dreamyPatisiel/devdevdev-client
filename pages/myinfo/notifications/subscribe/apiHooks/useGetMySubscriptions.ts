import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  GET_MY_SUBSCRIPTION_SIZE_MOBILE,
  GET_MY_SUBSCRIPTION_SIZE_WEB,
} from '@pages/myinfo/constants/apiParams';

import { MYPAGE_SUBSCRIPTIONS_COMPANIES } from '@/constants/apiConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

const getMySubscriptions = async ({ size, companyId }: { size: number; companyId: number }) => {
  const queryParmas = {
    size,
    companyId,
  };
  const res = await axios.get(`${MYPAGE_SUBSCRIPTIONS_COMPANIES}`, {
    params: {
      ...queryParmas,
    },
  });

  return res?.data;
};

export const useGetMySubscriptions = () => {
  const { isMobile } = useMediaQueryContext();

  const size = isMobile ? GET_MY_SUBSCRIPTION_SIZE_MOBILE : GET_MY_SUBSCRIPTION_SIZE_WEB;

  const {
    data: mySubscriptionsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['mySubscriptions', size],
    queryFn: ({ pageParam }) => {
      return getMySubscriptions({ size, companyId: pageParam });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }
      const lastCompanyId = lastPage?.data.content[size - 1]?.companyId;
      return lastCompanyId ?? undefined;
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
    mySubscriptionsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
