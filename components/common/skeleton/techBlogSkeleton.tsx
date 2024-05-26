/** 기술블로그 (/techblog) 스켈레톤 */
export const TechMainSkeleton = () => {
  return (
    <div className='flex flex-row  py-[3.2rem] gap-[3.6rem] border-b-gray1 border-b-[1px]'>
      <div className='w-[20rem] h-[13.6rem] rounded-[1.6rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
      <div className='flex flex-col flex-1 gap-[1.2rem] justify-center'>
        <div className='h-[3.6rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
        <div className='w-[26.1rem] h-[3.2rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
        <div className='h-[7.8rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
      </div>
    </div>
  );
};

interface TechBlogSkeletonListProps {
  itemsInRows: number;
}

export const TechMainSkeletonList = ({ itemsInRows }: TechBlogSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <TechMainSkeleton key={index} />
      ))}
    </>
  );
};

/** 기술블로그 (/) 스켈레톤 */
export const TechRootSkeleton = () => {
  return (
    <div className='flex flex-row py-[2.4rem] gap-[3.6rem] border-b-gray1 border-b-[1px]'>
      <div className='w-[12rem] h-[8rem] rounded-[1.6rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
      <div className='flex flex-col flex-1 gap-[1.2rem] justify-center'>
        <div className='h-[3.3rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
        <div className='w-[26.1rem] h-[2.5rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
        <div className='h-[9rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
      </div>
    </div>
  );
};

export const TechRootSkeletonList = ({ itemsInRows }: TechBlogSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <TechRootSkeleton key={index} />
      ))}
    </>
  );
};
