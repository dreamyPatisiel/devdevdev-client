import { baseAPI } from '@/core/baseInstance';
import axios from 'axios';

export const getPickData = async ({ pageParam }: any) => {
  const res = await baseAPI.get(`/pickData?page=${pageParam}`);
  console.log('data', res);
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
