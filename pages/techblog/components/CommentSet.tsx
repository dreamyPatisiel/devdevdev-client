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
        replies={replies}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={false}
        comment={contents}
        isModified={isModified}
        likeTotalCount={likeTotalCount}
        articleId={Number(articleId)}
        techCommentId={techCommentId}
        originParentTechCommentId={techCommentId}
      />
      <CommentReplies
        replies={replies}
        originParentTechCommentId={techCommentId}
        articleId={Number(articleId)}
      />
    </>
  );
}
