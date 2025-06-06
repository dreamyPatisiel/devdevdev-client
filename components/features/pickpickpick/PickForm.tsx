import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Link from 'next/link';

import { PickDetailData } from '@pages/pickpickpick/[id]/types/pickDetailData';

import { useModalStore } from '@stores/modalStore';

import { MainButton } from '@components/common/buttons/mainButtons';
import MobileMainButton from '@components/common/buttons/mobileMainButton';
import { PICK_VOTE_REGISTER_MODAL } from '@components/common/modals/modalConfig/pickVote';
import { ValidationMessage } from '@components/common/validationMessage';
import { LeftArrowIcon } from '@components/svgs/LeftArrowIcon';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import PickCard from './PickCard';
import { MutatePickProps } from './types/formPicks';

interface PickFormProps {
  mode: '수정' | '등록';
  handleSubmitFn: (pickData: MutatePickProps) => void;
  pickDetailData?: PickDetailData;
}

export default function PickForm({ mode, handleSubmitFn, pickDetailData }: PickFormProps) {
  const { pushModal, popModal } = useModalStore();

  const { isMobile } = useMediaQueryContext();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
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

  useEffect(() => {
    if (pickDetailData) {
      setValue('pickTitle', pickDetailData.pickTitle);
      setValue(
        'pickOptions.firstPickOption.pickOptionId',
        pickDetailData.pickOptions.firstPickOption.id,
      );
      setValue(
        'pickOptions.firstPickOption.pickOptionTitle',
        pickDetailData.pickOptions.firstPickOption.title,
      );
      setValue(
        'pickOptions.firstPickOption.pickOptionContent',
        pickDetailData.pickOptions.firstPickOption.content,
      );
      setValue(
        'pickOptions.secondPickOption.pickOptionId',
        pickDetailData.pickOptions.secondPickOption.id,
      );
      setValue(
        'pickOptions.secondPickOption.pickOptionTitle',
        pickDetailData.pickOptions.secondPickOption.title,
      );
      setValue(
        'pickOptions.secondPickOption.pickOptionContent',
        pickDetailData.pickOptions.secondPickOption.content,
      );
    }
  }, [pickDetailData, setValue, errors]);

  const pickTitleValue = watch('pickTitle');

  const [isBlured, setIsBlured] = useState(false);

  const handleSubmitButtonClick = () => {
    pushModal({
      ...PICK_VOTE_REGISTER_MODAL,
      submitFunction: handleSubmit(handleSubmitFn),
      cancelFunction: popModal,
    });
  };

  return (
    <div className={`${!isMobile && 'px-[20.3rem] pt-[6.4rem]'} pb-[9.8rem]`}>
      <Link
        href={ROUTES.PICKPICKPICK.MAIN}
        className={`${isMobile && 'block mb-[2.4rem] px-[1.6rem]'}`}
      >
        <LeftArrowIcon height={`${isMobile && '16'}`} />
      </Link>

      <form onSubmit={handleSubmit(handleSubmitFn)} className={`flex flex-col gap-[4rem]`}>
        <div>
          <div
            className={`flex items-baseline relative ${isMobile ? 'px-[1.6rem] ' : 'mt-[2.4rem]'}`}
          >
            <Controller
              name='pickTitle'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <>
                  <input
                    type='text'
                    className={` border-b-[0.1rem] border-solid border-b-gray400 bg-black py-[1.6rem] placeholder:text-gray200 flex-1 focus:outline-none focus:border-primary400 ${isMobile ? 'st2' : 'h3'}`}
                    placeholder='주제를 요약한 제목을 작성해주세요'
                    onChange={onChange}
                    defaultValue={pickDetailData?.pickTitle}
                    onBlur={() => setIsBlured(false)}
                  />
                  {!isBlured && !value && (
                    <span
                      className={`text-secondary400 absolute top-[1.6rem] ${isMobile ? 'st2 left-[26.5rem] ' : 'h3 left-[33.3rem]'}`}
                    >
                      *
                    </span>
                  )}
                </>
              )}
            />

            {!isMobile && (
              <MainButton
                text={`${mode}하기`}
                variant='primary'
                type='button'
                disabled={!isValid}
                onClick={handleSubmitButtonClick}
              />
            )}
          </div>

          {(errors?.pickTitle || pickTitleValue === '') && (
            <ValidationMessage
              message={'내용을 작성해주세요'}
              className={`${isMobile && 'ml-[1.6rem]'}`}
            />
          )}
        </div>

        <PickCard
          order='first'
          control={control}
          errors={errors}
          pickDetailOptionData={pickDetailData?.pickOptions.firstPickOption}
          setValue={setValue}
          watch={watch}
        />
        <PickCard
          order='second'
          control={control}
          errors={errors}
          pickDetailOptionData={pickDetailData?.pickOptions.secondPickOption}
          setValue={setValue}
          watch={watch}
        />

        {isMobile && (
          <MobileMainButton text='등록하기' disabled={!isValid} onClick={handleSubmitButtonClick} />
        )}
      </form>
    </div>
  );
}
