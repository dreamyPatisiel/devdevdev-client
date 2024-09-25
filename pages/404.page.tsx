import Image from 'next/image';
import Link from 'next/link';

import useIsMobile from '@hooks/useIsMobile';

import { MainButton } from '@components/common/buttons/mainButtons';

import MobileEmptyImage from '@public/image/404-mobile.svg';
import EmptyImage from '@public/image/404.svg';
import ArrowLeft from '@public/image/arrow-left-2.svg';

import { ROUTES } from '@/constants/routes';

export default function Custom404() {
  const { isMobile } = useIsMobile();

  return (
    <div className='flex flex-col items-center mt-[11.8rem]'>
      {isMobile ? (
        <Image src={MobileEmptyImage} alt='404 이미지' />
      ) : (
        <Image src={EmptyImage} alt='404 이미지' />
      )}
      <p className='st2 font-bold mt-[4.629rem] mb-[3.2rem]'>헉... 페이지를 찾을 수 없어요.</p>
      <Link href={ROUTES.MAIN}>
        <MainButton
          text='메인으로 돌아가기'
          variant='primary'
          icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
        />
      </Link>
    </div>
  );
}
