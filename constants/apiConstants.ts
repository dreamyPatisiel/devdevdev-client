import { baseUrlConfig } from '@/config';

export const DEFAULT_PREFIX = '/devdevdev/api/v1';

/** 공통 API */
export const SUBSCRIPTIONS = `${DEFAULT_PREFIX}/subscriptions`;

/** 내정보 API */
export const MYPAGE_PREFIX = `${DEFAULT_PREFIX}/mypage`;
export const MYPAGE_COMMENTS = `${MYPAGE_PREFIX}/comments`;
export const MYPAGE_SUBSCRIPTIONS_COMPANIES = `${MYPAGE_PREFIX}/subscriptions/companies`;
export const MYPAGE_NICKNAME_RANDOM = `${MYPAGE_PREFIX}/nickname/random`;

/** 알림 API */
export const NOTIFICATIONS_PREFIX = `${DEFAULT_PREFIX}/notifications`;
export const NOTIFICATIONS_PAGE = `${NOTIFICATIONS_PREFIX}/page`;
export const NOTIFICATIONS_READ_ALL = `${NOTIFICATIONS_PREFIX}/read-all`;
export const NOTIFICATIONS_POPUPLIST = `${NOTIFICATIONS_PREFIX}/popup`;
export const NOTIFICATIONS_COUNT = `${NOTIFICATIONS_PREFIX}/unread-count`;
export const NOTIFICATIONS_SSE_URL = `${baseUrlConfig.serviceUrl}${NOTIFICATIONS_PREFIX}`;
