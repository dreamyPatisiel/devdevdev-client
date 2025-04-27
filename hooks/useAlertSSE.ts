import axios from 'axios';

import { useEffect, useState } from 'react';

import { useAlertStore } from '@stores/AlertStore';

export function useAlertSSE() {
  const { handleNewAlert, setAlertCount } = useAlertStore();
  const url = axios.defaults.baseURL + '/sse-endpoint';

  console.log('sse훅입니당');
  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      // TODO: 알림 갯수 전체조회 후 갯수업뎃
      // setAlertCount();
      handleNewAlert();
    };

    return () => {
      eventSource.close();
    };
  }, [handleNewAlert]);
}
