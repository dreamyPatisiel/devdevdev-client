import React, { ReactNode, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@utils/mergeStyle';

import { useDropdownStore } from '@stores/dropdownStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import DevGuriError from '@components/common/error/DevGuriError';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import pencilIcon from '@/public/image/myInfo/pencil_level1.svg';
import { UserInfoType } from '@/types/userInfoType';

import { useNicknameModals } from './hooks/useNicknameModals';

export default function MyInfo({ children }: { children: ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const { setSort } = useDropdownStore();
  const { userInfo } = useUserInfoStore();

  const { handleNicknameEditClick } = useNicknameModals();

  const { isMobile } = useMediaQueryContext();

  const [clientUserInfo, setClientUserInfo] = useState<UserInfoType>();

  useEffect(() => {
    setClientUserInfo(userInfo);
  }, []);

  const ACTIVE_CLASS = 'bg-gray600 rounded-xl text-white font-bold';

  const MyInfoLinkStyle = {
    base: 'hover:text-white',
    mobile: 'px-[2rem] py-[1.6rem] flex justify-center items-center shrink-0',
    desktop: 'p-7',
  };

  const MYINFO_LINKS = [
    {
      href: ROUTES.MY_INFO.MY_WRITING_PREFIX,
      label: '내가 썼어요',
      startHref: ROUTES.MY_INFO.MY_WRITING_PREFIX,
    },
    {
      href: ROUTES.MY_INFO.BOOK_MARK,
      label: '북마크',
      handleOnClick: () => {
        setSort('BOOKMARKED');
      },
      startHref: ROUTES.MY_INFO.BOOK_MARK,
    },
    {
      href: ROUTES.MY_INFO.NOTIFICATIONS,
      label: '알림',
      startHref: ROUTES.MY_INFO.NOTIFICATIONS,
    },
    {
      href: ROUTES.MY_INFO.ACCOUNT_DELETE,
      label: '회원탈퇴',
      startHref: ROUTES.MY_INFO.ACCOUNT_DELETE,
    },
  ];

  return (
    <div
      className={`${isMobile ? 'px-[1.6rem] flex flex-col' : 'grid grid-flow-col px-[20.3rem] py-[6.4rem] gap-[4.8rem] grid-cols-[21.5rem,auto]'}`}
    >
      <section className='w-full'>
        <div className='flex gap-[1rem] items-center mb-[1.6rem]'>
          <p className='st1 font-bold'>
            <span className='text-secondary400'>{clientUserInfo?.nickname || NO_USER_NAME}</span>님
          </p>
          <button type='button' onClick={handleNicknameEditClick}>
            <Image src={pencilIcon} alt='연필 아이콘' />
          </button>
        </div>
        <p className='p2 text-gray200'>{clientUserInfo?.email}</p>
        <ul
          className={`flex p1 text-gray200 mt-16 ${isMobile ? 'mb-[3.2rem] overflow-x-scroll scrollbar-hide' : 'flex-col'}`}
        >
          {MYINFO_LINKS.map((link, index) => (
            <li
              key={index}
              className={cn(
                MyInfoLinkStyle.base,
                currentPath.startsWith(link.startHref) ? ACTIVE_CLASS : '',
                isMobile ? MyInfoLinkStyle.mobile : MyInfoLinkStyle.desktop,
              )}
            >
              <Link href={link.href} onClick={link.handleOnClick || undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <QueryErrorBoundary
        fallbackRender={({ handleRetryClick }) => (
          <DevGuriError type='network' handleRetryClick={handleRetryClick} />
        )}
      >
        <section className='w-full'>{children}</section>
      </QueryErrorBoundary>
    </div>
  );
}
