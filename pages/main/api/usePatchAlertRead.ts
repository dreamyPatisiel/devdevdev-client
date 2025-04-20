// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ALERT_PREFIX } from '@/constants/apiConstants';
import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

interface NotificationReadStatus {
  id: number;
  isRead: boolean;
}

export const patchAlertRead = async (notificationId: number) => {
  const res = await axios.patch<SuccessResponse<NotificationReadStatus>>(
    `${ALERT_PREFIX}/${notificationId}/read`,
    null,
  );
  return res.data;
};

export const usePatchAlertRead = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: patchAlertRead,
    onSuccess: async () => {
      //   await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error: ErrorRespone) => {
      // 처리를 해야하나 ? 읽기는 내부 데이터를 위한 용도인데..
      //   const errorMessage = error.response?.data.message || '알림 읽기 처리 중 오류가 발생했습니다.';
      //   setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
