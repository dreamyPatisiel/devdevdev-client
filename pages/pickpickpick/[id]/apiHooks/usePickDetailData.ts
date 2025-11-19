import axios from 'axios';

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { PickDetailData } from '../types/pickDetailData';

export const getPickDetailData = async (pickId: string) => {
  const res = await axios.get(`/devdevdev/api/v2/picks/${pickId}`);
  return res;
};

export const useGetPickDetailData = (pickId: string): UseQueryResult<PickDetailData> => {
  return useQuery({
    queryKey: ['getDetailPickData', pickId],
    queryFn: () => getPickDetailData(pickId),
    select: (data) => data.data.data,
    enabled: !!pickId,
    retry: 1,
  });
};
