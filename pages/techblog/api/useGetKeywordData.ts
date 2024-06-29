import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { SuccessResponse } from '@/types/successResponse';

import { KeyWordArr } from '../types/techBlogType';

export const getKeyWordData = async (keyword: string) => {
  const res = await axios.get<SuccessResponse<KeyWordArr>>(
    `/devdevdev/api/v1/keywords/auto-complete?prefix=${keyword}`,
  );
  return res.data;
};

export const useGetKeyWordData = (keyword: string) => {
  return useQuery({
    queryKey: ['keyword', keyword],
    queryFn: () => {
      return getKeyWordData(keyword);
    },
    // TODO: 타입 에러 해결
    select: (data) => data.datas,
    staleTime: 0,
    gcTime: 0,
  });
};
