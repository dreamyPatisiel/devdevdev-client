import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

import { POST_VOTE_SUCCESS } from '../constants/pickCommentConstants';

interface VoteDataProps {
  pickId?: string;
  pickOptionId?: number;
}

const postVote = async (voteData: VoteDataProps) => {
  const res = await axios.post('/devdevdev/api/v1/picks/vote', voteData);

  return res;
};

export const usePostVote = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postVote,
    onSuccess: () => setToastVisible(POST_VOTE_SUCCESS),
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible(UNDEFINED_ERROR_MESSAGE);
      }

      return setToastVisible(errorMessage);
    },
  });
};
