import { motion } from 'framer-motion';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { cn } from '@utils/mergeStyle';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import PickCheck from '@public/image/pickpickpick/pick-check.svg';
import PickNope from '@public/image/pickpickpick/pick-nope.svg';
import PointUp from '@public/image/pickpickpick/point-up.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { usePostVote } from '../apiHooks/usePostVote';
import { PickOptionData } from '../types/pickDetailData';

interface VoteButtonProps {
  pickOptionData?: PickOptionData;
  dataIsVoted?: boolean;
  pickOrder: 'first' | 'second';
}

export default function VoteButtonV2({ pickOptionData, dataIsVoted, pickOrder }: VoteButtonProps) {
  const { id: optionId, isPicked, percent, voteTotalCount } = pickOptionData ?? {};

  const { mutate: postVoteMutate } = usePostVote();

  const router = useRouter();
  const { id } = router.query;

  const { setToastVisible } = useToastVisibleStore();

  const { isMobile } = useMediaQueryContext();

  const handleVote = () => {
    if (!isPicked) {
      return postVoteMutate({ pickId: id as string, pickOptionId: optionId });
    }

    return setToastVisible({
      message: '동일한 픽픽픽 선택지에 투표할 수 없습니다.',
      type: 'error',
    });
  };

  const renderVoteResult = () => {
    if (!dataIsVoted) {
      return (
        <>
          <div className='flex items-center gap-[1rem]'>
            <span className='st2 font-bold text-gray200'>?? %</span>
            <div className='w-[23.7rem] h-[1.6rem] rounded-[1rem] bg-gray200'></div>
          </div>

          <span className='st2 font-bold text-white flex gap-[1rem]'>
            <Image src={PointUp} alt='위를 가리키는 손가락 아이콘' />
            PICK {pickOrder === 'first' ? 'A' : 'B'}
          </span>
        </>
      );
    }

    const isNotVotedOrPicked = !isPicked;

    const percentageColor = isNotVotedOrPicked ? 'text-gray300' : 'text-white';
    const voteCountColor = isNotVotedOrPicked ? 'text-gray300' : 'text-primary200';
    const percentageBarColor = isNotVotedOrPicked ? 'bg-gray300' : 'bg-primary200';

    return (
      <>
        <div className='flex items-center gap-[1rem]'>
          <span className={cn(`st2 font-bold text-gray200 ${percentageColor}`)}>{percent} %</span>
          <div
            className={cn(`h-[1.6rem] rounded-[1rem] ${percentageBarColor}`)}
            style={{ width: `${23.7 * (percent ?? 1) * 0.01}rem` }}
          ></div>
          <span className={cn(`c1 font-bold ${voteCountColor}`)}>{voteTotalCount}표</span>
        </div>

        {isPicked ? (
          <span className='st2 font-bold text-white flex gap-[1rem]'>
            <Image src={PickCheck} alt='체크된 아이콘' />
            PICK!
          </span>
        ) : (
          <span className='st2 font-bold text-gray300 flex gap-[1rem]'>
            <Image src={PickNope} alt='엑스 아이콘' />
            NOPE
          </span>
        )}
      </>
    );
  };

  const VOTE_BUTTON_STYLE = `rounded-[1.6rem] border border-gray300 flex flex-col justify-center gap-[2rem] p-[2.4rem] w-full
  ${isMobile ? '' : 'min-w-[16rem] max-h-[28.7rem]'}`;

  const votebuttonClass = cn(VOTE_BUTTON_STYLE, {
    'bg-primary400 border-primary400': isPicked && dataIsVoted,
    'bg-gray500 border-gray400': !isPicked && dataIsVoted,
  });

  return (
    <motion.button
      whileHover={isMobile ? '' : { scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleVote}
      className={votebuttonClass}
    >
      {renderVoteResult()}
    </motion.button>
  );
}
