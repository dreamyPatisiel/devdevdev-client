import axios from 'axios';
import { baseUrlConfig } from '@/config';

const useSetAxiosConfig = () => {
  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    (config) => {
      const JWT_TOKEN = localStorage.getItem('accessToken');
      if (JWT_TOKEN) {
        console.log(JWT_TOKEN, 'JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export default useSetAxiosConfig;
