import axios from 'axios';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { ROUTES } from '@/constants/routes';

const useLogoutMutation = () => {
  const router = useRouter();
  const { setLogoutStatus } = useLoginStatusStore();
  const { closeModal } = useLoginModalStore();
  const { setToastVisible } = useToastVisibleStore();
  const queryClient = useQueryClient();
  const { removeUserInfo } = useUserInfoStore();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await axios.post('/devdevdev/api/v1/logout');
      return response.data;
    },
    onSuccess: (data) => {
      console.log('로그아웃 성공:', data);
      if (data?.resultType === 'SUCCESS') {
        removeUserInfo();
        setLogoutStatus();
        queryClient.invalidateQueries({ queryKey: ['pickData'] });
        closeModal();
        router.push(ROUTES.MAIN);
      }
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      closeModal();
      setToastVisible('로그아웃 실패', 'error');
    },
  });

  return logoutMutation;
};

export default useLogoutMutation;
