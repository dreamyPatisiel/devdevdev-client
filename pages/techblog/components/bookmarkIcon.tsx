import { useEffect, useRef, useState } from 'react';

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
  const CLICK_IGNORE_TIME = 3 * 1000;
  const BOOKMARK_CLICK_MAX_CNT = 10;
  const { mutate: bookmarkMutation } = usePostBookmarkStatus();
  const [clickCount, setClickCount] = useClickCounter({
    maxCount: BOOKMARK_CLICK_MAX_CNT,
    threshold: 1000,
  });

  const [isIgnoreClick, setIsIgnoreClick] = useState(false);

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

  useEffect(() => {
    let ignoreTimer: NodeJS.Timeout;

    const ignoreCilckEvent = () => {
      ignoreTimer = setTimeout(() => {
        setIsIgnoreClick(false);
      }, CLICK_IGNORE_TIME);

      return () => {
        clearTimeout(ignoreTimer);
      };
    };

    if (clickCount >= BOOKMARK_CLICK_MAX_CNT) {
      setIsIgnoreClick(true);
      ignoreCilckEvent();
    }
  }, [clickCount]);

  const handleBookmarkClick = () => {
    if (isIgnoreClick) {
      return;
    }
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
      alt={isBookmarkActive ? '북마크아이콘' : '북마크취소아이콘'}
    />
  );
};

export default BookmarkIcon;
