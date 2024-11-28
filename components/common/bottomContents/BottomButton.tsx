import { HTMLAttributes } from 'react';

import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import rightArrowInBottom from '@public/image/rightArrowInBottom.svg';

interface BottomButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function BottomButton({ text, className, onClick }: BottomButtonProps) {
  return (
    <button
      type='button'
      className={cn(
        `px-[2.2rem] py-[1.3rem] rounded-[0.8rem] st2 flex items-center justify-between`,
        className,
      )}
      onClick={onClick}
    >
      {text}
      <Image src={rightArrowInBottom} alt='오른쪽 화살표' />
    </button>
  );
}
