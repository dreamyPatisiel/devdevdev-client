import React, { ChangeEvent, useEffect, useState, startTransition } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetKeyWordData } from '@pages/techblog/api/useGetKeywordData';

import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import Search from '@public/image/techblog/search.svg';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const forbiddenCharsPattern = /[!^()-+/[\]{}:]/;

  const { data, status } = useGetKeyWordData(debouncedKeyword);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      startTransition(() => {
        setIsVisible(true);
        setIsLoading(true);
        setDebouncedKeyword(keyword);
      });
      return () => {
        clearTimeout(debounceTimeout);
        setIsLoading(false);
      };
    }, 100);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [keyword]);

  useEffect(() => {
    if (searchKeyword === '') {
      setKeyword('');
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setIsLoading(false);
    }
  }, [status]);

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

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const PointedText = ({
    keyword,
    text,
    suggestion,
  }: {
    keyword: string;
    text: string;
    suggestion: string;
  }) => {
    const handleKeywordClick = () => {
      console.log('keyword', keyword);
      setCompanyId(undefined);
      setKeyword(suggestion); // input의 text
      setSearchKeyword(suggestion);
      setIsLoading(false);
      setIsVisible(false);
    };
    return (
      <p className='text-p2 py-[1rem] w-full' onClick={handleKeywordClick}>
        <span className='text-point1'>{keyword}</span>
        <span className='text-gray4'>{text}</span>
      </p>
    );
  };
  return (
    <div className='bg-gray2 rounded-[0.8rem] w-[28rem] px-[1.6rem]'>
      <div className='relative flex flex-row justify-between '>
        <input
          placeholder='키워드 검색을 해보세요'
          className='w-[21rem] py-[0.8rem] bg-gray2 text-white p2 focus:outline-none'
          value={keyword}
          onChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
        />
        <button className='cursor-pointer' onClick={handleClickSearchBtn}>
          <Image src={Search} alt='검색아이콘' />
        </button>
      </div>
      {isVisible && (
        <div
          className='fixed bg-gray2 w-[28rem] px-[1.6rem] rounded-[0.8rem]'
          style={{ zIndex: 1000 }}
        >
          {isLoading ? (
            <p className='text-p2 py-[1rem] w-full text-gray4'>로딩 중...</p>
          ) : status === 'success' && data.length > 0 ? (
            data.map((suggestion: string, index: number) => {
              const regex = new RegExp(keyword, 'i'); // 대소문자 구분 없이 검색
              const match = suggestion.match(regex);
              const text = match ? suggestion.replace(regex, '').trim() : suggestion;
              return (
                <PointedText key={index} keyword={keyword} text={text} suggestion={suggestion} />
              );
            })
          ) : (
            <>{keyword && <NoMatchingKeywords />}</>
          )}
        </div>
      )}
    </div>
  );
}
