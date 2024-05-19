import Image from 'next/image';
import Link from 'next/link';

import { EllipsisGradientText } from '@components/common/EllipsisGradientText';

import RightArrow from '@public/image/techblog/angle-right-point1.svg';

export const TechDetailInfo = ({
  company,
  author,
  date,
}: {
  company: string;
  author: string;
  date: string;
}) => {
  return (
    <div className='p1 flex border-white gap-[1.6rem] select-none'>
      <div>{company}</div>
      <span className='text-gray4'>|</span>
      <div>by. {author || company}</div>
      <span className='text-gray4'>|</span>
      <time dateTime={date}>{date}</time>
    </div>
  );
};

export const TechMainContent = ({ content }: { content: string }) => {
  return (
    <EllipsisGradientText startPercent='60%' endPercent='100%' className='p1 py-[1.7rem]'>
      {content}
    </EllipsisGradientText>
  );
};

export const ArticleViewBtn = ({ techArticleUrl }: { techArticleUrl: string }) => {
  return (
    <button className='w-full flex justify-center items-center st1 text-point1 pt-[6.4rem] pb-[4.8rem] mb-[4.8rem] font-bold'>
      <Link href={techArticleUrl} target='_blank'>
        <p className='mr-[1.6rem]'>아티클 전체 보기</p>
      </Link>
      <Image src={RightArrow} alt='오른쪽화살표' className='text-point1' />
    </button>
  );
};
