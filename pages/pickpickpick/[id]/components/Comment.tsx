import { useState } from 'react';

import Image from 'next/image';

import TextButton from '@components/common/buttons/textButton';
import { StatusTag } from '@components/common/tags';

import CommentDots from '@public/image/pickpickpick/comment-dots-gray.svg';
import InfoCircle from '@public/image/pickpickpick/info-circle.svg';
import ThumbsupDisabled from '@public/image/pickpickpick/thumbs-up-disabled.svg';
import ThumbsupPoint from '@public/image/pickpickpick/thumbs-up-point.svg';
import Thumbsup from '@public/image/pickpickpick/thumbs-up.svg';

export default function Comment({
  liked,
  isDeleted,
  comment,
  isSubComment,
  isPickAuthor,
  isModified,
}: {
  liked?: boolean;
  isDeleted?: {
    byAdmin?: boolean;
    byWriter?: boolean;
  };
  comment: string;
  isSubComment?: boolean;
  isPickAuthor: boolean;
  isModified: boolean;
}) {
  const [isLiked, setLiked] = useState(liked);

  const handleLiked = () => {
    setLiked(!isLiked);
  };

  const renderTextButton = () => {
    if (isModified) {
      return (
        <>
          <TextButton buttonType='수정' isModal={false} comment={comment} />
          <TextButton buttonType='삭제' isModal={true} comment={comment} />
        </>
      );
    }
    return <TextButton buttonType='신고' isModal={true} comment={comment} />;
  };

  const renderLikeButton = () => {
    if (isDeleted) {
      return (
        <button disabled>
          <Image src={ThumbsupDisabled} alt='비활성화된 좋아요 아이콘' />
        </button>
      );
    }

    return (
      <button onClick={handleLiked}>
        {isLiked ? (
          <Image src={ThumbsupPoint} alt='클릭된 좋아요 아이콘' />
        ) : (
          <Image src={Thumbsup} alt='클릭되지 않은 좋아요 아이콘' />
        )}
      </button>
    );
  };

  const renderComment = () => {
    if (isDeleted) {
      return (
        <div className='px-[2.4rem] py-[0.8rem] rounded-[1.2rem] bg-gray1'>
          <p className='p2 text-gray4 flex items-center gap-[1rem] m-[1rem]'>
            <Image src={InfoCircle} alt='안내 아이콘' />
            {isDeleted.byAdmin
              ? '관리자에 의해 삭제된 댓글입니다. (커뮤니티 정책 위반)'
              : '댓글 작성자에 의해 삭제된 댓글입니다.'}
          </p>
        </div>
      );
    }

    return (
      <p className='p2'>
        <span className='font-bold text-primary3 mr-[1rem]'>미래는 프론트다</span>
        {comment}
      </p>
    );
  };

  return (
    <>
      <div className='flex justify-between'>
        <span className='flex items-center'>
          {isSubComment && <Image src={CommentDots} alt='대댓글 아이콘' className='mr-[1.2rem]' />}

          <span className='c1 text-gray5 font-bold'>명탐정코난(det*******)</span>
          {isPickAuthor && <StatusTag text='작성자' bgColor='point1' />}
          <span className='c1 text-gray3 ml-[2rem]'>2023.05.11</span>

          {!isDeleted && <span className='c1 text-gray4'>{renderTextButton()}</span>}
        </span>

        <span className='flex gap-[0.8rem] items-center'>
          {renderLikeButton()}
          <span className={`c1 ${isDeleted ? 'text-gray3' : 'text-white'} font-bold`}>1345</span>
        </span>
      </div>

      <div className={`py-[1.6rem] ${isSubComment && 'pl-[2.4rem]'}`}>{renderComment()}</div>
    </>
  );
}
