import axios from 'axios';

import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

const useLogoutMutation = () => {
  const router = useRouter();
  const { setLogoutStatus } = useLoginStatusStore();
  const { closeModal } = useLoginModalStore();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await axios.post('/devdevdev/api/v1/logout');
      return response.data;
    },
    onSuccess: (data) => {
      console.log('로그아웃 성공:', data);
      if (data?.resultType === 'SUCCESS') {
        localStorage.removeItem('accessToken');
        setLogoutStatus();
        closeModal();
        router.push('/');
      }
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      closeModal();
      alert('로그아웃 실패');
    },
  });

  return logoutMutation;
};

export default useLogoutMutation;
