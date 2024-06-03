import Image from 'next/image';
import Link from 'next/link';

import { MainButton } from '@components/common/buttons/mainButtons';

import EmptyImage from '@public/image/404.svg';
import ArrowLeft from '@public/image/arrow-left-2.svg';

export default function Custom404() {
  return (
    <div
      className='flex flex-col items-center'
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <Image src={EmptyImage} alt='404 이미지' />
      <p className='st2 font-bold mt-[4.629rem] mb-[3.2rem]'>헉... 페이지를 찾을 수 없어요.</p>
      <Link href={'/'}>
        <MainButton
          text='메인으로 돌아가기'
          variant='primary'
          icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
          textbold={true}
        />
      </Link>
    </div>
  );
}
