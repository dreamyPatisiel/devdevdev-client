import React from 'react';

import Link from 'next/link';

import { AlertType } from '@pages/main/types/AlertType';

import { formatElapsedTime } from '@utils/formatElapsedTime';

import { useAlertStore } from '@stores/AlertStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import ArrowRight9x20 from '@components/svgs/arrowRight9x20';

import { usePatchNotificationsRead } from '@/api/usePatchNotificationsRead';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function AlertList({ alert }: { alert: AlertType }) {
  const { id, type, title, createdAt, isRead, companyName, techArticleId } = alert;
  const { isBellDisabled, setAlertListOpen } = useAlertStore();
  const { isMobile } = useMediaQueryContext();
  const { closeFullPopup } = useFullPopupVisibleStore();

  const { mutate: patchAlertRead } = usePatchNotificationsRead();

  const isDisabled = isBellDisabled || isRead;

  const closeAlertSection = () => {
    if (isMobile) {
      closeFullPopup();
    } else {
      setAlertListOpen(false);
    }
  };

  const handleAlertListClick = () => {
    closeAlertSection();
    if (type === 'SUBSCRIPTION') {
      patchAlertRead(id);
    }
  };

  return (
    <Link href={`${ROUTES.TECH_BLOG}/${techArticleId}`} onClick={handleAlertListClick}>
      <li
        key={id}
        className={`p2 ${isMobile ? 'px-[2.4rem] py-[1.6rem]' : 'px-[1.2rem] py-[0.8rem]'} bg-gray800 border-b border-gray500 last:border-b-0 cursor-pointer`}
      >
        <div className='flex justify-between items-center gap-[1rem]'>
          <p
            className={`max-w-[32rem] text-gray100 truncate font-medium ${isDisabled ? 'opacity-50' : ''}`}
          >
            <span className='text-secondary300 font-bold'>{companyName}</span>
            {/* TODO: 댓글 문구는 확정후 수정 필요 (임시) */}
            {type === 'SUBSCRIPTION' ? '에서 새로운 글이 올라왔어요!' : '에서 댓글이 달렸어요!'}
          </p>
          <div className='flex flex-row items-center gap-[1rem]  whitespace-nowrap'>
            <span className={`max-w-[5.5rem] c2 text-gray300 ${isDisabled ? 'opacity-50' : ''}`}>
              {formatElapsedTime(createdAt)}
            </span>
            <ArrowRight9x20 />
          </div>
        </div>
        <p
          className={`text-gray300 whitespace-nowrap overflow-hidden text-ellipsis ${isDisabled ? 'opacity-50' : ''}`}
        >
          {title}
        </p>
      </li>
    </Link>
  );
}
