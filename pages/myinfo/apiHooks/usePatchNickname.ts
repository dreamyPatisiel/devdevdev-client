import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { MYPAGE_NICKNAME } from '@/constants/apiConstants';
import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

export const patchNickname = async ({ nickname }: { nickname: string }) => {
  const res = await axios.patch(`${MYPAGE_NICKNAME}`, { nickname: nickname });

  return res.data;
};

export const usePatchNickname = () => {
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { setToastVisible } = useToastVisibleStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchNickname,
    onSuccess: (data) => {
      setUserInfo({ ...userInfo, nickname: data.data });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      setToastVisible({ message: errorMessage, type: 'error' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getNicknameChangeable'] });
    },
  });
};
