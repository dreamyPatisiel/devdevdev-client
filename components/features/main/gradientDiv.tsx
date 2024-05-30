import React from 'react';

export default function GradientDiv() {
  return (
    <div
      className='absolute bottom-0 w-full h-full pointer-events-none'
      style={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 85%, rgba(0, 0, 0, 1) 100%)`,
      }}
    ></div>
  );
}
