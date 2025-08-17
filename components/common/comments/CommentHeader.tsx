import Image from 'next/image';

import { formatISOtoDate } from '@utils/formatDate';

import writerIcon from '@public/image/writerIcon.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import NicknameWithMaskedEmail from '../NicknameWithMaskedEmail';
import MoreButton from '../moreButton';
import Tag from '../tag/tag';

interface CommentHeaderProps {
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  isCommentOfPickAuthor: boolean;
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
  isCommentOfPickAuthor,
  moreButtonList,
  isEditActived,
  isBestComment,
}: CommentHeaderProps) {
  const { isMobile } = useMediaQueryContext();

  return (
    <div className='flex justify-between'>
      <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-4'}`}>
        <span className={`flex ${isMobile ? 'gap-[0.4rem] mb-[1rem]' : ''}`}>
          {isBestComment && (
            <Tag
              color='secondary'
              status='main'
              size='basic'
              content='Best'
              className={`w-fit font-bold ${isMobile ? '' : 'mr-[1.6rem]'}`}
            />
          )}
          {isCommentAuthor && isMobile && (
            <Tag
              color='secondary'
              status='line'
              size='basic'
              content='내가 썼어요'
              className='w-fit font-bold'
            />
          )}
        </span>

        <span className={`flex items-center`}>
          {isCommentOfPickAuthor ? (
            <Image src={writerIcon} alt={'작성자 아이콘'} className='mr-[0.8rem]' />
          ) : null}
          <NicknameWithMaskedEmail author={author} maskedEmail={maskedEmail} textSize='p2' />
        </span>
        <time className={`text-gray300 ${isMobile ? '' : 'mx-[1.6rem]'}`}>
          {formatISOtoDate(createdAt || '')}
        </time>

        {isCommentAuthor && !isMobile && (
          <Tag
            color='secondary'
            status='line'
            size='small'
            content='내가 썼어요'
            className='w-fit font-bold'
          />
        )}
      </div>

      {isDeleted || isEditActived || moreButtonList.length === 0 ? null : (
        <span className='mr-[1rem]'>
          <MoreButton moreButtonList={moreButtonList} type='small' />
        </span>
      )}
    </div>
  );
}
