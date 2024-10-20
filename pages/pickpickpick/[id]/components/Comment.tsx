import { useState } from 'react';

import WritableComment from '@components/common/comment/WritableComment';
import { ReplyButton } from '@components/common/comment/borderRoundButton';
import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';
import SelectedPick from '@components/common/comments/SelectedPick';

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
  comment: string;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle: string | null;

  isModified?: boolean;
  isSubComment?: boolean;

  pickId: string;
  type: 'reply' | 'default';
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
  comment,
  votedPickOption,
  votedPickOptionTitle,
  isModified,
  isSubComment,
  pickId,
  type,
}: CommentProps) {
  const [isReplyActived, setIsReplyActived] = useState(false);
  const [isEditActived, setIsEditActived] = useState(false);
  const [preContents, setPreContents] = useState('');

  const { mutate: postPickReplyMutate } = usePostPickReplyComment();

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

  const commentAuthor = [
    {
      buttonType: '수정하기',
      moreButtonOnclick: async () => {
        setPreContents(comment);
        setIsEditActived(true);
      },
    },
  ];

  // const moreButtonList = isCommentAuthor ? ['수정', '삭제'] : ['신고'];

  return (
    <div
      className={`flex flex-col gap-[2.4rem] pt-[2.4rem] pb-[3.2rem] border-b-[0.1rem] border-b-gray3 border-t-[0.1rem] border-t-gray3 ${isSubComment && 'bg-gray1 px-[3.2rem]'}`}
    >
      <CommentHeader
        isPickAuthor={isCommentOfPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
        moreButtonList={commentAuthor}
        isEditActived={isEditActived}
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
            comment={comment}
            isDeleted={isDeleted}
            parentCommentAuthor={getPickParentCommentAuthor()}
          />

          <div className='mr-0'>
            <ReplyButton
              isActived={isReplyActived}
              setIsActived={setIsReplyActived}
              onClick={() => setPreContents('')}
            />
          </div>
        </>
      )}

      {(isReplyActived || isEditActived) && (
        <WritableComment
          type='techblog'
          mode={isEditActived ? 'edit' : 'register'}
          writableCommentButtonClick={handleSubmitReplyComment}
          parentCommentAuthor={type === 'reply' ? `@${author} ` : ''}
          preContents={preContents}
        />
      )}
    </div>
  );
}
