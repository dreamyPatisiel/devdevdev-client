import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useBlameReasonStore, useSelectedStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { useAnimationEnd } from '@hooks/useAnimationEnd';

import WritableComment from '@components/common/comment/WritableComment';
import { LikeButton, ReplyButton } from '@components/common/comment/borderRoundButton';
import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';
import SelectedPick from '@components/common/comments/SelectedPick';
import {
  COMMENT_BLAME_MODAL,
  COMMENT_DELETE_MODAL,
} from '@components/common/modals/modalConfig/comment';

import { usePostBlames } from '@/api/usePostBlames';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useDeletePickComment } from '../apiHooks/comment/useDeletePickComment';
import { usePatchPickComment } from '../apiHooks/comment/usePatchPickComment';
import { usePostCommentRecommend } from '../apiHooks/comment/usePostCommentRecommend';
import { usePostPickReplyComment } from '../apiHooks/comment/usePostPickComment';

interface CommentProps {
  pickOriginParentCommentId: number;
  pickParentCommentId: number;
  pickCommentId: number;
  pickParentCommentAuthor?: string;
  isCommentOfPickAuthor: boolean;
  parentCommentAuthor?: string;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  contents: string;
  isRecommended: boolean;
  recommendTotalCount: number;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle: string | null;

  isModified: boolean;
  isSubComment?: boolean;

  pickId: string;
  type: 'reply' | 'default';
  isBestComment?: boolean;
  hasReplies?: boolean;
  hasRestComments?: boolean;
}

export default function Comment({
  pickOriginParentCommentId,
  pickParentCommentId,
  pickCommentId,
  pickParentCommentAuthor,
  isCommentOfPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  contents,
  votedPickOption,
  votedPickOptionTitle,
  isModified,
  isSubComment,
  pickId,
  type,
  isRecommended,
  recommendTotalCount,
  isBestComment,
  hasReplies,
  hasRestComments,
}: CommentProps) {
  const [isReplyActived, setIsReplyActived] = useState(false);
  const [isEditActived, setIsEditActived] = useState(false);
  const [preContents, setPreContents] = useState('');
  const router = useRouter();
  const commentRef = useRef<HTMLDivElement>(null);

  const { mutate: postPickReplyMutate } = usePostPickReplyComment();
  const { mutate: patchPickCommentMutate } = usePatchPickComment();
  const { mutate: postCommentRecommendMutate } = usePostCommentRecommend();
  const { mutate: deletePickCommentMutate } = useDeletePickComment();
  const { mutate: postBlamesMutate } = usePostBlames();

  const { pushModal, popModal, setShowDropdown } = useModalStore();
  const { setToastVisible } = useToastVisibleStore();

  const { loginStatus } = useLoginStatusStore();
  const { userInfo } = useUserInfoStore();
  const { isMobile } = useMediaQueryContext();

  const { commentId } = router.query;

  useAnimationEnd({ ref: commentRef });

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReplyActived(false);
        setIsEditActived(false);
      }
    };

    window.addEventListener('keydown', handleEscKeydown);
    return () => window.removeEventListener('keydown', handleEscKeydown);
  }, []);

  const getPickParentCommentAuthor = (): string => {
    if (pickOriginParentCommentId !== pickParentCommentId) {
      return `@${pickParentCommentAuthor} `;
    }

    return '';
  };

  const handleSubmitReplyComment = ({
    contents: replyContents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    postPickReplyMutate(
      {
        pickId,
        contents: replyContents,
        pickOriginParentCommentId,
        pickParentCommentId: pickCommentId,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsReplyActived(false);
        },
      },
    );
  };

  const handleUpdateReplyComment = ({
    contents: updateContents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    patchPickCommentMutate(
      {
        pickId,
        pickCommentId,
        contents: updateContents,
      },
      {
        onSuccess: () => {
          onSuccess();
          setIsEditActived(false);
        },
      },
    );
  };

  const authorActions = [
    {
      buttonType: '수정하기',
      moreButtonOnclick: () => {
        setPreContents(contents);
        setIsEditActived(true);
      },
    },
    {
      buttonType: '삭제하기',
      moreButtonOnclick: async () => {
        pushModal({
          ...COMMENT_DELETE_MODAL,
          submitFunction: () => {
            deletePickCommentMutate({
              pickId,
              pickCommentId,
            });
          },
          cancelFunction: popModal,
        });
      },
    },
  ];

  // 내 댓글이 아닌 경우에 대한 버튼 리스트 생성
  const nonAuthorActions = [];

  // 로그인한 경우에만 신고하기 버튼 추가
  if (loginStatus === 'login') {
    nonAuthorActions.push({
      buttonType: '신고하기',
      moreButtonOnclick: () => {
        pushModal({
          ...COMMENT_BLAME_MODAL,
          submitFunction: () => {
            const { selectedBlameData } = useSelectedStore.getState();
            const { blameReason } = useBlameReasonStore.getState();

            if (selectedBlameData) {
              postBlamesMutate({
                blamePathType: 'PICK',
                params: {
                  blameTypeId: selectedBlameData?.id,
                  customReason: blameReason === '' ? null : blameReason,
                  pickCommentId,
                  pickId: Number(pickId),
                },
              });
            }
          },
          cancelFunction: popModal,
        });
        setShowDropdown?.();
      },
    });
  }

  // 관리자인 경우에만 삭제 버튼 추가
  if (userInfo?.isAdmin) {
    nonAuthorActions.push({
      buttonType: '삭제하기',
      moreButtonOnclick: () => {
        pushModal({
          ...COMMENT_DELETE_MODAL,
          submitFunction: () => {
            deletePickCommentMutate({
              pickId,
              pickCommentId,
            });
          },
          cancelFunction: popModal,
        });
      },
    });
  }

  const moreButtonList = isCommentAuthor ? authorActions : nonAuthorActions;

  const handleCancelButtonClick = () => {
    setIsEditActived(false);
  };

  const commentContainerStyle = () => {
    if (hasReplies) {
      return 'border-b-0';
    }

    if (isSubComment) {
      if (hasRestComments) {
        return 'bg-gray800 border-b-0';
      }

      return 'bg-gray800 border-b-[0.1rem] border-b-gray200';
    }

    return 'border-b-[0.1rem] border-b-gray400';
  };

  return (
    <div
      id={`comment-${pickCommentId}`}
      ref={commentRef}
      className={`flex flex-col gap-[1.6rem] pt-[2.4rem] pb-[3.2rem]
        ${isMobile ? 'px-0' : 'px-[1.6rem]'}
        ${isSubComment && (isMobile ? 'px-[1.6rem]' : 'px-[3.2rem]')}     
        ${commentContainerStyle()}
        ${commentId === String(pickCommentId) ? 'comment-item' : ''}
        `}
    >
      <CommentHeader
        isCommentAuthor={isCommentAuthor}
        isCommentOfPickAuthor={isCommentOfPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        moreButtonList={moreButtonList}
        isEditActived={isEditActived}
        isBestComment={isBestComment}
      />

      {isSubComment
        ? null
        : votedPickOption &&
          votedPickOptionTitle && (
            <SelectedPick
              votedPickOption={votedPickOption}
              votedPickOptionTitle={votedPickOptionTitle}
            />
          )}

      {!isEditActived && (
        <>
          <CommentContents
            comment={contents}
            isDeleted={isDeleted}
            isModified={isModified}
            parentCommentAuthor={getPickParentCommentAuthor()}
          />

          <div className='mr-0 flex gap-[0.8rem] mt-[0.8rem]'>
            <ReplyButton
              isActived={isReplyActived}
              setIsActived={setIsReplyActived}
              onClick={() => setPreContents('')}
              disabled={isDeleted}
            />
            <LikeButton
              isLiked={isRecommended}
              likeCount={recommendTotalCount}
              disabled={isDeleted}
              onClick={() => {
                if (isDeleted) {
                  return setToastVisible({
                    message: '삭제된 댓글은 추천할 수 없습니다.',
                    type: 'error',
                  });
                }

                postCommentRecommendMutate({ pickId, pickCommentId });
              }}
            />
          </div>
        </>
      )}

      {(isReplyActived || isEditActived) && (
        <WritableComment
          type='default'
          mode={isEditActived ? 'edit' : 'register'}
          writableCommentButtonClick={
            isEditActived ? handleUpdateReplyComment : handleSubmitReplyComment
          }
          parentCommentAuthor={type === 'reply' && isReplyActived ? author : ''}
          preContents={preContents}
          cancelButtonClick={handleCancelButtonClick}
        />
      )}
    </div>
  );
}
