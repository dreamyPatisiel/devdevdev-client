import { useRouter } from 'next/router';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import PickForm from '@components/features/pickpickpick/PickForm';
import { MutatePickProps } from '@components/features/pickpickpick/types/formPicks';

import { usePostPicks } from './api/usePostPicks';
import { PICK_SUCCESS_MESSAGE } from './constants/pickPostConstants';

export default function Index() {
  const { mutate: postPicksMutate } = usePostPicks();
  const router = useRouter();
  const { closeModal } = useModalStore();
  const { setToastVisible } = useToastVisibleStore();

  const handlePostSubmit = (picksData: MutatePickProps) => {
    postPicksMutate(picksData, {
      onSuccess: () => {
        closeModal();
        router.push(`/pickpickpick`);
        setToastVisible(PICK_SUCCESS_MESSAGE);
      },
    });
  };

  return <PickForm mode={'등록'} handleSubmitFn={handlePostSubmit} />;
}
