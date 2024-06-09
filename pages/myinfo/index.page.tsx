import React, { ReactNode, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import getUserInfoFromLocalStorage from '@utils/getUserInfo';

import { UserInfoType } from '@/types/userInfoType';

export const MYINFO_LINKS = [
  { href: '/myinfo/mypick', label: '내가 썼어요' },
  { href: '/myinfo/bookmark', label: '북마크' },
  { href: '/myinfo/account-delete', label: '회원탈퇴' },
];

export default function MyInfo({ children }: { children: ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const ACTIVE_CLASS = 'bg-gray1 rounded-xl text-white font-bold';

  const [userInfoObj, setUserInfoObj] = useState<UserInfoType>({
    accessToken: '',
    nickname: '',
    email: '',
  });

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();

    if (userInfo) {
      const USER_EMAIL = userInfo.email;
      const USER_NICKNAME = userInfo.nickname;
      const USER_ACCESS_TOKEN = userInfo.accessToken;

      setUserInfoObj({
        email: USER_EMAIL,
        nickname: USER_NICKNAME,
        accessToken: USER_ACCESS_TOKEN,
      });
    }
  }, []);

  return (
    <div
      className='px-[20.3rem] py-[6.4rem] grid grid-flow-col gap-[4.8rem]'
      style={{ gridTemplateColumns: '21% 79%' }}
    >
      <section className='w-full'>
        <p className='st1 font-bold mb-[1.6rem]'>
          <span className='text-point1'>{userInfoObj.nickname}</span>님
        </p>
        <p className='p2 text-gray4'>{userInfoObj.email}</p>
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
