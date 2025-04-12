import axios from 'axios';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PICK_UPDATE_MESSAGE } from '@pages/pickposting/constants/pickPostConstants';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { UNDEFINED_ERROR_MESSAGE } from '@/constants/errorMessageConstants';
import { ErrorRespone } from '@/types/errorResponse';

export const patchPickData = async ({
  id,
  pickData,
}: {
  id?: string | string[];
  pickData: any;
}) => {
  const res = axios.patch(`/devdevdev/api/v1/picks/${id}`, pickData);

  return res;
};

export const usePatchPickData = () => {
  const router = useRouter();
  const { id } = router.query;

  const { setToastVisible } = useToastVisibleStore();
  const { popModal } = useModalStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPickData,
    onSuccess: () => {
      popModal();
      queryClient.invalidateQueries({
        queryKey: ['getDetailPickData', id],
      });
      queryClient.invalidateQueries({ queryKey: ['pickData'] });
      queryClient.invalidateQueries({ queryKey: ['myPicksData'] });
      router.push(`/pickpickpick/${id}`);
      setToastVisible({ message: PICK_UPDATE_MESSAGE });
    },
    onError: (error: ErrorRespone) => {
      popModal();
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible({ message: UNDEFINED_ERROR_MESSAGE, type: 'error' });
      }

      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
