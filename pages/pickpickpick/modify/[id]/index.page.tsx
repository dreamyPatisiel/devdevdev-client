import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { useGetPickDetailData } from '@pages/pickpickpick/[id]/apiHooks/usePickDetailData';
import PickPostCard from '@pages/pickposting/components/PickPostCard';
import { PICK_SUCCESS_MESSAGE } from '@pages/pickposting/constants/pickPostConstants';
import { PostPicksProps } from '@pages/types/postPicks';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { MainButton } from '@components/common/buttons/mainButtons';
import { Modal } from '@components/common/modals/modal';
import { ValidationMessage } from '@components/common/validationMessage';

import Arrowleft from '@public/image/arrow-left.svg';

import { usePatchPickData } from './apiHooks/usePatchPickData';

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const { data: pickDetailData } = useGetPickDetailData(id as string);

  const { isModalOpen, openModal, closeModal } = useModalStore();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<PostPicksProps>({
    defaultValues: {
      pickTitle: pickDetailData?.pickTitle,
      pickOptions: {
        firstPickOption: {
          pickOptionId: pickDetailData?.pickOptions.firstPickOption.id,
          pickOptionTitle: pickDetailData?.pickOptions.firstPickOption.title,
          pickOptionContent: pickDetailData?.pickOptions.firstPickOption.content,
          pickOptionImageIds:
            pickDetailData?.pickOptions.firstPickOption.pickDetailOptionImages.map(
              (image) => image.id,
            ),
        },
        secondPickOption: {
          pickOptionId: pickDetailData?.pickOptions.secondPickOption.id,
          pickOptionTitle: pickDetailData?.pickOptions.secondPickOption.title,
          pickOptionContent: pickDetailData?.pickOptions.secondPickOption.content,
          pickOptionImageIds:
            pickDetailData?.pickOptions.secondPickOption.pickDetailOptionImages.map(
              (image) => image.id,
            ),
        },
      },
    },
  });

  const { mutate: patchPickMutate } = usePatchPickData();
  const { setToastVisible } = useToastVisibleStore();
  const queryClient = useQueryClient();

  const handleUpdateSubmit = (pickData: PostPicksProps) => {
    closeModal();
    patchPickMutate(
      {
        id,
        pickData,
      },
      {
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({ queryKey: ['getDetailPickData', id] });
          router.push(`/pickpickpick/${id}`);
          setToastVisible(PICK_SUCCESS_MESSAGE);
        },
      },
    );
  };

  return (
    <div className='px-[20.3rem] pt-[6.4rem] pb-[15.7rem] gap-[6.8rem]'>
      <Link href={'/pickpickpick'}>
        <Image src={Arrowleft} alt='왼쪽 화살표' />
      </Link>

      <form onSubmit={handleSubmit(handleUpdateSubmit)}>
        <div className='flex gap-[2.4rem] items-baseline mt-[2.4rem]'>
          <Controller
            name='pickTitle'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <input
                type='text'
                className=' border-b-[0.1rem] border-solid border-b-gray2 bg-black py-[1.6rem] h3 placeholder:text-gray4 flex-1 focus:outline-none focus:border-primary2'
                placeholder='주제를 요약한 제목을 작성해주세요'
                onChange={onChange}
                defaultValue={pickDetailData?.pickTitle}
              />
            )}
          />

          <MainButton
            text='수정하기'
            variant='primary'
            type='button'
            disabled={!isValid}
            onClick={() => openModal()}
          />
        </div>

        {errors?.pickTitle && <ValidationMessage message={'내용을 작성해주세요'} />}

        <PickPostCard
          order='first'
          control={control}
          errors={errors}
          pickDetailOptionData={pickDetailData?.pickOptions.firstPickOption}
          setValue={setValue}
        />
        <PickPostCard
          order='second'
          control={control}
          errors={errors}
          pickDetailOptionData={pickDetailData?.pickOptions.secondPickOption}
          setValue={setValue}
        />

        {isModalOpen && (
          <Modal
            title='투표를 수정할까요?'
            contents={`타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.`}
            submitText='수정하기'
          />
        )}
      </form>
    </div>
  );
}
