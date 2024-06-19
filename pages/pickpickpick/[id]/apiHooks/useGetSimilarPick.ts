import axios from 'axios';

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { SimilarPickData } from '../types/similarPickData';

const getSimilarPick = async (pickId: string) => {
  const res = await axios.get(`/devdevdev/api/v1/picks/${pickId}/similarties`);

  return res;
};

export const useGetSimilarPick = (pickId: string): UseQueryResult<SimilarPickData[]> => {
  return useQuery({
    queryKey: ['getSimilarPick'],
    queryFn: () => getSimilarPick(pickId),
    select: (data) => data.data.datas,
    enabled: !!pickId,
  });
};
