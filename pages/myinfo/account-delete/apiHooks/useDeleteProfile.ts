import axios from 'axios';

import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useLoginStatusStore } from '@stores/loginStore';
import { useUserInfoStore } from '@stores/userInfoStore';

const deleteProfile = async () => {
  const res = await axios.delete('/devdevdev/api/v1/mypage/profile');

  return res;
};

export const useDeleteProfile = () => {
  const router = useRouter();
  const { removeUserInfo } = useUserInfoStore();

  const { setLogoutStatus } = useLoginStatusStore();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: async () => {
      removeUserInfo();
      setLogoutStatus();
      await router.push('/account-delete-complete');
    },
  });
};
