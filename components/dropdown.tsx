import { useState } from 'react';

import AngleDown from '@public/image/angle-down.svg';

import { DropdownOptionProps, useDropdownStore } from '@/stores/dropdownStore';

export default function Dropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { sortOption, setSort } = useDropdownStore();

  const dropdownOptions = ['LATEST', 'POPULAR', 'MOST_VIEWED', 'MOST_COMMENTED'];

  const handleOptionSelected = (value: DropdownOptionProps) => () => {
    setSort(value);
    setDropdownOpen(false);
  };

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
      default:
        return '';
    }
  };

  return (
    <div
      className='rounded-[0.4rem] bg-[#292A2E] w-[14.8rem] relative cursor-pointer'
      onClick={handleDropdownToggle}
    >
      <label
        htmlFor='dropdown'
        className='text-gray5 text-c1 leading-[2.4rem] cursor-pointer flex justify-between items-center px-[1rem] py-[0.4rem] '
      >
        {mapToKorean(sortOption)}
        <AngleDown alt='아래방향 화살표' />
      </label>

      {isDropdownOpen && (
        <ul
          id='dropdown'
          className='text-gray4 text-c1 absolute rounded-[0.4rem] px-4 py-[0.8rem] bg-[#292A2E] top-[2.5rem] right-[0] w-[14.8rem] flex flex-col gap-[0.4rem]'
        >
          {dropdownOptions
            .filter((option) => sortOption !== option)
            .map((option, index) => (
              <li
                key={index}
                onClick={handleOptionSelected(option as DropdownOptionProps)}
                className='cursor-pointer hover:text-gray5'
              >
                {mapToKorean(option as DropdownOptionProps)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
