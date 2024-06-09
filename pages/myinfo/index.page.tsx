import React, { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

export const MYINFO_LINKS = [
  { href: '/myinfo/mypick', label: '내가 썼어요' },
  { href: '/myinfo/bookmark', label: '북마크' },
  { href: '/myinfo/account-delete', label: '회원탈퇴' },
];

export default function MyInfo({ children }: { children: ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const ACTIVE_CLASS = 'bg-gray1 rounded-xl text-white font-bold';

  return (
    <div
      className='px-[20.3rem] py-[6.4rem] grid grid-flow-col gap-[4.8rem]'
      style={{ gridTemplateColumns: '21% 79%' }}
    >
      <section className='w-full'>
        <p className='st1 text-bold mb-[1.6rem]'>
          <span className='text-point1'>게으른 댑댑이</span>님
        </p>
        <p className='p2 text-gray4'> dreaming_turlte@gmail.com </p>
        <ul className='flex flex-col p1 text-gray4 mt-16'>
          {MYINFO_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`p-7 hover:text-white ${currentPath === link.href ? ACTIVE_CLASS : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </section>
      <section className='w-full'>{children}</section>
    </div>
  );
}
