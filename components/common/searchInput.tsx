import React, { ChangeEvent, useEffect, useState, startTransition, useRef } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { useGetKeyWordData } from '@pages/techblog/api/useGetKeywordData';

import {  useTechblogDropdownStore } from '@stores/dropdownStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import Search from '@public/image/techblog/search.svg';
import XCircle from '@public/image/techblog/xCircle.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { FORBIDDEN_CHARS_PATTERN, SEARCH_CONSTANTS } from '@/constants/techSearchInputConstants';
import { ROUTES } from '@/constants/routes';
import { useClickOutside } from '@/hooks/useClickOutside';

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
  const normalizedKeyword = keyword.toLowerCase();
  const normalizedSuggestion = suggestion.toLowerCase();
  const keywordIndex = normalizedSuggestion.indexOf(normalizedKeyword);

  // 현재검색어가 자동검색어에 있는 경우
  if (keywordIndex !== -1) {
    const beforeKeyword = suggestion.slice(0, keywordIndex);
    const afterKeyword = suggestion.slice(keywordIndex + keyword.length);

    return (
      <p
        className='py-[1rem] w-full cursor-pointer break-words'
        onClick={() => {
          setKeyword(suggestion);
          handleSearch(suggestion);
        }}
      >
        <span className='text-gray200'>{beforeKeyword}</span>
        <span className='text-secondary400'>
          {suggestion.slice(keywordIndex, keywordIndex + keyword.length)}
        </span>
        <span className='text-gray200'>{afterKeyword}</span>
      </p>
    );
  }

  // 키워드가 suggestion에 없으면 기본 텍스트를 그대로 표시
  return (
    <p
      className='p1 py-[1rem] w-full cursor-pointer break-words'
      onClick={() => {
        setKeyword(suggestion);
        handleSearch(suggestion);
      }}
    >
      <span className='text-gray200'>{text || suggestion}</span>
    </p>
  );
};

export default function SearchInput() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isMobile } = useMediaQueryContext();

  const { setCompanyId } = useCompanyIdStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const { setToastVisible, setToastInvisible } = useToastVisibleStore();
  const { sortOption, setSort } = useTechblogDropdownStore();

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isUserInteraction, setIsUserInteraction] = useState(false); // 유저인터렉션 발생 여부 (클릭,엔터)
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false); // 자동완성 섹션을 보여줄지 말지 여부
  const [isFocused, setIsFocused] = useState(false); // 포커스 여부 상태 추가
  const [isInitialUrlLoad, setIsInitialUrlLoad] = useState(true); // 초기 로드 여부 (자동검색어 창 제어를 위함)

  const { data, status } = useGetKeyWordData(debouncedKeyword);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLInputElement>(null);

  useClickOutside(inputWrapperRef, () => setIsAutocompleteVisible(false));

  useEffect(() => {
    if (searchKeyword === '') {
      setKeyword('');
    }
  }, [searchKeyword]);

  // 쿼리 파라미터로 검색어가 있으면 검색어 입력
  useEffect(() => {
    const urlKeyword = router.query.keyword;
    
    if (typeof urlKeyword === 'string' && urlKeyword !== keyword) {
      setSort(SEARCH_CONSTANTS.SEARCH_SORT);
      setKeyword(urlKeyword);
      setSearchKeyword(urlKeyword);
      setIsAutocompleteVisible(false);
    }
  }, [router.query.keyword]);

  useEffect(() => {
    if (!isUserInteraction) {
      const handleDebounce = () => {
        startTransition(() => {
          setIsAutocompleteVisible(true);
          setDebouncedKeyword(keyword);
        });
      };
      const debounceTimeout = setTimeout(handleDebounce, SEARCH_CONSTANTS.DEBOUNCE_DELAY);
      return () => {
        clearTimeout(debounceTimeout);
      };
    }
  }, [keyword, isUserInteraction]);

  /**  enter키를 눌렀을때 이벤트 함수 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
      setIsFocused(false);

      // 비동기 특성을 이용해 동기 작업이 끝난 후 호출 되도록 설정
      setTimeout(() => {
        inputRef.current?.blur();
      }, 0);
    }
  };

  /**  검색버튼을 클릭할 때 이벤트 함수 */
  const handleClickSearchBtn = () => {
    handleSearch(keyword);
  };

  /** 검색어를 지우는 이벤트 함수 */
  const handleClickDeleteBtn = () => {
    setKeyword('');
    setIsAutocompleteVisible(false); // 자동완성 섹션 닫기
  };

  /** 검색어로 검색시 동작하는 함수 */
  const handleSearch = (curKeyword: string) => {
    const newSortOption = curKeyword === '' ? SEARCH_CONSTANTS.DEFAULT_SORT : SEARCH_CONSTANTS.SEARCH_SORT;
    setIsUserInteraction(true);
    setCompanyId(null);

    // 검색어가 없는경우
    if (curKeyword === '') {
      setToastVisible({ message: SEARCH_CONSTANTS.ERROR_MESSAGES.EMPTY_KEYWORD, type: 'error' });
      return;
    }
    // 검색어에 특수문자가 있는경우
    if (FORBIDDEN_CHARS_PATTERN.test(curKeyword)) {
      setToastVisible({ message: SEARCH_CONSTANTS.ERROR_MESSAGES.SPECIAL_CHARS, type: 'error' });
      return;
    }
    setSearchKeyword(curKeyword);
    if (sortOption !== newSortOption) {
      setSort(newSortOption);
    }
    
    setToastInvisible();
    router.push({
      pathname: ROUTES.TECH_BLOG,
      query: { keyword: curKeyword }
    });
    
    setIsAutocompleteVisible(false);
  };

  /** 검색어 input onChange 함수 */
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUserInteraction(false);
    setIsAutocompleteVisible(false);
    setKeyword(e.target.value);
    setIsInitialUrlLoad(false);
  };

  /** input에 포커스 되었을때 검색어 보이도록 쿼리무효화 처리 */
  const handleInputFocus = async () => {
    setIsInitialUrlLoad(false);
    setIsFocused(true);
    if (keyword !== '' && !isInitialUrlLoad) {
      setIsAutocompleteVisible(true);
      await queryClient.invalidateQueries({ queryKey: ['keyword'] });
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false); // 포커스 상태 해제
  };

  return (
    <div ref={inputWrapperRef} className={`${isMobile ? 'w-full' : 'w-[28rem]'} p1 relative`}>
      <div
        className={`
          w-full
          border ${isFocused ? 'border-secondary400' : 'border-gray400'}
          relative bg-gray600 rounded-[1.2rem]`}
      >
        <div className='flex flex-row items-center'>
          <button className='cursor-pointer flex-none px-[1.2rem]' onClick={handleClickSearchBtn}>
            <Image width='20' height='32' src={Search} alt='검색아이콘' />
          </button>
          <input
            ref={inputRef}
            placeholder='검색어를 입력해주세요'
            className={`${isMobile ? 'w-[95%]' : 'w-full'} rounded-[1.2rem] py-[1.1rem] bg-gray600 text-white p1 focus:outline-none`}
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {keyword && (
            <button className='flex-none pr-[1.2rem]' onClick={handleClickDeleteBtn}>
              <Image src={XCircle} alt='검색어삭제아이콘' />
            </button>
          )}
        </div>
      </div>
      {isAutocompleteVisible && !isInitialUrlLoad && data && data.length > 0 && (
        <div
          className={`
            w-full
            custom-scrollbar overflow-y-scroll max-h-[19rem] 
            absolute top-[3.5rem] left-0 
            bg-gray600 px-[4.4rem] rounded-b-[1.2rem] z-40
            border border-t-0 ${isFocused ? 'border-secondary400' : 'border-gray400'}`}
        >
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
