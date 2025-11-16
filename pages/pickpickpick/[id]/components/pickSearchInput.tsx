import React, { useState } from 'react';

import Image from 'next/image';

import Search from '@public/image/techblog/search.svg';
import XCircle from '@public/image/techblog/xCircle.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

interface PickSearchInputProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
}

export const PickSearchInput = ({
  keyword,
  onKeywordChange,
  onClear,
  onSearch,
}: PickSearchInputProps) => {
  const { isMobile } = useMediaQueryContext();
  const [isFocused, setIsFocused] = useState(false);

  const handleClickDeleteBtn = () => {
    onKeywordChange('');
    setIsFocused(false);
    onClear?.();
  };

  return (
    <div className='w-full flex justify-center'>
      <div
        className={`w-full max-w-[61.6rem] flex flex-row items-center rounded-Radius12 px-[1.2rem] py-[1rem] bg-gray700 text-gray300 p1 focus:outline-none border ${isFocused ? 'border-secondary400' : 'border-gray400'} ${isMobile ? 'mb-[9rem]' : 'mb-[11.4rem]'}`}
      >
        <button
          className='cursor-pointer flex-none px-[1.2rem]'
          onClick={() => onSearch?.(keyword)}
          type='button'
        >
          <Image width='20' height='24' src={Search} alt='검색아이콘' />
        </button>
        <input
          className='bg-gray700 text-white flex-1 focus:outline-none'
          placeholder='키워드를 검색해보세요'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsFocused(false);
              onSearch?.(keyword);
            }
          }}
        />
        {keyword !== '' && (
          <button
            type='button'
            className='flex-none cursor-pointer px-[0.8rem]'
            onClick={handleClickDeleteBtn}
          >
            <Image width='20' height='20' src={XCircle} alt='검색어삭제아이콘' />
          </button>
        )}
      </div>
    </div>
  );
};
