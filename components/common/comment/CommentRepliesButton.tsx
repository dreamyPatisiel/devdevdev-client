import Image from 'next/image';

import downArrow from '@public/image/down-arrow-green.svg';
import upArrow from '@public/image/up-arrow-green.svg';
import useIsMobile from '@hooks/useIsMobile';
import { cn } from '@utils/mergeStyle';

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

  const defaultStyle = 'w-full flex items-center gap-3 p2 font-bold text-point1 bg-[#0D0E11] py-[1.6rem]';
  const mobileStyle = 'pl-[1.6rem]';
  const desktopStyle = 'pl-[3.2rem]';
  return (
      <button
      onClick={showComments}
      className={cn(isMobile ? mobileStyle : desktopStyle, defaultStyle)}
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
