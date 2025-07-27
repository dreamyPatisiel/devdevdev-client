import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { MYPAGE_NICKNAME_CHANGEABLE } from '@/constants/apiConstants';

export const getNicknameChangeable = async () => {
  const res = await axios.get(`${MYPAGE_NICKNAME_CHANGEABLE}`);

  return res.data;
};

export const useGetNicknameChangeable = () => {
  return useQuery({
    queryKey: ['getNicknameChangeable'],
    queryFn: getNicknameChangeable,
    select: (data) => data.data,
  });
};
