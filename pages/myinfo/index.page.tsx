import React, { ReactNode, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@utils/mergeStyle';
import { getRandomNumberOfThree } from '@utils/randomNumber';

import { useDropdownStore } from '@stores/dropdownStore';
import { useModalStore } from '@stores/modalStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import DevGuriError from '@components/common/error/DevGuriError';
import {
  MYINFO_NICKNAME_COMPLELTE_MODAL,
  MYINFO_NICKNAME_EDIT_MODAL,
  MYINFO_NICKNAME_RESULT_10_MODAL,
  MYINFO_NICKNAME_RESULT_20_MODAL,
  MYINFO_NICKNAME_RESULT_MODAL,
} from '@components/common/modals/modalConfig/myInfoNickname';

import {
  NICKNAME_MODAL_FIRST_OVER_COUNT,
  NICKNAME_MODAL_SECOND_OVER_COUNT,
  NO_USER_NAME,
} from '@/constants/UserInfoConstants';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import pencilIcon from '@/public/image/myInfo/pencil_level4.svg';
import { UserInfoType } from '@/types/userInfoType';

import NicknameResultModal from './components/NicknameResultModal';

export default function MyInfo({ children }: { children: ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const { setSort } = useDropdownStore();
  const { userInfo } = useUserInfoStore();
  const { pushModal, popModal } = useModalStore();

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

  const pushNicknameResult20Modal = (count: number) => {
    const nextCount = count + 1;

    const randomTitles = [
      '이제 진짜 마지막이에요… {nickname}, 더는 못 바꿔드려요!',
      '하… 정말 끈질기시네… {nickname}, 이거면 됐죠?',
      '이제 그만!! 후우... 이건 어때요? {nickname}',
    ];

    popModal();
    pushModal({
      ...MYINFO_NICKNAME_RESULT_20_MODAL,
      contents: (
        <NicknameResultModal
          count={count}
          title={randomTitles[getRandomNumberOfThree()]}
          contents={MYINFO_NICKNAME_RESULT_20_MODAL.contents}
        />
      ),
      submitFunction: () => pushCompleteModal(),
      cancelFunction: () => pushNicknameResult20Modal(nextCount),
    });
  };

  const pushNicknameResult10Modal = (count: number) => {
    const nextCount = count + 1;

    const randomTitles = [
      '으음~ 조금 까다로우시네 {nickname} 이건 만족하시죠?',
      '하아… 많이 고민했어요… {nickname} 이 정도 퀄리티면 인정 아닌가요?',
      '허허… 쉽지 않았습니다… 하지만 {nickname}, 결국 이게 제일 잘 어울려요!',
    ];

    popModal();
    pushModal({
      ...MYINFO_NICKNAME_RESULT_10_MODAL,
      contents: (
        <NicknameResultModal
          count={count}
          title={randomTitles[getRandomNumberOfThree()]}
          contents={MYINFO_NICKNAME_RESULT_10_MODAL.contents}
        />
      ),
      submitFunction: () => pushCompleteModal(),
      cancelFunction: () =>
        count >= NICKNAME_MODAL_SECOND_OVER_COUNT - 1
          ? pushNicknameResult20Modal(nextCount)
          : pushNicknameResult10Modal(nextCount),
    });
  };

  const pushNicknameResultModal = (count: number) => {
    const nextCount = count + 1;

    const randomTitles = [
      '짜잔 ~ {nickname} 딱 어울려요!',
      '이제부터 {nickname}으로 불릴 거예요, 기분 좋죠?',
      '두근두근~ {nickname}, 정말 매력적인 이름이에요!',
    ];

    popModal();
    pushModal({
      ...MYINFO_NICKNAME_RESULT_MODAL,
      contents: (
        <NicknameResultModal
          count={count}
          title={randomTitles[getRandomNumberOfThree()]}
          contents={MYINFO_NICKNAME_RESULT_MODAL.contents}
        />
      ),
      submitFunction: () => pushCompleteModal(),
      cancelFunction: () =>
        count >= NICKNAME_MODAL_FIRST_OVER_COUNT - 1
          ? pushNicknameResult10Modal(nextCount)
          : pushNicknameResultModal(nextCount),
    });
  };

  const pushCompleteModal = () => {
    popModal();
    pushModal({
      ...MYINFO_NICKNAME_COMPLELTE_MODAL,
      submitFunction: () => popModal(),
    });
  };

  const handleNicknameEditClick = () => {
    pushModal({
      ...MYINFO_NICKNAME_EDIT_MODAL,
      submitFunction: () => pushNicknameResultModal(1),
      cancelFunction: () => popModal(),
    });
  };

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
