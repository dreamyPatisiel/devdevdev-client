export const DEFAULT_PREFIX = '/devdevdev/api/v1';

/** 공통 API */
export const SUBSCRIPTIONS = `${DEFAULT_PREFIX}/subscriptions`;

/** 내정보 API */
export const MYPAGE_PREFIX = `${DEFAULT_PREFIX}/mypage`;
export const MYPAGE_COMMENTS = `${MYPAGE_PREFIX}/comments`;
export const MYPAGE_SUBSCRIPTIONS_COMPANIES = `${MYPAGE_PREFIX}/subscriptions/companies`;

// ** 알림 API */
export const ALERT_PREFIX = `${DEFAULT_PREFIX}/notifications`;
export const ALERT_READALL = `${ALERT_PREFIX}/read-all`;
export const ALERT_POPUPLIST = `${ALERT_PREFIX}/popup`;
export const ALERT_COUNT = `${ALERT_PREFIX}/unread-count`;
