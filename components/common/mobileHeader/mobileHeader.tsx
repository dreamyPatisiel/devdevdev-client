import React from 'react';

import Image from 'next/image';

import DevLogo from '@public/image/devdevdevLogo.svg';
import HeaderBar from '@public/image/loading/headerBars.svg';

export default function MobileHeader() {
  return (
    <div className='flex items-center justify-between bg-gray1 px-[1.6rem] py-[1.2rem] border-b border-b-gray5'>
      <Image src={DevLogo} alt='dev로고' />
      {/* <Image src={HeaderBar} alt='바 로고' /> */}
    </div>
  );
}
