import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import DevLoadingComponent from '@pages/loading/index.page';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

import { MainButton } from '@components/common/buttons/mainButtons';
import MobileToListButton from '@components/common/mobile/mobileToListButton';

import HandRight from '@public/image/hand-right.svg';

import { ROUTES } from '@/constants/routes';

import { useGetDetailTechBlog } from '../api/useGetTechBlogDetail';
import TechDetailCard from '../components/techDetailCard';
import { TechCardProps } from '../types/techBlogType';

const CompanyTitle = ({
  title,
  content1,
  content2,
}: {
  title: string;
  content1: string;
  content2: string;
}) => {
  const { isMobile } = useIsMobile();
  return (
    <div className={`${isMobile ? 'st2 flex flex-col items-center' : 'st1'}`}>
      <p>
        <span className='text-point1 font-bold'>{title}</span>
        {content1}
      </p>
      <p>{content2}</p>
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const techArticleId = router.query.id as string | undefined;
  const { setToastInvisible } = useToastVisibleStore();

  const { isMobile } = useIsMobile();

  useEffect(() => {
    setToastInvisible();
  }, []);

  const { data, status } = useGetDetailTechBlog(techArticleId);

  const getStatusComponent = (
    CurDetailTechBlogData: TechCardProps | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    if (!techArticleId) {
      return <></>;
    }

    switch (status) {
      case 'pending':
        return <DevLoadingComponent />;

      case 'success':
        if (!CurDetailTechBlogData) return;
        const { company } = CurDetailTechBlogData;
        const TechCareerBaseStyle = 'flex py-[3.1rem] border border-gray2 rounded-[1.6rem]';
        const TechCareerMobileStyle = `flex-col gap-9 px-[2.4rem] mb-[2.7rem] items-center`;
        const TechCareerDesktopStyle = `flex-row items-center justify-between px-[3.2rem]`;
        return (
          <article className={isMobile ? 'px-[1.6rem] pb-[6.4rem]' : 'px-[20.4rem] py-[6.4rem]'}>
            <TechDetailCard techDetailProps={CurDetailTechBlogData} techArticleId={techArticleId} />
            <section
              className={`${TechCareerBaseStyle} ${isMobile ? TechCareerMobileStyle : TechCareerDesktopStyle}`}
            >
              <CompanyTitle
                title={company.name}
                content1=' 절찬리 채용중! '
                content2='확인하러
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
            {isMobile && <MobileToListButton route={ROUTES.TECH_BLOG} />}

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

  return <>{getStatusComponent(data, status)}</>;
}
