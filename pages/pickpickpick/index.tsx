import React, { Suspense, useRef } from 'react';
import { PickDataProps } from '@/src/pickpickpick/types/pick';
import dynamic from 'next/dynamic';
import Dropdown from '@/components/dropdown';
import { PickSkeletonList } from '@/components/skeleton';
import { useObserver } from '@/hooks/useObserver';
import { useInfinitePickData } from '@/src/pickpickpick/api/queries';

export default function Index() {
  const bottom = useRef(null);

  const DynamicComponent = dynamic(() => import('@pages/pickpickpick/PickContainer'));

  const { pickData, isFetchingNextPage, hasNextPage, status, error, onIntersect } =
    useInfinitePickData();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className='px-40 pt-24 pb-14'>
        <div className='flex justify-between items-baseline'>
          <h1 className='text-h2 mb-16 text-white' data-testid='pickheart'>
            픽픽픽 💖
          </h1>
          <Dropdown dropdownMenu={['인기순', '최신순', '댓글 많은 순']} />
        </div>
        {status === 'pending' ? (
          <PickSkeletonList rows={2} itemsInRows={3} />
        ) : status === 'error' ? (
          <p>Error: {error?.message}</p>
        ) : (
          <div className='grid grid-cols-3 gap-8' data-testid='loaded'>
            {pickData?.pages.map((group, index) => (
              <React.Fragment key={index}>
                {group.data.map((data: PickDataProps) => (
                  <DynamicComponent key={data.id} pickData={data} />
                ))}
              </React.Fragment>
            ))}
          </div>
        )}

        {isFetchingNextPage && hasNextPage && (
          <div className='mt-[2rem]'>
            <PickSkeletonList rows={1} itemsInRows={3} />
          </div>
        )}

        <div ref={bottom} />
      </div>
    </Suspense>
  );
}
