import React, { useEffect } from 'react';

import { useLoginStatusStore } from '@stores/loginStore';
import { useModalStore } from '@stores/modalStore';
import { useNicknameStore } from '@stores/nicknameStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { PAGE_ERROR_MESSAGE2 } from '@/constants/errorMessageConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useGetNicknameRandom } from '../apiHooks/useGetNicknameRandom';

export default function NicknameResultModal({
  title,
  newNickname,
}: {
  title: string;
  newNickname?: string;
}) {
  const { isMobile } = useMediaQueryContext();

  const { data, isFetching, refetch } = useGetNicknameRandom();
  const { loginStatus } = useLoginStatusStore();

  const { setDisabled } = useModalStore();
  const { setNickname } = useNicknameStore();
  const { popModal } = useModalStore();
  const { setToastVisible } = useToastVisibleStore();

  useEffect(() => {
    if (loginStatus !== 'login') {
      popModal();
      return setToastVisible({ message: PAGE_ERROR_MESSAGE2, type: 'error' });
    }

    refetch();
  }, []);

  useEffect(() => {
    if (isFetching) {
      setDisabled?.(true);
      return;
    }

    if (!data) {
      setDisabled?.(false);
      return setToastVisible({ message: PAGE_ERROR_MESSAGE2, type: 'error' });
    }

    setNickname(data);
    setDisabled?.(false);
  }, [data, isFetching, setDisabled, setNickname]);

  const spanStyle = 'relative top-[10px] inline-block bounce-custom';

  const LOADING_TEXT = ['고', '민', '중', '.', '.', '.'];
  const ANIMATION_DELAYS = [0, 0.1, 0.2, 0.3, 0.4, 0.5];

  const getLoadingSpans = (spanStyle: string) => {
    return LOADING_TEXT.map((char, index) => (
      <span
        key={index}
        className={spanStyle}
        style={{ animationDelay: `${ANIMATION_DELAYS[index]}s` }}
      >
        {char}
      </span>
    ));
  };

  if (isFetching)
    return (
      <div className='mt-[6.4rem]'>
        <p className='st1 font-bold text-secondary300 absolute inset-0 flex justify-center items-center top-[12rem]'>
          {getLoadingSpans(spanStyle)}
        </p>
      </div>
    );

  const nicknameRegex = /{nickname}/;
  const nicknameTitleArray = title.split(nicknameRegex);

  const displayNickname = newNickname ?? data ?? '';

  return (
    <>
      <h3 className={`font-bold text-white ${isMobile ? 'st2' : 'st1'}`}>
        {nicknameTitleArray[0]}
        <span className='text-secondary300'>{displayNickname}</span>
        {nicknameTitleArray[1]}
      </h3>
      <p className={`text-gray200 whitespace-pre-wrap mt-[0.8rem] ${isMobile ? 'p2' : 'p1'}`}>
        {isMobile ? (
          <>
            닉네임 변경 시 24시간 동안 <br /> 변경할 수 없어요
          </>
        ) : (
          '닉네임 변경 시 24시간 동안 변경할 수 없어요'
        )}
      </p>
    </>
  );
}
