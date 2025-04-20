import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { isActive } from '@utils/headerUtils';

import { useLoginStatusStore } from '@stores/loginStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import useHandleLinkClick from '@hooks/useHandleNavClick';

import LogoutIcon from '@public/image/LogoutIcon.svg';
import DevLogo from '@public/image/devdevdevLogo.svg';

import { MENU_LISTS } from '@/constants/NavListConstants';
import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';

import AlertBellNav from '../alertBell/AlertBellNav';
import { MainButtonV2 } from '../buttons/mainButtonsV2';

export default function MobileHeader() {
  const router = useRouter();
  const { pathname } = router;
  const { MAIN, MY_INFO } = ROUTES;

  const { openLoginModal } = useLoginModalStore();

  const { userInfo } = useUserInfoStore();
  const { loginStatus, setLoginStatus, setLogoutStatus } = useLoginStatusStore();
  const { isVisibleFullPopup } = useFullPopupVisibleStore();

  const { handleRefreshLinkClick } = useHandleLinkClick();

  const MENU_ITEM_CLASSES = 'relative px-[1.4rem] py-[0.6rem] rounded-full';
  const ACTIVE_MENU_BACKGROUND = 'absolute inset-0 bg-[#000000] opacity-50 rounded-full';

  useEffect(() => {
    if (userInfo?.accessToken) {
      setLoginStatus();
    } else {
      setLogoutStatus();
    }
  }, [userInfo, setLoginStatus, setLogoutStatus]);

  return (
    <header className={`${isVisibleFullPopup ? 'h-[5.2rem]' : 'h-[9rem]'}`}>
      <div
        className={`flex flex-col bg-gray600 fixed w-full z-40 ${isVisibleFullPopup ? '' : 'border-b border-b-gray200'}`}
      >
        <div className='flex justify-between px-[1.2rem] py-[1rem] gap-[1.6rem]'>
          <Link href={MAIN} aria-label='메인' className='flex-shrink-0'>
            <Image src={DevLogo} alt='DEVDEVDEV 로고' width={64} height={23} />
          </Link>
          <div className='flex gap-[1.6rem]'>
            {loginStatus === 'login' ? (
              <>
                <AlertBellNav className='ml-[1rem] flex-shrink-0' />
                <button type='button' onClick={openLoginModal} className='flex-shrink-0'>
                  <Image src={LogoutIcon} alt='로그아웃 아이콘' width={40} />
                </button>
              </>
            ) : (
              // TODO: 메인버튼 text크기 props 생기면 p2로 수정해야함
              <MainButtonV2
                onClick={openLoginModal}
                text={'로그인'}
                type='button'
                color='primary'
                line={false}
                radius='rounded'
                size='xSmall'
              />
            )}
          </div>
        </div>

        {!isVisibleFullPopup && (
          <nav className='px-[1.6rem] py-[0.9rem] p2 font-bold'>
            <ul className='flex gap-[1.4rem]'>
              {MENU_LISTS.map((list) => (
                <li key={list.key} className={MENU_ITEM_CLASSES}>
                  {isActive(list.route, pathname) && <div className={ACTIVE_MENU_BACKGROUND}></div>}
                  <Link
                    href={list.route}
                    onClick={() => handleRefreshLinkClick(list.route)}
                    className='relative z-10 text-white'
                  >
                    {list.label}
                  </Link>
                </li>
              ))}

              {loginStatus === 'login' && (
                <li className={MENU_ITEM_CLASSES}>
                  {isActive('/myinfo', pathname) && <div className={ACTIVE_MENU_BACKGROUND}></div>}
                  <Link
                    href={`${MY_INFO.MAIN}/`}
                    onClick={() => handleRefreshLinkClick(MY_INFO.PREFIX)}
                    className='relative z-10 text-white'
                  >
                    내정보 🧀
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
