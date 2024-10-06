import { useState } from 'react';

import { TechCommentProps } from '../types/techCommentsType';
import Comment from './Comment';
import CommentReplies from './CommentReplies';

export default function CommentSet({
  data,
  articleId,
}: {
  data: TechCommentProps;
  articleId: string;
}) {
  const {
    author,
    contents,
    createdAt,
    isDeleted,
    likeTotalCount,
    maskedEmail,
    memberId,
    replies,
    isCommentAuthor,
    replyTotalCount,
    techCommentId,
    isModified,
  } = data;

  const [moreComments, setMoreComments] = useState(false);

  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  return (
    <>
      <Comment
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
        comment={contents}
        isModified={isModified}
        likeTotalCount={likeTotalCount}
        articleId={Number(articleId)}
        techCommentId={techCommentId}
      />

      <CommentReplies replies={replies} articleId={Number(articleId)} />

      {/* {subCommentInfo && subCommentInfo?.length > 2 && (
        <button onClick={handleMoreComments} className='p2 font-bold text-gray5 ml-[2.4rem]'>
          {moreComments ? '- 댓글 접기' : '+ 댓글 더보기'}
        </button> */}
      {/* )} */}
    </>
  );
}
