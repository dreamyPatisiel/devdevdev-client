import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/login/index';

describe('로그인 버튼 컴포넌트', () => {
  it('로그인버튼이 렌더링 되야한다.', () => {
    render(<LoginPage />);

    const loginButton = screen.getByAltText('카카오 로그인 버튼');
    expect(loginButton).toBeInTheDocument();
  });
});
