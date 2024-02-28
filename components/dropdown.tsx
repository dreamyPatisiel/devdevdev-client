import { useState } from 'react';

import AngleDown from '@public/image/angle-down.svg';

import { DropdownMenu, useDropdownStore } from '@/stores/dropdownStore';

export default function Dropdown() {
  const [onDropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!onDropdown);
  };

  const { sort, setSort } = useDropdownStore();

  const dropdownMenu = ['LATEST', 'POPULAR', 'MOST_VIEWED', 'MOST_COMMENTED'];

  const handleSelected = (value: DropdownMenu) => () => {
    setSort(value);
    setDropdown(false);
  };

  const mapToKorean = (englishOption: DropdownMenu) => {
    switch (englishOption) {
      case 'LATEST':
        return '최신순';
      case 'POPULAR':
        return '인기순';
      case 'MOST_VIEWED':
        return '조회순';
      case 'MOST_COMMENTED':
        return '댓글 많은 순';
    }
  };

  return (
    <div
      className='rounded-[0.4rem] bg-[#292A2E] w-[14.8rem] relative cursor-pointer'
      onClick={handleDropdown}
    >
      <label
        htmlFor='dropdown'
        className='text-gray5 text-c1 leading-[2.4rem] cursor-pointer flex justify-between items-center px-[1rem] py-[0.4rem] '
      >
        {mapToKorean(sort)}
        <AngleDown alt='아래방향 화살표' />
      </label>

      {onDropdown && (
        <ul
          id='dropdown'
          className='text-gray4 text-c1 absolute rounded-[0.4rem] px-4 py-[0.8rem] bg-[#292A2E] top-[2.5rem] right-[0] w-[14.8rem] flex flex-col gap-[0.4rem]'
        >
          {dropdownMenu
            .filter((menu) => sort !== menu)
            .map((menu, index) => (
              <li
                key={index}
                onClick={handleSelected(menu as DropdownMenu)}
                className='cursor-pointer hover:text-gray5'
              >
                {mapToKorean(menu as DropdownMenu)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
