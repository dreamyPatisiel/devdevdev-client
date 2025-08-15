import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useQueryClient } from '@tanstack/react-query';

import { useLoginStatusStore } from '@stores/loginStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useTooltipHide from '@hooks/useTooltipHide';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { Spinner } from '@chakra-ui/spinner';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import {
  BOOKMARK_ICONS,
  BOOKMARK_CONSTANTS,
  BOOKMARK_MENTION,
} from '../constants/bookmarkConstants';
import useClickCounter from '../hooks/useClickCounter';
import { BookmarkType } from '../types/techBlogType';

interface BookmarkIconProps {
  id: number;
  tooltipMessage: string;
  isBookmarkActive: boolean;
  setBookmarkActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTooltipMessage: React.Dispatch<React.SetStateAction<string>>;
  type: BookmarkType;
}

const BookmarkIcon = ({
  id,
  tooltipMessage,
  isBookmarkActive,
  setBookmarkActive,
  setTooltipMessage,
  type,
}: BookmarkIconProps) => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();
  const { loginStatus } = useLoginStatusStore();
  const { isMobile } = useMediaQueryContext();

  const { mutate: bookmarkMutation, isPending } = usePostBookmarkStatus();
  const [clickCount, setClickCount] = useClickCounter({
    maxCount: BOOKMARK_CONSTANTS.BOOKMARK_CLICK_MAX_CNT,
    threshold: 1000,
  });

  const [isIgnoreClick, setIsIgnoreClick] = useState(false);

  const isDetailPage = type === 'techblogDetail';

  const currentIcon = isBookmarkActive
    ? BOOKMARK_ICONS.BookmarkIcon.active
    : BOOKMARK_ICONS.BookmarkIcon.nonActive;

  useEffect(() => {
    setBookmarkActive(isBookmarkActive);
  }, [isBookmarkActive]);

  useTooltipHide({
    tooltipMessage,
    setTooltipMessage,
    dependencies: [isBookmarkActive, tooltipMessage],
  });

  useEffect(() => {
    if (loginStatus !== 'login') return;

    let ignoreTimer: NodeJS.Timeout;

    const ignoreCilckEvent = () => {
      ignoreTimer = setTimeout(() => {
        setIsIgnoreClick(false);
      }, BOOKMARK_CONSTANTS.CLICK_IGNORE_TIME);

      return () => {
        clearTimeout(ignoreTimer);
      };
    };

    if (clickCount >= BOOKMARK_CONSTANTS.BOOKMARK_CLICK_MAX_CNT) {
      setIsIgnoreClick(true);
      ignoreCilckEvent();
      setToastVisible({
        message: '북마크를 너무 많이 시도했어요! 잠시 후 다시 시도해주세요.',
        type: 'error',
      });
    }
  }, [clickCount]);

  const handleBookmarkClick = async () => {
    if (isIgnoreClick) return;

    setClickCount((prev) => prev + 1);

    bookmarkMutation(
      { techArticleId: id },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['techBlogData'] }),
            queryClient.invalidateQueries({ queryKey: ['techDetail', String(id)] }),
            queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] }),
          ]);

          if (type === 'techblog' || type === 'techblogDetail') {
            setBookmarkActive((prev) => !prev);
            setTooltipMessage(isBookmarkActive ? BOOKMARK_MENTION.REMOVE : BOOKMARK_MENTION.ADD);
          } else if (type === 'myinfo') {
            setToastVisible({ message: BOOKMARK_MENTION.REMOVE });
          }
        },
      },
    );
  };

  if (isDetailPage) {
    return (
      <MainButtonV2
        className='p2'
        size={isMobile ? 'xSmall' : 'small'}
        color={isBookmarkActive ? 'secondary' : 'gray'}
        onClick={handleBookmarkClick}
        line
        radius='square'
        text='북마크'
        isPending={isPending}
        spinnerSize={11}
        iconPosition='right'
        disabled={loginStatus !== 'login'}
        icon={isPending ? <></> : <Image width={11} src={currentIcon} alt='북마크 아이콘' />}
      />
    );
  }

  return isPending ? (
    <div className='flex items-center justify-center'>
      <Spinner width={15} height={15} />
    </div>
  ) : (
    <button
      disabled={loginStatus !== 'login'}
      onClick={handleBookmarkClick}
      className='flex items-center justify-center'
    >
      <Image src={currentIcon} alt={isBookmarkActive ? '북마크 활성화' : '북마크 비활성화'} />
    </button>
  );
};

export default BookmarkIcon;
