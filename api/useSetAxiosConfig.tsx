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
  // 요청
  axios.interceptors.request.use(
    (response) => {
      const JWT_TOKEN = localStorage.getItem('accessToken');
      if (JWT_TOKEN) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  // 응답 
  axios.interceptors.response.use(
    response => {
      return response;
    },
    (error) => {
      const res = error.response.data;
      if (res?.errorCode === 400) {
        if (res.message === '만료된 JWT 입니다.') {
          return axios
            .get('/devdevdev/api/v1/token/refresh')
            .then((response) => {
              const accessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;
              localStorage.setItem('accessToken', accessToken);
              axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              return axios.request(error.config); 
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
