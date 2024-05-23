import Image from 'next/image';

import MainCardComponent from '@components/features/main/MainCardComponent';

import DevLogo from '@public/image/devdevdevLogo.svg';

export const MainPageLogo = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-[8rem]'>
      <Image src={DevLogo} width={200} priority alt='devdevdev로고' />
      <h1 className='p1 font-bold mt-[3.2rem]'>힘들고 막힐 때는 댑댑댑</h1>
    </div>
  );
};

export default function Index() {
  return (
    <>
      <div className='px-[20.3rem] py-[6.4rem]'>
        {/* 영역1 */}
        <MainPageLogo />
        <section className='mb-[12rem]'>
          <MainCardComponent path='/pickpickpick' />
        </section>
        <section>
          <MainCardComponent path='/techblog' />
        </section>
      </div>
    </>
  );
}
