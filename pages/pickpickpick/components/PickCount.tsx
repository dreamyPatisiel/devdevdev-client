import React from 'react';

interface PickCountProps {
  count?: number;
  className?: string;
}

export const PickCount = ({ count = 1, className = '' }: PickCountProps) => {
  return (
    <p className={`p1 text-gray50 ${className}`}>
      총 <span className='text-secondary500 font-bold'>{count}</span>건
    </p>
  );
};
