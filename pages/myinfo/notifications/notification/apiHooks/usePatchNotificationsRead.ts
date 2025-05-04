import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { NOTIFICATIONS_PREFIX } from '@/constants/apiConstants';
import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

const patchNotificationsRead = async (notificationId: number) => {
  const res = await axios.patch(`${NOTIFICATIONS_PREFIX}/${notificationId}/read`);

  return res?.data;
};

export const usePatchNotificationsRead = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: patchNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationsPage'] });
    },
    onError: (error: ErrorRespone) => {
      const errorMessge = error.response.data.message;

      if (errorMessge == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      return setToastVisible({ message: errorMessge, type: 'error' });
    },
  });
};
