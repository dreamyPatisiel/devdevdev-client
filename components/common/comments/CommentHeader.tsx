import { formatISOtoDate } from '@utils/formatDate';

import MoreButton from '../moreButton';
import { StatusTag } from '../tags';

interface CommentHeaderProps {
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
}

export default function CommentHeader({
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor = true,
}: CommentHeaderProps) {
  const moreButtonList = isCommentAuthor ? ['수정', '삭제'] : ['신고'];

  return (
    <div className='flex justify-between'>
      <span className='flex items-center'>
        <span className='c1 text-gray5 font-bold'>{`${author}(${maskedEmail})`}</span>
        {isCommentAuthor ? <StatusTag text='작성자' bgColor='point1' /> : null}
        <span className='c1 text-gray3 ml-[2rem]'>{formatISOtoDate(createdAt || '')}</span>
      </span>

      {isDeleted ? null : (
        <MoreButton
          moreButtonList={moreButtonList.map((type) => ({
            buttonType: type,
            moreButtonOnclick: () => {},
          }))}
          type='small'
        />
      )}
    </div>
  );
}
