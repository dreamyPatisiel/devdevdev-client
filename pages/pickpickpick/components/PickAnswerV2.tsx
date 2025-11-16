import { cn } from '@utils/mergeStyle';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

interface PickAnswerV2Props {
  title: string;
  isPicked: boolean;
  percent: number;
  isVoted: boolean;
  className?: string;
  imageUrl?: string;
  content?: string;
}

const DEFAULT_PERCENT = 50;
const PLACEHOLDER_TEXT = '??';

const PICKED_COLORS = {
  progress: 'bg-primary300',
  percent: 'text-primary300',
  title: 'text-primary200',
} as const;

const UNPICKED_COLORS = {
  progress: 'bg-gray400',
  percent: 'text-gray400',
  title: 'text-gray200',
} as const;

const DEFAULT_COLORS = {
  progress: 'bg-gray300',
  percent: 'text-gray200',
  title: 'text-gray50',
} as const;

export default function PickAnswerV2({
  title,
  isPicked,
  percent,
  isVoted,
  className,
  imageUrl,
  content,
}: PickAnswerV2Props) {
  const { isMobile } = useMediaQueryContext();
  const isPickedOption = isVoted && isPicked;
  const isUnpickedOption = isVoted && !isPicked;

  const colors = isPickedOption
    ? PICKED_COLORS
    : isUnpickedOption
      ? UNPICKED_COLORS
      : DEFAULT_COLORS;

  const progressBarWidth = isVoted ? `${percent}%` : `${DEFAULT_PERCENT}%`;
  const percentText = isVoted ? `${percent}%` : PLACEHOLDER_TEXT;

  const hasMedia = Boolean(imageUrl || content);

  const renderMedia = () => {
    const mediaClassName = cn('w-full h-[12rem]', {
      'opacity-50': isUnpickedOption,
      'rounded-Radius10 ': isMobile,
      'rounded-Radius16 ': !isMobile,
    });

    if (imageUrl) {
      return (
        <img src={imageUrl} alt='투표 이미지' className={cn(mediaClassName, 'object-cover')} />
      );
    }

    if (content) {
      return (
        <div
          className={cn(
            mediaClassName,
            'flex items-center justify-center py-[1rem] overflow-hidden',
          )}
        >
          <p className='c1 text-gray200 line-clamp-6'>{content}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <li
      className={cn(
        `${isMobile ? 'px-[1.2rem] py-[1.6rem]' : 'p-[2rem]'} bg-black h-full rounded-Radius16 flex flex-col justify-between items-center gap-[1rem]`,
        className,
      )}
    >
      <div className='w-full flex flex-row gap-[0.6rem] items-center justify-start'>
        <p className={cn('c1 bold', colors.percent)}>{percentText}</p>
        <div className='flex-1 h-[0.9rem] rounded-full overflow-hidden'>
          <div
            className={cn('h-full rounded-full transition-all duration-300', colors.progress)}
            style={{ width: progressBarWidth }}
          />
        </div>
      </div>

      {/* 선택지 제목 */}
      <p
        className={cn('w-full', colors.title, {
          'h-[5rem] p2 bold ellipsis text-left': hasMedia,
          'flex-1 h3 text-center flex items-center justify-center': !hasMedia,
        })}
      >
        {!hasMedia ? <span className='line-clamp-3 w-full'>{title}</span> : title}
      </p>

      {/* 선택지 이미지 또는 콘텐츠 */}
      {renderMedia()}
    </li>
  );
}
