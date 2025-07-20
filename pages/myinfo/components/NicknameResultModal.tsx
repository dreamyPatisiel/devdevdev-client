import React, { useEffect } from 'react';

import { useNicknameStore } from '@stores/nicknameStore';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useGetNicknameRandom } from '../apiHooks/useGetNicknameRandom';

export default function NicknameResultModal({ count, title }: { count: number; title: string }) {
  const { isMobile } = useMediaQueryContext();

  const { data, isFetching, refetch } = useGetNicknameRandom();

  const { setNickname } = useNicknameStore();

  useEffect(() => {
    refetch();
  }, [count]);

  useEffect(() => {
    if (data) {
      setNickname(data);
    }
  }, [data, setNickname]);

  const spanStyle = 'relative top-[10px] inline-block bounce-custom';

  if (isFetching)
    return (
      <div className='mt-[3.2rem]'>
        <p className='st1 font-bold text-secondary300 absolute inset-0 flex justify-center items-center top-[12rem]'>
          <span className={spanStyle} style={{ animationDelay: '0s' }}>
            고
          </span>
          <span className={spanStyle} style={{ animationDelay: '0.1s' }}>
            민
          </span>
          <span className={spanStyle} style={{ animationDelay: '0.2s' }}>
            중
          </span>
          <span className={spanStyle} style={{ animationDelay: '0.3s' }}>
            .
          </span>
          <span className={spanStyle} style={{ animationDelay: '0.4s' }}>
            .
          </span>
          <span className={spanStyle} style={{ animationDelay: '0.5s' }}>
            .
          </span>
        </p>
      </div>
    );

  const nicknameRegex = /{nickname}/;

  const nicknameTitleArray = title.split(nicknameRegex);

  return (
    <>
      <h3 className={`font-bold text-white ${isMobile ? 'st2' : 'st1'}`}>
        {nicknameTitleArray[0]}
        <span className='text-secondary300'>{data}</span>
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
