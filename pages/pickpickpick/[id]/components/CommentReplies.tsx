import Comment from './Comment';
import { SubCommentsProps } from './CommentSet';

interface CommentRepliesProps {
  replies?: SubCommentsProps[];
}

export default function CommentReplies({ replies }: CommentRepliesProps) {
  return (
    <>
      {/* {replies
        ?.slice(0, 5)
        .map((subComment) => (
          <Comment
            key={subComment.pickCommentId}
            isSubComment={true}
            createdAt={subComment.createdAt}
            isPickAuthor={subComment.isPickAuthor}
            author={subComment.author}
            maskedEmail={subComment.maskedEmail}
            comment={subComment.contents}
            isCommentAuthor={subComment.isCommentAuthor}
            isDeleted={subComment.isDeleted}
            isModified={subComment.isModified}
            votedPickOption={null}
            votedPickOptionTitle={null}
          />
        ))} */}
    </>
  );
}
