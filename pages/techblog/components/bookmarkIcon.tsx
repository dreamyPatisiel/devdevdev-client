import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useTooltipHide from '@hooks/useTooltipHide';

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

  const getIconType = (type: BookmarkType): keyof typeof BOOKMARK_ICONS => {
    return type === 'techblog_detail' ? 'BookmarkButton' : 'BookmarkIcon';
  };

  const getBookmarkButtonSize = (isMobile: boolean, type: BookmarkType) => {
    if (type === 'techblog_detail') {
      return isMobile
        ? BOOKMARK_CONSTANTS.MOBILE_BUTTON_SIZE
        : BOOKMARK_CONSTANTS.DESKTOP_BUTTON_SIZE;
    }
    return BOOKMARK_CONSTANTS.DEFAULT_ICON_SIZE;
  };

  const iconType = getIconType(type);
  const currentIcon = isBookmarkActive
    ? BOOKMARK_ICONS[iconType].active
    : BOOKMARK_ICONS[iconType].nonActive;

  const buttonSize = getBookmarkButtonSize(isMobile ?? false, type);

  useEffect(() => {
    setBookmarkActive(isBookmarkActive);
  }, [isBookmarkActive]);

  useTooltipHide({
    tooltipMessage,
    setTooltipMessage,
    dependencies: [isBookmarkActive, tooltipMessage],
  });

  useEffect(() => {
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

  /** type에 따라 북마크 상태값을 업데이트 해주는 함수 */
  const handleBookmarkClick = async ({
    id,
    isBookmarkActive,
    type,
  }: {
    id: number;
    isBookmarkActive: boolean;
    type: BookmarkType;
  }) => {
    if (isIgnoreClick) {
      return;
    }
    setClickCount((prev) => prev + 1);

    bookmarkMutation(
      {
        techArticleId: id,
      },
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

  return isPending ? (
    <div
      className='flex items-center justify-center'
      style={{ width: buttonSize.width, height: buttonSize.height }}
    >
      <Spinner width={15} height={15} />
    </div>
  ) : (
    <Image
      width={buttonSize.width}
      height={buttonSize.height}
      src={currentIcon}
      className='cursor-pointer'
      onClick={async () => {
        await handleBookmarkClick({
          type: type,
          id: id,
          isBookmarkActive: isBookmarkActive,
        });
      }}
      alt={isBookmarkActive ? '북마크아이콘' : '북마크취소아이콘'}
    />
  );
};

export default BookmarkIcon;
