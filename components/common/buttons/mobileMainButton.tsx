import { HTMLAttributes, useEffect, useState } from 'react';

export interface MobileMainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled?: boolean;
}

export default function MobileMainButton({ text, onClick, disabled }: MobileMainButtonProps) {
  const [showBottom, setShowBottom] = useState(true);

  const handleScrollEvent = () => {
    if (window.scrollY === 0) {
      setShowBottom(true);
      return;
    }

    setShowBottom(false);
  };

  const handleClickEvent = () => {
    setShowBottom(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('click', handleClickEvent);
  }, []);

  if (!showBottom) return <></>;

  return (
    <div className='h-[12.2rem]'>
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
