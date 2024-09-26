import Image from 'next/image';

import InfoCircle from '@public/image/pickpickpick/info-circle.svg';

interface CommentContentsProps {
  comment: string;
  isDeleted: boolean;
}

export default function CommentContents({ comment, isDeleted }: CommentContentsProps) {
  if (isDeleted) {
    return (
      <div className='px-[2.4rem] py-[0.8rem] rounded-[1.2rem] bg-gray1'>
        <p className='p2 text-gray4 flex items-center gap-[1rem] m-[1rem]'>
          <Image src={InfoCircle} alt='안내 아이콘' />
          {comment}
        </p>
      </div>
    );
  }

  return <p className='p2'>{comment}</p>;
}
