import { useEffect, useState } from 'react';

import { useModalStore } from '@stores/modalStore';

import WritableComment from '@components/common/comment/WritableComment';
import { LikeButton, ReplyButton } from '@components/common/comment/borderRoundButton';
import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';
import SelectedPick from '@components/common/comments/SelectedPick';

import { useDeletePickComment } from '../apiHooks/comment/useDeletePickComment';
import { usePatchPickComment } from '../apiHooks/comment/usePatchPickComment';
import { usePostCommentRecommend } from '../apiHooks/comment/usePostCommentRecommend';
import { usePostPickReplyComment } from '../apiHooks/comment/usePostPickComment';

interface CommentProps {
  pickOriginParentCommentId: number;
  pickParentCommentId: number;
  pickCommentId: number;
  pickParentCommentAuthor?: string;
  isCommentOfPickAuthor: boolean;
  parentCommentAuthor?: string;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  contents: string;
  isRecommended: boolean;
  recommendTotalCount: number;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle: string | null;

  isModified?: boolean;
  isSubComment?: boolean;

  pickId: string;
  type: 'reply' | 'default';
  isBestComment?: boolean;
}

export default function Comment({
  pickOriginParentCommentId,
  pickParentCommentId,
  pickCommentId,
  pickParentCommentAuthor,
  isCommentOfPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  contents,
  votedPickOption,
  votedPickOptionTitle,
  isModified,
  isSubComment,
  pickId,
  type,
  isRecommended,
  recommendTotalCount,
  isBestComment,
}: CommentProps) {
  const [isReplyActived, setIsReplyActived] = useState(false);
  const [isEditActived, setIsEditActived] = useState(false);
  const [preContents, setPreContents] = useState('');
  const [isRecommend, setIsRecommend] = useState(isRecommended);
  const [recommendTotal, setRecommendTotal] = useState(recommendTotalCount && recommendTotalCount);

  const { mutate: postPickReplyMutate } = usePostPickReplyComment();
  const { mutate: patchPickCommentMutate } = usePatchPickComment();
  const { mutate: deletePickCommentMutate } = useDeletePickComment();
  const { mutate: postCommentRecommendMutate } = usePostCommentRecommend();

  const { openModal, setModalType, setContents, setModalSubmitFn } = useModalStore();

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReplyActived(false);
        setIsEditActived(false);
      }
    };

    window.addEventListener('keydown', handleEscKeydown);
    return () => window.removeEventListener('keydown', handleEscKeydown);
  }, []);

  const getPickParentCommentAuthor = (): string => {
    if (pickOriginParentCommentId !== pickParentCommentId) {
      return `@${pickParentCommentAuthor} `;
    }

    return '';
  };

  const handleSubmitReplyComment = ({
    contents: replyContents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    postPickReplyMutate(
      {
        pickId,
        contents: replyContents,
        pickOriginParentCommentId,
        pickParentCommentId: pickCommentId,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsReplyActived(false);
        },
      },
    );
  };

  const handleUpdateReplyComment = ({
    contents: updateContents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    patchPickCommentMutate(
      {
        pickId,
        pickCommentId,
        contents: updateContents,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsEditActived(false);
        },
      },
    );
  };

  const commentAuthor = [
    {
      buttonType: '수정하기',
      moreButtonOnclick: () => {
        setPreContents(contents);
        setIsEditActived(true);
      },
    },
    {
      buttonType: '삭제하기',
      moreButtonOnclick: async () => {
        setModalType('삭제');
        setContents('삭제하면 복구할 수 없고 다른 회원들이 댓글을 달 수 없어요');
        setModalSubmitFn(() => deletePickCommentMutate({ pickId, pickCommentId }));
        openModal();
      },
    },
  ];

  // const moreButtonList = isCommentAuthor ? ['수정', '삭제'] : ['신고'];

  return (
    <div
      className={`flex flex-col gap-[2.4rem] pt-[2.4rem] pb-[3.2rem] border-b-[0.1rem] border-b-gray3 border-t-[0.1rem] border-t-gray3 ${isSubComment && 'bg-gray1 px-[3.2rem]'}`}
    >
      <CommentHeader
        isPickAuthor={isCommentOfPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
        moreButtonList={commentAuthor}
        isEditActived={isEditActived}
        isBestComment={isBestComment}
      />

      {isSubComment
        ? null
        : votedPickOption &&
          votedPickOptionTitle && (
            <SelectedPick
              votedPickOption={votedPickOption}
              votedPickOptionTitle={votedPickOptionTitle}
            />
          )}

      {!isEditActived && (
        <>
          <CommentContents
            comment={contents}
            isDeleted={isDeleted}
            parentCommentAuthor={getPickParentCommentAuthor()}
          />

          <div className='mr-0 flex gap-[0.8rem]'>
            <ReplyButton
              isActived={isReplyActived}
              setIsActived={setIsReplyActived}
              onClick={() => setPreContents('')}
              disabled={isDeleted}
            />
            <LikeButton
              isLiked={isRecommend}
              likeCount={recommendTotal}
              disabled={isDeleted}
              onClick={() =>
                postCommentRecommendMutate(
                  { pickId, pickCommentId },
                  {
                    onSuccess: (success) => {
                      setIsRecommend(success.data.isRecommended);
                      setRecommendTotal(success.data.recommendTotalCount);
                    },
                  },
                )
              }
            />
          </div>
        </>
      )}

      {(isReplyActived || isEditActived) && (
        <WritableComment
          type='techblog'
          mode={isEditActived ? 'edit' : 'register'}
          writableCommentButtonClick={
            isEditActived ? handleUpdateReplyComment : handleSubmitReplyComment
          }
          parentCommentAuthor={type === 'reply' && isReplyActived ? `@${author} ` : ''}
          preContents={preContents}
        />
      )}
    </div>
  );
}
