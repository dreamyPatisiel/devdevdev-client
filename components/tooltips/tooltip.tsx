import React, { useEffect, useState } from 'react';

export type PositionType = 'right' | 'left' | 'top' | 'bottom';

export default function Tooltip({ text, position }: { text: string; position: PositionType }) {
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
    <div className='relative'>
      <div className='bg-gray2 text-c1 text-point1 px-[1.3rem] py-[0.5rem] rounded-[0.8rem]'>
        {text}
      </div>
      <div className={`absolute  bg-gray2 w-3 h-3 transform rotate-45 ${tailStyle}`} />
    </div>
  );
}
