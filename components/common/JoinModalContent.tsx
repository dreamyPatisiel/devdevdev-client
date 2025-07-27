import React from 'react';

import { useNicknameStore } from '@stores/nicknameStore';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function JoinModalContent() {
  const { isMobile } = useMediaQueryContext();

  const { nickname } = useNicknameStore();

  return (
    <>
      <p className='st2 font-bold text-white'>
        반가워요! <span className='text-secondary300'>{nickname}</span>님!
        <br />
        앞으로 잘부탁드려요!
      </p>

      <p className={`text-gray200 whitespace-pre-wrap mt-[0.8rem] ${isMobile ? 'p2' : 'p1'}`}>
        닉네임 변경하기를 진행하시면 <br /> 마법사 뎁구리가 멋진 닉네임을 지어줄게요
      </p>
    </>
  );
}
