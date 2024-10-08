import { twMerge } from 'tailwind-merge';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { dropdownOptionToKorean } from '@utils/dropdownOptionToKorean';
import { cn } from '@utils/mergeStyle';

import AngleDown from '@public/image/angle-down.svg';

import {
  bookmarkDropdownOptions,
  pickpickpickDropdownOptions,
  techBlogDropdownOptions,
} from '@/constants/DropdownOptionArr';
import { DropdownOptionProps, useDropdownStore, useSelectedStore } from '@/stores/dropdownStore';

export function Dropdown({
  type,
  disable = false,
}: {
  type?: 'pickpickpick' | 'techblog' | 'bookmark';
  disable?: boolean;
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
    default:
      break;
  }

  const DISABLE_CLASS = 'pointer-events-none opacity-50';

  useEffect(() => {
    if (!dropdownOptions.includes(sortOption)) setSort(dropdownOptions[0] as DropdownOptionProps);
  }, []);

  const handleOptionSelected = (value: DropdownOptionProps) => () => {
    setSort(value);
    setDropdownOpen(false);
  };

  return (
    <div
      className={twMerge(
        `rounded-[0.4rem] bg-gray1 w-[14.8rem] relative cursor-pointer z-10`,
        disable && DISABLE_CLASS,
      )}
      onClick={handleDropdownToggle}
    >
      <label
        htmlFor='dropdown'
        className='text-gray5 text-c1 leading-[2.4rem] cursor-pointer flex justify-between items-center px-[1.2rem] py-[0.8rem] '
      >
        {dropdownOptionToKorean(sortOption)}
        <Image src={AngleDown} alt='아래방향 화살표' />
      </label>

      {isDropdownOpen && (
        <ul
          id='dropdown'
          className='text-gray4 text-c1 absolute rounded-[0.4rem] pl-[1.2rem] pt-[1.5rem] pb-[2rem] bg-gray1 top-[2.5rem] right-[0] w-[14.8rem] flex flex-col gap-[1.2rem]'
        >
          {dropdownOptions.map((option, index) => (
            <li
              key={index}
              onClick={handleOptionSelected(option as DropdownOptionProps)}
              className={`cursor-pointer hover:text-gray5 ${sortOption === option && 'text-gray5'}`}
            >
              {dropdownOptionToKorean(option as DropdownOptionProps)}
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
            'p1 cursor-pointer flex justify-between items-center px-[1.6rem] py-[1.6rem] rounded-[0.8rem] bg-gray1 w-full border-[0.1rem] border-gray3 text-gray4',
            {
              'text-gray5': selected,
              'rounded-b-none border-b-0': onDropdown,
            },
          )}
          onClick={handleDropdown}
        >
          {selected}
          <Image src={AngleDown} alt='아래방향 화살표' />
        </label>

        {onDropdown && (
          <ul
            id='dropdown'
            className='text-gray4 p1 absolute rounded-b-[0.8rem] px-[1.6rem] pb-[0.8rem] bg-gray1 top-full right-0 w-full flex flex-col gap-[1.2rem] border-t-0 border-[0.1rem] border-gray3 z-10'
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
          className='p-[1.6rem] mt-[1.6rem] rounded-[0.8rem] border-[0.1rem] border-gray3 p1 placeholder:text-gray4 bg-gray1 w-full resize-none outline-none'
          placeholder='신고하게 된 이유를 작성해주세요! 40자 내외'
        />
      )}
    </>
  );
}
