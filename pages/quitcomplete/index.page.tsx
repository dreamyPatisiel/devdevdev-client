import { useRouter } from 'next/router';

import { MainButton } from '@components/common/buttons/mainButtons';

export default function Quitcomplete() {
  const router = useRouter();

  return (
    <div className='mt-[6.4rem] mx-[20.4rem]'>
      <h1 className='h3 font-bold mb-[4rem]'>회원탈퇴</h1>
      <div className='border border-gray3 rounded-[1.6rem] px-[3.2rem] py-[8.8rem] flex flex-col items-center gap-[4.8rem]'>
        <div className='text-[5.6rem]'>👋</div>
        <p className='flex flex-col gap-[2.4rem] items-center'>
          <p className='st2 font-bold'>탈퇴가 완료됐어요.</p>
          <p className='p1 text-gray4'>다시보는 그 날을 기다릴게요</p>
        </p>
        <MainButton text='메인으로 돌아가기' variant='primary' onClick={() => router.push('/')} />
      </div>
    </div>
  );
}
