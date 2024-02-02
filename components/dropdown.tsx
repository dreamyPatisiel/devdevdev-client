import { useState } from 'react';
import angleDown from '@public/image/angle-down.svg';
import Image from 'next/image';

export default function Dropdown() {
  const [onDropdown, setDropdown] = useState<boolean>(false);
  const handleDropdown = () => {
    setDropdown(!onDropdown);
  };
  return (
    <div className=''>
      <button
        className='rounded-[0.4rem] bg-[#292A2E] w-[9rem] flex justify-between items-center relative px-4 py-[0.4rem] '
        onClick={handleDropdown}
      >
        <label htmlFor='dropdown' className='text-[#B4BFCE] text-c1 leadin=[2.4rem]'>
          {'인기순'}
        </label>
        <Image src={angleDown} alt='아래 화살표' />
      </button>
      {onDropdown && (
        <ul
          id='dropdown'
          className='text-gray4 text-c1 absolute rounded-[0.4rem] px-4 py-[0.8rem] bg-[#292A2E] top-[10.7rem] right-[10rem] w-[9rem] flex flex-col gap-[0.4rem]'
        >
          <li>인기순</li>
          <li>최신순</li>
          <li>댓글 많은 순</li>
        </ul>
      )}
    </div>
  );
}
