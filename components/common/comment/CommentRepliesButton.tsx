import Image from 'next/image';

import useIsMobile from '@hooks/useIsMobile';

import downArrow from '@public/image/down-arrow-green.svg';
import upArrow from '@public/image/up-arrow-green.svg';

interface CommentRepliesButtonProps {
  showComments: () => void;
  repliesCount: number;
  isOpen: boolean;
}

const CommentRepliesButton = ({
  showComments,
  repliesCount,
  isOpen,
}: CommentRepliesButtonProps) => {
  const isMobile = useIsMobile();

  if (repliesCount === 0) return null;

  return (
    <button
      onClick={showComments}
      className={`w-full flex items-center pl-[3.2rem] gap-3 p2 font-bold text-point1 h-[5.6rem] ${
        isMobile && 'bg-[#0D0E11]'
      }`}
    >
      {`댓글 ${repliesCount}개`}
      <Image
        src={isOpen ? downArrow : upArrow}
        alt={isOpen ? '아래화살표아이콘' : '위화살표아이콘'}
      />
    </button>
  );
};

export default CommentRepliesButton;
