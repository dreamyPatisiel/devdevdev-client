import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import Toast from '@components/Toast';
import { MainButton } from '@components/buttons/mainButtons';
import { DevDevDevLoading } from '@components/devdevdevLoading/devLoading';

import HandRight from '@public/image/hand-right.svg';

import { useGetDetailTechBlog } from '../api/useGetTechBolgDetail';
import TechDetailCard from '../components/techDetailCard';

const CompanyTitle = ({ title, content }: { title: string; content: string }) => {
  return (
    <p className='st1'>
      <span className='text-point1 font-bold'>{title}</span>
      {content}
    </p>
  );
};

export default function Page() {
  const router = useRouter();
  const techArticleId = router.query.id as string;
  const { setToastInvisible } = useToastVisibleStore();

  useEffect(() => {
    setToastInvisible();
  }, []);

  const { data, error, status } = useGetDetailTechBlog(techArticleId);

  const getStatusComponent = () => {
    if (!techArticleId) {
      return <></>;
    }

    switch (status) {
      case 'pending':
        return (
          <div className='w-full h-full flex items-center justify-center'>
            <DevDevDevLoading />
          </div>
        );

      case 'error':
        return <p>Error: {error?.message}</p>;

      case 'success':
        const { company } = data;
        return (
          <article className='px-[20.4rem] py-[6.4rem]'>
            <Toast />
            <TechDetailCard {...data} />
            <section className='flex items-center justify-between px-[3.2rem] py-[3.1rem] border border-gray2 rounded-[1.6rem]'>
              <CompanyTitle
                title={company.name}
                content='는 절찬리 채용중! 확인하러
              가볼까요?'
              />
              <Link href={company.careerUrl} target='_blank'>
                <MainButton
                  text='채용정보 보러가기'
                  variant='primary'
                  icon={<Image src={HandRight} alt='오른쪽 손가락 아이콘' />}
                />
              </Link>
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
      default:
        return <></>;
    }
  };

  return <>{getStatusComponent()}</>;
}
