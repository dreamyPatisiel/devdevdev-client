import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';

import { useObserver } from '@hooks/useObserver';

import Toast from '@components/common/Toast';
import { MainButton } from '@components/common/buttons/mainButtons';
import { Dropdown } from '@components/common/dropdown';
import { PickSkeletonList } from '@components/common/skeleton';

import IconPencil from '@public/image/pencil-alt.svg';

import { useDropdownStore } from '@/stores/dropdownStore';

import PickInfo from './components/PickInfo';
import { PickDataProps } from './types/pick';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainer'));

export default function Index() {
  const bottom = useRef(null);

  const { sortOption } = useDropdownStore();

  const { pickData, isFetchingNextPage, hasNextPage, status, error, onIntersect } =
    useInfinitePickData(sortOption);

  useObserver({
    target: bottom,
    onIntersect,
  });

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <PickSkeletonList rows={2} itemsInRows={3} />;

      case 'error':
        return <p>Error: {error?.message}</p>;

      default:
        return (
          <>
            <div className='grid grid-cols-3 gap-8' data-testid='loaded'>
              <PickInfo />

              {pickData?.pages.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data.content.map((data: PickDataProps) => (
                    <Link href={`/pickpickpick/${data.id}`} key={data.id}>
                      <DynamicComponent key={data.id} pickData={data} />
                    </Link>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <PickSkeletonList rows={1} itemsInRows={3} />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className='px-[20.3rem] pt-24 pb-14'>
      <Toast />

      <div className='flex justify-between items-baseline'>
        <h1 className='h2 font-bold mb-16 text-white' data-testid='pickheart'>
          픽픽픽 💖
        </h1>
        <div className='flex items-baseline gap-[2rem]'>
          <Dropdown />
          <Link href={`/pickposting`}>
            <MainButton
              text='작성하기'
              variant='primary'
              icon={<Image src={IconPencil} alt='연필 아이콘' />}
            />
          </Link>
        </div>
      </div>

      {getStatusComponent()}
      <div ref={bottom} />
    </div>
  );
}
