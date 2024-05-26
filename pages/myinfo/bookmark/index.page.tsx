import React, { useRef } from 'react';

import { Dropdown } from '@components/common/dropdown';
import DynamicTechBlogComponent from '@components/features/main/dynamicTechBlogComponent';

import Index from '../index.page';

export default function BookMark() {
  const bottomDiv = useRef(null);

  return (
    <Index>
      <div className='flex flex-col gap-10 pb-40'>
        <h1 className='h3 font-bold w-full'>북마크</h1>

        <div className='flex justify-between items-center '>
          <p className='p1 text-gray5'>
            총 <span className='text-point1 font-bold'>25</span>건
          </p>
          <Dropdown />
        </div>

        <div>
          {DynamicTechBlogComponent({ skeletonCnt: 10, isScroll: false, bottomDiv: bottomDiv })}
          <div ref={bottomDiv} />
        </div>
      </div>
    </Index>
  );
}
