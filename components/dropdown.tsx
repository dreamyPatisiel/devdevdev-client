import { useState } from 'react';

import AngleDown from '@public/image/angle-down.svg';

export function Dropdown({ dropdownMenu }: { dropdownMenu: string[] }) {
  const [onDropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState(dropdownMenu[0]);

  const handleDropdown = () => {
    setDropdown(!onDropdown);
  };

  const handleSelected = (value: string) => () => {
    setSelected(value);
    setDropdown(false);
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
        {selected}
        <AngleDown alt='아래방향 화살표' />
      </label>

      {onDropdown && (
        <ul
          id='dropdown'
          className='text-gray4 text-c1 absolute rounded-[0.4rem] px-4 py-[0.8rem] bg-[#292A2E] top-[2.5rem] right-[0] w-[14.8rem] flex flex-col gap-[0.4rem]'
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
  );
}

export function LargeBorderDropdown({ dropdownMenu }: { dropdownMenu: string[] }) {
  const [onDropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState<string>();

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
          className={`${selected ? 'text-gray5' : 'text-gray4'} p1 cursor-pointer flex justify-between items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem] bg-[#292A2E] w-full border-[0.1rem] border-gray4 h-[4rem]
        ${onDropdown && 'rounded-b-none border-b-0'}`}
          onClick={handleDropdown}
        >
          {selected ?? '신고 사유 선택'}
          <AngleDown alt='아래방향 화살표' />
        </label>

        {onDropdown && (
          <ul
            id='dropdown'
            className='text-gray4 p1 absolute rounded-b-[0.8rem] px-[1.6rem] pb-[0.8rem] bg-[#292A2E] top-full right-0 w-full flex flex-col gap-[0.4rem] border-t-0 border-[0.1rem] border-gray4 z-1'
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
