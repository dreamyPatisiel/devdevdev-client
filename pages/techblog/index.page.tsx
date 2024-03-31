import React, { useRef } from 'react';

import Link from 'next/link';

import { useDropdownStore } from '@stores/dropdownStore';

import { useObserver } from '@hooks/useObserver';

import { Dropdown } from '@components/dropdown';
import SearchInput from '@components/searchInput';
import { TechMainSkeletonList } from '@components/skeleton';

import { useInfiniteTechBlogData } from './api/useInfiniteTechBlog';
import TechCard from './components/techCard';
import { TechCardProps } from './types/techBlogType';

export default function Index() {
  const bottom = useRef(null);

  const { sortOption } = useDropdownStore();

  const {
    techBlogData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    onIntersect,
  } = useInfiniteTechBlogData(sortOption);

  useObserver({
    target: bottom,
    onIntersect,
  });

  console.log(sortOption);
  console.log(techBlogData);

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <TechMainSkeletonList itemsInRows={4} />;

      case 'error':
        return <p>Error: {error?.message}</p>;

      default:
        return (
          <>
            <div className='grid grid-cols-3 gap-8' data-testid='loaded'>
              {techBlogData?.pages?.content.map((li: TechCardProps) => (
                <Link href={`/pickpickpick/${li.id}`} key={li.id}>
                  <TechCard techData={li} />
                </Link>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <TechMainSkeletonList itemsInRows={4} />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      <div className='px-[20.4rem]'>
        <div className='flex items-center justify-between pt-[6.4rem] pb-[2.4rem]'>
          <h1 className='text-st1 font-bold'>기술블로그 🧪</h1>
          <SearchInput />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-p1 '>
            총 <span className='text-point3'>{techBlogData?.totalElements}</span>건
          </p>
          <Dropdown />
        </div>
        {getStatusComponent()}
        <TechCard />
        <TechCard />
        <TechCard />
        <TechCard />
        <TechCard />
        <TechCard />
        <TechCard />
        <TechCard />
        <div ref={bottom} />
      </div>
    </>
  );
}
