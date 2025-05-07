import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NOTIFICATIONS_READ_ALL } from '@/constants/apiConstants';
import { IS_PROD } from '@/constants/envConstant';
import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import * as Sentry from '@sentry/nextjs';

export const patchAlertAllRead = async () => {
  const res = await axios.patch<SuccessResponse<boolean>>(NOTIFICATIONS_READ_ALL, null);
  return res.data;
};

export const usePatchAlertReadAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAlertAllRead,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getAlertLists'] });
    },
    onError: (error: ErrorRespone) => {
      if (IS_PROD) {
        Sentry.captureException(error);
      }
    },
  });
};
