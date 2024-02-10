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
