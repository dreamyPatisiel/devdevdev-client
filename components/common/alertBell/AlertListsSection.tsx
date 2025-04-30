import React from 'react';

import useGetAlertLists from '@pages/main/api/useGetAlertLists';

import { useAlertStore } from '@stores/AlertStore';

import { MOBILE_ALERT_LIST_COUNT, WEB_ALERT_LIST_COUNT } from '@/constants/alertListViewConstant';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import AlertList from './AlertList';

export default function AlertListsSection({ type }: { type: 'popup' | 'tooltip' }) {
  const { isMobile } = useMediaQueryContext();
  const ALERT_VIEW_COUNT = isMobile ? MOBILE_ALERT_LIST_COUNT : WEB_ALERT_LIST_COUNT;

  const { data: alertLists } = useGetAlertLists({ size: ALERT_VIEW_COUNT });

  const { content } = alertLists || { content: [] };

  const { isJustLoggedIn, alertCount } = useAlertStore();

  const NoAlertMessage = () => (
    <p
      className={`text-center ${type === 'popup' ? 'relative top-1/3 st2 text-gray200' : 'bg-gray800 py-[2.4rem] p2 text-gray300'}`}
      role='status'
    >
      확인할 알림이 없어요
    </p>
  );

  // 로그인 직후 + alertCount가 0일 때는 무조건 메시지 표시
  if (isJustLoggedIn && alertCount === 0) {
    return <NoAlertMessage />;
  }

  // 로그인 직후가 아니라면 content 배열 기준으로 표시
  return content.length > 0 ? (
    <ul
      className={
        isMobile ? 'h-[calc(100dvh-8.9rem-7.4rem-6rem)] overflow-y-auto scrollbar-hide' : 'm-0 p-0'
      }
    >
      {content?.map((alert) => <AlertList key={alert.id} alert={alert} />)}
    </ul>
  ) : (
    <NoAlertMessage />
  );
}
