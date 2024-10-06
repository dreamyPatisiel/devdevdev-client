import React from 'react';

import { useQueryClient } from '@tanstack/react-query';

import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';

import { usePostRecommendComment } from '../api/useRecommendsComments';
import CommentActionButtons from './CommentActionButtons';

interface CommentProps {
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  comment: string;
  isModified?: boolean;
  isSubComment?: boolean;
  likeTotalCount: number;
  articleId: number;
  techCommentId: number;
}

export default function Comment({
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  comment,
  isModified,
  isSubComment,
  likeTotalCount,
  articleId,
  techCommentId,
}: CommentProps) {
  const { mutate: recommendCommentMutation } = usePostRecommendComment();
  const queryClient = useQueryClient();

  const handleLikeClick = () => {
    console.log('메인댓글 좋아요 클릭');

    recommendCommentMutation(
      {
        techArticleId: articleId,
        techCommentId: techCommentId,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
        },
      },
    );
  };

  return (
    <div
      className={`flex flex-col gap-[2.4rem] pt-[2.4rem] pb-[3.2rem] border-b-[0.1rem] border-b-gray3 border-t-[0.1rem] border-t-gray3 ${isSubComment && 'bg-gray1 px-[3.2rem]'}`}
    >
      <CommentHeader
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
      />

      <CommentContents comment={comment} isDeleted={isDeleted} />
      <CommentActionButtons likeTotalCount={likeTotalCount} handleLikeClick={handleLikeClick} />
    </div>
  );
}
