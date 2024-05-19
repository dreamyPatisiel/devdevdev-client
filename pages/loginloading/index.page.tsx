import React from 'react';

import Image from 'next/image';

import { DevDevDevLoading } from '@components/common/devdevdevLoading/devLoading';

import DevLogo from '@public/image/devdevdevLogo.svg';
import HeaderBar from '@public/image/loading/headerBars.svg';

export default function index() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between bg-gray1 mb-[12rem] pl-[1.6rem] pr-[2.6rem] h-[7.2rem] border-b border-b-gray5'>
        <Image src={DevLogo} alt='dev로고' />
        <Image src={HeaderBar} alt='바 로고' />
      </div>
      <DevDevDevLoading />
    </div>
  );
}
