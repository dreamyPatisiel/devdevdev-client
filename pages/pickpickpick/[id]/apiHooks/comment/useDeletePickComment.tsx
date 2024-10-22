import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

import { useModalStore } from '@stores/modalStore';

const deletePickComment = async ({
  pickId,
  pickCommentId,
}: {
  pickId: string;
  pickCommentId: number;
}) => {
  const res = await axios.delete(`${GET_PICK_DATA}/${pickId}/comments/${pickCommentId}`);

  return res;
};

export const useDeletePickComment = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: deletePickComment,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['pickCommentData'] });
    },
    onError: () => {
      console.log('error');
    },
  });
};
