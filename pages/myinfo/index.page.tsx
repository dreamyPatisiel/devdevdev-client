import React, { ReactNode } from 'react';

import Link from 'next/link';

export default function Index({ children }: { children: ReactNode }) {
  return (
    <div
      className='px-[20.3rem] py-[6.4rem] grid grid-flow-col gap-[4.8rem]'
      style={{ gridTemplateColumns: '22% 78%' }}
    >
      <section className='w-full'>
        <p className='st1 text-bold mb-[1.6rem]'>
          <span className='text-point1'>게으른 댑댑이</span>님
        </p>
        <p className='p2 text-gray4'> dreaming_turlte@gmail.com </p>
        <ul className='flex flex-col p1 text-gray4 mt-16'>
          <Link href='/myinfo/mypost' className='p-7 hover:text-gray5'>
            내가 썼어요
          </Link>
          <Link href='/myinfo/bookmark' className='p-7 hover:text-gray5'>
            북마크
          </Link>
          <Link href='/myinfo/quit' className='p-7 hover:text-gray5'>
            회원탈퇴
          </Link>
        </ul>
      </section>
      <section className='w-full'>{children}</section>
    </div>
  );
}
