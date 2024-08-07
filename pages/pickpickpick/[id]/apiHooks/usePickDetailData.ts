import axios from 'axios';

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { getGA } from '@utils/getCookie';

import { PickDetailData } from '../types/pickDetailData';

export const getPickDetailData = async (pickId: string) => {
  const GA = await getGA();

  const res = await axios.get(`/devdevdev/api/v1/picks/${pickId}`, {
    headers: { 'Anonymous-Member-Id': GA },
  });

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
