import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';

import { useObserver } from '@hooks/useObserver';

import { MainButton } from '@components/buttons/mainButtons';
import { Dropdown } from '@components/dropdown';
import { PickSkeletonList } from '@components/skeleton';

import IconPencil from '@public/image/pencil-alt.svg';

import { useDropdownStore } from '@/stores/dropdownStore';

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
              <div className='px-[2.4rem] py-[4.8rem]'>
                <p className='st1 font-bold mb-[4rem]'>
                  개발고민
                  <br />
                  혼자 끙끙 앓지말고,
                  <br />
                  함께 나눠요!
                </p>
                <p className='p1 font-light'>🥺 스타트업 로그인 방식은 어떤게 좋을까?</p>
                <p className='p1 font-light'>😓 크롤링 기능은 어떤 개발툴이 적절할까?</p>
                <p className='p1 font-light'>😝 데이터 관련해서는 여기가 더 잘하지!</p>
              </div>

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
      <div className='flex justify-between items-baseline'>
        <h1 className='text-h2 mb-16 text-white' data-testid='pickheart'>
          픽픽픽 💖
        </h1>
        <div className='flex items-baseline gap-[2rem]'>
          <Dropdown />
          <Link href={`/pickposting`}>
            <MainButton text='작성하기' variant='primary' icon={<IconPencil alt='연필 아이콘' />} />
          </Link>
        </div>
      </div>

      {getStatusComponent()}
      <div ref={bottom} />
    </div>
  );
}
