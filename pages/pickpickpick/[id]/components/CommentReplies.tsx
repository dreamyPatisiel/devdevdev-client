import { useState } from 'react';

import Comment from './Comment';
import { SubCommentsProps } from './CommentSet';

interface CommentRepliesProps {
  replies?: SubCommentsProps[];
  pickId: string;
}

export default function CommentReplies({ replies, pickId }: CommentRepliesProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const CAN_SHOW_COMMENT_COUNT = 3;
  // 추후에 Count 변경하기

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };
  return (
    <>
      {replies
        ?.slice(0, CAN_SHOW_COMMENT_COUNT)
        ?.map((subComment) => (
          <Comment
            key={subComment.pickCommentId}
            isSubComment={true}
            votedPickOption={null}
            votedPickOptionTitle={null}
            pickId={pickId}
            type={'reply'}
            {...subComment}
          />
        ))}
      {showAllComments
        ? replies
            ?.slice(CAN_SHOW_COMMENT_COUNT, replies.length)
            .map((subComment) => (
              <Comment
                key={subComment.pickCommentId}
                isSubComment={true}
                votedPickOption={null}
                votedPickOptionTitle={null}
                pickId={pickId}
                type={'reply'}
                {...subComment}
              />
            ))
        : replies &&
          replies.length > CAN_SHOW_COMMENT_COUNT && (
            <button onClick={handleShowAllComments}>댓글 전체 보기 +</button>
          )}
    </>
  );
}
