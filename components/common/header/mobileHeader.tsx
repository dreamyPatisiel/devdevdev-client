import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import {
  useDropdownStore,
  usePickDropdownStore,
  useTechblogDropdownStore,
} from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import DevLogo from '@public/image/devdevdevLogo.svg';
import HeaderBar from '@public/image/loading/headerBars.svg';
import logoutIcon from '@public/image/right-from-bracket.svg';
import loginIcon from '@public/image/right-to-bracket.svg';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';

export default function MobileHeader() {
  const queryClient = useQueryClient();

  const { MAIN, PICKPICKPICK, TECH_BLOG, MY_INFO } = ROUTES;

  const { loginStatus } = useLoginStatusStore();
  const { setSearchKeyword } = useSearchKeywordStore();
  const { setCompanyId } = useCompanyIdStore();
  const { openLoginModal } = useLoginModalStore();
  const { userInfo } = useUserInfoStore();
  const { setSort: setPickSort } = usePickDropdownStore();
  const { setSort: setTechblogSort } = useTechblogDropdownStore();

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

  const loginStatusButton = (loginStatus: 'login' | 'logout' | 'loading' | 'account-delete') => {
    const statusName =
      loginStatus === 'login' ? (
        <span className='text-secondary400'>{userInfo.nickname || NO_USER_NAME}님</span>
      ) : (
        <span>로그인</span>
      );

    const icon = loginStatus === 'login' ? logoutIcon : loginIcon;

    return (
      <button
        onClick={openLoginModal}
        type='button'
        className='p1 text-gray5 font-bold flex items-center gap-[1rem]'
      >
        {statusName}
        <Image src={icon} alt={`${statusName}아이콘`} width={16} height={13} />
      </button>
    );
  };

  return (
    <header className='h-[9rem]'>
      <div className='flex flex-col bg-gray1 border-b border-b-gray5 fixed w-full z-40'>
        <div className='flex justify-between px-[1.6rem] py-[1.2rem]'>
          <Link href={MAIN} aria-label='메인' onClick={invalidPickQuery}>
            <Image src={DevLogo} alt='DEVDEVDEV 로고' width={64} height={23} />
          </Link>
          {/* <Image src={HeaderBar} alt='바 로고' /> */}

          {loginStatusButton(loginStatus)}
        </div>

        <nav className='px-[1.6rem] py-[0.9rem] p2 font-bold'>
          <ul className='flex gap-[4.8rem]'>
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
              <li>
                <Link href={MY_INFO.MAIN}>내정보 🧀</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
