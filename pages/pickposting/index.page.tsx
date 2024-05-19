import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PostPicksProps } from '@pages/types/postPicks';

import { MainButton } from '@components/buttons/mainButtons';
import Toast from '@components/common/Toast';
import { ValidationMessage } from '@components/common/validationMessage';

import Arrowleft from '@public/image/arrow-left.svg';

import { usePostPicks } from './api/usePostPicks';
import PickPostCard from './components/PickPostCard';

export default function Index() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<PostPicksProps>({
    defaultValues: {
      pickTitle: '',
    },
  });

  const { mutate: postPicksMutate } = usePostPicks();
  const router = useRouter();

  const handlePostSubmit = (picksData: PostPicksProps) => {
    postPicksMutate(picksData, {
      onSuccess: (res) => {
        router.push(`pickpickpick/${res.data.data.pickId}`);
      },
    });
  };

  return (
    <div className='px-[20.3rem] pt-[6.4rem] pb-[15.7rem] gap-[6.8rem]'>
      <Toast />

      <Link href={'/pickpickpick'}>
        <Image src={Arrowleft} alt='왼쪽 화살표' />
      </Link>

      <form onSubmit={handleSubmit(handlePostSubmit)}>
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
              />
            )}
          />

          <MainButton text='등록하기' variant='primary' type='submit' disabled={!isValid} />
        </div>

        {errors?.pickTitle && <ValidationMessage message={'내용을 작성해주세요'} />}

        <PickPostCard order='first' control={control} errors={errors} />
        <PickPostCard order='second' control={control} errors={errors} />
      </form>
    </div>
  );
}
