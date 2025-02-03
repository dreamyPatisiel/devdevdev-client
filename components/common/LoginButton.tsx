import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { getCookie, checkLogin } from '@utils/getCookie';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import KakaoLogo from '@public/image/kakao_icon.svg';

import { loginConfig, baseUrlConfig } from '@/config';

export default function LoginButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { closeLoginModal } = useLoginModalStore();
  const { setLoginStatus } = useLoginStatusStore();
  const { setUserInfo } = useUserInfoStore();
  const { setToastVisible } = useToastVisibleStore();

  const URL = baseUrlConfig.serviceUrl || '';
  const END_PONIT = loginConfig.endPoint;
  const REDIRECT_URL = URL + END_PONIT;

  let retryCount = 0;
  const MAX_RETRY_COUNT = 300; //2초 x 300회 =  10분
  let intervalId: NodeJS.Timeout | null = null;

  const handleOpenModal = () => {
    const newWindow = window.open(REDIRECT_URL, '_blank', 'width=400,height=550');

    if (newWindow && !intervalId) {
      // 새탭의 위치를 중앙으로 조정
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const left = (screenWidth - 400) / 2;
      const top = (screenHeight - 550) / 2;
      newWindow.moveTo(left, top);

      intervalId = setInterval( () => {
        if (newWindow.closed) {
          clearInterval(intervalId!);
          intervalId = null;
          return;
        }

        const loginStatus =  checkLogin();
        // checking일땐 계속 폴링상태 유지

        if (loginStatus === 'active') {
          clearInterval(intervalId!);
          intervalId = null;
          newWindow.close();
          const accessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;
          const email = getCookie('DEVDEVDEV_MEMBER_EMAIL') as string;
          const nickname = getCookie('DEVDEVDEV_MEMBER_NICKNAME') as string;
          const isAdmin = getCookie('DEVDEVDEV_MEMBER_IS_ADMIN') as string;

          const userInfo = {
            accessToken: accessToken,
            email: email,
            nickname: decodeURIComponent(nickname).replace(/\+/g, ' '),
            isAdmin: isAdmin === 'true',
          };

          // store에 저장하는 로직
          setUserInfo(userInfo);
          setLoginStatus();
          // 기술블로그 추천 여부를 초기화 하기 위한 로직
          queryClient.invalidateQueries({ queryKey: ['techDetail'] });

          router.reload();
        }
        // checking 상태일때 최대 시도 횟수 초과시 로그인 실패 토스트 띄우기
        else {
          if (retryCount >= MAX_RETRY_COUNT) {
            console.error('로그인 실패');
            clearInterval(intervalId!);
            intervalId = null;
            newWindow.close();
            setToastVisible({ message: '로그인에 실패했어요. 다시 시도해주세요.', type: 'error' });
            closeLoginModal();
            return;
          }
        }
        retryCount += 1;
        closeLoginModal();
      }, 2 * 1000);
    }
  };

  return (
    <button
      onClick={handleOpenModal}
      className='bg-kakaoYellow text-black p2 font-bold p-[1.05rem] rounded-[0.8rem] flex items-center justify-center gap-[1rem] min-w-48 w-full'
      data-testid='kakaoButton'
    >
      <Image src={KakaoLogo} alt='카카오 로고' width={18} height={17} />
      카카오 로그인
    </button>
  );
}
