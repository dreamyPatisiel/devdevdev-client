import { HTMLAttributes, useEffect, useState } from 'react';

import { bottomBtnVisibleStore } from '@stores/mobile/BottomBtnVisibleStore';

import { useScrollDirection } from '@hooks/useScrollDirection';

export interface MobileMainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled?: boolean;
}

export default function MobileMainButton({ text, onClick, disabled }: MobileMainButtonProps) {
  const { setIsVisibleBottomBtn } = bottomBtnVisibleStore();
  const [showBottom, setShowBottom] = useState(true);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    if (scrollDirection === 'up') setShowBottom(true);
    if (scrollDirection === 'down') setShowBottom(false);
  }, [scrollDirection]);

  useEffect(() => {
    setIsVisibleBottomBtn(showBottom);
  }, [showBottom]);

  if (!showBottom) return <></>;

  return (
    <div className='h-[5.8rem]'>
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
