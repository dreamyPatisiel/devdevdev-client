import axios from 'axios';

import { useEffect, useRef } from 'react';

import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { baseUrlConfig } from '@/config';
import { useLoginStatusStore } from '@/stores/loginStore';
import { getCookie } from '@/utils/getCookie';

import * as Sentry from '@sentry/nextjs';

const useSetAxiosConfig = () => {
  const { loginStatus, setLogoutStatus } = useLoginStatusStore();
  const { userInfo, setUserInfo, removeUserInfo } = useUserInfoStore();
  const { openLoginModal } = useLoginModalStore();
  const loginStatusRef = useRef(loginStatus);

  // 로그인 상태가 바뀔 때 토큰 값 확인
  useEffect(() => {
    loginStatusRef.current = loginStatus;
    if (loginStatus === 'login' && userInfo.accessToken) {
      const JWT_TOKEN = userInfo.accessToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;
    }

    if (loginStatus === 'logout' || loginStatus === 'account-delete') {
      delete axios.defaults.headers.Authorization;
    }
  }, [loginStatus, userInfo.accessToken]);

  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  axios.defaults.withCredentials = true;

  // 요청 인터셉터
  axios.interceptors.request.use(
    async (request) => {
      if (
        !request.headers.Authorization &&
        loginStatusRef.current === 'login' &&
        userInfo.nickname !== '정보 없음'
      ) {
        const JWT_TOKEN = userInfo.accessToken;
        request.headers.Authorization = `Bearer ${JWT_TOKEN}`;
      }

      // 로그아웃일때는 토큰 삭제
      if (loginStatusRef.current === 'logout' || loginStatusRef.current === 'account-delete') {
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
        try {
          // 토큰 갱신 요청에 대한 커스텀 인터셉터 생성
          const refreshTokenRequest = async () => {
            return new Promise<string>((resolve, reject) => {
              axios
                .post('/devdevdev/api/v1/token/refresh')
                .then((response) => {
                  const newAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN');
                  if (!newAccessToken) {
                    reject(new Error('토큰 갱신 실패: 새로운 토큰을 찾을 수 없습니다.'));
                    return;
                  }
                  resolve(newAccessToken);
                })
                .catch(reject);
            });
          };

          const newAccessToken = await refreshTokenRequest();

          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`; // 기존 axios 인스턴스에 토큰 갱신

          // 기존 토큰을 사용하지 않도록 새로운 axios인스턴스 생성 후 요청을 리턴
          const retryResponse = await axios.create({
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': originalRequest.headers['Content-Type'],
            },
          });

          const updatedUserInfo = {
            accessToken: newAccessToken,
            email: userInfo.email,
            nickname: userInfo.nickname,
            isAdmin: userInfo.isAdmin,
          };
          setUserInfo(updatedUserInfo);

          return retryResponse;
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
          openLoginModal();
          return Promise.reject(tokenRefreshError);
        }
      }

      // 유효하지 않은 회원 또는 잘못된 서명 처리
      if (res?.errorCode === 401) {
        removeUserInfo();
        setLogoutStatus();
        openLoginModal();
        console.error('유효하지 않은 회원입니다.', error);
      }

      return Promise.reject(error);
    },
  );
};

export default useSetAxiosConfig;
