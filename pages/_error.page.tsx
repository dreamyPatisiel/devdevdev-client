import Error from 'next/error';
import Image from 'next/image';

import { MainButton } from '@components/common/buttons/mainButtons';

import ArrowLeft from '@public/image/arrow-left-2.svg';
import ErrorImage from '@public/image/error.svg';

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const errorCode = res.ok ? false : res.status;
  const json = await res.json();

  return {
    props: { errorCode, stars: json.stargazers_count },
  };
}

export default function ErrorPage({ errorCode }: { errorCode: number }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <div className='flex flex-col items-center'>
      <Image src={ErrorImage} alt='에러이미지' />
      <p className='st2 font-bold mt-[4.629rem] mb-[3.2rem]'>헉... 페이지를 찾을 수 없어요.</p>
      <MainButton
        text='메인으로 돌아가기'
        variant='primary'
        icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
        textbold={true}
      />
    </div>
  );
}
