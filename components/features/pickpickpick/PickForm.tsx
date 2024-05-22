import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetPickDetailData } from '@pages/pickpickpick/[id]/apiHooks/usePickDetailData';

import { useModalStore } from '@stores/modalStore';

import { MainButton } from '@components/common/buttons/mainButtons';
import { Modal } from '@components/common/modals/modal';
import { ValidationMessage } from '@components/common/validationMessage';

import Arrowleft from '@public/image/arrow-left.svg';

import PickCard from './PickCard';
import { MutatePickProps } from './types/formPicks';

interface PickFormProps {
  mode: '수정' | '등록';
  handleSubmitFn: (pickData: MutatePickProps) => void;
}

export default function PickForm({ mode, handleSubmitFn }: PickFormProps) {
  const router = useRouter();

  const { id } = router.query;

  const { data: pickDetailData } = useGetPickDetailData(id as string);

  const { isModalOpen, openModal } = useModalStore();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<MutatePickProps>({
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

  return (
    <div className='px-[20.3rem] pt-[6.4rem] pb-[15.7rem] gap-[6.8rem]'>
      <Link href={'/pickpickpick'}>
        <Image src={Arrowleft} alt='왼쪽 화살표' />
      </Link>

      <form onSubmit={handleSubmit(handleSubmitFn)}>
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
            text={`${mode}하기`}
            variant='primary'
            type='button'
            disabled={!isValid}
            onClick={() => openModal()}
          />
        </div>

        {errors?.pickTitle && <ValidationMessage message={'내용을 작성해주세요'} />}

        <PickCard
          order='first'
          control={control}
          errors={errors}
          pickDetailOptionData={pickDetailData?.pickOptions.firstPickOption}
          setValue={setValue}
        />
        <PickCard
          order='second'
          control={control}
          errors={errors}
          pickDetailOptionData={pickDetailData?.pickOptions.secondPickOption}
          setValue={setValue}
        />

        {isModalOpen && mode === '수정' && (
          <Modal
            title='투표를 수정할까요?'
            contents={`타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.`}
            submitText='수정하기'
          />
        )}

        {isModalOpen && mode === '등록' && (
          <Modal
            title='투표를 등록할까요?'
            contents={`작성해주신 내용은 검토 후 업로드해요.\n타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.`}
            submitText='등록하기'
          />
        )}
      </form>
    </div>
  );
}