import React from 'react';

import Image from 'next/image';

import { useNicknameStore } from '@stores/nicknameStore';

import starBackground from '@public/image/myInfo/star_background.png';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function NicknameComplete() {
  const { isMobile } = useMediaQueryContext();

  const { nickname } = useNicknameStore();

  return (
    <>
      <div className='relative w-full h-[13.75rem]'>
        <Image src={starBackground} alt='닉네임 배경' fill className='object-cover' />
        <p className='st2 font-bold absolute inset-0 text-gray600 flex items-center justify-center'>
          {nickname}
        </p>
      </div>
      <p className={`text-gray200 whitespace-pre-wrap mt-[3.2rem] ${isMobile ? 'p2' : 'p1'}`}>
        정말 멋진 닉네임이에요
      </p>
    </>
  );
}
