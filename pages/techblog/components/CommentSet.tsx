import { TechCommentProps } from '../types/techCommentsType';
import Comment from './Comment';
import CommentReplies from './CommentReplies';

export default function CommentSet({
  data,
  articleId,
}: {
  data: TechCommentProps;
  articleId: string;
}) {
  const {
    author,
    contents,
    createdAt,
    isCommentAuthor,
    isDeleted,
    isModified,
    isRecommended,
    maskedEmail,
    recommendTotalCount,
    replies,
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
      />
      <CommentReplies replies={replies} articleId={Number(articleId)} isBestComment={false} />
    </>
  );
}
