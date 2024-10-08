import React, { useCallback, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import WritableComment from '@components/common/comment/WritableComment';
import { LikeButton, ReplyButton } from '@components/common/comment/borderRoundButton';

import { usePostReply } from '../api/usePostReply';

export default function CommentActionButtons({
  likeTotalCount,
  techArticleId,
  originParentTechCommentId,
  parentTechCommentId,
  handleLikeClick,
}: {
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
  const handleSubmitBtnClick = useCallback(
    (contents: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        replyMutation(
          {
            techArticleId: techArticleId,
            originParentTechCommentId: originParentTechCommentId,
            parentTechCommentId: parentTechCommentId,
            contents: contents,
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
              setIsReplyBtnActive(false);
              resolve('success');
            },
            onError: (error) => {
              console.error('답글작성 에러', error);
              setIsReplyBtnActive(false);
              reject('error');
            },
          },
        );
      });
    },
    [techArticleId, queryClient],
  );

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
            handleSubmitBtnClick={handleSubmitBtnClick}
          />
        </div>
      )}
    </>
  );
}
