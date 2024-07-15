import { motion } from 'framer-motion';

import { useState } from 'react';

import { useRouter } from 'next/router';

import { cn } from '@utils/mergeStyle';

import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useVotedStore } from '@stores/votedStore';

import { usePostVote } from '../apiHooks/usePostVote';
import { PickOptionData } from '../types/pickDetailData';

interface VoteButtonProps {
  pickOptionData?: PickOptionData;
  dataIsVoted?: boolean;
}

export default function VoteButton({ pickOptionData, dataIsVoted }: VoteButtonProps) {
  const { id: optionId, isPicked: optionIsPicked, percent, voteTotalCount } = pickOptionData ?? {};

  const { mutate: postVoteMutate } = usePostVote();
  const { isVoted, setVoted } = useVotedStore();
  const [isPicked, setIsPicked] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { setToastVisible } = useToastVisibleStore();

  const handleVote = () => {
    if (!optionIsPicked) {
      setIsPicked(true);
      setVoted();
      return postVoteMutate({ pickId: id as string, pickOptionId: optionId });
    }

    return setToastVisible('동일한 픽픽픽 선택지에 투표할 수 없습니다.', 'error');
  };

  const renderVoteResult = () => {
    if (!isVoted && !dataIsVoted) {
      return (
        <>
          <span className='h3 font-bold text-gray5'>?? %</span>
          <span className='p2 font-bold text-gray4'>👈 PICK?</span>
        </>
      );
    }

    const percentageColor = isPicked || optionIsPicked ? 'text-primary4' : 'text-gray5';
    const voteCountColor = isPicked || optionIsPicked ? 'text-primary3' : 'text-gray4';

    return (
      <>
        <span className={cn(`h3 font-bold ${percentageColor}`)}>{percent}%</span>
        <span className={cn(`p2 font-bold ${voteCountColor}`)}>{voteTotalCount}표</span>
      </>
    );
  };

  const VOTE_BUTTON_STYLE =
    'py-[3.75rem] rounded-[1.6rem] border border-gray3 flex flex-col items-center justify-center gap-[2rem] min-w-[16rem] max-h-[28.7rem]';

  const votebuttonClass = cn(VOTE_BUTTON_STYLE, {
    'bg-primary1 border-primary3': (isPicked && isVoted) || (optionIsPicked && dataIsVoted),
    'bg-gray1': (!isPicked && isVoted) || (!optionIsPicked && dataIsVoted),
  });

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleVote}
      className={votebuttonClass}
    >
      {renderVoteResult()}
    </motion.button>
  );
}
