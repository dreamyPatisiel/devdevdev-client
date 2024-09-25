import MoreButton from '../moreButton';
import { StatusTag } from '../tags';

interface CommentHeaderProps {
  isPickAuthor: boolean;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
}

export default function CommentHeader({
  isPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt = '2024.01.01',
  isCommentAuthor = false,
}: CommentHeaderProps) {
  const moreButtonList = isCommentAuthor ? ['수정', '삭제'] : ['신고'];

  return (
    <div className='flex justify-between'>
      <span className='flex items-center'>
        <span className='c1 text-gray5 font-bold'>{`${author}(${maskedEmail})`}</span>
        {isPickAuthor ? <StatusTag text='작성자' bgColor='point1' /> : null}
        <span className='c1 text-gray3 ml-[2rem]'>{createdAt}</span>
      </span>

      {isDeleted ? null : <MoreButton moreButtonList={moreButtonList} type='small' />}
    </div>
  );
}
