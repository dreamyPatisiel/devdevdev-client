import { useState } from 'react';
import angleDown from '@public/image/angle-down.svg';
import Image from 'next/image';

export default function Dropdown() {
  const dropdownMenu = ['인기순', '최신순', '댓글 많은 순'];
  const [onDropdown, setDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(dropdownMenu[0]);

  const handleDropdown = () => {
    setDropdown(!onDropdown);
  };

  const handleSelected = (value: string) => {
    setSelected(value);
    setDropdown(false);
  };

  return (
    <div className=''>
      <button
        className='rounded-[0.4rem] bg-[#292A2E] w-[9rem] flex justify-between items-center relative px-4 py-[0.4rem] '
        onClick={handleDropdown}
      >
        <label htmlFor='dropdown' className=' text-gray5 text-c1 leadin=[2.4rem]'>
          {selected}
        </label>
        <Image src={angleDown} alt='아래방향 화살표' />
      </button>
      {onDropdown && (
        <ul
          id='dropdown'
          className='text-gray4 text-c1 absolute rounded-[0.4rem] px-4 py-[0.8rem] bg-[#292A2E] top-[10.7rem] right-[10rem] w-[9rem] flex flex-col gap-[0.4rem]'
        >
          {dropdownMenu.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleSelected(menu)}
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
