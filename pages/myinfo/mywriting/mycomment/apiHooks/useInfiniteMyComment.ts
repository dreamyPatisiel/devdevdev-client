import axios from 'axios';

import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { MYPAGE_COMMENTS } from '@pages/myinfo/constants/apiConstants';
import { MYCOMMENT_VIEW_SIZE } from '@pages/myinfo/constants/myCommentConstants';

import { CommentFilterKey } from '../index.page';

interface GetMyCommentProps {
  size?: number;
  pickCommentId?: number;
  techCommentId?: number;
  commentFilter: CommentFilterKey;
}

const getMyComments = async ({
  size,
  pickCommentId,
  techCommentId,
  commentFilter,
}: GetMyCommentProps) => {
  const res = await axios.get(
    `${MYPAGE_COMMENTS}?size=${size}&pickCommentId=${pickCommentId}&techCommentId=${techCommentId}&commentFilter=${commentFilter}`,
  );

  return res.data;
};

export const useInfiniteMyComments = ({
  size,
  pickCommentId,
  techCommentId,
  commentFilter,
}: GetMyCommentProps) => {
  const {
    data: myCommentData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['myCommentsData', size, pickCommentId, techCommentId, commentFilter],
    queryFn: ({ pageParam }) => {
      return getMyComments({
        size: MYCOMMENT_VIEW_SIZE,
        pickCommentId: pageParam,
        techCommentId: pageParam,
        commentFilter: 'ALL',
      });
    },
    initialPageParam: Number.MAX_SAFE_INTEGER,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.last) {
        return undefined;
      }

      const lastMyCommentPickId = lastPage.data.content[MYCOMMENT_VIEW_SIZE - 1].pickCommentId;
      const lastMyCommentTechId = lastPage.data.content[MYCOMMENT_VIEW_SIZE - 1].techCommentId;

      if (commentFilter === 'PICK') {
        return lastMyCommentPickId;
      }

      if (commentFilter === 'TECH_ARTICLE') {
        return lastMyCommentTechId;
      }

      return { lastMyCommentPickId, lastMyCommentTechId };
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

  return { myCommentData, isFetchingNextPage, hasNextPage, status, onIntersect };
};
