import React, { Suspense } from 'react';
import PickContainer from './PickContainer';
import { useGetPickData } from './api/queries';
import { PickDataProps } from './types/pick';
import dynamic from 'next/dynamic';

export default function Index() {
  const pickDatas = useGetPickData();

  const DynamicComponent = dynamic(() => import('@pages/pickpickpick/PickContainer'), {
    loading: () => <p>Loading...</p>,
  });

  const PickComponent = React.lazy(() => import('@pages/pickpickpick/PickContainer'));

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
