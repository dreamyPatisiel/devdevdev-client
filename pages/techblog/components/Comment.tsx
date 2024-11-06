import React, { useEffect, useState } from 'react';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore, useModalStore } from '@stores/modalStore';
import { useSelectedCommentIdStore } from '@stores/techBlogStore';

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
  isRecommended: boolean;
  recommendTotalCount: number;
  articleId: number;
  techCommentId: number;
  originParentTechCommentId: number;
  techParentCommentAuthor: string;
}

export default function Comment({
  replies,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  comment,
  isModified,
  isSubComment,
  recommendTotalCount,
  articleId,
  techCommentId,
  originParentTechCommentId,
  isRecommended,
  techParentCommentAuthor,
}: CommentProps) {
  const { mutate: recommendCommentMutation } = usePostRecommendComment();

  const { setSelectedCommentId } = useSelectedCommentIdStore();
  const [isEditMode, setIsEditMode] = useState(false);

  const { mutate: patchCommentMutatation } = usePatchComment();

  const { loginStatus } = useLoginStatusStore();

  // 모달관련
  const { setModalType, openModal } = useModalStore();
  const { openLoginModal } = useLoginModalStore();

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('??');

        setIsEditMode(false);
      }
    };
    window.addEventListener('keydown', handleEscKeydown);
    return () => window.removeEventListener('keydown', handleEscKeydown);
  }, []);

  useEffect(() => {
    console.log('isEditMode:', isEditMode); // 상태 업데이트 후 로그 확인
  }, [isEditMode]);

  const handleLikeClick = () => {
    recommendCommentMutation({
      techArticleId: articleId,
      techCommentId: techCommentId,
    });
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
        setIsEditMode(false);
        setModalType('삭제하기');
        openModal();
      },
    },
  ];

  const nonAuthorActions = [
    {
      buttonType: '신고하기',
      moreButtonOnclick: () => {
        if (loginStatus !== 'login') {
          openLoginModal();
          return;
        }
        openModal();
        setSelectedCommentId(techCommentId);
        setModalType('신고하기');
      },
    },
  ];

  const moreButtonList = isCommentAuthor ? authorActions : nonAuthorActions;

  /**  댓글 수정 함수 */
  const handleEditBtnClick = ({
    contents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    patchCommentMutatation(
      {
        techArticleId: articleId,
        techCommentId: techCommentId,
        contents: contents,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsEditMode(false);
        },
      },
    );
  };

  const handleCancelButtonClick = () => {
    setIsEditMode(false);
  };

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
        {!isEditMode && (
          <CommentContents
            comment={comment}
            isDeleted={isDeleted}
            parentCommentAuthor={techParentCommentAuthor}
          />
        )}
        {/* 수정시 나오는 폼 */}
        {isEditMode && (
          <WritableComment
            type='techblog'
            mode='edit'
            preContents={comment}
            parentCommentAuthor={techParentCommentAuthor}
            writableCommentButtonClick={handleEditBtnClick}
            cancleButtonClick={handleCancelButtonClick}
          />
        )}
        <CommentActionButtons
          replies={replies}
          isDeleted={isDeleted}
          techArticleId={articleId}
          isRecommended={isRecommended}
          recommendTotalCount={recommendTotalCount}
          originParentTechCommentId={originParentTechCommentId}
          parentTechCommentId={techCommentId}
          handleLikeClick={handleLikeClick}
          techParentCommentAuthor={author}
        />
      </div>
    </>
  );
}
