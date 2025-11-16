import { MobilePickInfoV1, PickInfoV1 } from '@pages/pickpickpick/components/PickInfo';

import AngleRightIcon from '@components/svgs/AngleRightIcon';

// ------------------------------픽픽픽 메인 스켈레톤  v1------------------------------
export const PickSkeletonV1 = () => {
  return (
    <div className='px-[2.4rem] py-[3.2rem] flex flex-col gap-[3.2rem] rounded-[1.6rem] border-gray600 border-solid border'>
      <div className='h-[3.7rem] w-[100%] rounded-[1.6rem] bg-gray600 relative overflow-hidden skeleton-item' />
      <div className='flex flex-col gap-[1.6rem]'>
        <div className='h-[10.1rem] bg-gray600 rounded-[1.6rem] relative overflow-hidden skeleton-item' />
        <div className='h-[10.1rem] bg-gray600 rounded-[1.6rem] relative overflow-hidden skeleton-item' />
      </div>
      <div className='h-[1rem] w-[50%] bg-gray600 rounded-[1.6rem] relative overflow-hidden skeleton-item' />
    </div>
  );
};

interface PickSkeletonListV1Props {
  rows: number;
  itemsInRows: number;
  hasInfo?: boolean;
}

export const PickSkeletonListV1 = ({ rows, itemsInRows, hasInfo }: PickSkeletonListV1Props) => {
  return (
    <div className='grid grid-cols-3 gap-8'>
      {hasInfo ? (
        <>
          <PickInfoV1 />
          {Array.from({ length: rows * itemsInRows - 1 }, (_, index) => (
            <PickSkeletonV1 key={index} />
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: rows * itemsInRows }, (_, index) => (
            <PickSkeletonV1 key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export const MobilePickSkeletonListV1 = ({
  rows,
  hasInfo,
}: {
  rows: number;
  hasInfo?: boolean;
}) => {
  const arr = Array.from({ length: rows });

  return (
    <div className='grid grid-cols-1 gap-8'>
      {hasInfo && <MobilePickInfoV1 />}

      {arr.map((_, index) => (
        <PickSkeletonV1 key={index} />
      ))}
    </div>
  );
};

export const MyPickSkeletonListV1 = ({ rows, itemsInRows }: PickSkeletonListV1Props) => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      {Array.from({ length: rows * itemsInRows }, (_, index) => (
        <PickSkeletonV1 key={index} />
      ))}
    </div>
  );
};
// -------------------------------------------------------------------------------

// ------------------------------픽픽픽 메인 스켈레톤  v2------------------------------

export const PickSkeletonV2 = () => {
  return (
    <div className='pt-[3.2rem] pb-[2.4rem] px-[3.2rem] flex flex-col gap-[3.2rem] rounded-[1.6rem] bg-gray600'>
      <div className='flex flex-col gap-[2.4rem]'>
        <div className='flex flex-row items-start justify-between gap-[1.6rem]'>
          <div className='bg-black h-[4.3rem] w-[100%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
          <AngleRightIcon color='var(--gray300)' />
        </div>
        <div className='bg-black h-[1rem] w-[40%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
      </div>

      <div className='flex flex-row gap-[1.6rem]'>
        <div className='bg-black flex flex-col gap-[1rem] p-[2.4rem] w-[50%] rounded-[1.6rem] relative overflow-hidden border border-gray500'>
          <div className='bg-gray500 h-[1rem] w-[50%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
          <div className='bg-gray500 h-[5rem] w-[100%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
          <div className='bg-gray500 h-[12rem] w-[100%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
        </div>
        <div className='bg-black flex flex-col gap-[1rem] p-[2.4rem] w-[50%] rounded-[1.6rem] relative overflow-hidden border border-gray500'>
          <div className='bg-gray500 h-[1rem] w-[50%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
          <div className='bg-gray500 h-[5rem] w-[100%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
          <div className='bg-gray500 h-[12rem] w-[100%] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
        </div>
      </div>
    </div>
  );
};

interface PickSkeletonListV2Props {
  rows: number;
  itemsInRows: number;
}

export const PickSkeletonListV2 = ({ rows, itemsInRows }: PickSkeletonListV2Props) => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      {Array.from({ length: rows * itemsInRows }, (_, index) => (
        <PickSkeletonV2 key={index} />
      ))}
    </div>
  );
};

export const MobilePickSkeletonListV2 = ({ rows }: { rows: number }) => {
  const arr = Array.from({ length: rows });

  return (
    <div className='grid grid-cols-1 gap-8'>
      {arr.map((_, index) => (
        <PickSkeletonV2 key={index} />
      ))}
    </div>
  );
};

export const MyPickSkeletonListV2 = ({ rows, itemsInRows }: PickSkeletonListV2Props) => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      {Array.from({ length: rows * itemsInRows }, (_, index) => (
        <PickSkeletonV2 key={index} />
      ))}
    </div>
  );
};
// -------------------------------------------------------------------------------

/** 메인페이지 픽픽픽 스켈레톤 */
export const MainPickSkeleton = () => {
  return (
    <div className='p-[2.4rem] flex flex-col gap-[1.6rem] rounded-[1.6rem] border-gray600 border-solid border mb-[1.6rem]'>
      <div className='h-[2.2rem] w-[100%] rounded-[0.8rem] bg-gray600 relative overflow-hidden skeleton-item' />
      <div className='flex flex-col gap-[0.8rem]'>
        <div className='h-[4.8rem] bg-gray600 rounded-[0.8rem] relative overflow-hidden skeleton-item' />
        <div className='h-[4.8rem] bg-gray600 rounded-[0.8rem] relative overflow-hidden skeleton-item' />
      </div>
      <div className='h-[1.8rem] w-[30%] bg-gray600 rounded-[0.8rem] relative overflow-hidden skeleton-item' />
    </div>
  );
};

interface MainPickSkeletonListProps {
  itemsInRows: number;
}

export const MainPickSkeletonList = ({ itemsInRows }: MainPickSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <PickSkeletonV2 key={index} />
      ))}
    </>
  );
};
