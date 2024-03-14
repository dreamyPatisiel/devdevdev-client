import Link from 'next/link';

import { MainButton } from '@components/buttons/mainButtons';
import { ValidationMessage } from '@components/validationMessage';

import Arrowleft from '@public/image/arrow-left.svg';

import PickPostCard from './components/PickPostCard';

export default function Index() {
  return (
    <div className='flex items-baseline pl-[9.8rem] pr-[20.3rem] pt-[6.4rem] pb-[15.7rem] gap-[6.8rem]'>
      <Link href={'/pickpickpick'}>
        <Arrowleft alt='왼쪽 화살표' />
      </Link>
      <div className='w-[90%]'>
        <div className='flex gap-[2.4rem] items-baseline'>
          <input
            type='text'
            className=' border-b-[0.1rem] border-solid border-b-gray2 bg-black py-[1.6rem] h3 placeholder:text-gray4 flex-1 focus:outline-none focus:border-primary2'
            placeholder='주제를 요약한 제목을 작성해주세요'
          />
          <MainButton text='등록하기' variant='primary' />
        </div>
        <ValidationMessage message={'내용을 작성해주세요'} />

        <PickPostCard />
        <PickPostCard />
      </div>
    </div>
  );
}
