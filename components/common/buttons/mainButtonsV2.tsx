import { cn } from '@utils/mergeStyle';

import { MainButtonV2Props } from './types/mainButtonsV2';
import { MainButtonV2Variants } from './variants/mainButtonsV2';

export function MainButtonV2({
  text,
  icon,
  iconPosition = 'right',
  disabled,
  onClick,
  type = 'button',
  className,
  color,
  size,
  radius,
  line,
  ...rest
}: MainButtonV2Props) {
  return (
    <button
      className={cn(MainButtonV2Variants({ color, line, size, radius }), className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {/* 아이콘 왼쪽 정렬 */}
      {iconPosition === 'left' && icon}
      {/* 텍스트 */}
      <span className='p1 font-bold'>{text}</span>
      {/* 아이콘 오른쪽 정렬 */}
      {iconPosition === 'right' && icon}
    </button>
  );
}
