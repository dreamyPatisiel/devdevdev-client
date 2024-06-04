import Image from 'next/image';
import { useRouter } from 'next/router';

import { MainButton } from '@components/common/buttons/mainButtons';

import ReplayIcon from '@public/assets/replayIcon';
import ArrowLeft from '@public/image/arrow-left-2.svg';
import ErrorImage from '@public/image/error.svg';

export default function ErrorPage({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  const router = useRouter();

  return (
    <div
      className='flex flex-col items-center'
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <Image src={ErrorImage} alt='에러 이미지' />
      <p className='st2 font-bold mt-[4.629rem] mb-[3.2rem]'>
        요청을 처리하는데 실패했어요. 다시 시도해주세요.
      </p>

      <MainButton
        text='메인으로 돌아가기'
        variant='primary'
        icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
        onClick={() => {
          resetErrorBoundary();
          router.push('/');
        }}
      />

      <button
        type='button'
        onClick={resetErrorBoundary}
        className='flex gap-[1.2rem] items-center mt-[2.5rem]'
      >
        <ReplayIcon color='var(--gray-4)' />
        <span className='p1 font-bold text-gray4'>새로고침</span>
      </button>
    </div>
  );
}
