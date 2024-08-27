import { HTMLAttributes } from 'react';

import { cn } from '@utils/mergeStyle';

interface BottomButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function BottomButton({ text, className }: BottomButtonProps) {
  return (
    <button
      type='button'
      className={cn(`px-[15.8rem] py-[1.3rem] bg-gray2 rounded-[0.8rem] st2 `, className)}
    >
      {text}
    </button>
  );
}
