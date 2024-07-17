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
  const [isUserInteraction, setIsUserInteraction] = useState(false); // 유저인터렉션 발생 여부 (클릭,엔터)
  const [isLoading, setIsLoading] = useState(false); // 서버쪽 검색어를 불러올때 로딩값
  const [isVisible, setIsVisible] = useState(false); // 자동완성 섹션을 보여줄지 말지 여부

  const forbiddenCharsPattern = /[!^()-+/[\]{}:]/;

  const { data, status } = useGetKeyWordData(debouncedKeyword);

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

  useEffect(() => {
    if (!isUserInteraction) {
      const handleDebounce = () => {
        startTransition(() => {
          setIsVisible(true);
          setIsLoading(true);
          setDebouncedKeyword(keyword);
        });
      };
      const debounceTimeout = setTimeout(handleDebounce, 100);
      return () => {
        clearTimeout(debounceTimeout);
        setIsLoading(false);
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

  const PointedText = ({
    keyword,
    text,
    suggestion,
  }: {
    keyword: string;
    text: string;
    suggestion: string;
  }) => {
    return (
      <p
        className='text-p2 py-[1rem] w-full'
        onClick={() => {
          setKeyword(suggestion);
          handleSearch(suggestion);
        }}
      >
        <span className='text-point1'>{keyword}</span>
        <span className='text-gray4'>{text}</span>
      </p>
    );
  };
  return (
    <div className='relative bg-gray2 rounded-[0.8rem] w-[28rem] px-[1.6rem]'>
      <div className='flex flex-row justify-between'>
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
          className='absolute left-0 bg-gray2 w-[28rem] px-[1.6rem] rounded-[0.8rem]'
          style={{ zIndex: 100 }}
        >
          {isLoading ? (
            <p className='text-p2 py-[1rem] w-full text-gray4'>로딩 중...</p>
          ) : status === 'success' && data.length > 0 ? (
            data.map((suggestion: string, index: number) => {
              const normalizedKeyword = keyword.replace(/\s+/g, ' ').trim();
              const regex = new RegExp(normalizedKeyword, 'i');
              const textParts = suggestion.split(regex);

              return (
                <PointedText
                  key={index}
                  keyword={keyword}
                  text={textParts[1]}
                  suggestion={suggestion}
                />
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
