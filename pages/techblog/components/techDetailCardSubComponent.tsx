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

export const ArticleViewBtn = ({
  techArticleUrl,
  fontSize = 'st1',
  textIconGap = 'mr-[1.6rem]',
  paddingY = 'pt-[6.4rem]',
  iconSize,
}: {
  techArticleUrl: string;
  fontSize?: string;
  textIconGap?: string;
  paddingY?: string;
  iconSize?: string;
}) => {
  return (
    <button
      className={`w-full flex justify-center items-center ${fontSize} text-point1 ${paddingY} mb-[4.8rem] font-bold`}
    >
      <Link href={techArticleUrl} target='_blank'>
        <p className={`${textIconGap}`}>아티클 전체 보기</p>
      </Link>
      <Image src={RightArrow} alt='오른쪽화살표' className={`text-point1 ${iconSize}`} />
    </button>
  );
};
