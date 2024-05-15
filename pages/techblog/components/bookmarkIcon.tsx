import { useEffect } from 'react';

import Image from 'next/image';

import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import useClickCounter from '../hooks/useClickCounter';

const BookmarkIcon = ({
  id,
  tooltipMessage,
  isBookmarkActive,
  setBookmarkActive,
  setTooltipMessage,
}: {
  id: number;
  tooltipMessage: string;
  isBookmarkActive: boolean;
  setBookmarkActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTooltipMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { mutate: bookmarkMutation } = usePostBookmarkStatus();
  const [clickCount, setClickCount] = useClickCounter({ maxCount: 10, threshold: 1000 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const hideTooltipAfterDelay = () => {
      timeoutId = setTimeout(() => {
        setTooltipMessage('');
      }, 2 * 1000);
    };
    if (tooltipMessage !== '') {
      hideTooltipAfterDelay();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isBookmarkActive, tooltipMessage]);

  const handleBookmarkClick = () => {
    setClickCount((prev) => prev + 1);

    bookmarkMutation(
      {
        techArticleId: id,
        status: !isBookmarkActive,
      },
      {
        onSuccess: () => {
          setBookmarkActive((prev) => !prev);
          setTooltipMessage(isBookmarkActive ? '북마크에서 삭제했어요' : '북마크로 저장했어요');
        },
      },
    );
  };

  return (
    <Image
      width={15}
      height={16}
      src={isBookmarkActive ? bookmarkActive : bookmarkNonActive}
      className='cursor-pointer'
      onClick={handleBookmarkClick}
      alt={isBookmarkActive ? '좋아요버튼' : '좋아요취소버튼'}
    />
  );
};

export default BookmarkIcon;
