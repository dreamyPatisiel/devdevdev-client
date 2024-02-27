import React from 'react';
import { DevDevDevLoading } from '@/components/devdevdevLoading/devLoading';
import DevLogo from "@public/image/devdevdevLogo.svg"
import HeaderBar from "@public/image/loading/headerBars.svg"

export default function index() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between bg-gray1 mb-[12rem] pl-[1.6rem] pr-[2.6rem] h-[7.2rem] border-b border-b-gray5'>
        <DevLogo/>
        <HeaderBar/>
      </div>
      <DevDevDevLoading />
    </div>
  );
}
