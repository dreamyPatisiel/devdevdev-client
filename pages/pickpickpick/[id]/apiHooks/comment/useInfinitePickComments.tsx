import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';
import { PICK_COMMENT_VIEW_SIZE } from '@pages/pickpickpick/constants/pickConstants';

import { PickCommentDropdownProps, useDropdownStore } from '@stores/dropdownStore';

interface GetPickCommentsProp {
  pickId: string;
  pickCommentId?: number;
  size?: number;
  pickCommentSort?: PickCommentDropdownProps;
  pickOptionType?: string;
}

const getPickComments = async ({
  pickId,
  pickCommentId,
  size,
  pickCommentSort,
  pickOptionType,
}: GetPickCommentsProp) => {
  const res = await axios.get(
    `${GET_PICK_DATA}/${pickId}/comments?pickCommentId=${pickCommentId}&size=${size}&pickCommentSort=${pickCommentSort}&pickOptionType=${pickOptionType}`,
  );

  return res.data;
};

export const useInfinitePickComments = ({
  pickId,
  pickCommentSort,
  pickOptionType,
}: GetPickCommentsProp) => {
  const {
    data: pickCommentsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['pickCommentData', pickId, pickOptionType, pickCommentSort],
    queryFn: ({ pageParam }) => {
      return getPickComments({
        pickId,
        pickCommentId: pageParam,
        size: PICK_COMMENT_VIEW_SIZE,
        pickCommentSort,
        pickOptionType,
      });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.last) {
        return undefined;
      }

      const lastPickId = lastPage?.data.content[PICK_COMMENT_VIEW_SIZE]?.id;
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

  return { pickCommentsData, fetchNextPage, onIntersect };
};
