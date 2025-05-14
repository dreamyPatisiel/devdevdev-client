import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import { useFullPopupVisibleStore, PopupDisplayType } from '@stores/mobile/fullPopupStore';

import Xicon from '@public/image/alertheader/XIcon.svg';

export default function FullPopupHeader() {
  const { popupType, closeFullPopup } = useFullPopupVisibleStore();

  const [popupTitle, setPopupTitle] = useState('');

  useEffect(() => {
    if (!popupType) return;

    switch (popupType) {
      case 'AlertList':
        setPopupTitle('알림');
        break;

      default:
        setPopupTitle('');
        break;
    }
  }, [popupType]);

  const handleClosePopup = () => {
    closeFullPopup();
  };

  return (
    <div className='fixed z-40 w-full flex flex-row bg-gray600 px-[1rem] pb-[1.2rem] border-b border-b-gray200'>
      <button type='button' onClick={handleClosePopup}>
        <Image alt='풀팝업 닫기 아이콘' src={Xicon} className='ml-[0.25rem]' />
      </button>
      <p className='p2 font-bold mx-auto text-gray100'>{popupTitle}</p>
    </div>
  );
}
