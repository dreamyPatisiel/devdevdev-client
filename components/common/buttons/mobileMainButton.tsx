import { HTMLAttributes, useEffect } from 'react';

import { bottomButtonVisibleStore } from '@stores/mobile/bottomButtonVisibleStore';

import useShowByScroll from '@hooks/useShowByScroll';

export interface MobileMainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled?: boolean;
}

export default function MobileMainButton({ text, onClick, disabled }: MobileMainButtonProps) {
  const { setIsVisibleBottomBtn } = bottomButtonVisibleStore();
  const { showBottom } = useShowByScroll();

  useEffect(() => {
    setIsVisibleBottomBtn(showBottom);
  }, [showBottom]);

  if (!showBottom) return <></>;

  return (
    <div className='fixed h-[5.8rem]'>
      <button
        type='button'
        className='fixed bg-primary1 bottom-0 left-0 right-0 p-[1.6rem] st2 font-bold disabled:bg-primary5'
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
