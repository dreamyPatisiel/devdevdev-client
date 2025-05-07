import React from 'react';

import useGetAlertLists from '@pages/main/api/useGetAlertLists';

import { MOBILE_ALERT_LIST_COUNT, WEB_ALERT_LIST_COUNT } from '@/constants/alertListViewConstant';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import AlertList from './AlertList';

export default function AlertListsSection({ type }: { type: 'popup' | 'tooltip' }) {
  const { isMobile } = useMediaQueryContext();
  const ALERT_VIEW_COUNT = isMobile ? MOBILE_ALERT_LIST_COUNT : WEB_ALERT_LIST_COUNT;

  const { data: alertLists } = useGetAlertLists({ size: ALERT_VIEW_COUNT });

  const { content } = alertLists || { content: [] };

  return content.length > 0 ? (
    <ul
      className={
        isMobile ? 'h-[calc(100dvh-8.9rem-7.4rem-6rem)] overflow-y-auto scrollbar-hide' : 'm-0 p-0'
      }
    >
      {content?.map((alert) => <AlertList key={alert.id} alert={alert} />)}
    </ul>
  ) : (
    <p
      className={`text-center text-gray300 ${type === 'popup' ? 'relative top-1/3 st2' : 'bg-gray800 py-[2.4rem] p2'}`}
      role='status'
    >
      확인할 알림이 없어요
    </p>
  );
}
