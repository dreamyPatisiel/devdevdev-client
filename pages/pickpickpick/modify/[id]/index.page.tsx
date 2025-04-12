import { useRouter } from 'next/router';

import { useGetPickDetailData } from '@pages/pickpickpick/[id]/apiHooks/usePickDetailData';

import PickForm from '@components/features/pickpickpick/PickForm';
import { MutatePickProps } from '@components/features/pickpickpick/types/formPicks';

import { usePatchPickData } from './apiHooks/usePatchPickData';

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const { data: pickDetailData } = useGetPickDetailData(id as string);
  const { mutate: patchPickMutate } = usePatchPickData();

  const handleUpdateSubmit = (pickData: MutatePickProps) => {
    patchPickMutate({
      id,
      pickData,
    });
  };

  return (
    <PickForm mode='수정' handleSubmitFn={handleUpdateSubmit} pickDetailData={pickDetailData} />
  );
}
