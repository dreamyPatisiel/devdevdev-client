import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

const deleteProfile = async () => {
  const res = await axios.delete('/devdevdev/api/v1/mypage/profile');

  return res;
};

export const useDeleteProfile = () => {
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => console.log('탈퇴갈완료~'),
  });
};
