import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';
import { PICK_COMMENT_VIEW_SIZE } from '@pages/pickpickpick/constants/pickConstants';

import { PickCommentDropdownProps } from '@stores/dropdownStore';

interface GetPickCommentsProp {
  pickId: string;
  pickCommentId?: number;
  size?: number;
  pickCommentSort?: PickCommentDropdownProps;
  pickOptionTypes?: string;
}

const getPickComments = async ({
  pickId,
  pickCommentId,
  size,
  pickCommentSort,
  pickOptionTypes,
}: GetPickCommentsProp) => {
  const res = await axios.get(
    `${GET_PICK_DATA}/${pickId}/comments?pickCommentId=${pickCommentId}&size=${size}&pickCommentSort=${pickCommentSort}&pickOptionTypes=${pickOptionTypes}`,
  );

  return res.data;
};

export const useInfinitePickComments = ({
  pickId,
  pickCommentSort,
  pickOptionTypes,
  size,
}: GetPickCommentsProp) => {
  const {
    data: pickCommentsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['pickCommentData', pickId, pickOptionTypes, pickCommentSort, size],
    queryFn: ({ pageParam }) => {
      return getPickComments({
        pickId,
        pickCommentId: pageParam,
        size: PICK_COMMENT_VIEW_SIZE,
        pickCommentSort,
        pickOptionTypes,
      });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      console.log('lastPage', lastPage);
      if (lastPage?.data.last) {
        return undefined;
      }

      const lastPickId = lastPage?.data.content[PICK_COMMENT_VIEW_SIZE - 1]?.pickCommentId;
      return lastPickId ?? undefined;
    },
    enabled: !!pickId,
  });

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!isFetching && entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  return { pickCommentsData, isFetchingNextPage, hasNextPage, status, onIntersect };
};
