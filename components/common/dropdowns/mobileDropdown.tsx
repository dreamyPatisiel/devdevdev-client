import { useState } from 'react';

import Image from 'next/image';

import { DropdownOptionProps, useDropdownStore } from '@stores/dropdownStore';

import AngleDown from '@public/image/dropdown-angle-down.svg';

import {
  bookmarkDropdownOptions,
  pickpickpickDropdownOptions,
  techBlogDropdownOptions,
} from '@/constants/DropdownOptionArr';

import BottomContainer from '../bottomContents/BottomContainer';

export default function MobileDropdown({
  type = 'pickpickpick',
}: {
  type?: 'pickpickpick' | 'techblog' | 'bookmark';
}) {
  const [showBottom, setShowBottom] = useState(false);

  const { sortOption, setSort } = useDropdownStore();

  let dropdownOptions: string[] = [];

  switch (type) {
    case 'pickpickpick':
      dropdownOptions = pickpickpickDropdownOptions;
      break;
    case 'techblog':
      dropdownOptions = techBlogDropdownOptions;
      break;
    case 'bookmark':
      dropdownOptions = bookmarkDropdownOptions;
      break;
  }

  const mapToKorean = (englishOption: DropdownOptionProps) => {
    switch (englishOption) {
      case 'LATEST':
        return '최신순';
      case 'POPULAR':
        return '인기순';
      case 'MOST_VIEWED':
        return '조회순';
      case 'MOST_COMMENTED':
        return '댓글 많은 순';
      case 'BOOKMARKED':
        return '등록순';
      case 'HIGHEST_SCORE':
        return '정확도순';
      default:
        return '';
    }
  };

  const handleOptionSelected = (value: DropdownOptionProps) => () => {
    setSort(value);
    setShowBottom(false);
  };

  return (
    <>
      <div
        className='rounded-[10rem] px-[1.4rem] py-[0.8rem] bg-gray1 text-gray4 flex gap-[0.8rem] c1 font-bold cursor-pointer'
        onClick={() => setShowBottom(true)}
      >
        {mapToKorean(sortOption)}
        <Image src={AngleDown} alt='아래방향 화살표' />
      </div>

      {showBottom ? (
        <BottomContainer onClose={() => setShowBottom(false)}>
          <b className='st1 font-bold mb-[1.2rem]'>정렬</b>
          <ul className='flex flex-col gap-[0.4rem]'>
            {dropdownOptions.map((option, index) => (
              <li
                key={index}
                onClick={handleOptionSelected(option as DropdownOptionProps)}
                className={`px-[2.4rem] py-[1.2rem] st2 text-gray4 cursor-pointer ${sortOption === option ? 'text-point1 bg-gray2 rounded-[0.8rem]' : 'hover:text-gray5'}`}
              >
                {mapToKorean(option as DropdownOptionProps)}
              </li>
            ))}
          </ul>
        </BottomContainer>
      ) : (
        <></>
      )}
    </>
  );
}
