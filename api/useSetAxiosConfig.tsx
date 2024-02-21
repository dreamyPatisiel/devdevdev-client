import axios from 'axios';

import { useEffect } from 'react';

import { baseUrlConfig } from '@/config';
import { useLoginStatusStore } from '@/stores/loginStore';
import { getCookie } from '@/utils/getCookie';

const useSetAxiosConfig = () => {
  const { loginStatus } = useLoginStatusStore();
  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    (response) => {
      const JWT_TOKEN = localStorage.getItem('accessToken');
      if (JWT_TOKEN) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;
      }
      return response;
    },
    (error) => {
      if (error.response.data.errorCode === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage === '만료된 JWT 입니다.') {
          return axios
            .get('/devdevdev/api/v1/token/refresh')
            .then((response) => {
              const accessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;
              localStorage.setItem('accessToken', accessToken);
              axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              console.log('토큰 재발급 성공! ', response);
            })
            .catch((error) => {
              console.log('토큰 재발급 실패');
              return Promise.reject(error);
            });
        }
        return Promise.reject(error);
      }
    },
  );
  useEffect(() => {
    const JWT_TOKEN = localStorage.getItem('accessToken');
    if (JWT_TOKEN) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;
    }
  }, [loginStatus]); // 로그인 상태가 바뀔때도 한번 토큰값을 확인해야함
};

export default useSetAxiosConfig;
