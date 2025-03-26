import { ROUTES } from '@/constants/routes';

export const MYINFO_NOTIFICATIONS = [
  {
    key: 'notification',
    name: '알림',
    pathname: ROUTES.MY_INFO.NOTIFICATION,
    startHref: ROUTES.MY_INFO.NOTIFICATIONS,
  },
  {
    key: 'subscribe',
    name: '구독한 기업',
    pathname: ROUTES.MY_INFO.SUBSCRIBE,
    startHref: ROUTES.MY_INFO.NOTIFICATIONS,
  },
];

export const MYINFO_MYWRITING = [
  {
    key: 'mypick',
    name: '게시물',
    pathname: ROUTES.MY_INFO.MAIN,
    startHref: ROUTES.MY_INFO.MY_WRITING_PREFIX,
  },
  {
    key: 'mycomment',
    name: '댓글',
    pathname: ROUTES.MY_INFO.MY_COMMENT,
    startHref: ROUTES.MY_INFO.MY_WRITING_PREFIX,
  },
];

export const MYINFO_NOTIFICATIONS_CANONICAL_URL =
  'https://example.com/myinfo/notifications/notification';

export const MYINFO_MYWRITING_CANONICAL_URL = 'https://example.com/myinfo/mywriting/mypick';
