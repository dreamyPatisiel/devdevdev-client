import React, { useEffect, useState } from 'react';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import WritableComment from '@components/common/comment/WritableComment';
import { LikeButton, ReplyButton } from '@components/common/comment/borderRoundButton';

import { usePostReply } from '../api/usePostReply';
import { RepliesProps } from '../types/techCommentsType';

export default function CommentActionButtons({
  mode,
  replies,
  isDeleted,
  isRecommended,
  recommendTotalCount,
  techArticleId,
  originParentTechCommentId,
  parentTechCommentId,
  handleLikeClick,
  techParentCommentAuthor,
}: {
  mode?: 'register' | 'edit' | 'reply';
  replies?: RepliesProps[];
  isDeleted: boolean;
  isRecommended: boolean;
  recommendTotalCount: number;
  techArticleId: number;
  originParentTechCommentId: number;
  parentTechCommentId: number;
  handleLikeClick: () => void;
  techParentCommentAuthor?: string;
}) {
  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal } = useLoginModalStore();
  const [isReplyBtnActive, setIsReplyBtnActive] = useState(false);

  const { mutate: replyMutation } = usePostReply();

  /** 답글 작성 함수 */
  const handleSubmitBtnClick = ({
    contents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    replyMutation(
      {
        techArticleId: techArticleId,
        originParentTechCommentId: originParentTechCommentId,
        parentTechCommentId: parentTechCommentId,
        contents: contents,
      },
      {
        onSuccess: () => {
          setIsReplyBtnActive(false);
          onSuccess();
        },
        onError: (error) => {
          setIsReplyBtnActive(false);
        },
      },
    );
  };
  useEffect(() => {
    if (isReplyBtnActive && loginStatus === 'logout') {
      openLoginModal();
      setIsReplyBtnActive(false);
    }
  }, [isReplyBtnActive, loginStatus]);

  return (
    <>
      <div className='flex gap-[8px]'>
        <ReplyButton
          disabled={isDeleted}
          isActived={isReplyBtnActive}
          setIsActived={setIsReplyBtnActive}
        />
        <LikeButton
          isLiked={isRecommended}
          likeCount={recommendTotalCount}
          onClick={handleLikeClick}
        />
      </div>

      {isReplyBtnActive && loginStatus !== 'logout' && (
        <div className='mt-[1.6rem]'>
          <WritableComment
            type='techblog'
            mode='register'
            writableCommentButtonClick={handleSubmitBtnClick}
            parentCommentAuthor={mode === 'reply' ? '' : techParentCommentAuthor}
          />
        </div>
      )}
    </>
  );
}
