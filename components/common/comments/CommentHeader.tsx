import { formatISOtoDate } from '@utils/formatDate';

import { useModalStore } from '@stores/modalStore';

import MoreButton from '../moreButton';
import { StatusTag } from '../tags';

interface CommentHeaderProps {
  isPickAuthor: boolean;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  moreButtonList: {
    buttonType: string;
    moreButtonOnclick?: (() => void) | undefined;
  }[];
  isEditActived: boolean;
}

export default function CommentHeader({
  isPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  moreButtonList,
  isEditActived,
}: CommentHeaderProps) {
  // const moreButtonList = isCommentAuthor ? ['수정', '삭제'] : ['신고'];

  const { setModalType, openModal } = useModalStore();

  const handleModalButton = (type: string) => () => {
    setModalType(type);
    openModal();
  };

  return (
    <div className='flex justify-between'>
      <span className='flex items-center'>
        <span className='c1 text-gray5 font-bold'>{`${author}(${maskedEmail})`}</span>
        {isPickAuthor ? <StatusTag text='작성자' bgColor='point1' /> : null}
        <span className='c1 text-gray3 ml-[2rem]'>{formatISOtoDate(createdAt || '')}</span>
      </span>

      {isDeleted || isEditActived ? null : (
        <MoreButton moreButtonList={moreButtonList} type='small' />
      )}
    </div>
  );
}
