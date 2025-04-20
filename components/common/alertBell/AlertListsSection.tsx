import React from 'react';

import { MOBILE_ALERT_LIST_COUNT, WEB_ALERT_LIST_COUNT } from '@/constants/alertListViewConstant';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import AlertList from './AlertList';

export const notifications = [
  { id: 1, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 5 },
  { id: 2, companyName: '쿠팡', message: '에서 새로운 글이 올라왔어요!', time: 10 },
  { id: 3, companyName: 'AWS', message: '에서 새로운 글이 올라왔어요!', time: 15 },
  { id: 4, companyName: '우아한형제들', message: '에서 새로운 글이 올라왔어요!', time: 20 },
  { id: 5, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 25 },
  { id: 1, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 5 },
  { id: 2, companyName: '쿠팡', message: '에서 새로운 글이 올라왔어요!', time: 10 },
  { id: 3, companyName: 'AWS', message: '에서 새로운 글이 올라왔어요!', time: 15 },
  { id: 4, companyName: '우아한형제들', message: '에서 새로운 글이 올라왔어요!', time: 20 },
  { id: 5, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 25 },
];

export default function AlertListsSection() {
  const { isMobile } = useMediaQueryContext();
  const ALERT_VIEW_COUNT = isMobile ? MOBILE_ALERT_LIST_COUNT : WEB_ALERT_LIST_COUNT;
  // TODO: 알림 조회 호출

  return (
    <ul
      className={
        isMobile ? 'h-[calc(100dvh-8.9rem-7.4rem-6rem)] overflow-y-auto scrollbar-hide' : 'm-0 p-0'
      }
    >
      {notifications.slice(0, ALERT_VIEW_COUNT).map((notification) => (
        // TODO: api나오면 LINK달기
        <AlertList key={notification.id} notification={notification} />
      ))}
    </ul>
  );
}
