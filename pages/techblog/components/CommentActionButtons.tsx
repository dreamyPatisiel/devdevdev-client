import React, { useCallback, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import WritableComment from '@components/common/comment/WritableComment';
import { LikeButton, ReplyButton } from '@components/common/comment/borderRoundButton';

import { usePostReply } from '../api/usePostReply';
import { RepliesProps } from '../types/techCommentsType';

export default function CommentActionButtons({
  replies,
  likeTotalCount,
  techArticleId,
  originParentTechCommentId,
  parentTechCommentId,
  handleLikeClick,
}: {
  replies?: RepliesProps[];
  likeTotalCount: number;
  techArticleId: number;
  originParentTechCommentId: number;
  parentTechCommentId: number;
  handleLikeClick: () => void;
}) {
  const queryClient = useQueryClient();
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

  return (
    <>
      <div className='flex gap-[8px]'>
        <ReplyButton isActived={isReplyBtnActive} setIsActived={setIsReplyBtnActive} />
        <LikeButton isLiked={false} likeCount={likeTotalCount} onClick={handleLikeClick} />
      </div>

      {isReplyBtnActive && (
        <div className='mt-[1.6rem]'>
          <WritableComment
            type='techblog'
            mode='register'
            writableCommentButtonClick={handleSubmitBtnClick}
            parentCommentAuthor='답글달아디'
          />
        </div>
      )}
    </>
  );
}
