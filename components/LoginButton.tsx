import React from 'react';
import { useRouter } from 'next/router';
import KakaoLogo from '@/public/image/kakao_icon.svg';
import { loginConfig, baseUrlConfig } from '@/config';
import { getCookie, checkLogin } from 'utils/getCookie';
import { useModalStore } from '@/store/modalStore';
import { useLoginStatusStore } from '@/store/loginStore';

export default function LoginButton() {
  const router = useRouter();
  const URL = baseUrlConfig.serviceUrl || '';
  const END_PONIT = loginConfig.endPoint;
  const REDIRECT_URL = URL + END_PONIT;
  const { closeModal } = useModalStore();
  const { fetchLogin } = useLoginStatusStore();

  const handleOpenModal = () => {
    const newWindow = window.open(REDIRECT_URL, '_blank', 'width=400,height=550');

    if (newWindow) {
      // 새탭의 위치를 중앙으로 조정
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const left = (screenWidth - 400) / 2;
      const top = (screenHeight - 550) / 2;
      newWindow.moveTo(left, top);

      const intervalId = setInterval(() => {
        const loginStatus = checkLogin();
        if (loginStatus) {
          clearInterval(intervalId); // 폴링 중지
          newWindow.close(); // 새 창 닫기
          if (loginStatus === 'active') {
            console.log('로그인 성공');
            const accessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;
            localStorage.setItem('accessToken', accessToken);
            fetchLogin();
            router.push('/');
          } else {
            console.log('로그인 실패');
            alert('다시 시도해주세요.');
          }
          closeModal();
        }
      }, 2 * 1000);
    }
  };

  return (
    <>
      {/* FIXME: 추후에 디자인 나오면 css 수정하기 */}
      {/* <Link href={REDIRECT_URL}> */}
      <button
        onClick={handleOpenModal}
        className='bg-kakaoYellow text-black text-l p-2.5 rounded-md flex items-center justify-center gap-3 min-w-48 w-full'
        data-testid='kakaoButton'
      >
        <KakaoLogo alt='카카오 로고' width={24} height={24} />
        카카오 로그인
      </button>
      {/* </Link> */}
    </>
  );
}
