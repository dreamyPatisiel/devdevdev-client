import React, { useState, useRef } from 'react';

import { cn } from '@utils/mergeStyle';

import { useObserver } from '@hooks/useObserver';
import useTooltipHide from '@hooks/useTooltipHide';

import { COMMENT_TOOLTIP, COMMENT_TOOLTIP_VOTED } from '@/constants/CommentConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import Tooltip from '../tooltips/tooltip';

interface VisibilityPickToggleProp {
  isChecked: boolean;
  handleToggle: () => void;
  dataIsVoted: boolean;
}

export default function VisibilityPickToggle({
  isChecked,
  handleToggle,
  dataIsVoted,
}: VisibilityPickToggleProp) {
  const { isMobile } = useMediaQueryContext();
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [hasShownTooltip, setHasShownTooltip] = useState(false);
  const tooltipRef = useRef<null>(null);

  const handleTooltipIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasShownTooltip) {
        const initialMessage = dataIsVoted ? COMMENT_TOOLTIP : COMMENT_TOOLTIP_VOTED;
        setTooltipMessage(initialMessage);
        setHasShownTooltip(true);
      }
    });
  };

  useObserver({
    target: tooltipRef,
    onIntersect: handleTooltipIntersect,
    threshold: 0.8,
  });

  useTooltipHide({
    tooltipMessage,
    setTooltipMessage,
    dependencies: [tooltipMessage],
  });

  const mobileTooltipPosition = dataIsVoted ? 'right-[-12rem]' : 'right-[-8.5rem]';

  const handleToggleClick = () => {
    if (dataIsVoted) return;
    setTooltipMessage(COMMENT_TOOLTIP_VOTED);
  };

  return (
    <div className='relative' ref={tooltipRef}>
      <span className='text-c1 font-bold text-gray200'>
        <label
          htmlFor='myvote-check'
          className='inline-flex items-center cursor-pointer'
          onClick={handleToggleClick}
        >
          <input
            type='checkbox'
            id='myvote-check'
            value=''
            checked={isChecked}
            onChange={handleToggle}
            className='sr-only'
            disabled={!dataIsVoted}
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
              className={`absolute ${isMobile ? `top-[3rem] ${mobileTooltipPosition}` : 'top-[-0.4rem] right-[8rem]'}`}
            >
              <Tooltip
                variant='greenTt'
                direction={isMobile ? 'top' : 'right'}
                isVisible={tooltipMessage !== ''}
                className={isMobile ? 'top-[-0.4rem]' : ''}
              >
                {tooltipMessage}
              </Tooltip>
            </div>
            <div
              className={cn(
                `absolute top-[3.75px] right-[0.4rem] rounded-full h-5 w-5 transition-all ${isChecked ? 'bg-secondary500 translate-x-[-1.5rem]' : 'bg-gray300'}`,
              )}
            />
          </div>
        </label>
      </span>
    </div>
  );
}
