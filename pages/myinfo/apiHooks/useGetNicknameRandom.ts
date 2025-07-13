import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { MYPAGE_NICKNAME_RANDOM } from '@/constants/apiConstants';

export const getNicknameRandom = async () => {
  const res = await axios.get(`${MYPAGE_NICKNAME_RANDOM}`);

  return res.data;
};

export const useGetNicknameRandom = () => {
  return useQuery({
    queryKey: ['getNicknameRandom'],
    queryFn: getNicknameRandom,
  });
};
