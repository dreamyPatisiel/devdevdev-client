import { useState } from 'react';
import AngleDown from '@public/image/angle-down.svg';

export default function Dropdown({ dropdownMenu }: { dropdownMenu: string[] }) {
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
