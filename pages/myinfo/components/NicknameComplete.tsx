import React from 'react';

import Image from 'next/image';

import { useNicknameStore } from '@stores/nicknameStore';

import starBackground from '@public/image/myInfo/star_background.png';

export default function NicknameComplete() {
  const { nickname } = useNicknameStore();

  return (
    <div className='relative w-full h-[13.75rem]'>
      <Image src={starBackground} alt='닉네임 배경' fill className='object-cover' />
      <p className='st2 font-bold absolute inset-0 text-gray600 flex items-center justify-center'>
        {nickname}
      </p>
    </div>
  );
}
