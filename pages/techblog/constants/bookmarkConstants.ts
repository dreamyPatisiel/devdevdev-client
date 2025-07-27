import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkActiveButton from '@public/image/techblog/bookmarkActiveButton.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';
import bookmarkNonActiveButton from '@public/image/techblog/bookmarkNonActiveButton.svg';

export const BOOKMARK_ICONS = {
  BookmarkIcon: {
    active: bookmarkActive,
    nonActive: bookmarkNonActive,
  },
  BookmarkButton: {
    active: bookmarkActiveButton,
    nonActive: bookmarkNonActiveButton,
  },
} as const;

export const BOOKMARK_CONSTANTS = {
  CLICK_IGNORE_TIME: 3 * 1000,
  BOOKMARK_CLICK_MAX_CNT: 10,
  DEFAULT_ICON_SIZE: { width: 15, height: 16 },
  MOBILE_BUTTON_SIZE: { width: 81, height: 34.83 },
  DESKTOP_BUTTON_SIZE: { width: 93, height: 40 },
} as const;
