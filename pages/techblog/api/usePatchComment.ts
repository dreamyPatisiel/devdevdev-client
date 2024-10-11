// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const patchComment = async ({
  techArticleId,
  techCommentId,
  contents,
}: {
  techArticleId: number;
  techCommentId: number;
  contents: string;
}) => {
  const res = await axios.post<SuccessResponse<number>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/${techCommentId}`,
    {
      contents: contents,
    },
  );
  return res.data;
};

export const usePatchComment = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: patchComment,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      setToastVisible(errorMessage, 'error');
    },
  });
};