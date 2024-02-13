import { MainButton } from '@/components/buttons/mainButtons';
import Arrowleft from '@public/image/arrow-left.svg';

export default function Index() {
  return (
    <div className='flex items-baseline'>
      <Arrowleft alt='왼쪽 화살표' className='w-[10%]' />
      <div className='w-[90%]'>
        <div className='flex gap-[2.4rem] items-baseline'>
          <input
            type='text'
            className=' border-b-[0.1rem] border-solid border-b-gray2 bg-black py-[1.6rem] h3 placeholder:text-gray4 w-[90%]'
            placeholder='주제를 요약한 제목을 작성해주세요'
          />
          <MainButton text='등록하기' bgcolor='primary1' color='primary4' />
        </div>
      </div>
    </div>
  );
}
