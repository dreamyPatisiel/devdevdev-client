import { Controller, useForm } from 'react-hook-form';

import Link from 'next/link';

import { MainButton } from '@components/buttons/mainButtons';
import { ValidationMessage } from '@components/validationMessage';

import Arrowleft from '@public/image/arrow-left.svg';

import { postPicks } from './api/usePostPicks';
import PickPostCard from './components/PickPostCard';

export default function Index() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      pickTitle: '',
    },
  });

  const handlePostSubmit = (data: any) => {
    console.log(data);
    // postPicks(data);
  };
  console.log(errors);
  return (
    <div className='px-[20.3rem] pt-[6.4rem] pb-[15.7rem] gap-[6.8rem]'>
      <Link href={'/pickpickpick'}>
        <Arrowleft alt='왼쪽 화살표' />
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
