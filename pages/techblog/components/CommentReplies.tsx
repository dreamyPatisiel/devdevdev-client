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
  return (
    <>
      {replies
        ?.slice(0, 5)
        .map((subComment) => (
          <Comment
            articleId={articleId}
            techCommentId={subComment.techCommentId}
            likeTotalCount={subComment.likeTotalCount}
            key={subComment.techCommentId}
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
        ))}
    </>
  );
}
