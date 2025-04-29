// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ALERT_READALL } from '@/constants/apiConstants';
import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import * as Sentry from '@sentry/nextjs';

export const patchAlertAllRead = async () => {
  const res = await axios.patch<SuccessResponse<boolean>>(ALERT_READALL, null);
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
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
      }
    },
  });
};
