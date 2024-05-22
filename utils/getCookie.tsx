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
export const checkLogin = () => {
  const loginSuccess = getCookie('DEVDEVDEV_LOGIN_STATUS');
  if (loginSuccess) {
    return loginSuccess;
  } else {
    setTimeout(checkLogin, 1000);
  }
};

export const getGA = () => {
  const GA = getCookie('_ga');

  if (GA) {
    return GA;
  } else {
    setTimeout(getGA, 1000);
  }
};
1;
