import React from 'react';

import { Dropdown } from '@components/dropdown';
import SearchInput from '@components/searchInput';

import TechCard from './components/techCard';

export default function index() {
  return (
    <>
      <div className='px-[9.8rem]'>
        <div className='flex items-center justify-between pt-[6.4rem] pb-[2.4rem]'>
          <h1 className='text-st1 font-bold'>기술블로그 🧪</h1>
          <SearchInput />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-p1 '>
            총 <span className='text-point3 font-bold '>25,425</span>건
          </p>
          <Dropdown />
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
