import React, { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import useTooltipHide from '@hooks/useTooltipHide';

import Tooltip from '../tooltips/tooltip';

export default function VisibilityPickToggle() {
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  useTooltipHide({
    tooltipMessage,
    setTooltipMessage,
    dependencies: [tooltipMessage],
  });

  return (
    <div className='relative'>
      <div className='absolute top-[-0.4rem] right-[8.3rem]'>
        <Tooltip variant='greenTt' direction='right' isVisible={tooltipMessage !== ''}>
          {tooltipMessage}
        </Tooltip>
      </div>

      <span className='text-c1 font-bold text-gray5'>
        <label htmlFor='myvote-check' className='inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            id='myvote-check'
            value=''
            checked={isChecked}
            onChange={handleToggle}
            className='sr-only'
          />
          <span className={`text-gray4 c1 font-bold flex mr-3 ${isChecked ? 'text-point3' : ''}`}>
            {isChecked ? '픽픽픽 공개' : '픽픽픽 비공개'}
          </span>
          <div
            className={`relative w-[3.6rem] h-8 bg-black marker:bg-black rounded-full transition-all`}
          >
            <div
              className={cn(
                `absolute top-[3px] right-[0.4rem] rounded-full h-5 w-5 transition-all ${isChecked ? 'bg-point3 translate-x-[-1.5rem]' : 'bg-gray4'}`,
              )}
            ></div>
          </div>
        </label>
      </span>
    </div>
  );
}
