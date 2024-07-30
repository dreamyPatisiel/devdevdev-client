import axios from 'axios';

import { useEffect } from 'react';

import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { baseUrlConfig } from '@/config';
import { useLoginStatusStore } from '@/stores/loginStore';
import { getCookie } from '@/utils/getCookie';

import * as Sentry from '@sentry/nextjs';

const useSetAxiosConfig = () => {
  const { loginStatus, setLogoutStatus } = useLoginStatusStore();
  const { userInfo, setUserInfo, removeUserInfo } = useUserInfoStore();
  const { openModal } = useLoginModalStore();

  let preToken = '';

  // 로그인 상태가 바뀔 때 토큰 값 확인
  useEffect(() => {
    if (loginStatus === 'login' && userInfo.accessToken) {
      const JWT_TOKEN = userInfo.accessToken;

      axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;
    }

    if (loginStatus === 'logout') {
      delete axios.defaults.headers.Authorization;
    }
  }, [loginStatus]);

  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  axios.defaults.withCredentials = true;

  // 요청 인터셉터
  axios.interceptors.request.use(
    (request) => {
      if (preToken !== '' && preToken !== userInfo?.accessToken) {
        const JWT_TOKEN = userInfo.accessToken;

        request.headers.Authorization = `Bearer ${JWT_TOKEN}`;
      }

      if (loginStatus === 'logout') {
        delete request.headers.Authorization;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (!error.config || !error.response) {
        Sentry.captureException(error);
        return Promise.reject(error);
      }

      const { method, url, params, data: requestData, headers } = error.config;
      const { data: responseData, status } = error.response;
      const authHeader = headers['Authorization'];
      const anonymousMemberIdHeader = headers['Anonymous-Member-Id'];

      Sentry.withScope((scope) => {
        scope.setContext('API Request Detail', {
          method,
          url,
          params,
          requestData,
          authHeader,
          anonymousMemberIdHeader,
        });

        scope.setContext('API Response Detail', {
          status,
          responseData,
        });

        Sentry.captureException(error); // 응답 에러 객체 Sentry에 전달
      });

      const originalRequest = error.config; // 기존 요청
      const res = error.response?.data;

      if (
        res?.errorCode === 401 &&
        res?.message === '만료된 JWT 입니다.' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // 재시도 여부 플래그
        preToken = userInfo.accessToken;
        try {
          await axios.post('/devdevdev/api/v1/token/refresh');

          const getAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;

          const updatedUserInfo = {
            accessToken: getAccessToken,
            email: userInfo.email,
            nickname: userInfo.nickname,
          };

          // 상태 업데이트
          setUserInfo(updatedUserInfo);

          // 새로운 토큰을 사용해 다시 요청 설정
          axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${getAccessToken}`;

          // 상태 업데이트 후 재요청
          return axios(originalRequest);
        } catch (tokenRefreshError: any) {
          Sentry.withScope((scope) => {
            scope.setContext('API Request Detail', {
              method,
              url,
              params,
              requestData,
              authHeader,
              anonymousMemberIdHeader,
            });

            scope.setContext('API Response Detail', {
              status,
              responseData,
            });

            Sentry.captureException(tokenRefreshError); // 토큰 재발급 실패 에러 객체 Sentry에 전달
          });

          console.error('토큰 재발급 실패', tokenRefreshError);
          removeUserInfo();
          setLogoutStatus();
          openModal();
          return Promise.reject(tokenRefreshError);
        }
      }

      // 유효하지 않은 회원 또는 잘못된 서명 처리
      if (res?.errorCode === 401) {
        removeUserInfo();
        setLogoutStatus();
        openModal();
        console.error('유효하지 않은 회원입니다.', error);
      }

      return Promise.reject(error);
    },
  );
};

export default useSetAxiosConfig;
