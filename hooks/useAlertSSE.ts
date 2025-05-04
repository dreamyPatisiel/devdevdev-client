import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { useEffect, useRef } from 'react';

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
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  const isDev = process.env.NODE_ENV === 'development';
  const SSE_URL = axios.defaults.baseURL + ALERT_PREFIX;
  const ACCESS_TOKEN = userInfo.accessToken || '';

  const connectSSE = () => {
    if (loginStatus !== 'login' && isDev) {
      console.error('로그인상태가 아니므로 SSE 연결 할 수 없습니다.');
      return;
    }
    if (!ACCESS_TOKEN && isDev) {
      console.error('ACCESS_TOKEN이 없으므로 SSE 연결 할 수 없습니다.');
      return;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSourcePolyfill(SSE_URL, {
      headers: {
        Authorization: `Bearer ${String(ACCESS_TOKEN)}`,
      },
      heartbeatTimeout: 120 * 1000,
      withCredentials: true,
    });

    eventSourceRef.current = eventSource;

    if (isDev) {
      console.log('sse 연결 시도', eventSource.readyState);
    }

    eventSource.onopen = () => {
      if (isDev) {
        console.log('sse 연결 완료', eventSource.readyState);
      }
    };

    eventSource.onerror = (error) => {
      if (isDev) {
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
    if (eventSourceRef.current) {
      if (isDev) {
        console.log('sse 연결 해제');
      }
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  useEffect(() => {
    if (loginStatus === 'login' && ACCESS_TOKEN) {
      connectSSE();

      return () => {
        cleanupSSE();
      };
    }

    if (loginStatus !== 'login') {
      cleanupSSE();
      return;
    }
  }, [ACCESS_TOKEN, loginStatus]);
}
