import { motion } from 'framer-motion';

import { useState } from 'react';

import { useRouter } from 'next/router';

import { cn } from '@utils/mergeStyle';

import { useVotedStore } from '@stores/votedStore';

import { usePostVote } from '../apiHooks/usePostVote';

export default function VoteButton({
  dataOptionIsPicked,
  dataOptionId,
  dataIsVoted,
  percent,
  voteTotalCount,
}: {
  dataOptionIsPicked?: boolean;
  dataOptionId?: number;
  dataIsVoted?: boolean;
  percent?: number;
  voteTotalCount?: number;
}) {
  const { mutate: postVoteMutate } = usePostVote();
  const { isVoted, setIsVoted } = useVotedStore();
  const [isPicked, setIsPicked] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const getVoteResult = () => {
    if (!isVoted && !dataIsVoted) {
      return (
        <>
          <span className='p-[1rem] h3 font-bold text-gray5'>?? %</span>
          <span className='p-[1rem] p2 font-bold text-gray4'>👈 PICK?</span>
        </>
      );
    }

    const percentageColor = isPicked || dataOptionIsPicked ? 'text-primary4' : 'text-gray5';
    const voteCountColor = isPicked || dataOptionIsPicked ? 'text-primary3' : 'text-gray4';

    return (
      <>
        <span className={cn(`p-[1rem] h3 font-bold ${percentageColor}`)}>{percent}%</span>
        <span className={cn(`p-[1rem] p2 font-bold ${voteCountColor}`)}>{voteTotalCount}표</span>
      </>
    );
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setIsPicked(true);
        setIsVoted();
        postVoteMutate({ pickId: id as string, pickOptionId: dataOptionId });
      }}
      disabled={isVoted || dataIsVoted}
      className={cn(
        'px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col items-center justify-center min-w-[16rem] max-h-[28.7rem]',
        {
          'bg-primary1 border-primary3':
            (isPicked && isVoted) || (dataOptionIsPicked && dataIsVoted),
          'bg-gray1': (!isPicked && isVoted) || (!dataOptionIsPicked && dataIsVoted),
        },
      )}
    >
      {getVoteResult()}
    </motion.button>
  );
}
