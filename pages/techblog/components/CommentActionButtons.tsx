import React, { useState } from 'react';

import WritableComment from '@components/common/comment/WritableComment';
import { LikeButton, ReplyButton } from '@components/common/comment/borderRoundButton';

export default function CommentActionButtons({
  likeTotalCount,
  handleLikeClick,
}: {
  likeTotalCount: number;
  handleLikeClick: () => void;
}) {
  const [isReplyBtnActive, setIsReplyBtnActive] = useState(false);

  return (
    <>
      <div className='flex gap-[8px]'>
        <ReplyButton isActived={isReplyBtnActive} setIsActived={setIsReplyBtnActive} />
        <LikeButton isLiked={false} likeCount={likeTotalCount} onClick={handleLikeClick} />
      </div>

      {isReplyBtnActive && (
        <div className='mt-[1.6rem]'>
          <WritableComment type='techblog' mode='register' handleSubmitClick={() => {}} />
        </div>
      )}
    </>
  );
}
