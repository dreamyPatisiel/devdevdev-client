import React, { useRef } from 'react';

import { Dropdown } from '@components/common/dropdown';
import DynamicTechBlogComponent from '@components/features/main/dynamicTechBlogComponent';

import Index from '../index.page';

export default function BookMark() {
  const bottomDiv = useRef(null);

  return (
    <Index>
      <div className='flex flex-col gap-10 pb-40'>
        <div className='flex justify-between items-center'>
          <h1 className='h3 font-bold w-full'>북마크</h1>
          <Dropdown type='bookmark' />
        </div>

        <div>
          {DynamicTechBlogComponent({
            skeletonCnt: 10,
            isScroll: false,
            bottomDiv: bottomDiv,
            dataType: 'myinfo',
          })}
          <div ref={bottomDiv} />
        </div>
      </div>
    </Index>
  );
}
