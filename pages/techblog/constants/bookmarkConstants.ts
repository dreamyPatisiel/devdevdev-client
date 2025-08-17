import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

export const BOOKMARK_ICONS = {
  BookmarkIcon: {
    active: bookmarkActive,
    nonActive: bookmarkNonActive,
  },
} as const;

export const BOOKMARK_CONSTANTS = {
  CLICK_IGNORE_TIME: 60 * 1000,
  BOOKMARK_CLICK_MAX_CNT: 10,
} as const;

export const BOOKMARK_MENTION = {
  NON_MEMBER: '로그인하여 북마크 기능을 이용해보세요!',
  NON_MEMBER_COMMENT: '비회원은 현재 해당 기능을 이용할 수 없습니다.',
  ADD: '북마크로 저장했어요',
  REMOVE: '북마크에서 삭제했어요',
  HINT: '북마크함에 저장해보세요!',
} as const;
