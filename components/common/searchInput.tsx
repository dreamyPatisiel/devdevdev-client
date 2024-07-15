import React, { ChangeEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetKeyWordData } from '@pages/techblog/api/useGetKeywordData';

import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import Search from '@public/image/techblog/search.svg';

const PointedText = ({ keyword, text }: { keyword: string; text: string }) => {
  return (
    <p className='text-p2 py-[1rem] w-full'>
      <span className='text-point1'>{keyword}</span>
      <span className='text-gray4'>{text}</span>
    </p>
  );
};

const NoMatchingKeywords = () => {
  return <p className='text-p2 py-[1rem] w-full text-gray4'>일치하는 키워드가 없어요</p>;
};

export default function SearchInput() {
  const router = useRouter();
  const techArticleId = router.query.id;

  const { setCompanyId } = useCompanyIdStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const { setToastVisible, setToastInvisible } = useToastVisibleStore();

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const forbiddenCharsPattern = /[!^()-+/[\]{}:]/;

  const { data, status } = useGetKeyWordData(debouncedKeyword);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [keyword]);

  useEffect(() => {
    if (searchKeyword === '') {
      setKeyword('');
    }
  }, [searchKeyword]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickSearchBtn = () => {
    handleSearch();
  };

  const handleSearch = () => {
    setCompanyId(undefined);
    if (keyword === '') {
      setToastVisible('검색어를 입력해주세요', 'error');
      return;
    }

    if (forbiddenCharsPattern.test(keyword)) {
      setToastVisible('검색어에 특수문자는 포함할 수 없어요', 'error');
      return;
    }

    setSearchKeyword(keyword);

    if (keyword !== '' && techArticleId) {
      setToastInvisible();
      router.push('/techblog');
    }
  };

  const handleKeywordChage = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className='bg-gray2 rounded-[0.8rem] w-[28rem] px-[1.6rem]'>
      <div className='relative flex flex-row justify-between '>
        <input
          placeholder='키워드 검색을 해보세요'
          className='w-[21rem] py-[0.8rem] bg-gray2 text-white p2 focus:outline-none'
          value={keyword}
          onChange={handleKeywordChage}
          onKeyDown={handleKeyDown}
        />
        <button className='cursor-pointer' onClick={handleClickSearchBtn}>
          <Image src={Search} alt='검색아이콘' />
        </button>
      </div>
      <div
        className='fixed bg-gray2 w-[28rem] px-[1.6rem] rounded-[0.8rem]'
        style={{ zIndex: 1000 }}
      >
        {status === 'success' && data.length > 0 ? (
          data.map((suggestion: string, index: number) => {
            const regex = new RegExp(keyword, 'g');
            const text = suggestion.replace(regex, '').trim();
            return <PointedText key={index} keyword={keyword} text={text} />;
          })
        ) : (
          <>{keyword && <NoMatchingKeywords />}</>
        )}
      </div>
    </div>
  );
}
