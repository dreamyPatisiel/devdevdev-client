import { baseAPI } from '@/core/baseInstance';
import axios from 'axios';

export const getPickData = async () => {
  const data = await baseAPI.get('/pickData');

  return data.data;
  //   try {
  //     const res = await baseAPI.get('/pickData');
  //     console.log('res', res);
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
};
