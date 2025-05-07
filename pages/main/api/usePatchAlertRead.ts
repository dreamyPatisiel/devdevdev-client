import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NOTIFICATIONS_PREFIX } from '@/constants/apiConstants';
import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import * as Sentry from '@sentry/nextjs';

interface NotificationReadStatus {
  id: number;
  isRead: boolean;
}

export const patchAlertRead = async (notificationId: number) => {
  const res = await axios.patch<SuccessResponse<NotificationReadStatus>>(
    `${NOTIFICATIONS_PREFIX}/${notificationId}/read`,
    null,
  );
  return res.data;
};

export const usePatchAlertRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAlertRead,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['getAlertCount'] }),
        queryClient.invalidateQueries({ queryKey: ['getAlertLists'] }),
      ]);
    },
    onError: (error: ErrorRespone) => {
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
      }
    },
  });
};
