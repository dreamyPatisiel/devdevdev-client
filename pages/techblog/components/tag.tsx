import React from 'react';

export function Tag({ text }: { text: string }) {
  return (
    <li className='text-point1 text-c1 border border-solid border-point1 rounded-full px-[0.9rem] py-[0.5rem]'>
      {text}
    </li>
  );
}
