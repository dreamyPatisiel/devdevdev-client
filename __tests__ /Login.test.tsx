import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/login/index';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

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
    // const hrefValue = linkElement.getAttribute('href');

    // axios.get 메소드를 spyOn하여 모킹
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: { token: 'yourTokenValue' },
    });

    // 특정 URL로 GET 요청을 시뮬레이션
    fireEvent.click(btnElement);

    const url =
      'https://kauth.kakao.com/oauth/authorize?client_id=6479cf393f012936a0da49f7dd2f88eb&redirect_uri=http://localhost:8080/login/oauth2/code/kakao&response_type=code';
    // 비동기 처리를 위해 waitFor 사용
    await waitFor(() => {
      // 여기에 헤더에 토큰이 잘 들어왔는지 확인하는 코드 추가
      expect(axios.get).toHaveBeenCalledWith(url, {
        headers: {
          Authorization: 'yes', // 예상되는 토큰값에 따라 수정
        },
      });
    });
  });
});
