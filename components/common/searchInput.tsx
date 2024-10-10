import React, { ChangeEvent, useEffect, useState, startTransition, useRef } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetKeyWordData } from '@pages/techblog/api/useGetKeywordData';

import { useDropdownStore } from '@stores/dropdownStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

import Search from '@public/image/techblog/search.svg';

const PointedText = ({
  keyword,
  text,
  suggestion,
  setKeyword,
  handleSearch,
}: {
  keyword: string;
  text: string | undefined;
  suggestion: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (curKeyword: string) => void;
}) => {
  const keywordIndex = suggestion.indexOf(keyword);

  // 현재검색어가 자동검색어에 있는 경우
  if (keywordIndex !== -1) {
    const beforeKeyword = suggestion.slice(0, keywordIndex);
    const afterKeyword = suggestion.slice(keywordIndex + keyword.length);

    return (
      <p
        className='text-p2 py-[1rem] w-full cursor-pointer break-words'
        onClick={() => {
          setKeyword(suggestion);
          handleSearch(suggestion);
        }}
      >
        <span className='text-gray4'>{beforeKeyword}</span>
        <span className='text-point1'>{keyword}</span>
        <span className='text-gray4'>{afterKeyword}</span>
      </p>
    );
  }

  // 키워드가 suggestion에 없으면 기본 텍스트를 그대로 표시
  return (
    <p
      className='text-p2 py-[1rem] w-full cursor-pointer break-words'
      onClick={() => {
        setKeyword(suggestion);
        handleSearch(suggestion);
      }}
    >
      <span className='text-gray4'>{text || suggestion}</span>
    </p>
  );
};
export default function SearchInput() {
  const router = useRouter();
  const techArticleId = router.query.id;

  const isMobile = useIsMobile();

  const { setCompanyId } = useCompanyIdStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const { setToastVisible, setToastInvisible } = useToastVisibleStore();
  const { sortOption, setSort } = useDropdownStore();

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isUserInteraction, setIsUserInteraction] = useState(false); // 유저인터렉션 발생 여부 (클릭,엔터)
  const [isVisible, setIsVisible] = useState(false); // 자동완성 섹션을 보여줄지 말지 여부

  const forbiddenCharsPattern = /[!^()-+/[\]{}:]/;

  const { data, status } = useGetKeyWordData(debouncedKeyword);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchKeyword === '') {
      setKeyword('');
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (!isUserInteraction) {
      const handleDebounce = () => {
        startTransition(() => {
          setIsVisible(true);
          setDebouncedKeyword(keyword);
        });
      };
      const debounceTimeout = setTimeout(handleDebounce, 100);
      return () => {
        clearTimeout(debounceTimeout);
      };
    }
  }, [keyword, isUserInteraction]);

  /**  enter키를 눌렀을때 이벤트 함수 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
    }
  };

  /**  검색버튼을 클릭할 때 이벤트 함수 */
  const handleClickSearchBtn = () => {
    handleSearch(keyword);
  };

  /** 검색어로 검색시 동작하는 함수 */
  const handleSearch = (curKeyword: string) => {
    const newSortOption = curKeyword === '' ? 'LATEST' : 'HIGHEST_SCORE';
    setIsUserInteraction(true);
    setCompanyId(undefined);
    if (curKeyword === '') {
      setToastVisible('검색어를 입력해주세요', 'error');
      return;
    }
    if (forbiddenCharsPattern.test(curKeyword)) {
      setToastVisible('검색어에 특수문자는 포함할 수 없어요', 'error');
      return;
    }
    setSearchKeyword(curKeyword);
    if (sortOption !== newSortOption) {
      setSort(newSortOption);
    }
    if (curKeyword !== '' && techArticleId) {
      setToastInvisible();
      router.push('/techblog');
    }
    setIsVisible(false);
  };

  /** 검색어 input onChange 함수 */
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUserInteraction(false);
    setKeyword(e.target.value);
  };

  return (
    <div
      ref={inputRef}
      className={`
        ${isMobile ? 'w-full' : 'w-[28rem]'}
        relative bg-gray2  px-[1.6rem] ${!isVisible || keyword === '' ? 'rounded-[0.8rem]' : 'rounded-t-[0.8rem]'}`}
    >
      <div className='flex flex-row justify-between'>
        <input
          placeholder='키워드 검색을 해보세요'
          className={`${isMobile ? 'w-[90%]' : 'w-[21rem]'} py-[0.8rem] bg-gray2 text-white p2 focus:outline-none`}
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
          className={`${isMobile ? 'w-full' : 'w-[28rem]'} 
          overflow-y-scroll scrollbar-hide max-h-[19rem] absolute top-[3.5rem] left-0 bg-gray2 px-[1.6rem] rounded-b-[0.8rem] z-40`}
        >
          {keyword && (
            <p className='py-[1rem] w-full cursor-pointer break-words p2 text-point1'>{keyword}</p>
          )}
          {status === 'success' &&
            data?.map((suggestion: string, index: number) => {
              const normalizedKeyword = keyword.replace(/\s+/g, ' ').trim();
              const regex = new RegExp(normalizedKeyword, 'i');
              const textParts = suggestion.split(regex);
              return (
                <PointedText
                  key={index}
                  keyword={keyword} // 자동검색어안 내가 쓴 단어(포인트)
                  text={textParts[1]} // 내가 쓰지 않은 단어(회색)
                  suggestion={suggestion} // 자동검색어 전체
                  handleSearch={handleSearch}
                  setKeyword={setKeyword}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
