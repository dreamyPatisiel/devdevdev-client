import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/login/index';
import { server } from './mocks/server';

describe('로그인 버튼 컴포넌트', () => {
  it('로그인버튼이 렌더링 되야한다.', async () => {
    render(<LoginPage />);

    const loginButton = screen.getByAltText('카카오 로그인 버튼');
    expect(loginButton).toBeInTheDocument();
  });
});

// describe('LoginPage 컴포넌트', () => {
//   it('로그인 버튼을 클릭하면 올바른 URL로 라우팅되어야 한다.', () => {
//     const { getByTestId } = render(<LoginPage />);
//     const linkElement = getByTestId('kakaoLink');
//     const hrefValue = linkElement.getAttribute('href');

//     // href값이 설정한 주소값과 일치하는지
//     expect(hrefValue).toBe(
//       'https://kauth.kakao.com/oauth/authorize?client_id=6479cf393f012936a0da49f7dd2f88eb&redirect_uri=http://localhost:8080/login/oauth2/code/kakao&response_type=code',
//     );
//   });
// });

describe('LoginPage 컴포넌트', () => {
  it('카카오 Redirect URL로 GET 요청을 보냈을 때 토큰값이 잘 넘어와야한다.', async () => {
    const { getByTestId } = render(<LoginPage />);
    const btnElement = getByTestId('kakaoButton');
    // 특정 URL로 GET 요청을 시뮬레이션
    fireEvent.click(btnElement);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=6479cf393f012936a0da49f7dd2f88eb&redirect_uri=http://localhost:8080/login/oauth2/code/kakao&response_type=code`;

    await waitFor(async () => {
      const handlerForKakaoAuthUrl = server.currentHandlers.find(
        (handler: any) => handler.info.method === 'GET',
      );
      const response = await handlerForKakaoAuthUrl.resolver();
      const authorizationHeaderValue = response.headers.get('authorization');

      // 터미널 창에서 확인해보기
      console.log(server);
      console.log('💕path: ', handlerForKakaoAuthUrl.info.path);
      console.log('💕토큰값 :  ', authorizationHeaderValue);

      // 호출하는 URL이 일치하는지 확인
      expect(handlerForKakaoAuthUrl.info.path).toEqual(kakaoAuthUrl);
      // mock 서버의 응답에 헤더의 토큰값이 yes인지 확인
      expect(authorizationHeaderValue).toEqual('yes');
    });
  });
});
