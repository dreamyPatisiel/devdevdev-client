import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';

import DevLogo from '@public/image/devdevdevLogo.svg';
import HeaderBar from '@public/image/loading/headerBars.svg';

import { ROUTES } from '@/constants/routes';

export default function MobileHeader() {
  const queryClient = useQueryClient();

  const { MAIN, PICKPICKPICK, TECH_BLOG, MY_INFO } = ROUTES;

  const { loginStatus } = useLoginStatusStore();
  const { setSearchKeyword } = useSearchKeywordStore();
  const { setCompanyId } = useCompanyIdStore();
  const { setSort } = useDropdownStore();

  const handleClickLogo = () => {
    queryClient.invalidateQueries({ queryKey: ['pickData'] });
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    setCompanyId(undefined);
    setSort('LATEST');
  };

  return (
    <header className='h-[16.3rem]'>
      <div className='flex flex-col bg-gray1 border-b border-b-gray5 fixed w-full z-40'>
        <div className='flex justify-between px-[1.6rem] py-[1.2rem]'>
          <Link href={MAIN} aria-label='메인' onClick={handleClickLogo}>
            <Image src={DevLogo} alt='DEVDEVDEV 로고' />
          </Link>
          {/* <Image src={HeaderBar} alt='바 로고' /> */}
        </div>

        <nav className='p-[1.6rem] p1 font-bold'>
          <ul className='flex gap-[4.8rem]'>
            <li>
              <Link
                href={PICKPICKPICK}
                onClick={() => queryClient.invalidateQueries({ queryKey: ['pickData'] })}
              >
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
                <Link href={`${MY_INFO}/mypick`}>내정보 🧀</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
