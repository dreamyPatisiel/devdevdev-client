import { baseAPI } from '@/core/baseInstance';

export const getPickData = async ({ pageParam }: any) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await baseAPI.get(`/pickData?page=${pageParam}`);

  return res.data;
};
//   try {
//     const res = await baseAPI.get('/pickData');
//     console.log('res', res);
//     return res.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
