import axios from 'axios';

import { useEffect } from 'react';

import { baseUrlConfig } from '@/config';
import { useLoginStatusStore } from '@/stores/loginStore';

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
      return Promise.reject(error);
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
