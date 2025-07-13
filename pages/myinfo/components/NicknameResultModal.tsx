import React, { useEffect } from 'react';

import { useNicknameStore } from '@stores/nicknameStore';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useGetNicknameRandom } from '../apiHooks/useGetNicknameRandom';

export default function NicknameResultModal({
  count,
  title,
  contents,
}: {
  count: number;
  title: string;
  contents: string;
}) {
  const { isMobile } = useMediaQueryContext();

  const { data, isFetching, refetch } = useGetNicknameRandom();

  const { setNickname } = useNicknameStore();

  useEffect(() => {
    console.log('count', count);
    refetch();
  }, [count]);

  useEffect(() => {
    if (data) {
      setNickname(data.data);
    }
  }, [data, setNickname]);

  if (isFetching) return <p className='st1 font-bold text-secondary300'>고민중...</p>;

  const nicknameRegex = /{nickname}/;

  const nicknameTitleArray = title.split(nicknameRegex);

  return (
    <>
      <h3 className={`font-bold text-white st1`}>
        {nicknameTitleArray[0]}
        <span className='text-secondary300'>{data.data}</span>
        {nicknameTitleArray[1]}
      </h3>
      <p className={`text-gray200 whitespace-pre-wrap mt-[0.8rem] ${isMobile ? 'p2' : 'p1'}`}>
        {contents}
      </p>
    </>
  );
}
