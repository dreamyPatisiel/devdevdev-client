import Image from 'next/image';

import { formatISOtoDate } from '@utils/formatDate';

import { useModalStore } from '@stores/modalStore';

import writerIcon from '@public/image/writerIcon.svg';

import BestCommentTag from '../comment/BestCommentTag';
import MoreButton from '../moreButton';
import { StatusTag } from '../tags';

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
  const { setModalType, openModal } = useModalStore();

  const handleModalButton = (type: string) => () => {
    setModalType(type);
    openModal();
  };

  return (
    <div className='flex justify-between'>
      <span className='flex items-center'>
        {isBestComment && <BestCommentTag />}
        {isCommentAuthor ? (
          <Image src={writerIcon} alt={'작성자 아이콘'} className='mr-[0.8rem]' />
        ) : null}
        <span className='c1 text-gray5 font-bold'>{`${author}(${maskedEmail})`}</span>
        <span className='c1 text-gray3 ml-[2rem]'>{formatISOtoDate(createdAt || '')}</span>
      </span>

      {isDeleted || isEditActived ? null : (
        <MoreButton moreButtonList={moreButtonList} type='small' />
      )}
    </div>
  );
}
