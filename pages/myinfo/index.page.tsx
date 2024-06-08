import React, { ReactNode, useEffect, useState } from 'react';

import Link from 'next/link';

import { UserInfoType } from '@/types/userInfoType';

export default function Index({ children }: { children: ReactNode }) {
  const [userInfoObj, setUserInfoObj] = useState<UserInfoType>({
    accessToken: '',
    nickname: '',
    email: '',
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj: UserInfoType = JSON.parse(userInfo);
      const USER_EMAIL = userInfoObj.email;
      const USER_NICKNAME = userInfoObj.nickname;
      const USER_ACCESS_TOKEN = userInfoObj.accessToken;

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
      style={{ gridTemplateColumns: '22% 78%' }}
    >
      <section className='w-full'>
        <p className='st1 font-bold mb-[1.6rem]'>
          <span className='text-point1'>{userInfoObj.nickname}</span>님
        </p>
        <p className='p2 text-gray4'>{userInfoObj.email}</p>
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
