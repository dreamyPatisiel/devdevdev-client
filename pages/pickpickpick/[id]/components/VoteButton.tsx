import { motion } from 'framer-motion';

import { useVotedStore } from '@stores/votedStore';

export default function VoteButton({ onClick, voted }: { onClick: () => void; voted: string }) {
  const { isVoted, firstVoted, secondVoted } = useVotedStore();

  const getVoteResult = () => {
    if (!isVoted) {
      return (
        <>
          <span className='p-[1rem] h3 font-bold text-gray5'>?? %</span>
          <span className='p-[1rem] p2 font-bold text-gray4'>👈 PICK?</span>
        </>
      );
    }

    const picked = (voted === 'first' && firstVoted) || (voted === 'second' && secondVoted);
    const percentageColor = picked ? 'text-primary4' : 'text-gray5';
    const voteCountColor = picked ? 'text-primary3' : 'text-gray4';

    return (
      <>
        <span className={`p-[1rem] h3 font-bold ${percentageColor}`}>{'50'}%</span>
        <span className={`p-[1rem] p2 font-bold ${voteCountColor}`}>{'3,455'}표</span>
      </>
    );
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col items-center justify-center min-w-[16rem] max-h-[28.7rem]
        ${
          (isVoted && voted === 'first' && firstVoted && 'bg-primary1 border-primary3') ||
          (isVoted && voted === 'second' && secondVoted && 'bg-primary1 border-primary3')
        }
        ${
          (isVoted && voted === 'first' && !firstVoted && 'bg-gray1') ||
          (isVoted && voted === 'second' && !secondVoted && 'bg-gray1')
        }
      `}
    >
      {getVoteResult()}
    </motion.button>
  );
}
