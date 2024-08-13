import React, { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUserInfoStore } from '@stores/userInfoStore';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';

export const MYINFO_LINKS = [
  { href: ROUTES.MY_INFO.MAIN, label: '내가 썼어요' },
  { href: ROUTES.MY_INFO.BOOK_MARK, label: '북마크' },
  { href: ROUTES.MY_INFO.ACCOUNT_DELETE, label: '회원탈퇴' },
];

export default function MyInfo({ children }: { children: ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const { userInfo } = useUserInfoStore();

  const ACTIVE_CLASS = 'bg-gray1 rounded-xl text-white font-bold';

  return (
    <div
      className='px-[20.3rem] py-[6.4rem] grid grid-flow-col gap-[4.8rem]'
      style={{ gridTemplateColumns: '21% 79%' }}
    >
      <section className='w-full'>
        <p className='st1 font-bold mb-[1.6rem]'>
          <span className='text-point1'>{userInfo.nickname || NO_USER_NAME}</span>님
        </p>
        <p className='p2 text-gray4'>{userInfo.email}</p>
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
