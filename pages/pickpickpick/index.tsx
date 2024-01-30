import React, { Suspense } from 'react';
import PickContainer from './PickContainer';
import { useGetPickData } from './api/queries';
import { PickDataProps } from './types/pick';
import dynamic from 'next/dynamic';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPickData } from './api/pickpickpick';

export default function Index() {
  const pickDatas = useGetPickData();

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

  console.log('pickDatas', pickDatas);

  // const { data } = useInfiniteQuery({
  //   queryKey: ['pickData'],
  //   queryFn: getPickData,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => lastPage.nextPage,
  // });
  // console.log('data', data?.pageParams);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className='px-40 pt-24 pb-14'>
        <h1 className='text-h2 mb-16'>픽픽픽 💖</h1>
        <div className='grid grid-cols-3 gap-8'>
          {pickDatas?.map((pickData: PickDataProps) => (
            // <DynamicComponent key={pickData.id} />
            <PickComponent key={pickData.id} pickData={pickData} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
