import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

const deletePick = async (id: string) => {
  const res = await axios.delete(`/devdevdev/api/v1/picks/${id}`);

  return res;
};

export const useDeletePick = () => {
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: deletePick,
    onSuccess: () => setToastVisible('성공'),
    onError: () => setToastVisible('실패'),
  });
};
