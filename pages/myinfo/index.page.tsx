import React, { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@utils/mergeStyle';

import { useDropdownStore } from '@stores/dropdownStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import useIsMobile from '@hooks/useIsMobile';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';

export default function MyInfo({ children }: { children: ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const { setSort } = useDropdownStore();
  const { userInfo } = useUserInfoStore();
  const isMobile = useIsMobile();

  const ACTIVE_CLASS = 'bg-gray600 rounded-xl text-white font-bold';

  const MyInfoLinkStyle = {
    base: 'hover:text-white',
    mobile: 'p-[1.8rem] w-[11.9rem] h-[5.1rem] flex justify-center items-center',
    desktop: 'p-7',
  };

  const MYINFO_LINKS = [
    { href: ROUTES.MY_INFO.MAIN, label: '내가 썼어요' },
    {
      href: ROUTES.MY_INFO.BOOK_MARK,
      label: '북마크',
      handleOnClick: () => {
        setSort('BOOKMARKED');
      },
    },
    { href: ROUTES.MY_INFO.ACCOUNT_DELETE, label: '회원탈퇴' },
  ];

  return (
    <div
      className={`${isMobile ? 'px-[1.6rem] flex flex-col' : 'grid grid-flow-col px-[20.3rem] py-[6.4rem] gap-[4.8rem] grid-cols-[21%,79%]'}`}
    >
      <section className='w-full'>
        <p className='st1 font-bold mb-[1.6rem]'>
          <span className='text-secondary400'>{userInfo.nickname || NO_USER_NAME}</span>님
        </p>
        <p className='p2 text-gray200'>{userInfo.email}</p>
        <ul
          className={`flex p1 text-gray200 mt-16 ${isMobile ? ' justify-between mb-[3.2rem]' : 'flex-col '}`}
        >
          {MYINFO_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={link.handleOnClick || undefined}
              className={cn(
                MyInfoLinkStyle.base,
                currentPath === link.href ? ACTIVE_CLASS : '',
                isMobile ? MyInfoLinkStyle.mobile : MyInfoLinkStyle.desktop,
              )}
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
