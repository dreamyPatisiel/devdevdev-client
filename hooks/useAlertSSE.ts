import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAlertStore } from '@stores/AlertStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { ALERT_PREFIX } from '@/constants/apiConstants';

export function useAlertSSE() {
  const { loginStatus } = useLoginStatusStore();
  const { userInfo } = useUserInfoStore();
  const { setBellDisabled } = useAlertStore();
  const queryClient = useQueryClient();

  const [sseReadyState, setSseReadyState] = useState<'CONNECTING' | 'OPEN' | 'CLOSED'>(
    'CONNECTING',
  );

  const SSE_URL = axios.defaults.baseURL + ALERT_PREFIX;
  const ACCESS_TOKEN = userInfo.accessToken || '';

  useEffect(() => {
    console.log(sseReadyState, 'sseReadyState');
  }, [sseReadyState]);

  useEffect(() => {
    if (loginStatus !== 'login') {
      console.log('로그인상태가 아니므로 SSE 연결 할 수 없습니다.');
      return;
    }
    if (!ACCESS_TOKEN) {
      console.log('ACCESS_TOKEN이 없으므로 SSE 연결 할 수 없습니다.');
      return;
    }
    const eventSource = new EventSourcePolyfill(SSE_URL, {
      headers: {
        Authorization: `Bearer ${String(ACCESS_TOKEN)}`,
      },
      heartbeatTimeout: 70 * 1000,
      withCredentials: true,
    });

    console.log('sse 연결 시도', eventSource.readyState); // 0

    eventSource.onopen = () => {
      console.log('sse 연결 완료', eventSource.readyState); // 1
      setSseReadyState('OPEN');
    };

    eventSource.onerror = (error) => {
      console.log('sse 에러 발생', error);
      setSseReadyState('CLOSED');
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      console.log('newNotification', newNotification);
      setBellDisabled(false);

      // 알림갯수 & 알림리스트 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['getAlertCount'] });
      queryClient.invalidateQueries({ queryKey: ['getAlertLists'] });
    };

    return () => {
      console.log('sse 연결 해제');
      eventSource.close();
    };
  }, [ACCESS_TOKEN]);
}
