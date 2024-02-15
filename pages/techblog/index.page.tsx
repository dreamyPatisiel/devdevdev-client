import React from 'react';
import styled from 'styled-components';
import TechCard from './components/techCard';
import SearchInput from '@/components/searchInput';

const HLine = styled.div`
  border-bottom: 1px solid var(--gray-3);
  margin-bottom: 3.2rem;
  height: 3.2rem;
`;

export default function index() {
  return (
    <>
      <div className='px-[9.8rem]'>
        <div className='flex items-center justify-between py-[2.4rem]'>
          <h1 className='text-st1'>기술블로그 🧪</h1>
          <SearchInput />
        </div>
        <div>
          <p className='text-p1 pb-[4.2rem]'>
            총 <span className='text-point3'>25,425</span>건
          </p>
        </div>
        <ul>
          <TechCard />
          <HLine />
          <TechCard />
          <HLine />
          <TechCard />
          <HLine />
          <TechCard />
          <HLine />
          <TechCard />
          <HLine />
          <TechCard />
          <HLine />
          <TechCard />
          <HLine />
          <TechCard />
          <HLine />
        </ul>
      </div>
    </>
  );
}
