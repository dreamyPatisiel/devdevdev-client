import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import DevLogo from '@public/image/devdevdevLogo.svg';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';
import { handleLinkClick, isActive } from '@utils/headerUtils';
import { MENU_LISTS } from '@/constants/NavListConstants';


export default function Header() {
  const router = useRouter();
  const { pathname } = router;
  const queryClient = useQueryClient();

  const { MAIN, MY_INFO } = ROUTES;

  const { userInfo } = useUserInfoStore();
  const { openLoginModal } = useLoginModalStore();
  const { loginStatus, setLoginStatus, setLogoutStatus } = useLoginStatusStore();
 
  useEffect(() => {
    if (userInfo?.accessToken) {
      setLoginStatus();
    } else {
      setLogoutStatus();
    }

    queryClient.invalidateQueries({ queryKey: ['pickData'] });
  }, [userInfo, queryClient, setLoginStatus, setLogoutStatus]);



  return (
    <header className='h-[7.2rem]'>
      <div className='bg-gray600 w-full flex flex-row justify-between items-center px-[9.8rem] py-[1.2rem] p1 fixed z-40 border-b border-b-gray200'>
        <Link href={MAIN} aria-label='메인' onClick={() => handleLinkClick(MAIN, queryClient)}>
          <Image src={DevLogo} priority alt='DEVDEVDEV 로고' className='cursor-pointer' />
        </Link>

        <ul className='text-white flex flex-row items-center gap-[4.8rem] font-bold'>
          {MENU_LISTS.map((list) => (
            <li key={list.key} className='relative px-[2rem] py-[1rem] rounded-full'>
              {isActive(list.route, pathname) && (
                <div className='absolute inset-0 bg-[#000000] opacity-50 rounded-full'></div>
              )}
              <Link
                href={list.route}
                onClick={() => handleLinkClick(list.route, queryClient)}
                className='relative z-10 text-white'
              >
                {list.label}
              </Link>
            </li>
          ))}

          {loginStatus === 'login' && (
            <>
              <li className='relative px-[2rem] py-[1rem] rounded-full'>
                {isActive(MY_INFO.MAIN, pathname) && (
                  <div className='absolute inset-0 bg-[#000000] opacity-50 rounded-full'></div>
                )}
                <Link
                  href={MY_INFO.MAIN}
                  onClick={() => handleLinkClick(MY_INFO.MAIN, queryClient)}
                  className='relative z-10 text-white'
                >
                  내정보 🧀
                </Link>
              </li>
              <li className='leading-[4.8rem]'>
                <span className='text-center text-secondary400 '>
                  {userInfo.nickname || NO_USER_NAME}
                </span>
                님
              </li>
            </>
          )}

          <li>
            <button
              className='bg-primary500 text-center px-[2rem] py-[1.2rem] rounded-full'
              onClick={openLoginModal}
              type='button'
            >
              {loginStatus === 'login' ? '로그아웃' : '로그인'}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
