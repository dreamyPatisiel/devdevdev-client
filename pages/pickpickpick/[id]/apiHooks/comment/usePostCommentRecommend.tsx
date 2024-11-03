import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

interface PostCommentRecommendProp {
  pickId: string;
  pickCommentId: number;
}

const postCommentRecommend = async ({ pickId, pickCommentId }: PostCommentRecommendProp) => {
  const res = await axios.post(`${GET_PICK_DATA}/${pickId}/comments/${pickCommentId}/recommends`);

  return res.data;
};

export const usePostCommentRecommend = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postCommentRecommend,
    onSuccess: (success) => {
      if (success.data.isRecommended) {
        return setToastVisible('댓글을 추천했어요!');
      }

      setToastVisible('댓글 추천을 취소했어요!');
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible(UNDEFINED_ERROR_MESSAGE, 'error');
      }

      return setToastVisible(errorMessage, 'error');
    },
  });
};
