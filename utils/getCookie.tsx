import { MAX_RETRIES, RETRY_INTERVAL } from '@/constants/getCookieConstants';

/** 쿠키의 key값을 입력하면 value값을 리턴해주는 함수 */
export function getCookie(key: string) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [cookieName, cookieValue] = cookie.split('=');

    if (cookieName === key) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}

/** 로그인 성공 관련 쿠키값을 체크하고, 상태값을 리턴해주는 함수*/
export const checkLogin = (() => {
  let retryCount = 0; // 재귀 호출 횟수를 추적하는 변수

  const check = () => {
    const loginSuccess = getCookie('DEVDEVDEV_LOGIN_STATUS');
    console.log('loginSuccess값', loginSuccess);

    if (loginSuccess) {
      retryCount = 0; // 성공 시 카운트 초기화
      return loginSuccess; // 로그인 성공 시 쿠키 값 반환
    }

    if (retryCount >= 1000) {
      retryCount = 0; // 카운트 초기화
      return null; // 1000번 초과 시 null 반환
    }

    retryCount++; // 재귀 호출 횟수 증가
    setTimeout(check, RETRY_INTERVAL); // 재귀 호출
    return 'checking'; // 로그인 체크 중임을 나타내는 값 반환
  };

  return check; // 내부 함수를 반환
})();

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** GA 쿠키를 가져오는 비동기 함수*/
export const getGA = async (): Promise<string | undefined> => {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const GA = getCookie('_ga');

    if (GA) {
      return GA;
    }

    await wait(RETRY_INTERVAL); // 시간지연을 위함
  }

  console.error('Failed to get GA cookie after maximum retries');
  return undefined; // 적절한 실패 처리
};
