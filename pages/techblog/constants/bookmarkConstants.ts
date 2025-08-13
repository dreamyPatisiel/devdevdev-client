import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

export const BOOKMARK_ICONS = {
  BookmarkIcon: {
    active: bookmarkActive,
    nonActive: bookmarkNonActive,
  },
} as const;

export const BOOKMARK_CONSTANTS = {
  CLICK_IGNORE_TIME: 3 * 1000,
  BOOKMARK_CLICK_MAX_CNT: 10,
} as const;
