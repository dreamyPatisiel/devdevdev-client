import { baseAPI } from '@/core/baseInstance';

export const getPickData = async ({ pageParam }: { pageParam: number }) => {
  const res = await baseAPI.get(`/pickData?page=${pageParam}`);

  return res.data;
};
