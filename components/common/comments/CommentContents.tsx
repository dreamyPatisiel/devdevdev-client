import Image from 'next/image';

import { LineBreakParser } from '@utils/LineBreakParser';

import InfoCircle from '@public/image/pickpickpick/info-circle.svg';

interface CommentContentsProps {
  comment: string;
  isDeleted: boolean;
  parentCommentAuthor: string;
  isModified: boolean;
}

export default function CommentContents({
  comment,
  isDeleted,
  isModified,
  parentCommentAuthor,
}: CommentContentsProps) {
  if (isDeleted) {
    return (
      <div className='px-[2.4rem] py-[0.8rem] rounded-[1.2rem] bg-[#151721]'>
        <p className='p2 text-gray4 flex items-center gap-[1rem] m-[1rem]'>
          <Image src={InfoCircle} alt='안내 아이콘' />
          {comment}
        </p>
      </div>
    );
  }

  return (
    <p className='p2 break-all break-words'>
      {parentCommentAuthor && <span className='text-[#BD79FF]'>{parentCommentAuthor} </span>}
      {<LineBreakParser text={comment} />}
      {isModified && <span className='text-[#677485]'> (수정됨)</span>}
    </p>
  );
}
