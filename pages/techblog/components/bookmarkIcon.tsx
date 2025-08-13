import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useTooltipHide from '@hooks/useTooltipHide';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { Spinner } from '@chakra-ui/spinner';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import { BOOKMARK_ICONS, BOOKMARK_CONSTANTS } from '../constants/bookmarkConstants';
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
  const { isMobile } = useMediaQueryContext();

  const { mutate: bookmarkMutation, isPending } = usePostBookmarkStatus();
  const [clickCount, setClickCount] = useClickCounter({
    maxCount: BOOKMARK_CONSTANTS.BOOKMARK_CLICK_MAX_CNT,
    threshold: 1000,
  });

  const [isIgnoreClick, setIsIgnoreClick] = useState(false);

  const isDetailPage = type === 'techblog_detail';

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
    if (clickCount >= BOOKMARK_CONSTANTS.BOOKMARK_CLICK_MAX_CNT) {
      setIsIgnoreClick(true);

      const ignoreTimer = setTimeout(() => {
        setIsIgnoreClick(false);
      }, BOOKMARK_CONSTANTS.CLICK_IGNORE_TIME);

      setToastVisible({
        message: '북마크를 너무 많이 시도했어요! 잠시 후 다시 시도해주세요.',
        type: 'error',
      });

      return () => clearTimeout(ignoreTimer);
    }
  }, [clickCount, setToastVisible]);

  const handleBookmarkClick = async () => {
    if (isIgnoreClick) return;

    setClickCount((prev) => prev + 1);

    bookmarkMutation(
      { techArticleId: id },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
          await queryClient.invalidateQueries({ queryKey: ['techDetail', String(id)] });
          await queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });

          if (type === 'techblog' || type === 'techblog_detail') {
            setBookmarkActive((prev) => !prev);
            setTooltipMessage(isBookmarkActive ? '북마크에서 삭제했어요' : '북마크로 저장했어요');
          } else if (type === 'myinfo') {
            setToastVisible({ message: '북마크에서 삭제했어요' });
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
        iconPosition='right'
        icon={isPending ? <></> : <Image width={11} src={currentIcon} alt='북마크 아이콘' />}
      />
    );
  }

  return isPending ? (
    <div className='flex items-center justify-center'>
      <Spinner width={15} height={15} />
    </div>
  ) : (
    <button onClick={handleBookmarkClick} className='flex items-center justify-center'>
      <Image src={currentIcon} alt={isBookmarkActive ? '북마크 활성화' : '북마크 비활성화'} />
    </button>
  );
};

export default BookmarkIcon;
