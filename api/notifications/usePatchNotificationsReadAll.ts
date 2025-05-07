import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NOTIFICATIONS_READ_ALL } from '@/constants/apiConstants';
import { IS_PROD } from '@/constants/envConstant';
import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import * as Sentry from '@sentry/nextjs';

export const patchNotificationsReadAll = async () => {
  const res = await axios.patch<SuccessResponse<boolean>>(NOTIFICATIONS_READ_ALL, null);
  return res.data;
};

export const usePatchNotificationsReadAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchNotificationsReadAll,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['notificationsPage'] }),
        queryClient.invalidateQueries({ queryKey: ['getAlertCount'] }),
        queryClient.invalidateQueries({ queryKey: ['getAlertLists'] }),
      ]);
    },
    onError: (error: ErrorRespone) => {
      if (IS_PROD) {
        Sentry.captureException(error);
      }
    },
  });
};
