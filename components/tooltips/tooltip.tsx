import React, { useEffect, useState } from 'react';

export type PositionType = 'right' | 'left' | 'top' | 'bottom';

export default function Tooltip({
  text,
  position,
  bgColor,
  textColor,
}: {
  text: string;
  position: PositionType;
  bgColor: string;
  textColor?: string;
}) {
  const [tailStyle, setTailStyle] = useState('');

  useEffect(() => {
    switch (position) {
      case 'right':
        setTailStyle('-right-[0.4rem] top-[0.9rem]');
        break;
      case 'left':
        setTailStyle('-left-[0.4rem] top-[0.9rem]');
        break;
      case 'top':
        setTailStyle('left-[50%] -top-[0.4rem]');

        break;
      case 'bottom':
        setTailStyle('left-[50%] -bottom-[0.4rem]');

        break;
      default:
        break;
    }
  }, [position]);

  return (
    <div className='relative select-none'>
      <div
        style={{ backgroundColor: `var(--${bgColor}` }}
        className={`absolute  bg-gray2 w-3 h-3 transform rotate-45 ${tailStyle}`}
      />
      <div
        style={{
          color: `${textColor ? `var(--${textColor})` : 'black'}`,
          backgroundColor: `var(--${bgColor}`,
        }}
        className='c1 px-[1.3rem] py-[0.5rem] rounded-[0.8rem] font-bold'
      >
        {text}
      </div>
    </div>
  );
}
