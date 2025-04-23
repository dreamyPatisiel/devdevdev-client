import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import PickForm from '@components/features/pickpickpick/PickForm';
import { MutatePickProps } from '@components/features/pickpickpick/types/formPicks';

import { ROUTES } from '@/constants/routes';

import { usePostPicks } from './api/usePostPicks';
import { PICK_ERROR_MESSAGE, PICK_SUCCESS_MESSAGE } from './constants/pickPostConstants';

export default function Index() {
  const { mutate: postPicksMutate, isPending } = usePostPicks();
  const router = useRouter();
  const { popModal, setIsPending } = useModalStore();
  const { setToastVisible } = useToastVisibleStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsPending?.(isPending);
  }, [isPending, setIsPending]);

  const handlePostSubmit = (picksData: MutatePickProps) => {
    postPicksMutate(
      { picksData },
      {
        onSuccess: async () => {
          popModal();
          setToastVisible({ message: PICK_SUCCESS_MESSAGE });
          await queryClient.invalidateQueries({ queryKey: ['myPicksData'] });
          router.push(ROUTES.PICKPICKPICK.MAIN);
        },
        onError: () => {
          popModal();
          setToastVisible({ message: PICK_ERROR_MESSAGE });
        },
      },
    );
  };

  return <PickForm mode={'등록'} handleSubmitFn={handlePostSubmit} />;
}
