export const PickSkeleton = () => {
  return (
    <div className='px-[2.4rem] py-[3.2rem] flex flex-col gap-[3.2rem] rounded-[1.6rem] border-gray2 border-solid border'>
      <div className='h-[3.7rem] w-[100%] rounded-[1.6rem] bg-[#29292E] relative overflow-hidden skeleton-item' />
      <div className='flex flex-col gap-[1.6rem]'>
        <div className='h-[10.1rem] bg-[#29292E] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
        <div className='h-[10.1rem] bg-[#29292E] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
      </div>
      <div className='h-[1rem] w-[50%] bg-[#29292E] rounded-[1.6rem] relative overflow-hidden skeleton-item' />
    </div>
  );
};

interface PickSkeletonListProps {
  rows: number;
  itemsInRows: number;
}

export const PickSkeletonList = ({ rows, itemsInRows }: PickSkeletonListProps) => {
  return (
    <div className='grid grid-cols-3 gap-8'>
      {Array.from({ length: rows * itemsInRows }, (_, index) => (
        <PickSkeleton key={index} />
      ))}
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className='py-[1.6rem]'>
      <div className='flex justify-between h-[1.2rem] mb-[2.3rem]'>
        <div className='flex h-[1.2rem] gap-[1.6rem]'>
          <div className='w-[14.2rem] rounded-[1.6rem] bg-[#29292E] relative skeleton-item'></div>
          <div className='w-[6.2rem] rounded-[1.6rem] bg-[#29292E] relative skeleton-item'></div>
        </div>

        <div className='w-[4.9rem] rounded-[1.6rem] bg-[#29292E] relative skeleton-item'></div>
      </div>

      <div className='h-[1.4rem] rounded-[1.6rem] bg-[#29292E] mb-[0.8rem] relative skeleton-item overflow-hidden'></div>
      <div className='h-[1.4rem] w-[80rem] rounded-[1.6rem] bg-[#29292E] relative skeleton-item overflow-hidden'></div>
    </div>
  );
};
