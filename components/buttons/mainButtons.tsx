import { cn } from '@utils/mergeStyle';

import { MainButtonProps } from './types/mainButtons';
import { MainButtonVariants } from './variants/mainButtons';

export function MainButton({ text, variant, icon, disabled }: MainButtonProps) {
  return (
    <button className={cn(MainButtonVariants({ variant }))} disabled={disabled}>
      {icon}
      <span className='p1'>{text}</span>
    </button>
  );
}
