import { HTMLAttributes } from 'react';

import useShowByScroll from '@hooks/useShowByScroll';

export interface MobileMainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled?: boolean;
}

export default function MobileMainButton({ text, onClick, disabled }: MobileMainButtonProps) {
  const { showBottom } = useShowByScroll();

  if (!showBottom) return <></>;

  return (
    <div className='fixed h-[6.9rem]'>
      <button
        type='button'
        className='fixed bg-primary1 bottom-0 left-0 right-0 p-[2.1rem] st2 font-bold disabled:bg-primary5'
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
