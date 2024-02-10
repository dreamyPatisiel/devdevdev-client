import React, { Suspense, useCallback, useRef } from 'react';
import { PickDataProps } from '@/src/pickpickpick/types/pick';
import dynamic from 'next/dynamic';
import { useInfiniteQuery } from '@tanstack/react-query';
import Dropdown from '@/components/dropdown';
import Skeleton from '@/components/skeleton';
import { getPickData } from '@/src/pickpickpick/api/pickpickpick';
import { useObserver } from '@/hooks/useObserver';

export default function Index() {
  const bottom = useRef(null);

  const DynamicComponent = dynamic(() => import('@pages/pickpickpick/PickContainer'));

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status, error, isFetching } =
    useInfiniteQuery({
      queryKey: ['pickData'],
      queryFn: getPickData,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.length === 0) {
          return undefined;
        }

        return lastPageParam + 1;
      },
    });

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!isFetching && entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

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
          <div className='grid grid-cols-3 gap-8'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : status === 'error' ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className='grid grid-cols-3 gap-8' data-testid='loaded'>
            {data?.pages.map((group, index) => (
              <React.Fragment key={index}>
                {group.data.map((data: PickDataProps) => (
                  <DynamicComponent key={data.id} pickData={data} />
                ))}
              </React.Fragment>
            ))}
          </div>
        )}

        {isFetchingNextPage && hasNextPage && (
          <div className='grid grid-cols-3 gap-8 mt-[2rem]'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}

        <div ref={bottom} />
      </div>
    </Suspense>
  );
}
