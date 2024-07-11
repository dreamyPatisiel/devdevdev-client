import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import { useObserver } from '@hooks/useObserver';

import { MainButton } from '@components/common/buttons/mainButtons';
import { Dropdown } from '@components/common/dropdown';
import { LoginModal } from '@components/common/modals/modal';
import { PickSkeletonList } from '@components/common/skeleton/pickSkeleton';
import MetaHead from '@components/meta/MetaHead';

import IconPencil from '@public/image/pencil-alt.svg';

import { META } from '@/constants/metaData';
import { DefaultDropdownProps, useDropdownStore } from '@/stores/dropdownStore';

import PickInfo from './components/PickInfo';
import { PickDataProps } from './types/pick';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainer'));

export default function Index() {
  const { loginStatus } = useLoginStatusStore();
  const { openModal, isModalOpen, setDescription } = useLoginModalStore();
  const bottom = useRef(null);

  const { sortOption } = useDropdownStore();

  const { title, description, keyword, url } = META.PICK;

  const { pickData, isFetchingNextPage, hasNextPage, status, onIntersect } = useInfinitePickData(
    sortOption as DefaultDropdownProps,
  );

  useObserver({
    target: bottom,
    onIntersect,
  });

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <PickSkeletonList rows={3} itemsInRows={3} hasInfo={true} />;

      default:
        return (
          <>
            <div className='grid grid-cols-3 gap-8'>
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
                <PickSkeletonList rows={3} itemsInRows={3} />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      <MetaHead title={title} description={description} keyword={keyword} url={url} />
      <div className='px-[20.3rem] pt-24 pb-14'>
        <div className='flex justify-between items-baseline'>
          <h1 className='h3 font-bold mb-16 text-white' data-testid='pickheart'>
            픽픽픽 💘
          </h1>
          <div className='flex items-baseline gap-[2rem]'>
            <Dropdown type='pickpickpick' />

            {loginStatus === 'login' ? (
              <Link href={`/pickposting`}>
                <MainButton
                  text='작성하기'
                  variant='primary'
                  icon={<Image src={IconPencil} alt='연필 아이콘' />}
                />
              </Link>
            ) : (
              <MainButton
                text='작성하기'
                variant='primary'
                icon={<Image src={IconPencil} alt='연필 아이콘' />}
                onClick={() => {
                  openModal();
                  setDescription('댑댑이가 되면 픽픽픽을 작성할 수 있어요 🥳');
                }}
              />
            )}
          </div>
        </div>

        {getStatusComponent()}
        <div ref={bottom} />
        {isModalOpen && loginStatus !== 'login' && <LoginModal />}
      </div>
    </>
  );
}
