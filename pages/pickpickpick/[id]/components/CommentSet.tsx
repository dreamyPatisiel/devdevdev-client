import { useState } from 'react';

import Comment from './Comment';
import CommentReplies from './CommentReplies';

export interface SubCommentsProps {
  pickCommentId: number;
  memberId: number;
  pickParentCommentId: number;
  pickOriginParentCommentId: number;
  parentCommentAuthor: string;
  createdAt: string;
  isCommentOfPickAuthor: boolean;
  author: string;
  maskedEmail: string;
  contents: string;
  pickParentCommentAuthor: string;
  isRecommended: boolean;
  recommendTotalCount: number;

  isCommentAuthor: boolean;
  isDeleted: boolean;
  isModified?: boolean;
}

export interface CommentsProps {
  pickCommentId: number;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  contents: string;
  isRecommended: boolean;
  recommendTotalCount: number;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle?: string;

  isCommentOfPickAuthor: boolean;
  isModified?: boolean;
  replies?: SubCommentsProps[];
  pickId: string;
}

export default function CommentSet({
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
  return (
    <>
      <Comment
        isCommentOfPickAuthor={isCommentOfPickAuthor}
      <CommentReplies replies={replies} pickId={pickId} isBestComment={false} />
    </>
  );
}
