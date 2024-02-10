import { baseAPI } from '@/core/baseInstance';

export const getPickData = async ({ pageParam }: any) => {
  const res = await baseAPI.get(`/pickData?page=${pageParam}`);

  return res.data;
};
