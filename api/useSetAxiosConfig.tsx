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
  const { userInfo, setUserInfo } = useUserInfoStore();

  // 로그인 상태가 바뀔때도 한번 토큰값을 확인
  useEffect(() => {
    if (loginStatus === 'login' && userInfo.accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.accessToken}`;
    }
    if (loginStatus === 'logout') {
      delete axios.defaults.headers.Authorization;
    }
  }, [loginStatus, userInfo]);

  const URL = baseUrlConfig.serviceUrl || '';
  axios.defaults.baseURL = URL;
  console.log('axios.defaults.baseURL', axios.defaults.baseURL);
  axios.defaults.withCredentials = true;

  // 요청
  axios.interceptors.request.use(
    (response) => {
      // FIXME: 첫 렌더링시 store에 저장된 userInfo로 꺼내오면 저장하기 전에 api를 요청해버려서 header에 토큰이 제대로 안들어가고 있는 상황입니다ㅜㅜ
      // 따라서 현재는 바로 로컬스토리지에 저장된 토큰값을 꺼내 저장중입니다..
      // 해결방법을 같이 고민해보아요 ㅜㅜ
      const userInfoLocalStorage = getUserInfoFromLocalStorage();

      if (userInfoLocalStorage?.accessToken) {
        const JWT_TOKEN = userInfoLocalStorage.accessToken;
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

              const prevUserInfo = JSON.parse(localStorage.getItem('userInfo') as string);

              const updatedUserInfo = {
                ...prevUserInfo,
                accessToken: getAccessToken,
              };

              localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

              axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${getAccessToken}`; // 기존 요청에 대한 토큰 설정

              return axios(originalRequest); // 원래 요청 다시 시도
            })
            .catch((error) => {
              console.error('토큰 재발급 실패', error);
              localStorage.removeItem('userInfo');
              setLogoutStatus();
              openModal();
              return Promise.reject(error);
            });
        }

        // 유효하지 않은 회원 입니다.
        // 잘못된 서명을 가진 JWT 입니다.
        localStorage.removeItem('userInfo');
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
