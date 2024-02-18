import React from 'react';

import SearchInput from '@/components/searchInput';

import TechCard from './components/techCard';

export default function index() {
  return (
    <>
      <div className='px-[9.8rem]'>
        <div className='flex items-center justify-between py-[2.4rem]'>
          <h1 className='text-st1'>기술블로그 🧪</h1>
          <SearchInput />
        </div>
        <div>
          <p className='text-p1 '>
            총 <span className='text-point3'>25,425</span>건
          </p>
        </div>
        <ul>
          <TechCard />
          <TechCard />
          <TechCard />
          <TechCard />
          <TechCard />
          <TechCard />
          <TechCard />
          <TechCard />
        </ul>
      </div>
    </>
  );
}
