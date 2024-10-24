import Comment from './Comment';
import { SubCommentsProps } from './CommentSet';

interface CommentRepliesProps {
  replies?: SubCommentsProps[];
  pickId: string;
}

export default function CommentReplies({ replies, pickId }: CommentRepliesProps) {
  return (
    <>
      {replies
        // ?.slice(0, 5)
        ?.map((subComment) => (
          <Comment
            key={subComment.pickCommentId}
            isSubComment={true}
            createdAt={subComment.createdAt}
            isCommentOfPickAuthor={subComment.isCommentOfPickAuthor}
            author={subComment.author}
            maskedEmail={subComment.maskedEmail}
            comment={subComment.contents}
            isCommentAuthor={subComment.isCommentAuthor}
            isDeleted={subComment.isDeleted}
            isModified={subComment.isModified}
            votedPickOption={null}
            votedPickOptionTitle={null}
            pickId={pickId}
            pickOriginParentCommentId={subComment.pickOriginParentCommentId}
            pickParentCommentId={subComment.pickParentCommentId}
            pickParentCommentAuthor={subComment.pickParentCommentAuthor}
            pickCommentId={subComment.pickCommentId}
            type={'reply'}
            recommendStatus={subComment.isRecommended}
            recommendTotalCount={subComment.likeTotalCount}
          />
        ))}
    </>
  );
}
