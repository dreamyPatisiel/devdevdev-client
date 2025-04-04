import { useEffect, useState } from 'react';

// TODO: 기본뼈대 작성, 서버 명세나오면 수정필요
export function useSSE(url: string) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications(newNotification);
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return notifications;
}
