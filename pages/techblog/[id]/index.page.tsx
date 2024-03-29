import React from 'react';

import { useRouter } from 'next/router';

import { MainButton } from '@components/buttons/mainButtons';

import HandRight from '@public/image/hand-right.svg';

import TechDetailCard from '../components/techDetailCard';

const CompanyTitle = ({ title, content }: { title: string; content: string }) => {
  return (
    <p className='st1'>
      <span className='text-point1'>{'{' + title + '}'}</span>
      {content}
    </p>
  );
};

export default function Page() {
  const router = useRouter();
  console.log(router.query.id);

  return (
    // 기술블로그 글
    <article className='w-full h-full px-[9.8rem] py-[6.4rem]'>
      <TechDetailCard />

      <section className='flex items-center justify-between px-[3.2rem] py-[3.1rem] border border-gray2 rounded-[1.6rem]'>
        <CompanyTitle
          title='토스'
          content='는 절찬리 채용중! 확인하러
          가볼까요?'
        />
        <MainButton text='채용정보 보러가기' variant='primary' icon={<HandRight />} />
      </section>

      {/* ------------------------------------2차-------------------------------------- */}
      {/* 기업공고 & 댓글 */}
      {/* <section className='border border-solid border-gray2 rounded-[1.6rem] px-[3.2rem] py-[4.2rem]  mt-[3.2rem] mb-[9.6rem]'>
        <div className='flex flex-row items-center justify-between mb-[3.4rem]'>
          <CompanyTitle title='토스' content='는 절찬리 채용중! 관심기업으로 등록하세요' />
          <MainButton text='기업 구독' color='white' bgcolor='primary1' icon={<PlusIcon />} />
        </div>

        <ul className='grid grid-cols-2 grid-rows-2 gap-[2rem]'>
          <CompanyCard Img={<TossLogo />} />
          <CompanyCard Img={<TossLogo />} />
          <CompanyCard Img={<TossLogo />} />
          <CompanyCard Img={<TossLogo />} />
          <ViewMoreArrow />
        </ul>
      </section> */}
    </article>
  );
}
