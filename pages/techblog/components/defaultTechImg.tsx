import React from 'react';

import Image from 'next/image';

import TechRectLogo from '@public/image/techblog/TechRectLogo.png';
import WaveTechDetail from '@public/image/techblog/waveTechDetail.png';
import WaveTechMain from '@public/image/techblog/waveTechMain.png';

export const DefaultTechMainImg = () => {
  return (
    <div className='relative w-[20rem] h-[13.6rem] rounded-[1.6rem] bg-[#393939] flex justify-center items-center'>
      <Image src={WaveTechMain} width={200} height={136} alt='배경' className='absolute' />
      <Image height={100} width={100} src={TechRectLogo} alt='비커아이콘' className='absolute' />
    </div>
  );
};
