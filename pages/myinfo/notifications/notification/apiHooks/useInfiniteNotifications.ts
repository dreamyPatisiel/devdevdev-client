import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  GET_MY_SUBSCRIPTION_SIZE_MOBILE,
  GET_MY_SUBSCRIPTION_SIZE_WEB,
} from '@pages/myinfo/constants/apiParams';

import { NOTIFICATIONS_PAGE } from '@/constants/apiConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

const getNotificationsPage = async ({
  size,
  notificationId,
}: {
  size: number;
  notificationId: number;
}) => {
  const queryParmas = {
    size,
    notificationId,
  };
  const res = await axios.get(`${NOTIFICATIONS_PAGE}`, {
    params: {
      ...queryParmas,
    },
  });

  return res?.data;
};

export const useInfiniteNotificationsPage = () => {
  const { isMobile } = useMediaQueryContext();

  const size = isMobile ? GET_MY_SUBSCRIPTION_SIZE_MOBILE : GET_MY_SUBSCRIPTION_SIZE_WEB;

  const {
    data: notificationsPageData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['notificationsPage', size],
    queryFn: ({ pageParam }) => {
      return getNotificationsPage({ size, notificationId: pageParam });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }
      const lastNotificationId = lastPage?.data.content[size - 1]?.notificationId;
      return lastNotificationId ?? undefined;
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
    notificationsPageData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  };
};
