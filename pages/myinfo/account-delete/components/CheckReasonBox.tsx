import { useState } from 'react';

import Image from 'next/image';

import { useSurveyListStore } from '@stores/accountDeleteStore';

import { ValidationMessage } from '@components/common/validationMessage';

import checkCircle from '@public/image/myInfo/check-circle.svg';
import nonCheckCircle from '@public/image/myInfo/circle.svg';

interface CheckReasonBoxProps {
  id: string;
  reason: string;
  content: string;
}

export default function CheckReasonBox({ id, reason, content }: CheckReasonBoxProps) {
  const {
    checkedSurveyList,
    setCheckedSurveyList,
    setUncheckedSurveyList,
    reasonContents,
    setReasonContents,
  } = useSurveyListStore();
  const [checked, setChecked] = useState(checkedSurveyList.includes(id) ?? false);

  const handleCheckboxChange = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;

      if (newChecked) {
        setCheckedSurveyList(id);
      } else {
        setUncheckedSurveyList(id);
      }

      return newChecked;
    });
  };

  return (
    <label
      htmlFor={id}
      className={`border border-gray2 rounded-[1.2rem] p-[2.4rem] ${checked && 'border-point1 bg-gray1'} cursor-pointer select-none`}
    >
      <input type='checkbox' id={id} onChange={handleCheckboxChange} className='hidden' />
      <span className={`p1 text-gray4 flex gap-[1.6rem] ${checked && 'text-white'} `}>
        {checked ? (
          <Image src={checkCircle} alt='체크된 체크박스' />
        ) : (
          <Image src={nonCheckCircle} alt='체크되지 않은 체크박스' />
        )}
        {reason}
      </span>
      {content != null && checked && (
        <>
          <textarea
            placeholder={content}
            className='bg-black p-[2.4rem] w-full rounded-[1.2rem] resize-none outline-none p2 placeholder:text-gray4 mt-[2.4rem]'
            onChange={(e) => setReasonContents(e.target.value)}
          />
          {reasonContents.length < 10 && <ValidationMessage message={'내용을 작성해주세요'} />}
        </>
      )}
    </label>
  );
}
