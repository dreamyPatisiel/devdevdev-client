import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import DevLogo from '@public/image/devdevdevLogo.svg';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userInfo } = useUserInfoStore();
  const { openModal } = useLoginModalStore();
  const { loginStatus, setLoginStatus, setLogoutStatus } = useLoginStatusStore();
  const { setSearchKeyword } = useSearchKeywordStore();
  const { setCompanyId } = useCompanyIdStore();
  const { setSort } = useDropdownStore();

  useEffect(() => {
    if (userInfo?.accessToken) {
      setLoginStatus();
    } else {
      setLogoutStatus();
    }

    queryClient.invalidateQueries({ queryKey: ['pickData'] });
  }, [userInfo, queryClient, setLoginStatus, setLogoutStatus]);

  const handleClickLogo = () => {
    queryClient.invalidateQueries({ queryKey: ['pickData'] });
    router.push(ROUTES.MAIN);
  };

  const handleClickMyinfo = (tabName: string): void => {
    if (loginStatus === 'login') {
      router.push(`/${tabName}/mypick`);
    } else {
      openModal();
    }
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    setCompanyId(undefined);
    setSort('LATEST');
  };

  return (
    <>
      <header
        className='bg-gray1 w-full flex flex-row justify-between items-center px-[9.8rem] py-[1.2rem] text-p1'
        style={{
          borderBottom: '1px solid #DEE5ED',
        }}
      >
        <Image
          src={DevLogo}
          priority
          alt='devdevdev로고'
          className='cursor-pointer'
          onClick={handleClickLogo}
        />
        <ul className='text-white flex flex-row items-center gap-[4.8rem] font-bold'>
          <li>
            <Link
              href='/pickpickpick'
              onClick={() => queryClient.invalidateQueries({ queryKey: ['pickData'] })}
            >
              픽픽픽 💘
            </Link>
          </li>
          <li>
            <Link href='/techblog' onClick={refreshTechArticleParams}>
              기술블로그 🧪
            </Link>
          </li>

          {loginStatus === 'login' && (
            <>
              <li>
                <button onClick={() => handleClickMyinfo('myinfo')}>내정보 🧀</button>
              </li>
              <li className='leading-[4.8rem]'>
                <span className='text-center text-point1 '>
                  {userInfo.nickname || NO_USER_NAME}
                </span>
                님
              </li>
            </>
          )}

          <li>
            <button
              className='bg-primary1 text-center px-[2rem] py-[1.2rem] rounded-full'
              onClick={openModal}
            >
              {loginStatus === 'login' ? '로그아웃' : '로그인'}
            </button>
          </li>
        </ul>
      </header>
    </>
  );
}
