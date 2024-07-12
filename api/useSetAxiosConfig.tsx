import axios from 'axios';

import { useEffect } from 'react';

import getUserInfoFromLocalStorage from '@utils/getUserInfo';

import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { baseUrlConfig } from '@/config';
import { useLoginStatusStore } from '@/stores/loginStore';
import { getCookie } from '@/utils/getCookie';

const useSetAxiosConfig = () => {
  const { loginStatus, setLogoutStatus } = useLoginStatusStore();
  const { userInfo, setUserInfo, removeUserInfo } = useUserInfoStore();
  const { openModal } = useLoginModalStore();

  let preToken = '';

  useEffect(() => {
    console.log('userInfo ❤️', userInfo);
  }, [userInfo.accessToken]);

  // 로그인 상태가 바뀔 때 토큰 값 확인
  useEffect(() => {
    console.log('loginStatus', loginStatus);

    if (loginStatus === 'login' && userInfo.accessToken) {
      const getAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;
      const JWT_TOKEN = userInfo.accessToken;

      console.log('쿠키 accessToken : ', getAccessToken);
      console.log('userInfo accessToken', JWT_TOKEN);

      axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;
    }
    if (loginStatus === 'logout') {
      delete axios.defaults.headers.Authorization;
    }
  }, [loginStatus]);

  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  console.log('axios.defaults.baseURL', axios.defaults.baseURL);
  axios.defaults.withCredentials = true;

  // 요청 인터셉터
  axios.interceptors.request.use(
    (request) => {
      if (preToken !== userInfo?.accessToken) {
        const JWT_TOKEN = userInfo.accessToken;
        const getAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;

        console.log('리퀘스트시 userInfo accessToken : ', JWT_TOKEN);
        console.log('리퀘스트시 쿠키의 accessToken : ', getAccessToken);
        const userInfoLocal = getUserInfoFromLocalStorage;
        console.log('userInfoLocal', userInfoLocal);

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
      const originalRequest = error.config; // 기존 요청
      console.log('error.config', originalRequest);
      const res = error.response?.data;

      if (
        res?.errorCode === 401 &&
        res?.message === '만료된 JWT 입니다.' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // 재시도 여부 플래그
        preToken = userInfo.accessToken;
        try {
          const refreshResponse = await axios.post('/devdevdev/api/v1/token/refresh');
          console.log('refreshResponse', refreshResponse);

          const getAccessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;
          console.log('401일 때 accessToken :', getAccessToken);

          const updatedUserInfo = {
            accessToken: getAccessToken,
            email: userInfo.email,
            nickname: userInfo.nickname,
          };

          // 상태 업데이트
          setUserInfo(updatedUserInfo);

          console.log('401일 때 userInfo', userInfo.accessToken);

          // 새로운 토큰을 사용해 다시 요청 설정
          axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${getAccessToken}`;

          // 상태 업데이트 후 재요청
          return axios(originalRequest);
        } catch (tokenRefreshError) {
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
