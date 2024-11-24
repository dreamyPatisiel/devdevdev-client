import React, { useState } from 'react';

import Comment from './Comment';
import CommentReplies from './CommentReplies';
import { CommentsProps } from './CommentSet';

export default function BestComments({
  pickCommentId,
  isCommentOfPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  contents,
  isRecommended,
  recommendTotalCount,

  votedPickOption,
  votedPickOptionTitle,

  replies,
  isModified,
  pickId,
}: CommentsProps) {
  const [moreComments, setMoreComments] = useState(false);

  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  return (
    <>
      <Comment
        isCommentOfPickAuthor={isCommentOfPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
        contents={contents}
        votedPickOption={votedPickOption}
        votedPickOptionTitle={votedPickOptionTitle ?? ''}
        isModified={isModified}
        pickId={pickId}
        pickOriginParentCommentId={pickCommentId}
        pickParentCommentId={pickCommentId}
        pickCommentId={pickCommentId}
        type='default'
        isRecommended={isRecommended}
        recommendTotalCount={recommendTotalCount}
        isBestComment={true}
        hasReplies={replies?.length === 0 ? false : true}
      />

      <CommentReplies replies={replies} pickId={pickId} isBestComment={true} />
    </>
  );
}
