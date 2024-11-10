import Image from 'next/image';

import { formatISOtoDate } from '@utils/formatDate';

import useIsMobile from '@hooks/useIsMobile';

import writerIcon from '@public/image/writerIcon.svg';

import BestCommentTag from '../comment/BestCommentTag';
import MoreButton from '../moreButton';

interface CommentHeaderProps {
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  moreButtonList: {
    buttonType: string;
    moreButtonOnclick?: (() => void) | undefined;
  }[];
  isEditActived?: boolean;
  isBestComment?: boolean;
}

export default function CommentHeader({
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  moreButtonList,
  isEditActived,
  isBestComment,
}: CommentHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className='flex justify-between'>
      <span className={`flex  ${isMobile ? 'flex-col p2' : 'items-center c1'}`}>
        {isBestComment && (
          <div className={`${isMobile ? 'mb-[1rem]' : ''}`}>
            <BestCommentTag />
          </div>
        )}

        <span className={`flex items-center`}>
          {isCommentAuthor ? (
            <Image src={writerIcon} alt={'작성자 아이콘'} className='mr-[0.8rem]' />
          ) : null}
          <span className='text-gray5 font-bold'>{`${author}(${maskedEmail})`}</span>
        </span>
        <span className={`text-gray3 ${isMobile ? '' : 'ml-[2rem]'}`}>
          {formatISOtoDate(createdAt || '')}
        </span>
      </span>

      {isDeleted || isEditActived ? null : (
        <MoreButton moreButtonList={moreButtonList} type='small' />
      )}
    </div>
  );
}
