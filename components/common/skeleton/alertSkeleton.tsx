import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export const MyInfoAlertCardSkeleton = () => {
  const { isMobile } = useMediaQueryContext();

  return (
    <div className='px-[3.2rem] py-[2.4rem] flex flex-col gap-[1.6rem] rounded-Radius16 border border-gray500'>
      <div className='rounded-[10rem] bg-gray500 h-[3.2rem]'></div>
      <div className={isMobile ? 'flex flex-wrap' : `flex gap-[3.2rem]`}>
        <div
          className={`bg-gray500 rounded-Radius16 ${isMobile ? 'w-full h-[13.6rem]' : 'w-[12rem] h-[8rem]'}`}
        ></div>
        <div className={`flex flex-col gap-[0.8rem] w-full ${isMobile ? 'mt-[2.4rem]' : ''}`}>
          <div
            className={`bg-gray500 rounded-Radius10 ${isMobile ? 'h-[6rem]' : 'h-[3rem]'}`}
          ></div>
          <div className='w-[24.4rem] h-[1.6rem] bg-gray500 rounded-[10rem]'></div>
          <div
            className={`bg-gray500 rounded-Radius10 ${isMobile ? 'h-[7.2rem]' : 'h-[4.8rem]'}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export const MyInfoAlertCardSkeletonList = ({ itemsInRows }: { itemsInRows: number }) => {
  return (
    <div className='flex flex-col gap-[2.4rem]'>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <MyInfoAlertCardSkeleton key={index} />
      ))}
    </div>
  );
};
