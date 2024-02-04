import React, { Suspense, useRef } from 'react';
import PickContainer from './PickContainer';
import { useGetPickData } from './api/queries';
import { PickDataProps } from './types/pick';
import dynamic from 'next/dynamic';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPickData } from './api/pickpickpick';
import Dropdown from '@/components/dropdown';
import { useObserver } from './hook/useObserver';

export default function Index() {
  // const pickDatas = useGetPickData();
  const bottom = useRef(null);

  const DynamicComponent = dynamic(() => import('@pages/pickpickpick/PickContainer'), {
    loading: () => <p>Loading...</p>,
  });

  const PickComponent = React.lazy(() => import('@pages/pickpickpick/PickContainer'));

  // const { data, fetchNextPage } = useInfiniteQuery({
  //   queryKey: ['pickData'],
  //   queryFn: getPickData,
  //   getNextPageParam: (lastPage) => lastPage.nextPage,
  //   initialPageParam: 9,
  // });

  // console.log('pickDatas', pickDatas);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['pickData'],
    queryFn: getPickData,
    initialPageParam: 0,
    // maxPages: 9,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      console.log('lastPageParam', lastPage.data);
      return lastPageParam + 1;
    },
  });
  console.log('infinitedata', data, fetchNextPage);

  // const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  // // useObserver로 bottom ref와 onIntersect를 넘겨 주자.
  // useObserver({
  //   target: bottom,
  //   onIntersect,
  // });

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className='px-40 pt-24 pb-14'>
        <div className='flex justify-between items-baseline'>
          <h1 className='text-h2 mb-16'>픽픽픽 💖</h1>
          <Dropdown />
        </div>
        <div className='grid grid-cols-3 gap-8'>
          {data?.pages.map((group, index) => (
            <React.Fragment key={index}>
              {console.log('group', group.data)}
              {group.data.map((data: PickDataProps) => (
                // <p key={data.id}>{data.id}</p>
                <PickComponent key={data.id} pickData={data} />
              ))}
            </React.Fragment>
          ))}
          {/* <div> */}
          <div ref={bottom} />
          {/* {isFetchingNextPage && <p>계속 불러오는 중</p>} */}
          <button
            onClick={() => fetchNextPage()}
            // disabled={!hasNextPage || isFetchingNextPage}
          >
            {/* {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'} */}
            더 불러오기
          </button>
          {/* </div> */}
          {/* {pickDatas?.map((pickData: PickDataProps) => (
            // <DynamicComponent key={pickData.id} />
            <PickComponent key={pickData.id} pickData={pickData} />
          ))} */}
        </div>
      </div>
    </Suspense>
  );
}
