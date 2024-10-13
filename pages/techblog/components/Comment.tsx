import React, { useCallback, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useModalStore } from '@stores/modalStore';
import { useSelectedCommentIdStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import WritableComment from '@components/common/comment/WritableComment';
import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';

import { usePatchComment } from '../api/usePatchComment';
import { usePostRecommendComment } from '../api/useRecommendsComments';
import { RepliesProps } from '../types/techCommentsType';
import CommentActionButtons from './CommentActionButtons';

export interface CommentProps {
  replies?: RepliesProps[];
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
  originParentTechCommentId: number;
}

export default function Comment({
  replies,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor = true,
  comment,
  isModified,
  isSubComment,
  likeTotalCount,
  articleId,
  techCommentId,
  originParentTechCommentId,
}: CommentProps) {
  const { mutate: recommendCommentMutation } = usePostRecommendComment();
  const { isModalOpen, modalType, contents, setModalType, closeModal, openModal } = useModalStore();

  const { setToastVisible } = useToastVisibleStore();
  const { setSelectedCommentId } = useSelectedCommentIdStore();
  const [isEditMode, setIsEditMode] = useState(false);

  const queryClient = useQueryClient();

  const handleLikeClick = () => {
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

  const authorActions = [
    {
      buttonType: '수정하기',
      moreButtonOnclick: () => {
        setIsEditMode(true);
      },
    },
    {
      buttonType: '삭제하기',
      moreButtonOnclick: () => {
        setSelectedCommentId(techCommentId);
        setModalType('삭제하기');
        openModal();
      },
    },
  ];

  const nonAuthorActions = [
    {
      buttonType: '신고하기',
      moreButtonOnclick: () => {
        setSelectedCommentId(techCommentId);
        setModalType('신고하기');
        openModal();
      },
    },
  ];

  const moreButtonList = isCommentAuthor ? authorActions : nonAuthorActions;

  const { mutate: usePatchCommentMutatation } = usePatchComment();

  const handleEditBtnClick = useCallback(
    (contents: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        usePatchCommentMutatation(
          {
            techArticleId: articleId,
            techCommentId: techCommentId,
            contents: contents,
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
              setIsEditMode(false);
              setToastVisible('댓글이 수정되었어요!', 'success');
              resolve('success');
            },
            onError: (error) => {
              console.error('댓글수정 에러', error);
              reject('error');
            },
          },
        );
      });
    },
    [articleId, techCommentId, queryClient],
  );

  return (
    <>
      <div
        className={`flex flex-col gap-[2.4rem] pt-[2.4rem] pb-[3.2rem] border-b-[0.1rem] border-b-gray3 border-t-[0.1rem] border-t-gray3 ${isSubComment && 'bg-gray1 px-[3.2rem]'}`}
      >
        <CommentHeader
          isDeleted={isDeleted}
          author={author}
          maskedEmail={maskedEmail}
          createdAt={createdAt}
          isCommentAuthor={isCommentAuthor}
          moreButtonList={moreButtonList}
        />

        {/* 댓글 보여주는 컴포넌트 */}
        {!isEditMode && <CommentContents comment={comment} isDeleted={isDeleted} />}
        {/* 수정시 나오는 폼 */}
        {isEditMode && (
          <WritableComment
            type='techblog'
            mode='edit'
            preText={comment}
            handleSubmitBtnClick={handleEditBtnClick}
          />
        )}
        <CommentActionButtons
          replies={replies}
          techArticleId={articleId}
          likeTotalCount={likeTotalCount}
          originParentTechCommentId={originParentTechCommentId}
          parentTechCommentId={techCommentId}
          handleLikeClick={handleLikeClick}
        />
      </div>
    </>
  );
}
