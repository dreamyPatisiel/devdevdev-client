import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { usePickDropdownStore, useTechblogDropdownStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import DevLogo from '@public/image/devdevdevLogo.svg';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  const queryClient = useQueryClient();

  const { MAIN, PICKPICKPICK, TECH_BLOG, MY_INFO } = ROUTES;

  const { userInfo } = useUserInfoStore();
  const { openLoginModal } = useLoginModalStore();
  const { loginStatus, setLoginStatus, setLogoutStatus } = useLoginStatusStore();
  const { setSearchKeyword } = useSearchKeywordStore();
  const { setCompanyId } = useCompanyIdStore();
  const { setSort: setPickSort } = usePickDropdownStore();
  const { setSort: setTechblogSort } = useTechblogDropdownStore();

  useEffect(() => {
    if (userInfo?.accessToken) {
      setLoginStatus();
    } else {
      setLogoutStatus();
    }

    queryClient.invalidateQueries({ queryKey: ['pickData'] });
  }, [userInfo, queryClient, setLoginStatus, setLogoutStatus]);

  const invalidPickQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['pickData'] });
    setPickSort('POPULAR');
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    setCompanyId(undefined);
    queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
    setTechblogSort('LATEST');
  };

  return (
    <header className='h-[7.2rem]'>
      <div className='bg-gray1 w-full flex flex-row justify-between items-center px-[9.8rem] py-[1.2rem] p1 fixed z-40 border border-gray200'>
        <Link href={MAIN} aria-label='메인' onClick={invalidPickQuery}>
          <Image src={DevLogo} priority alt='DEVDEVDEV 로고' className='cursor-pointer' />
        </Link>

        <ul className='text-white flex flex-row items-center gap-[4.8rem] font-bold'>
          <li>
            <Link href={PICKPICKPICK.MAIN} onClick={invalidPickQuery}>
              픽픽픽 💘
            </Link>
          </li>
          <li>
            <Link href={TECH_BLOG} onClick={refreshTechArticleParams}>
              기술블로그 🧪
            </Link>
          </li>

          {loginStatus === 'login' && (
            <>
              <li>
                <Link href={MY_INFO.MAIN}>내정보 🧀</Link>
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
