import { useEffect, useState } from 'react';

import { useModalStore } from '@stores/modalStore';

import { Modal } from '@components/modals/modal';
import { StatusTag } from '@components/tags';

import CommentDots from '@public/image/pickpickpick/comment-dots-gray.svg';
import InfoCircle from '@public/image/pickpickpick/info-circle.svg';
import ThumbsupDisabled from '@public/image/pickpickpick/thumbs-up-disabled.svg';
import ThumbsupPoint from '@public/image/pickpickpick/thumbs-up-point.svg';
import Thumbsup from '@public/image/pickpickpick/thumbs-up.svg';

export default function Comment({
  댓글작성자,
  게시물작성자,
  userId,
  liked,
  isDeleted,
  comment,
  isSubComment,
}: {
  댓글작성자?: string;
  userId?: string;
  게시물작성자?: string;
  liked?: boolean;
  isDeleted?: {
    byAdmin?: boolean;
    byWriter?: boolean;
  };
  comment: string;
  isSubComment?: boolean;
}) {
  const [modalType, setModalType] = useState('');

  const { openModal, isModalOpen } = useModalStore();

  const handleModal = (type: string) => () => {
    setModalType(type);
    openModal();
  };

  useEffect(() => {
    if (!isModalOpen) {
      setModalType('');
    }
  }, [isModalOpen]);

  const [isLiked, setLiked] = useState(liked);

  const handleLiked = () => {
    setLiked(!isLiked);
  };

  return (
    <>
      <div className='flex justify-between'>
        <span className='flex items-center'>
          {isSubComment && <CommentDots alt='' className='mr-[1.2rem]' />}

          <span className='c1 text-gray5 font-bold'>명탐정코난(det*******)</span>
          {게시물작성자 === userId && <StatusTag text='작성자' />}
          <span className='c1 text-gray3 ml-[2rem]'>2023.05.11</span>

          {!isDeleted && (
            <span className='c1 text-gray4'>
              {댓글작성자 === userId ? (
                <>
                  <button onClick={handleModal('수정')} className='ml-[0.8rem]'>
                    수정
                  </button>
                  <button onClick={handleModal('삭제')} className='ml-[0.8rem]'>
                    삭제
                  </button>
                </>
              ) : (
                <button onClick={handleModal('신고')} className='ml-[0.8rem]'>
                  신고
                </button>
              )}
            </span>
          )}
        </span>

        <span className='flex gap-[0.8rem] items-center'>
          {isDeleted ? (
            <button disabled>
              <ThumbsupDisabled alt='비활성화된 좋아요 아이콘' />
            </button>
          ) : (
            <button onClick={handleLiked}>
              {isLiked ? (
                <ThumbsupPoint alt='클릭된 좋아요 아이콘' />
              ) : (
                <Thumbsup alt='클릭되지 않은 좋아요 아이콘' />
              )}
            </button>
          )}
          <span className={`c1 ${isDeleted ? 'text-gray5' : 'text-white'} font-bold`}>1345</span>
        </span>
      </div>

      <div className={`py-[1.6rem] ${isSubComment && 'pl-[2.4rem]'}`}>
        {isDeleted ? (
          <div className='px-[2.4rem] py-[0.8rem] rounded-[1.2rem] bg-gray1'>
            <p className='p2 text-gray4 flex items-center gap-[1rem] m-[1rem]'>
              <InfoCircle alt='안내 아이콘' />
              {isDeleted.byAdmin
                ? '관리자에 의해 삭제된 댓글입니다. (커뮤니티 정책 위반)'
                : '작성자에 의해 삭제된 댓글입니다.'}
            </p>
          </div>
        ) : (
          <p className='p2'>
            <span className='font-bold text-primary3 mr-[1rem]'>미래는 프론트다</span>
            {comment}
          </p>
        )}
      </div>

      {isModalOpen && (
        <Modal
          title={`댓글을 ${modalType}할까요?`}
          contents={comment}
          submitText={`${modalType}하기`}
        />
      )}
    </>
  );
}
