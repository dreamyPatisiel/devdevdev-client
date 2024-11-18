import { useState } from 'react';

import CommentRepliesButton from '@/components/common/comment/CommentRepliesButton';

import { RepliesProps } from '../types/techCommentsType';
import Comment from './Comment';

export default function CommentReplies({
  replies,
  articleId,
  originParentTechCommentId,
  isBestComment,
  isCommentOpen,
  setIsCommentOpen,
}: {
  replies: RepliesProps[];
  articleId: number;
  originParentTechCommentId: number;
  isBestComment: boolean;
  isCommentOpen: boolean;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const repliesLen = replies?.length;
  // 댓글 접기
  const handleOpenComments = () => {
    setIsCommentOpen(!isCommentOpen);
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
    comments.map((subComment, index) => (
      <Comment
        key={subComment.techCommentId}
        articleId={articleId}
        techCommentId={subComment.techCommentId}
        isRecommended={subComment.isRecommended}
        recommendTotalCount={subComment.recommendTotalCount}
        isSubComment={true}
        createdAt={subComment.createdAt}
        author={subComment.author}
        maskedEmail={subComment.maskedEmail}
        comment={subComment.contents}
        isCommentAuthor={subComment.isCommentAuthor}
        isDeleted={subComment.isDeleted}
        isModified={subComment.isModified}
        techParentCommentId={subComment.techParentCommentId}
        techParentCommentMemberId={subComment.techParentCommentMemberId}
        techParentCommentAuthor={subComment.techParentCommentAuthor}
        techOriginParentCommentId={subComment.techOriginParentCommentId}
        isFirstComment={isCommentOpen && index === 0}
        isCommentOpen={isCommentOpen}
      />
    ));

  return (
    <>
      <CommentRepliesButton
        showComments={handleOpenComments}
        repliesCount={repliesLen}
        isOpen={isCommentOpen}
      />

      {isCommentOpen && (
        <>
          {/* 기본 5개 보여주는 댓글 */}
          {renderComments(replies.slice(0, 5))}

          {/* 더보기 버튼 */}
          {!moreComments && repliesLen > 5 && (
            <button onClick={handleMoreComments} className='p2 font-bold text-[#00D649] p-[3.2rem]'>
              댓글 전체 보기 +
            </button>
          )}

          {/* 나머지 댓글 */}
          {moreComments && renderComments(replies.slice(5))}
        </>
      )}
    </>
  );
}
