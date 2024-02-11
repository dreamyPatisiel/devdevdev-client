import React from 'react';
import Image from 'next/image';
import serch from '@/public/image/techblog/search.svg';

const PointedText = ({ keyword, text }: { keyword: string; text: string }) => {
  return (
    <p className='text-p2 py-[1rem] w-full'>
      <span className='text-point1'>{keyword}</span> <span className='text-gray4'>{text}</span>
    </p>
  );
};

const NoMatchingKeywords = () => {
  return <p className='text-p2 py-[1rem] w-full text-gray4'>일치하는 키워드가 없어요</p>;
};

export default function SearchInput() {
  return (
    <div className='bg-gray2 rounded-[0.8rem] w-[28rem] px-[1.6rem]'>
      <div className='flex flex-row justify-between '>
        <input
          placeholder='키워드 검색을 해보세요'
          className='w-[21rem] py-[1rem] bg-gray2 text-white text-p2 focus:outline-none'
        />
        <button className='cursor-pointer'>
          <Image src={serch} alt='검색아이콘'></Image>
        </button>
      </div>

      {/* <PointedText keyword='토스' text='프라임' />
      <PointedText keyword='토스' text='인슈런스' />
      <NoMatchingKeywords /> */}
    </div>
  );
}
