import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

export type SuccessResponse<T> = {
  resultType: string;
  datas: T; // 기술블로그 검색어 배열 데이터 형태
};

export interface TypeBlames {
  id: number;
  reason: string;
  sortOrder: number;
}

export const getBlames = async () => {
  const res = await axios.get<SuccessResponse<TypeBlames[]>>(`/devdevdev/api/v1/blames`);
  return res?.data;
};

export const useGetBlames = () => {
  return useQuery({
    queryKey: ['blames'],
    queryFn: () => {
      return getBlames();
    },
    select: (data) => data.datas,
  });
};
