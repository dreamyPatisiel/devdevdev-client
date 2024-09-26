import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';
import SelectedPick from '@components/common/comments/SelectedPick';

interface CommentProps {
  isPickAuthor: boolean;
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
}

export default function Comment({
  isPickAuthor,
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
}: CommentProps) {
  return (
    <div
      className={`flex flex-col gap-[2.4rem] ${isSubComment && 'bg-gray1 px-[3.2rem] pt-[2.4rem] pb-[3.2rem]'}`}
    >
      <CommentHeader
        isPickAuthor={isPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
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

      <CommentContents comment={comment} isDeleted={false} />
    </div>
  );
}
