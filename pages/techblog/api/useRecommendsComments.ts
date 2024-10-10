import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import { TypeTechRecommendsStatus } from '../types/techCommentsType';

export const postRecommendComment = async ({
  techArticleId,
  techCommentId,
}: {
  techArticleId: number;
  techCommentId: number;
}) => {
  const res = await axios.post<SuccessResponse<TypeTechRecommendsStatus>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/${techCommentId}/recommends`,
  );
  return res.data;
};

export const usePostRecommendComment = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postRecommendComment,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      setToastVisible(errorMessage, 'error');
    },
  });
};
