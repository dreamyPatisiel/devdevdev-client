import axios from 'axios';

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { SimilarPickData } from '../types/similarPickData';

const getSimilarPick = async () => {
  const res = await axios.get('/devdevdev/api/v1/picks/27/similarties');

  return res;
};

export const useGetSimilarPick = (): UseQueryResult<SimilarPickData[]> => {
  return useQuery({
    queryKey: ['getSimilarPick'],
    queryFn: getSimilarPick,
    select: (data) => data.data.datas,
  });
};
