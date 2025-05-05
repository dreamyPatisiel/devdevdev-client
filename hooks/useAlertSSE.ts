import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAlertStore } from '@stores/AlertStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { SSE_HEARTBEAT_TIMEOUT } from '@/constants/TimeConstants';
import { ALERT_SSE_URL } from '@/constants/apiConstants';
import { IS_DEV } from '@/constants/envConstant';

let globalEventSource: EventSourcePolyfill | null = null;

export function useAlertSSE() {
  const { loginStatus } = useLoginStatusStore();
  const { userInfo } = useUserInfoStore();
  const { setBellDisabled } = useAlertStore();
  const queryClient = useQueryClient();
  const connectionAttemptedRef = useRef(false);

  const ACCESS_TOKEN = userInfo.accessToken || '';

  const connectSSE = () => {
    if (loginStatus !== 'login' && IS_DEV) {
      console.error('로그인상태가 아니므로 SSE 연결 할 수 없습니다.');
      return;
    }
    if (!ACCESS_TOKEN && IS_DEV) {
      console.error('ACCESS_TOKEN이 없으므로 SSE 연결 할 수 없습니다.');
      return;
    }

    if (globalEventSource && globalEventSource.readyState !== 2) {
      if (IS_DEV) {
        console.log('이미 SSE 연결이 존재합니다. 중복 연결 방지');
      }
      return;
    }

    cleanupSSE();

    const eventSource = new EventSourcePolyfill(ALERT_SSE_URL, {
      headers: {
        Authorization: `Bearer ${String(ACCESS_TOKEN)}`,
      },
      heartbeatTimeout: SSE_HEARTBEAT_TIMEOUT,
      withCredentials: true,
    });

    globalEventSource = eventSource;

    if (IS_DEV) {
      console.log('sse 연결 시도', eventSource.readyState);
    }

    eventSource.onopen = () => {
      if (IS_DEV) {
        console.log('sse 연결 완료', eventSource.readyState);
      }
    };

    eventSource.onerror = (error) => {
      if (IS_DEV) {
        console.log('sse 에러 발생', error, eventSource.readyState);
      }
    };

    eventSource.onmessage = (event) => {
      // TODO: 추후 메시지 필요하면 꺼내쓰면 됨
      setBellDisabled(false);
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['getAlertCount'] }),
        queryClient.invalidateQueries({ queryKey: ['getAlertLists'] }),
      ]);
    };
  };

  const cleanupSSE = () => {
    if (globalEventSource) {
      if (IS_DEV) {
        console.log('sse 연결 해제');
      }
      globalEventSource.close();
      globalEventSource = null;
    }
  };

  useEffect(() => {
    // 첫 번째 연결 시도인 경우에만 연결을 시도
    if (loginStatus === 'login' && ACCESS_TOKEN && !connectionAttemptedRef.current) {
      connectionAttemptedRef.current = true;
      connectSSE();
    } else if (loginStatus !== 'login') {
      cleanupSSE();
      connectionAttemptedRef.current = false;
    }

    return () => {
      cleanupSSE();
    };
  }, [ACCESS_TOKEN, loginStatus]);
}
