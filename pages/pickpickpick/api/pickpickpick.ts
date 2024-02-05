import { baseAPI } from '@/core/baseInstance';

export const getPickData = async ({ pageParam }: any) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await baseAPI.get(`/pickData?page=${pageParam}`);

  return res.data;
};
