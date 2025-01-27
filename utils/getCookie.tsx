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

/** 로그인 성공 관련 쿠키값을 체크하고, 상태값을 리턴해주는 함수 */
export const checkLogin = (attempt: number = 0) => {
  const loginSuccess = getCookie('DEVDEVDEV_LOGIN_STATUS');
  const MAX_ATTEMPTS = 1000; // 최대 시도 횟수 설정

  if (loginSuccess) {
    return loginSuccess;
  } else if (attempt < MAX_ATTEMPTS) {
    setTimeout(() => checkLogin(attempt + 1), RETRY_INTERVAL);
  } else {
    console.error('로그인 최대 시도 횟수를 초과했습니다.'); // 실패 처리
    return null; // 실패 시 null 반환
  }
};

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
