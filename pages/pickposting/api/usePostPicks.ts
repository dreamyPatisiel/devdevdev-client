import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { PostPicksProps } from '@pages/types/postPicks';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

export const postPicks = async (picksData: PostPicksProps) => {
  const res = await axios.post('/devdevdev/api/v1/picks', picksData);
  return res;
};

export const usePostPicks = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postPicks,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible(UNDEFINED_ERROR_MESSAGE);
      }

      return setToastVisible(errorMessage);
    },
  });
};
