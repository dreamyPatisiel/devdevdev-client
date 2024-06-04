import Image from 'next/image';

import Devguri from '@public/image/devguri.svg';
import Retry from '@public/image/retry.svg';

import { MainButton } from './buttons/mainButtons';

export default function Error({ resetErrorBoundary }: { resetErrorBoundary?: () => void }) {
  return (
    <div className='flex flex-col items-center'>
      <Image src={Devguri} alt='에러 댑구리 이미지' />
      <p className='st2 font-bold mt-[4rem]'>잠시 후 다시 시도해주세요</p>
      <p className='st2 text-gray4 mt-[3.2rem] mb-[3.2rem]'>요청사항을 처리하는데 실패했어요.</p>
      <MainButton
        text='새로고침'
        variant='primary'
        icon={<Image src={Retry} alt='새로고침 아이콘' />}
        textbold={true}
        onClick={resetErrorBoundary}
      />
    </div>
  );
}
