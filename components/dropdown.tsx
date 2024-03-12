import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import AngleDown from '@public/image/angle-down.svg';

import { DropdownOptionProps, useDropdownStore, useSelectedStore } from '@/stores/dropdownStore';

export function Dropdown() {
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

export function LargeBorderDropdown({ dropdownMenu }: { dropdownMenu: string[] }) {
  const [onDropdown, setDropdown] = useState(false);
  const { selected, setSelected } = useSelectedStore();

  const handleDropdown = () => {
    setDropdown(!onDropdown);
  };

  const handleSelected = (value: string) => () => {
    setSelected(value);
    setDropdown(false);
  };

  return (
    <>
      <div className={`cursor-pointer relative`}>
        <label
          htmlFor='dropdown'
          className={cn(
            'p1 cursor-pointer flex justify-between items-center px-[1.6rem] py-[1.6rem] rounded-[0.8rem] bg-[#292A2E] w-full border-[0.1rem] border-gray3 text-gray4',
            {
              'text-gray5': selected,
              'rounded-b-none border-b-0': onDropdown,
            },
          )}
          onClick={handleDropdown}
        >
          {selected}
          <AngleDown alt='아래방향 화살표' />
        </label>

        {onDropdown && (
          <ul
            id='dropdown'
            className='text-gray4 p1 absolute rounded-b-[0.8rem] px-[1.6rem] pb-[0.8rem] bg-[#292A2E] top-full right-0 w-full flex flex-col gap-[1.2rem] border-t-0 border-[0.1rem] border-gray3 z-1'
          >
            {dropdownMenu
              .filter((menu) => selected !== menu)
              .map((menu, index) => (
                <li
                  key={index}
                  onClick={handleSelected(menu)}
                  className='cursor-pointer hover:text-gray5'
                >
                  {menu}
                </li>
              ))}
          </ul>
        )}
      </div>

      {selected === '기타' && (
        <textarea
          rows={2}
          className='p-[1.6rem] mt-[1.6rem] rounded-[0.8rem] border-[0.1rem] border-gray4 p1 placeholder:text-gray4 bg-gray1 w-full resize-none outline-none'
          placeholder='신고하게 된 이유를 작성해주세요! 40자 내외'
        />
      )}
    </>
  );
}
