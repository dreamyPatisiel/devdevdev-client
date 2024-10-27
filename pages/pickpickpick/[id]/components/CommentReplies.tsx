import { useState } from 'react';

import Comment from './Comment';
import { SubCommentsProps } from './CommentSet';

interface CommentRepliesProps {
  replies?: SubCommentsProps[];
  pickId: string;
  isBestComment: boolean;
}

export default function CommentReplies({ replies, pickId, isBestComment }: CommentRepliesProps) {
  const [showDefaultComments, setShowDefaultComments] = useState(isBestComment ? false : true);
  const [showRestComments, setShowRestComments] = useState(false);
  const CAN_SHOW_COMMENT_COUNT = 3;
  // 추후에 Count 변경하기

  const handleShowAllComments = () => {
    setShowRestComments(true);
  };

  const showComments = () => {
    setShowDefaultComments(!showDefaultComments);

    if (!showDefaultComments) {
      setShowRestComments(false);
    }
  };

  const showCommentIcon = showDefaultComments ? '아래 방향 화살표' : '위 방향 화살표';

  if (!replies) {
    return <></>;
  }

  return (
    <>
      {replies.length > 0 && (
        <button onClick={showComments}>
          댓글 {replies.length}개 {showCommentIcon}
        </button>
      )}
      {showDefaultComments && (
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

          {showRestComments
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
            : replies.length > CAN_SHOW_COMMENT_COUNT && (
                <button onClick={handleShowAllComments}>댓글 전체 보기 +</button>
              )}
        </>
      )}
    </>
  );
}
