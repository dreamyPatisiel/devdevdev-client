// import { rest } from 'msw';
import { http, HttpResponse } from 'msw';
import { baseUrlConfig, loginConfig } from '@/config';

const URL = baseUrlConfig.serviceUrl || '';
const END_PONIT = loginConfig.endPoint || '';
const REDIRECT_URL = URL + END_PONIT;
const CLIENT_ID = loginConfig.clientId;

console.log('REDIRECT_URL: ', REDIRECT_URL);
console.log('CLIENT_ID : ', CLIENT_ID);

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

export const handlers = [
  http.get(kakaoAuthUrl, () => {
    return new HttpResponse(null, {
      headers: {
        Authorization: 'yes',
      },
    });
  }),
];
