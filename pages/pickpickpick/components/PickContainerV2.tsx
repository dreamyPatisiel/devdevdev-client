import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import Tag from '@components/common/tag/tag';
import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import exclamationGray from '@public/image/exclamation-circle-gray.svg';
import exclamationRed from '@public/image/exclamation-circle-red.svg';
import PurpleComment from '@public/image/pickpickpick/comment-dots-purple.svg';
import PurpleFire from '@public/image/pickpickpick/fire-purple.svg';

import { PickDataProps } from '../types/pick';
import PickAnswerV2 from './PickAnswerV2';

type PickStatus = 'APPROVAL' | 'REJECT' | 'READY';
type PickType = 'main' | 'pick';

interface PickContainerV2Props {
  pickData: PickDataProps;
  status?: PickStatus;
  type?: PickType;
}

const STATUS_MESSAGES = {
  READY: '픽픽픽 등록 대기중',
  REJECT: '등록이 거부된 게시물이에요',
} as const;

const isDisabledStatus = (status?: PickStatus): boolean => {
  return status === 'READY' || status === 'REJECT';
};

const StatusMessage = ({
  status,
  icon,
  text,
  color,
}: {
  status: PickStatus;
  icon: string;
  text: string;
  color: string;
}) => (
  <p className={cn('c1 font-bold flex items-center gap-[0.4rem]', color)}>
    <Image src={icon} alt={`${status} 아이콘`} />
    {text}
  </p>
);

const Statistics = ({
  voteTotalCount,
  commentTotalCount,
}: {
  voteTotalCount: number;
  commentTotalCount: number;
}) => (
  <div className='flex flex-row gap-[0.8rem]'>
    <StatisticsItem
      icon={PurpleFire}
      alt='투표 이미지'
      text='투표'
      count={voteTotalCount}
      textColor='text-primary200'
    />
    <StatisticsItem
      icon={PurpleComment}
      alt='댓글 이미지'
      text='댓글'
      count={commentTotalCount}
      textColor='text-primary200'
    />
  </div>
);

export default function PickContainerV2({ pickData, status }: PickContainerV2Props) {
  const disabled = isDisabledStatus(status);

  const renderStatusContent = () => {
    switch (status) {
      case 'READY':
        return (
          <StatusMessage
            status={status}
            icon={exclamationGray}
            text={STATUS_MESSAGES.READY}
            color='text-gray100'
          />
        );
      case 'REJECT':
        return (
          <StatusMessage
            status={status}
            icon={exclamationRed}
            text={STATUS_MESSAGES.REJECT}
            color='text-red100'
          />
        );
      default:
        return (
          <Statistics
            voteTotalCount={pickData.voteTotalCount}
            commentTotalCount={pickData.commentTotalCount}
          />
        );
    }
  };

  const containerClass = cn(
    'flex flex-col h-[41.8rem] mb-[2.4rem] px-[3.2rem] py-[2.4rem] rounded-Radius16 bg-gray600',
  );

  return (
    <div className={containerClass}>
      <ArrowWithTitle
        title={pickData.title}
        variant='defaultPickV2'
        className={cn('ellipsis h-[5rem]', { 'opacity-50': disabled })}
        ArrowClassName={cn({ 'opacity-50': disabled })}
        iconSize={{ width: 10, height: 20 }}
      />

      <div
        className={`flex flex-row items-center mt-[1.6rem] ${
          pickData.isNew ? 'justify-between' : 'justify-end'
        }`}
      >
        {pickData.isNew && <Tag content='New' color='secondary' status='line' size='small' />}
        {renderStatusContent()}
      </div>

      <div className={cn('mt-[2.4rem] flex-1')}>
        <ul className={cn('grid grid-cols-2 gap-[1.6rem] h-full', { 'opacity-50': disabled })}>
          {pickData.pickOptions.map((option) => (
            <PickAnswerV2
              key={option.id}
              title={option.title}
              imageUrl={option.thumbnailImageUrl}
              content={option.content}
              isVoted={pickData.isVoted ?? false}
              percent={option.percent ?? 0}
              isPicked={option.isPicked ?? false}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
