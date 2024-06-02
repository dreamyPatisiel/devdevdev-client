import { useState } from 'react';

import Image from 'next/image';

import checkCircle from '@public/image/myInfo/check-circle.svg';
import nonCheckCircle from '@public/image/myInfo/circle.svg';

export default function CheckReasonBox({ id, reason }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    console.log('id', id);
    setChecked(!checked);
  };
  return (
    <label
      htmlFor={id}
      className={`border border-gray2 rounded-[1.2rem] p-[2.4rem] ${checked && 'border-point1 bg-gray1'}`}
    >
      <input type='checkbox' id={id} onChange={handleCheckboxChange} />
      <span className={`p1 text-gray4 flex gap-[1.6rem] ${checked && 'text-white'} `}>
        {checked ? (
          <Image src={checkCircle} alt='체크된 체크박스' />
        ) : (
          <Image src={nonCheckCircle} alt='체크되지 않은 체크박스' />
        )}
        {reason}
      </span>
    </label>
  );
}
