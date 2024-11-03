import BorderRoundButton, { LikeButton, ReplyButton } from '../comment/borderRoundButton';

// 댓글 스켈레톤
export const CommentSkeleton = () => {
  return (
    <div className='pb-[1.6rem]'>
      <div className='py-[1.6rem]'>
        <div className='flex justify-between h-[1.2rem] mb-[2.3rem]'>
          <div className='flex h-[1.2rem] gap-[1.6rem]'>
            <div className='w-[14.2rem] h-[2.4rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item'></div>
            <div className='w-[6.2rem] h-[2.4rem] rounded-[1.2rem] bg-[#29292E] relative skeleton-item'></div>
          </div>
        </div>
        <div className='h-[7.2rem] rounded-[1.2rem] bg-[#29292E] mb-[0.8rem] relative skeleton-item overflow-hidden'></div>
      </div>
      <div className='flex gap-[8px]'>
        <BorderRoundButton isActived={false} text='답글' onClick={() => {}} />
        <LikeButton isLiked={false} likeCount={0} />
      </div>
    </div>
  );
};

interface CommentSkeletonListProps {
  itemsInRows: number;
}

export const CommentSkeletonList = ({ itemsInRows }: CommentSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: itemsInRows }, (_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </>
  );
};
