import React, { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import { useVotedStore } from '@stores/votedStore';

import useTooltipHide from '@hooks/useTooltipHide';

import { COMMENT_TOOLTIP_VOTED } from '@/constants/CommentConstants';

import Tooltip from '../tooltips/tooltip';

interface VisibilityPickToggleProp {
  isChecked: boolean;
  handleToggle: () => void;
}

export default function VisibilityPickToggle({
  isChecked,
  handleToggle,
}: VisibilityPickToggleProp) {
  // TODO: 투표여부 관련 상태값이 많아 확인필요 . 이값은 아닌것같음..
  const { isVoted } = useVotedStore();
  const [tooltipMessage, setTooltipMessage] = useState(isVoted ? COMMENT_TOOLTIP_VOTED : '');

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

      <span className='text-c1 font-bold text-gray200'>
        <label htmlFor='myvote-check' className='inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            id='myvote-check'
            value=''
            checked={isChecked}
            onChange={handleToggle}
            className='sr-only'
          />
          <span
            className={`text-gray200 c1 font-bold flex mr-3 ${isChecked ? 'text-secondary300' : ''}`}
          >
            {isChecked ? '픽픽픽 공개' : '픽픽픽 비공개'}
          </span>
          <div
            className={`relative w-[3.6rem] h-8 bg-black marker:bg-black rounded-full transition-all`}
          >
            <div
              className={cn(
                `absolute top-[3.75px] right-[0.4rem] rounded-full h-5 w-5 transition-all ${isChecked ? 'bg-secondary500 translate-x-[-1.5rem]' : 'bg-gray300'}`,
              )}
            ></div>
          </div>
        </label>
      </span>
    </div>
  );
}
