import React from 'react';

import Image from 'next/image';

import { useCompanyInfoStore, useSearchKeywordStore } from '@stores/techBlogStore';

import { MainButton } from '@components/common/buttons/mainButtons';

import ArrowLeft from '@public/image/techblog/angle-left-white.svg';

import { NO_TECHBLOG_DATA } from '@/constants/NO_TECHBLOG_DATA';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

type SearchNotFoundProps = {
  type: 'company' | 'keyword';
};

export default function SearchNotFound({ type }: SearchNotFoundProps) {
  const { isMobile } = useMediaQueryContext();
  const { companyName, setCompanyId } = useCompanyInfoStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const KeyType = type.toUpperCase() as keyof typeof NO_TECHBLOG_DATA;

  const handleOnClick = () => {
    setSearchKeyword('');
    setCompanyId(null);
  };

  const searchNotFoundText = (type: keyof typeof NO_TECHBLOG_DATA) => {
    if (type === 'COMPANY') {
      return (
        <>
          <p className={`p1`}>
            <span className='text-secondary400'>{companyName}</span>
            {NO_TECHBLOG_DATA[type].TITLE}
          </p>
        </>
      );
    }
    if (type === 'KEYWORD') {
      return (
        <>
          <p className={`${isMobile ? 'h3' : 'h1'} font-bold`}>{NO_TECHBLOG_DATA[type].TITLE}</p>
          <p className='p1 mb-[3.2rem]'>
            &apos;<span className='text-secondary400'>{searchKeyword}</span>&apos;
            {NO_TECHBLOG_DATA[type].SUBTITLE}
          </p>
        </>
      );
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[3.2rem] pt-[6rem]'>
      <span className='text-[6.4rem] inline-block'>😭</span>
      {searchNotFoundText(KeyType)}
      <MainButton
        text=' 처음으로 돌아가기'
        icon={<Image src={ArrowLeft} alt='왼쪽 화살표' />}
        variant='primary'
        onClick={handleOnClick}
      />
    </div>
  );
}
