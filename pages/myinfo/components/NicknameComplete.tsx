import React from 'react';

import { useNicknameStore } from '@stores/nicknameStore';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function NicknameComplete() {
  const { isMobile } = useMediaQueryContext();

  const { nickname } = useNicknameStore();

  return (
    <>
      <p className='st2 font-bold flex items-center justify-center mt-[1.6rem] nickname-complete'>
        {nickname}
      </p>
      <p className={`text-gray200 whitespace-pre-wrap mt-[3.2rem] ${isMobile ? 'p2' : 'p1'}`}>
        정말 멋진 닉네임이에요
      </p>
    </>
  );
}
