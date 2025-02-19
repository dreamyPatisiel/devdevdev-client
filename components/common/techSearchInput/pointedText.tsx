import React from 'react';

interface PointedTextProps {
  keyword: string;
  text: string | undefined;
  suggestion: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (curKeyword: string) => void;
}

/** 
 * PointedText 컴포넌트는 검색어와 자동완성 제안을 비교하여
 * 검색어가 포함된 경우 강조하여 표시합니다.
 */
const PointedText: React.FC<PointedTextProps> = ({
  keyword,
  text,
  suggestion,
  setKeyword,
  handleSearch,
}) => {
  const normalizedKeyword = keyword.toLowerCase();
  const normalizedSuggestion = suggestion.toLowerCase();
  const keywordIndex = normalizedSuggestion.indexOf(normalizedKeyword);

  // 현재 검색어가 자동완성 제안에 포함된 경우
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

  // 검색어가 제안에 포함되지 않은 경우 기본 텍스트 표시
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

export default PointedText;
