import axios from 'axios';

import { useEffect } from 'react';

import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { baseUrlConfig } from '@/config';
import { useLoginStatusStore } from '@/stores/loginStore';
import { getCookie } from '@/utils/getCookie';

const useSetAxiosConfig = () => {
  const { loginStatus, setLogoutStatus } = useLoginStatusStore();
  const { userInfo, setUserInfo, removeUserInfo } = useUserInfoStore();

  // 로그인 상태가 바뀔때도 한번 토큰값을 확인
  useEffect(() => {
    if (loginStatus === 'login' && userInfo.accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.accessToken}`;
    }
    if (loginStatus === 'logout') {
      delete axios.defaults.headers.Authorization;
    }
  }, [loginStatus]);

  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  console.log('axios.defaults.baseURL', axios.defaults.baseURL);
  axios.defaults.withCredentials = true;

  // 요청
  axios.interceptors.request.use(
    (response) => {
      if (userInfo?.accessToken) {
        const JWT_TOKEN = userInfo.accessToken;
        response.headers.Authorization = `Bearer ${JWT_TOKEN}`;
        return response;
      }

      if (loginStatus === 'logout') {
        delete response.headers.Authorization;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답
  const { openModal } = useLoginModalStore();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config; // 기존 요청
      console.log('error.config', originalRequest);
      const res = error.response?.data;

      if (res?.errorCode === 401) {
        if (res?.message === '만료된 JWT 입니다.' && !originalRequest._retry) {
          originalRequest._retry = true; // 재시도 여부 플래그

          return axios
            .post('/devdevdev/api/v1/token/refresh')
            .then((response) => {
              console.log('response', response);

              const getAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;

              console.log('getAccessToken :', getAccessToken);

              const updatedUserInfo = {
                email:userInfo.email,
                nickname:userInfo.nickname,
                accessToken: getAccessToken,
              };

              setUserInfo(updatedUserInfo);

              axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${getAccessToken}`; // 기존 요청에 대한 토큰 설정

              return axios(originalRequest); // 원래 요청 다시 시도
            })
            .catch((error) => {
              console.error('토큰 재발급 실패', error);
              removeUserInfo();
              setLogoutStatus();
              openModal();
              return Promise.reject(error);
            });
        }

        // 유효하지 않은 회원 입니다.
        // 잘못된 서명을 가진 JWT 입니다.
        removeUserInfo();
        setLogoutStatus();
        openModal();
        console.error('유효하지 않은 회원입니다.', error);
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};

export default useSetAxiosConfig;
