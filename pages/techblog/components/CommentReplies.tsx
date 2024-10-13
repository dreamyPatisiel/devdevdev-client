import { useState } from 'react';

import Image from 'next/image';

import downArrow from '@public/image/down-arrow-green.svg';
import upArrow from '@public/image/up-arrow-green.svg';

import { RepliesProps } from '../types/techCommentsType';
import Comment from './Comment';

export default function CommentReplies({
  replies,
  articleId,
  originParentTechCommentId,
}: {
  replies: RepliesProps[];
  articleId: number;
  originParentTechCommentId: number;
}) {
  const repliesLen = replies?.length;

  // TODO: 접었을때 댓글더보기가 사라져야하는데 안사라짐.. 수정필요

  // 댓글 접기
  const [isCommentOpen, setIsCommentOpen] = useState(true);
  const handleOpenComments = () => {
    setIsCommentOpen(!isCommentOpen);
    console.log('isCommentOpen', isCommentOpen);
    if (isCommentOpen) {
      setMoreComments(false);
    }
  };

  // 댓글 더보기
  const [moreComments, setMoreComments] = useState(false);
  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  const renderComments = (comments: RepliesProps[]) =>
    comments.map((subComment) => (
      <Comment
        key={subComment.techCommentId}
        articleId={articleId}
        techCommentId={subComment.techCommentId}
        likeTotalCount={subComment.likeTotalCount}
        isSubComment={true}
        createdAt={subComment.createdAt}
        author={subComment.author}
        maskedEmail={subComment.maskedEmail}
        comment={subComment.contents}
        isCommentAuthor={subComment.isCommentAuthor}
        isDeleted={subComment.isDeleted}
        isModified={subComment.isModified}
        originParentTechCommentId={originParentTechCommentId}
      />
    ));

  return (
    <>
      {/* 댓글 접기&열기 버튼 */}
      {repliesLen > 0 && (
        <button
          className='w-full flex items-center ml-[3.2rem] gap-3 p2 font-bold text-point1 h-[5.6rem]'
          onClick={handleOpenComments}
        >
          {`댓글 ${repliesLen}개`}
          <Image
            src={isCommentOpen ? downArrow : upArrow}
            alt={isCommentOpen ? '아래화살표아이콘' : '위화살표아이콘'}
          />
        </button>
      )}

      {isCommentOpen && (
        <>
          {/* 기본 5개 보여주는 댓글 */}
          {renderComments(replies.slice(0, 5))}

          {/* 더보기 버튼 */}
          {!moreComments && repliesLen > 5 && (
            <button onClick={handleMoreComments} className='p2 text-point3'>
              댓글 더보기 +
            </button>
          )}

          {/* 나머지 댓글 */}
          {moreComments && renderComments(replies.slice(5))}
        </>
      )}
    </>
  );
}
