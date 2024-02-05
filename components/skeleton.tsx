export default function Skeleton() {
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
}
