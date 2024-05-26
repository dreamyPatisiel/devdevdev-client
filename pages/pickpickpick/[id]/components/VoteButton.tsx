import { motion } from 'framer-motion';

import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import { useVotedStore } from '@stores/votedStore';

export default function VoteButton({}: { onClick?: () => void; voted?: string }) {
  const { isVoted, setIsVoted } = useVotedStore();
  const [isPicked, setIsPicked] = useState(false);

  const getVoteResult = () => {
    if (!isVoted) {
      return (
        <>
          <span className='p-[1rem] h3 font-bold text-gray5'>?? %</span>
          <span className='p-[1rem] p2 font-bold text-gray4'>👈 PICK?</span>
        </>
      );
    }

    const percentageColor = isPicked ? 'text-primary4' : 'text-gray5';
    const voteCountColor = isPicked ? 'text-primary3' : 'text-gray4';

    return (
      <>
        <span className={cn(`p-[1rem] h3 font-bold ${percentageColor}`)}>{'50'}%</span>
        <span className={cn(`p-[1rem] p2 font-bold ${voteCountColor}`)}>{'3,455'}표</span>
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
      }}
      disabled={isVoted}
      className={cn(
        'px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col items-center justify-center min-w-[16rem] max-h-[28.7rem]',
        {
          'bg-primary1 border-primary3': isPicked && isVoted,
          'bg-gray1': !isPicked && isVoted,
        },
      )}
    >
      {getVoteResult()}
    </motion.button>
  );
}
