import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

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
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: patchPickData,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return setToastVisible(UNDEFINED_ERROR_MESSAGE);
      }

      return setToastVisible(errorMessage);
    },
  });
};
