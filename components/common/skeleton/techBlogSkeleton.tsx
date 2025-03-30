import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { MainButtonV2 } from '../buttons/mainButtonsV2';

/** 기술블로그 (/techblog) 스켈레톤 */
export const TechSkeleton = () => {
  return (
    <div className='flex flex-row  py-[3.2rem] gap-[3.6rem] border-b-gray500 border-b-[1px]'>
      <div className='w-[20rem] h-[13.6rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      <div className='flex flex-col flex-1 gap-[1.2rem] justify-center'>
        <div className='h-[3.6rem] rounded-[1.2rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
        <div className='w-[26.1rem] h-[3.2rem] rounded-[1.2rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
        <div className='h-[7.8rem] rounded-[1.2rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      </div>
    </div>
  );
};

interface TechBlogSkeletonListProps {
  itemsInRows: number;
}

export const TechSkeletonList = ({ itemsInRows }: TechBlogSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <TechSkeleton key={index} />
      ))}
    </>
  );
};

/** 기술블로그 (/) 스켈레톤 */
export const MainTechSkeleton = () => {
  return (
    <div className='flex flex-row py-[2.4rem] gap-[3.6rem] border-b-gray500 border-b-[1px]'>
      <div className='w-[12rem] h-[8rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      <div className='flex flex-col flex-1 gap-[1.2rem] justify-center'>
        <div className='h-[3.3rem] rounded-[1.2rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
        <div className='w-[26.1rem] h-[2.5rem] rounded-[1.2rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
        <div className='h-[9rem] rounded-[1.2rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      </div>
    </div>
  );
};

export const MainTechSkeletonList = ({ itemsInRows }: TechBlogSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <MainTechSkeleton key={index} />
      ))}
    </>
  );
};

// 모바일 기술블로그 카드 스켈레톤
export const MobileTechSkeleton = () => {
  return (
    <div className='flex flex-col gap-[1.6rem] border-b-gray500 border-b-[1px] py-[3.2rem] mb-[3.2rem]'>
      <div className='w-full h-[13.6em] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      <div className='flex flex-col gap-[0.8rem]'>
        <div className='h-[3.6rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
        <div className='w-3/4  h-[2.5rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
        <div className='h-[7.8rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      </div>
    </div>
  );
};

export const MobileTechSkeletonList = ({ itemsInRows }: TechBlogSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <MobileTechSkeleton key={index} />
      ))}
    </>
  );
};

// 기술블로그 기업구독 리스트 브라우저 스켈레톤
export const TechCompanyInfoSkeleton = () => {
  const { isMobile } = useMediaQueryContext();
  return (
    <div className='flex flex-row py-[2.4rem] gap-[3.6rem]'>
      <div className='w-[16rem] h-[12.8rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden h-[19.8rem]'></div>

      <div className='flex flex-col flex-1 gap-[1.2rem] justify-center'>
        <div className='flex flex-row justify-between items-center'>
          <div className='w-[16.2rem] h-[3.2rem] rounded-[0.8rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
          <div className='flex fle-row gap-[0.8rem]'>
            <MainButtonV2
              text='채용정보 보러가기'
              color='primary'
              iconPosition='right'
              size='medium'
              line
              radius='square'
            />
            <MainButtonV2
              color='primary'
              line={false}
              size={isMobile ? 'medium' : 'small'}
              radius='square'
              text={'구독하기'}
              className={isMobile ? 'flex-1' : ''}
            />
          </div>
        </div>

        <div className='h-[7.2rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      </div>
    </div>
  );
};

// 기술블로그 기업구독 리스트 모바일 스켈레톤
export const MobileTechCompanyInfoSkeleton = () => {
  const { isMobile } = useMediaQueryContext();
  return (
    <div className='flex flex-col gap-[1.6rem] border-b-gray500 border-b-[1px] py-[3.2rem] mb-[3.2rem]'>
      <div className='w-full h-[9.6em] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      <div className='flex flex-col gap-[0.8rem]'>
        <div className='h-[3rem] rounded-[0.8rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
        <div className='h-[10.8rem] rounded-[1.6rem] bg-gray600 relative skeleton-item overflow-hidden'></div>
      </div>
      <div className='flex fle-row gap-[0.8rem]'>
        <MainButtonV2
          text='채용정보 보러가기'
          color='primary'
          iconPosition='right'
          size='medium'
          line
          radius='square'
        />
        <MainButtonV2
          color='primary'
          line={false}
          size={isMobile ? 'medium' : 'small'}
          radius='square'
          text={'구독하기'}
          className={isMobile ? 'flex-1' : ''}
        />
      </div>
    </div>
  );
};
