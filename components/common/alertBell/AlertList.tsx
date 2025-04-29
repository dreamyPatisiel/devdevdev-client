import React from 'react';

import { useAlertStore } from '@stores/AlertStore';

import ArrowRight9x20 from '@components/svgs/arrowRight9x20';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { AlertType } from '@pages/main/types/AlertType';



export default function AlertList({ alert }: { alert: AlertType }) {
  const { id, type, title, createdAt, isRead, companyName, techArticleId } = alert;
  const { isBellDisabled } = useAlertStore();
  const { isMobile } = useMediaQueryContext();

  return (
    <li
      key={id}
      className={`p2 ${isMobile ? 'px-[2.4rem] py-[1.6rem]' : 'px-[1.2rem] py-[0.8rem]'} bg-gray800 border-b border-gray500 last:border-b-0 cursor-pointer`}
    >
      <div className='flex justify-between items-center gap-[1rem]'>
        <p
          className={`max-w-[32rem] text-gray100 truncate font-medium ${isBellDisabled ? 'opacity-50' : ''}`}
        >
          <span className='text-secondary300 font-bold'>{companyName}</span>
          {/* TODO: 댓글 문구는 확정후 수정 필요 (임시) */}
          {type === 'SUBSCRIPTION' ? '에서 새로운 글이 올라왔어요!' : '에서 댓글이 달렸어요!'}
        </p>
        <div className='flex flex-row items-center gap-[1rem]  whitespace-nowrap'>
          <span className={`max-w-[5.5rem] c2 text-gray300 ${isBellDisabled ? 'opacity-50' : ''}`}>
            {/* TODO: 서버 필드값 수정후 수정 필요 */}
            {/* {createdAt} */}
            23시간 전
          </span>
          <ArrowRight9x20 />
        </div>
      </div>
      <p
        className={`text-gray300 whitespace-nowrap overflow-hidden text-ellipsis ${isBellDisabled ? 'opacity-50' : ''}`}
      >
        {title}
      </p>
    </li>
  );
}
