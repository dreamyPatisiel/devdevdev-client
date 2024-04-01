import React, { useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';

import { useDropdownStore } from '@stores/dropdownStore';

import { useObserver } from '@hooks/useObserver';

import { Dropdown } from '@components/dropdown';
import SearchInput from '@components/searchInput';
import { TechMainSkeletonList } from '@components/skeleton';

import { useInfiniteTechBlogData } from './api/useInfiniteTechBlog';
import { TechCardProps } from './types/techBlogType';

const DynamicTechCard = dynamic(() => import('@/pages/techblog/components/techCard'));

export default function Index() {
  const bottomDiv = useRef(null);

  const { sortOption } = useDropdownStore();

  const { techBlogData, isFetchingNextPage, hasNextPage, status, error, onIntersect } =
    useInfiniteTechBlogData(sortOption);

  useObserver({
    target: bottomDiv,
    onIntersect,
  });

  useEffect(() => {
    console.log('isFetchingNextPage: ', isFetchingNextPage, 'hasNextPage : ', hasNextPage);
  }, [isFetchingNextPage]);

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <TechMainSkeletonList itemsInRows={10} />;

      case 'error':
        return <p>Error: {error?.message}</p>;

      default:
        return (
          <>
            <div>
              {techBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCardProps) => (
                    <DynamicTechCard key={data.id} techData={data} />
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <TechMainSkeletonList itemsInRows={10} />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      <div className='px-[20.4rem] pb-[16.5rem]'>
        <div className='flex items-center justify-between pt-[6.4rem] pb-[2.4rem]'>
          <h1 className='text-st1 font-bold'>기술블로그 🧪</h1>
          <SearchInput />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-p1 '>
            총 <span className='text-point3'>{techBlogData?.pages[0].data.totalElements}</span>건
          </p>
          <Dropdown />
        </div>
        {getStatusComponent()}
        <div ref={bottomDiv} />
      </div>
    </>
  );
}
