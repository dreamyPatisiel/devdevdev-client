import { http, HttpResponse } from 'msw';
import { baseUrlConfig, loginConfig } from '@/config';

const URL = baseUrlConfig.serviceUrl || '';
const END_PONIT = loginConfig.endPoint || '';
const REDIRECT_URI = URL + END_PONIT;
const CLIENT_ID = loginConfig.clientId;

// const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const handlers = [
  http.get('https://kauth.kakao.com/oauth/authorize', ({ request }: { request: any }) => {
    const searchParam = request?.url.searchParams;

    const clientId = searchParam.get('client_id');
    const redirectUri = searchParam.get('redirect_uri');
    const responseType = searchParam.get('response_type');

    if (clientId !== CLIENT_ID || redirectUri !== REDIRECT_URI || responseType !== 'code') {
      return new HttpResponse(null, { status: 404 });
    }

    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'yes',
      },
    });
  }),
];
