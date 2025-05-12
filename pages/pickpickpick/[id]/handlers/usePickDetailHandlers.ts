import { useRouter } from 'next/router';

import { useBlameReasonStore, useSelectedStore } from '@stores/dropdownStore';
import { useModalStore } from '@stores/modalStore';

import { usePostBlames } from '@/api/usePostBlames';
import { ROUTES } from '@/constants/routes';

import { useDeletePick } from '../apiHooks/useDeletePick';

export default function usePickDetailHandlers(id: string | string[] | undefined) {
  const router = useRouter();

  const { popModal } = useModalStore();

  const { mutate: deletePickMutate } = useDeletePick();

  const { mutate: postBlamesMutate } = usePostBlames();

  const handleModifySubmit = () => {
    if (id) {
      router.push(`${ROUTES.PICKPICKPICK.MODIFY}/${id}`);
      popModal();
    }
  };

  const handleDeleteSubmit = () => {
    if (id) {
      deletePickMutate(id as string, {
        onSuccess: () => {
          popModal();
        },
      });
    }
  };

  const handleBlameSubmit = () => {
    const { selectedBlameData } = useSelectedStore.getState();
    const { blameReason } = useBlameReasonStore.getState();

    if (selectedBlameData) {
      postBlamesMutate({
        blamePathType: 'PICK',
        params: {
          blameTypeId: selectedBlameData?.id,
          customReason: blameReason === '' ? null : blameReason,
          pickId: Number(id),
        },
      });
    }
  };

  return {
    handleModifySubmit,
    handleDeleteSubmit,
    handleBlameSubmit,
  };
}
