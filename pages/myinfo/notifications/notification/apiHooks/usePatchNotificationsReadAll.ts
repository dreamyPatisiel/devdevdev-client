import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { NOTIFICATIONS_READ_ALL } from '@/constants/apiConstants';
import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

const patchNotificationsReadAll = async () => {
  const res = await axios.patch(`${NOTIFICATIONS_READ_ALL}`);

  return res?.data;
};

export const usePatchNotificationsReadAll = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: patchNotificationsReadAll,
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
