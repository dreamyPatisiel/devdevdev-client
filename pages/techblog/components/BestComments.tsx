import React, { useState } from 'react';

import { TechCommentProps } from '../types/techCommentsType';
import Comment from './Comment';
import CommentReplies from './CommentReplies';

export default function BestComments({
  data,
  articleId,
}: {
  data: TechCommentProps;
  articleId: string;
}) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const {
    author,
    contents,
    createdAt,
    isCommentAuthor,
    isDeleted,
    isModified,
    isRecommended,
    maskedEmail,
    memberId,
    recommendTotalCount,
    replies,
    replyTotalCount,
    techCommentId,
  } = data;

  return (
    <>
      <Comment
        mode='reply'
        replies={replies}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
        comment={contents}
        isModified={isModified}
        isRecommended={isRecommended}
        recommendTotalCount={recommendTotalCount}
        articleId={Number(articleId)}
        techCommentId={techCommentId}
        techOriginParentCommentId={techCommentId}
        techParentCommentAuthor={''}
        isBestComment={true}
        isCommentOpen={isCommentOpen}
      />
      <CommentReplies
        replies={replies}
        originParentTechCommentId={techCommentId}
        articleId={Number(articleId)}
        isBestComment={true}
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
      />
    </>
  );
}
