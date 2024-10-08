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

  // TODO: 여기에 replies나 parentTechCommentId값이 바뀌면  parentTechCommentId값을 넣으면 이름을 알려주는 유틸함수로 호출해서 멘션할 이름을 아예 폼 컴포넌트에 내려버려야징 . . . 그리고 isReplyBtnActive 값이 false로 바뀔때 초기화 해쥴거야 ,,,, (초기화하면originParentTechCommentId과 parentTechCommentId를 통일시켜 놔야함....아니다 . 아예 없애버려야할듯? )

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
