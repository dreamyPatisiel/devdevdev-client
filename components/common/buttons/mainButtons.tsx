import { cn } from '@utils/mergeStyle';

import { MainButtonProps } from './types/mainButtons';
import { MainButtonVariants } from './variants/mainButtons';

export function MainButton({
  text,
  variant,
  icon,
  disabled,
  onClick,
  type,
  textbold,
}: MainButtonProps) {
  return (
    <button
      className={cn(MainButtonVariants({ variant }))}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {icon}
      <span className={`p1 ${textbold && 'font-bold'} `}>{text}</span>
    </button>
  );
}
