import axios from 'axios';
import { getCookie } from '@/utils/getCookie';

export const refreshToken = async (): Promise<string> => {
  try {
    await axios.post('/devdevdev/api/v1/token/refresh');
    const newAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN');
    
    if (!newAccessToken) {
      throw new Error('토큰 갱신 실패: 새로운 토큰을 찾을 수 없습니다.');
    }
    
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};