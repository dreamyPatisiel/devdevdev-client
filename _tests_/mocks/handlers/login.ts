import { http, HttpResponse } from 'msw';

import { baseUrlConfig, loginConfig } from '@/config';

const URL = baseUrlConfig.serviceUrl || '';
const END_POINT = loginConfig.endPoint || '';
const REDIRECT_URI = URL + END_POINT;
const CLIENT_ID = loginConfig.clientId;

export const loginHandler = http.get(
  'https://kauth.kakao.com/oauth/authorize',
  ({ request }: { request: any }) => {
    // 이렇게 하면 일단 브라우저에선 잘 동작
    // 하지만 testcode를 터미널에서 돌릴땐 request이 undefined로 떠서 안되는중
    // 실제 테스트 코드에서 fireEvent를 발생시킬때 브라우저 환경과 동일한 req값을 보낼 수 있는지 찾아봐야 할 것 같음..
    const url = new window.URL(request.url);
    const params = new URLSearchParams(url.search);

    const clientId = params?.get('client_id');
    const redirectUri = params?.get('redirect_uri');
    const responseType = params?.get('response_type');

    console.log('clientId:', clientId + '1');
    console.log('redirect_uri: ', redirectUri);
    console.log('responseType: ', responseType);

    if (clientId !== CLIENT_ID || redirectUri !== REDIRECT_URI || responseType !== 'code') {
      return new HttpResponse('요청 파라미터가 잘못되었습니다.', { status: 404 });
    }

    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'yes',
      },
    });
  },
);
