// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const deleteComment = async ({
  techArticleId,
  techCommentId, // 기술블로그 댓글 아이디
}: {
  techArticleId: number;
  techCommentId: number;
}) => {
  const res = await axios.delete<SuccessResponse<number>>(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/${techCommentId}`,
  );
  return res.data;
};

export const useDeleteComment = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: deleteComment,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      setToastVisible(errorMessage, 'error');
    },
  });
};
