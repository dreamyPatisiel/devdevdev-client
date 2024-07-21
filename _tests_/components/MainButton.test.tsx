import React, { MouseEventHandler } from 'react';

import { MainButton } from '@components/common/buttons/mainButtons';
import { MainButtonProps } from '@components/common/buttons/types/mainButtons';

import { render, screen, fireEvent } from '@testing-library/react';

describe('MainButton', () => {
  const defaultProps: MainButtonProps = {
    text: '메인버튼',
    variant: 'primary',
    icon: undefined,
    disabled: false,
    onClick: jest.fn(),
    type: 'button',
  };

  beforeEach(() => {
    (defaultProps.onClick as jest.MockedFunction<MouseEventHandler<HTMLButtonElement>>).mockClear();
  });

  it('text값을 가진 버튼이 렌더링 된다.', () => {
    render(<MainButton {...defaultProps} />);
    expect(screen.getByText('메인버튼')).toBeInTheDocument();
  });

  it('React.Element타입의 아이콘이 버튼에 렌더링된다.', () => {
    render(<MainButton {...defaultProps} icon={<span data-testid='icon'>👍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('클릭되었을 때 onClick 이벤트 핸들러를 호출한다.', () => {
    render(<MainButton {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled이 true인 경우 버튼이 비활성화 상태인지 확인한다.', () => {
    render(<MainButton {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('disabled이 true인 경우 onClick 이벤트 핸들러를 호출하지 않는다.', () => {
    render(<MainButton {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('variant에 따라 올바른 스타일링을 적용한다.', () => {
    render(<MainButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary1'); // primary 스타일중 하나인 bg-primary1가 적용되어야한다.
  });
});
