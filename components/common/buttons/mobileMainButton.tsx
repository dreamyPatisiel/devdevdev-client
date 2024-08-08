import { HTMLAttributes } from 'react';

export interface MobileMainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function MobileMainButton({ text, onClick }: MobileMainButtonProps) {
  return (
    <button
      type='button'
      className='fixed bg-primary1 bottom-0 left-0 right-0 p-[2.8rem] st1 font-bold'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
